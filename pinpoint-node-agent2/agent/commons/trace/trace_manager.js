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
var Configuration = require('../../conf/read_config.js');
var ConfigConstants = require('../../utils/constants.js').ConfigConstants;
var LoggerFactory = require('../../utils/logger_factory.js');
var SerializeFactory = require('../../thrift/io/serialize.js');
var UdpClient = require('../../socket/udp_client.js');
var Ttypes = require('../../thrift/dto/Trace_types.js');

var logger = LoggerFactory.getLogger(__filename);


function startAgentStatCollector(udpStatClient, data) {
    logger.info('start agent stat collector in child process');
    var agentStatCollector = require('../metric/agent_stat_monitor.js');
    agentStatCollector(udpStatClient, data);
}

function getSpan(object) {

    //reset transactionId
    if (object.transactionId.type === 'Buffer') {
        object.transactionId = new Buffer(object.transactionId.data);
    }

    //reset exceptionInfo
    if (object.exceptionInfo) {
        object.exceptionInfo = new Ttypes.TIntStringValue(object.exceptionInfo); 
    }

    //reset spanEventList
    var i;
    for (i=0; i<object.spanEventList.length; i++) {
        object.spanEventList[i] = getSpanEvent(object.spanEventList[i]);
    }

    //reset annotationList
    for (i=0; i<object.annotations.length; i++) {
        object.annotations[i] = getAnnotation(object.annotations[i]);
    }
    return new Ttypes.TSpan(object);
}

function getSpanEvent(object) {
    //reset exceptionInfo
    if (object.exceptionInfo) {
        object.exceptionInfo = new Ttypes.TIntStringValue(object.exceptionInfo); 
    }
    //reset annotationList
    for (var i=0; i<object.annotations.length; i++) {
        object.annotations[i] = getAnnotation(object.annotations[i]);
    }
    return new Ttypes.TSpanEvent(object);
}

function getAnnotation(object) {
    object.value = new Ttypes.TAnnotationValue(object.value);
    return new Ttypes.TAnnotation(object);
}

var Client = function udpClient() {
    logger.info('init udp client in child process');
    var conf = new Configuration();
    this.collectorIp = conf.get(ConfigConstants.PROFILER_COLLECTOR_IP, '127.0.0.1');
    this.collectorSpanPort = conf.get(ConfigConstants.PROFILER_COLLECTOR_SPAN_PORT, '9996');
    this.collectorStatPort = conf.get(ConfigConstants.PROFILER_COLLECTOR_STAT_PORT, '9995');
    this.udpSpanClient = new UdpClient(this.collectorIp, this.collectorSpanPort);
    this.udpStatClient = new UdpClient(this.collectorIp, this.collectorStatPort);
    this.udpSpanClient.setSerialize(new SerializeFactory());
    this.udpStatClient.setSerialize(new SerializeFactory());
};

var client = new Client();
process.on('message', function get(data) {

    logger.info('receive new data, start handle it');
    logger.debug('new data is: ' + JSON.stringify(data));
    try {
        //you should convert the data to TSpan
        //todo handle other data like span stat

        // get parent info
        if(data.type === 'PARENT_INFO') {
            // start agent stat collector
            startAgentStatCollector(client.udpStatClient, data);
            return;
        }

        // handle span
        var message = getSpan(data);
        client.udpSpanClient.send(message);
    } catch(err) {
        logger.error('child process send udp data failed: ' + err); 
    }

});


