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

const thrift = require('thrift');
const TCompactProtocol = thrift.TCompactProtocol;  //use thrift compact protocol
const TFramedTransport = thrift.TFramedTransport;

const DefaultTBaseLocator = require('./default_tbase_locator.js').DefaultTBaseLocator;

const Serialize = function () {

    let pri = {
        locator: null,
        header: null,
        transport: null,
        protocol: null
    };

    const pub = {
        serialize: function (tbase) {
            pri.locator = new DefaultTBaseLocator();
            pri.header = pri.locator.headerLookup(tbase);
            pri.transport = new TFramedTransport();
            pri.protocol = new TCompactProtocol(pri.transport);
            tbase.write(pri.protocol);

            //get the header and tbase byteArray and concat to Buffer
            //outBuffers is BufferArray
            const headerBuffer = pub.headerSerialize(pri.header);
            return Buffer.concat([headerBuffer, Buffer.concat(pri.transport.outBuffers)]);
        },

        /*
         * header protocol setting for pinpoint
         *
         */
        headerSerialize: function (header) {
            const buffer = new Buffer(4);
            buffer.writeInt8(header.getSignature(), 0);
            buffer.writeInt8(header.getVersion(), 1);
            //type is short,16 bits
            buffer.writeUInt16BE(header.getType(), 2);
            return buffer;
        },

        getLocator: function () {
            return pri.locator;
        },

        getHeader: function () {
            return pri.header;
        }

    };

    return pub;

};


module.exports = Serialize;
