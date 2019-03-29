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
var TransactionId = require('../commons/trace/transaction_id.js');
var BytesUtils = require('./bytes_utils.js');
var VERSION_STRING = 0;
var TRANSACTION_ID_DELIMITER_STRING = TransactionId.TRANSACTION_ID_DELIMITER;
var NULL = -1;

var TransactionIdUtil = {

    TRANSACTION_ID_DELIMITER : TRANSACTION_ID_DELIMITER_STRING,
    VERSION : VERSION_STRING,

    formatBytes : function (transactionId) {

        var agentId = transactionId.agentId;
        var agentStartTime = transactionId.agentStartTime;
        var transactionSequence = transactionId.transactionSequence;

        // agentId may be null
        // version + prefixed size + string + long + long for java
        // Buffer buffer = new Buffer(1 + 5 + 24 + 10 + 10);

        if (agentId === null) {
            agentId = '';

        }
        var agentIdByte = new Buffer(agentId);
        var size = BytesUtils.intToZigZag(agentIdByte.length);
        if (agentId === '') {
            size = BytesUtils.intToZigZag(NULL);
        }
        var agentIdSizeByte = BytesUtils.intToBuffer(size); //agent max length is 24,so buffer length must be 1 in int8;

        var versionByte = BytesUtils.intToBuffer(VERSION_STRING);
        var agentStartTimeByte = BytesUtils.longToBuffer(agentStartTime);
        var transactionSequenceByte = BytesUtils.longToBuffer(transactionSequence);

        return Buffer.concat([versionByte, agentIdSizeByte, agentIdByte, agentStartTimeByte, transactionSequenceByte]);
    },
    
    toString : function (agentId, agentStartTime, transactionSequence) {
        return [agentId, agentStartTime, transactionSequence].join(TRANSACTION_ID_DELIMITER_STRING);
    },

    toTransactionId : function (transactionIdStr) {
        var arr = transactionIdStr.split(TRANSACTION_ID_DELIMITER_STRING); 
        if (arr.length !== 3) {
            throw new Error('invalid transactionIdStr');
        } else {
            return new TransactionId(arr[0], parseInt(arr[1]), parseInt(arr[2]));
        }
    },

};




module.exports = TransactionIdUtil;
