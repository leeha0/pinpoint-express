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

const constants = require('../utils/constants.js').ConfigConstants;
const Configuration = require('./read_config.js');
const config = new Configuration();

const logPathPrefix = __dirname.substring(0, __dirname.lastIndexOf(path.sep));
const defaultCategory = config.get(constants.AGENT_APPLICATION_NAME, 'node-app-id');
const defaultLogPath = path.join(logPathPrefix, path.sep, '/logs');

function mkdirLogDir() {
    if (!fs.existsSync(defaultLogPath)) {
        fs.mkdirSync(defaultLogPath);
    }
}

mkdirLogDir();

//set replaceConsole=true, levels=INFO when in online/product
module.exports = {

    defaultLogPath: defaultLogPath,
    defaultCategory: defaultCategory,
    replaceConsole: false,
    appenders: [
        //don't use console, because the app may use it
        //{
        //  type: 'dateFile',
        //  category: 'console'
        //},
        {
            type: 'dateFile',
            category: defaultCategory
        }
    ],
    levels: {
        //console: 'DEBUG',
        [defaultCategory]: 'INFO'
    }
};
