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

const defaultConfFile = path.join(__dirname, 'pinpoint.config');

function Configuration(confFile) {
    if (confFile === null || confFile === undefined) {
        this.confFile = defaultConfFile;
    } else {
        this.confFile = confFile;
    }
    this.conf = getConfig(this.confFile);
}

Configuration.prototype.get = function (key, defaultValue) {
    if (this.conf[key] === 'false' || this.conf[key] === 'true') {
        this.conf[key] = JSON.parse(this.conf[key]);
    } else if (!isNaN(this.conf[key])) {
        this.conf[key] = Number(this.conf[key]);
    }
    return this.conf[key] === undefined ? defaultValue : this.conf[key];
};

Configuration.prototype.getConfig = function () {
    return this.conf;
};

const getConfig = function (confFile) {
    const data = fs.readFileSync(confFile, 'utf-8').split('\n');
    return handleConfData(data);
};

const handleConfData = function (data) {

    let conf = [];

    data.forEach(function (item) {

        const commentIndex = item.indexOf('#');
        if (commentIndex !== 0 && item.length !== 0) {
            //filter '#' after conf item
            if (commentIndex > 0) {
                item = item.split('#')[0];
            }
            const keyValue = item.split('=');
            keyValue[0] = keyValue[0].trim();
            if (keyValue[1] !== undefined && keyValue[1] !== null) {
                keyValue[1] = keyValue[1].trim();
            }
            if (keyValue[1] !== undefined && keyValue[1] !== null && keyValue[1][0] === '$') {
                conf[keyValue[0]] = getVariable(conf, keyValue[1]);
            }
            else {
                conf[keyValue[0]] = keyValue[1];
            }
        }
    });

    return conf;
};


/*
 * get variable as conf value like key=${value}, we should search value as key in conf
 *
 */
const getVariable = function (conf, key) {

    let value = '';
    //get key
    key = key.trim();
    if (key && key.length !== 0) {
        key = key.substr(2, key.length - 3); //remove char '${}'
        value = (conf[key] !== undefined) ? conf[key] : '';
    }
    return value;
};


module.exports = Configuration;
