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

const FixedBuffer = require('../buffer/fixed_buffer.js');
const BasicPacket = require('./basic_packet.js');
const PayloadPacket = require('../../utils/payload_packet.js');
const PacketType = require('./packet_type.js');
const Objects = require('../../utils/objects.js');

const SendPacket = function (payload) {
    if ((payload instanceof Buffer) === false) {
        throw new Error('payload must be Buffer instance!');
    }
    this.payload = payload;
};

Objects.extends(false, SendPacket, BasicPacket);

SendPacket.prototype.getPacketType = function () {
    return PacketType.APPLICATION_SEND;
};

SendPacket.prototype.toBuffer = function () {
    const header = new FixedBuffer(2 + 4); // short(16bits) + int(32bits)
    header.writeShort(PacketType.APPLICATION_SEND);
    return PayloadPacket.appendPayload(header, this.payload);
};

module.exports = SendPacket;
