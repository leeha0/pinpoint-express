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

const MethodDescriptor = require('../commons/module/method_descriptor.js');
const TApiMetaData = require('../thrift/dto/Trace_types.js').TApiMetaData;

const MethodDescriptorGenerator = function MethodDescriptorGenerator() {

    this.methodDescriptorList = [];
    if (arguments.length === 1 && (typeof arguments[0]) === 'number') {
        this.apiLevel = arguments[0];
    } else {
        this.apiLevel = 3; // default level
    }
};

MethodDescriptorGenerator.prototype.push = function push(moduleName, moduleInstance) {
    if (moduleInstance === undefined) {
        this.buildGlobalMethodDescriptor(moduleName);
    } else {
        this.buildMethodDescriptor(moduleName, moduleInstance, 0);
    }
};

MethodDescriptorGenerator.prototype.getApiId = function getApiId() {
    const args = arguments[0];
    let key = [];
    for (const index in args) {
        key.push(args[index]);
    }
    const methodDescriptor = this.methodDescriptorList[key.join('.')];
    return (methodDescriptor === undefined) ? -1 : methodDescriptor.apiId;
};

MethodDescriptorGenerator.getApiMetaData = function getApiMetaData(agentId, agentStartTime, methodDescriptor) {
    let apiMetaData = new TApiMetaData();
    apiMetaData.agentId = agentId;
    apiMetaData.agentStartTime = agentStartTime;
    apiMetaData.apiId = methodDescriptor.apiId;
    apiMetaData.apiInfo = methodDescriptor.apiInfo;
    return apiMetaData;
};

MethodDescriptorGenerator.prototype.buildMethodDescriptor = function buildMethodDescriptor(moduleName, moduleInstance, level) {
    if (level < this.apiLevel) {
        level++;
        //should get all static method and prototype method
        const funcArray = getModuleFunctionList(moduleInstance);
        for (const index in funcArray) {
            const funcName = funcArray[index];
            const funcInstance = getModuleFunction(moduleInstance, funcName);
            if ((typeof funcInstance) === 'function') {
                const parameters = getFunctionParameters(funcInstance);
                const newMethodDescriptor = new MethodDescriptor(moduleName, funcName, parameters);
                this.methodDescriptorList[newMethodDescriptor.apiInfo] = newMethodDescriptor;
                this.buildMethodDescriptor(moduleName + '.' + funcName, funcInstance, level);
            }
        }
    }
};

MethodDescriptorGenerator.prototype.buildGlobalMethodDescriptor = function buildGlobalMethodDescriptor(moduleName) {
    this.methodDescriptorList[moduleName] = new MethodDescriptor(moduleName, null, null);
};

/**
 * get static and prototype funcs
 */
const getModuleFunctionList = function getModuleFunctionList(moduleInstance) {
    let funcArray;
    if (moduleInstance.prototype) {
        funcArray = Object.keys(moduleInstance).concat(Object.keys(moduleInstance.prototype));
    } else {
        funcArray = Object.keys(moduleInstance);
    }
    //filter super_ func
    delete funcArray[funcArray.indexOf('super_')];
    return funcArray;
};

const getModuleFunction = function getModuleFunction(moduleInstance, funcName) {
    return (moduleInstance[funcName] === undefined) ? moduleInstance.prototype[funcName] : moduleInstance[funcName];
};

//get method str first line(parameters line)
const getFunctionParameters = function getFunctionParameters(funcInstance) {
    const parameters = funcInstance.toString().split('\n')[0];
    //delete char '}'
    return parameters.substring(0, parameters.length - 1);
};

module.exports = MethodDescriptorGenerator;
