/*
 * Copyright 2017 dmb.star-net.cn
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const _module = require('module');
const original_load = _module._load;

const ConfigConstants = require('../../utils/constants.js').ConfigConstants;
const MethodDescriptorGenerator = require('../../utils/method_descriptor_generator.js');
const PinpointGlobalMethod = require('../../utils/constants.js').PinpointGlobalMethod;
const PluginObject = require('./plugin_object.js');

const COREPLUGINDIRNAME = '../../plugins/core';
const USERPLUGINDIRNAME = '../../plugins/user';
const COREPLUGINSPATH = path.join(__dirname, path.sep, COREPLUGINDIRNAME);
const USERPLUGINSPATH = path.join(__dirname, path.sep, USERPLUGINDIRNAME);
const MODULECACHE = global.PinpointNodejsAgent.conf.get(ConfigConstants.AGENT_MODULE_CACHE, false);

const loggerFactory = require('../../utils/logger_factory.js');
const logger = loggerFactory.getLogger(__filename);

// get plugins object
const getPluginsObject = function () {
    let moduleKeyMap = {};
    // const pluginType = [COREPLUGINSPATH, USERPLUGINSPATH];
    const pluginType = [COREPLUGINSPATH];
    for (const index in pluginType) {
        const type = pluginType[index];
        /* jshint loopfunc: true */
        fs.readdirSync(type).forEach(function (item) {
            const pluginPath = path.join(type, path.sep, item);
            if (fs.lstatSync(pluginPath).isDirectory()) {
                const pluginObject = new PluginObject(pluginPath);
                for (const module in pluginObject.requireModule) {
                    moduleKeyMap[module] = pluginObject;
                }
            }
        });
    }

    /*
moduleKeyMap:
{
express: {
      "pluginName": "/Users/we/Workspace/node-work/ws-tour-api/libs/pinpoint-node-agent/agent/plugins/core/express",
      "apiInfoFile": "/Users/we/Workspace/node-work/ws-tour-api/libs/pinpoint-node-agent/agent/plugins/core/express/api.js",
      "pluginPath": "/Users/we/Workspace/node-work/ws-tour-api/libs/pinpoint-node-agent/agent/plugins/core/express",
      "requireModule": {
        "express": "wrap.js"
      }
  }
}

     */
    return moduleKeyMap;
};

const moduleMap = getPluginsObject();
let haveLoaded = {}; // module cache

// hack the module load function
// _module._load
_module._load = function () {

    // refresh module paths
    // parent node_modules path + pinpoint agent node_modules paths
    arguments[1].paths = [].concat(arguments[1].paths,
        global.projectModulePaths.filter(function (item) {
            return this.paths.indexOf(item) < 0;
        }.bind({paths: arguments[1].paths})));
    const module_name = arguments[0];
    const parent = arguments[1];
    let instance;

    // is core plugin
    let key = module_name;

    // is user plugin
    if (module_name.startsWith('.') || module_name.startsWith('/')) {
        const filename = _module._resolveFilename(module_name, parent);
        key = filename;
    }

    // create module instance
    if ((key in haveLoaded) && MODULECACHE) {
        instance = haveLoaded[key];
    } else if (key in moduleMap) {
        logger.info(`add plugin for ${key} - ${arguments[0]}, ${arguments[1].id}, ${arguments[2]}`);
        const pluginObject = moduleMap[key];
        const wrap = require(pluginObject.getPluginFile(key));
        instance = original_load.apply(this, arguments);
        instance = wrap(instance);
        MODULECACHE ? haveLoaded[key] = instance : undefined;
    } else {
        // normal module
        // cache every module,that agent and user app share the common module
        instance = original_load.apply(this, arguments);
        MODULECACHE ? haveLoaded[key] = instance : undefined;
    }

    return instance;
};

// load all plugins api info
// TODO send api info when load
const loadPluginsApiDetails = function loadPluginsApiDetails() {

    const methodDescriptorGenerator = new MethodDescriptorGenerator();
    for (const item in moduleMap) {
        // require api.js & called _load
        const apiList = require(moduleMap[item].apiInfoFile);
        for (const api in apiList) {
            console.log(api);
            methodDescriptorGenerator.push(api);
        }
    }
    // load global method
    for (const item in PinpointGlobalMethod) {
        methodDescriptorGenerator.push(PinpointGlobalMethod[item]);
    }
    return methodDescriptorGenerator;
};

module.exports.loadPluginsApiDetails = loadPluginsApiDetails;
