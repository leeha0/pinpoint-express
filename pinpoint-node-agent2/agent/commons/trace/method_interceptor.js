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

const cls = require('../cls');
const PinpointTraceMetaData = require('../../utils/constants.js').PinpointTraceMetaData;
const TRACE_CONTEXT = PinpointTraceMetaData.TRACE_CONTEXT;

function getCurrentNamespace() {
    let namespace = cls.getNamespace(TRACE_CONTEXT);
    if (namespace === undefined) {
        namespace = cls.createNamespace(TRACE_CONTEXT);
    }
    return namespace;
}

function slice(args) {
    let array = [];
    for (let i = 0; i < args.length; i++) {
        array[i] = args[i];
    }
    return array;
}

module.exports = function methodInterceptor(original, wrapper) {
    const method = function originalWrapper() {
        const proxy = this;
        const args = slice(arguments);
        const namespace = getCurrentNamespace();

        // console.log('\toriginal' + original.toString());
        // console.log('\twrapper' + wrapper.toString());
        if (namespace.active !== null) {
            return wrapper(original, proxy, args);
        } else {
            //change namespace.active null to some value
            namespace.run(function cb() {
                return wrapper(original, proxy, this.args);
            }.bind({args: args}));
        }
    };
    return method;
};
