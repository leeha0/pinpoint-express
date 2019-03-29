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

const path = require('path');
const cp = require('child_process');
const v8 = require('v8');

// agent
const AgentInfoUtils = require('../utils/agent_info_utils.js');

// configuration
const Configuration = require('../conf/read_config.js');
const ConfigConstants = require('../utils/constants.js').ConfigConstants;

// logger
const LoggerFactory = require('../utils/logger_factory.js');

// method descriptor
const MethodDescriptorGenerator = require('../utils/method_descriptor_generator.js');

// sampler
const SamplerFactory = require('./sampler/sampler_factory.js');

// packet translation client
const PacketUtil = require('../utils/packet_util.js');
const SerializeFactory = require('../thrift/io/serialize.js');
const UdpClient = require('../socket/udp_client.js');
const TcpClient = require('../socket/tcp_client.js');

// logger
const logger = LoggerFactory.getLogger(__filename);

const Agent = function (conf) {

    if (conf === undefined) {
        conf = new Configuration();
    }
    this.collectorIp = conf.get(ConfigConstants.PROFILER_COLLECTOR_IP, '127.0.0.1');
    this.collectorSpanPort = conf.get(ConfigConstants.PROFILER_COLLECTOR_SPAN_PORT, '9996');
    this.collectorTcpPort = conf.get(ConfigConstants.PROFILER_COLLECTOR_TCP_PORT, '9994');
    this.collectorStatPort = conf.get(ConfigConstants.PROFILER_COLLECTOR_STAT_PORT, '9995');
    this.traceManagerEnable = conf.get(ConfigConstants.TRACE_MANAGER_ENABLE, false);
    this.conf = conf;
    this.agentId = conf.get(ConfigConstants.AGENT_ID, 'node-app-id');
    this.applicationName = conf.get(ConfigConstants.AGENT_APPLICATION_NAME, 'node-app-name');
    this.serviceType = conf.get(ConfigConstants.AGENT_SERVICE_TYPE, '1000');
    this.agentStartTime = Date.now();
    this.tcpClient = null;
    this.udpSpanClient = null;
    this.udpStatClient = null;
    logger.info('start pinpoint node agent');
};

Agent.prototype.hackModuleLoad = function () {
    logger.info('start to hack module load');
    const load = require('./module/module_load.js');
    this.methodDescriptorGenerator = load.loadPluginsApiDetails();
};

Agent.prototype.startTcpClient = function () {
    logger.info('init tcp client');
    this.tcpClient = new TcpClient(this.collectorIp, this.collectorTcpPort);
    this.tcpClient.setSerialize(new SerializeFactory());
    this.tcpClient.connect(PacketUtil.PacketDecode);
};

Agent.prototype.startUdpClient = function () {
    if (!this.traceManagerEnable) {
        logger.info('init udp client in local process');
        this.udpSpanClient = new UdpClient(this.collectorIp, this.collectorSpanPort);
        this.udpStatClient = new UdpClient(this.collectorIp, this.collectorStatPort);
        this.udpSpanClient.setSerialize(new SerializeFactory());
        this.udpStatClient.setSerialize(new SerializeFactory());
    }
};

Agent.prototype.sendAgentInfo = function () {
    logger.info('sending agent info to collector');
    const agentInfo = AgentInfoUtils.createAgentInfo(this.agentId, this.applicationName, this.serviceType, this.agentStartTime);
    logger.debug('agent info: ' + JSON.stringify(agentInfo));
    this.agentIp = agentInfo.ip;
    // this.agentHostname = agentInfo.hostname;
    AgentInfoUtils.agentInfoSender(this.tcpClient, agentInfo);
};

Agent.prototype.sendApiInfo = function () {
    logger.info('sending api info to collector');
    const apiInfoList = this.methodDescriptorGenerator.methodDescriptorList;
    for (const item in apiInfoList) {
        const apiInfo = MethodDescriptorGenerator.getApiMetaData(this.agentId, this.agentStartTime, apiInfoList[item]);
        logger.info('api info: ' + JSON.stringify(apiInfo));
        this.tcpClient.send(apiInfo);
    }
};

Agent.prototype.getApiId = function () {
    return (this.methodDescriptorGenerator === undefined) ? -1 : this.methodDescriptorGenerator.getApiId(arguments);
};

Agent.prototype.startTraceManager = function () {
    if (this.traceManagerEnable) {
        logger.info('start fork trace manager');
        this.traceManager = cp.fork(path.join(__dirname, 'trace', 'trace_manager.js'));
        //send parent info to trace manager
        logger.info('send parent info to trace manager!');
        const heapMem = (v8.getHeapStatistics()).heap_size_limit;
        const data = {
            type: 'PARENT_INFO',
            pid: process.pid,
            heapMem: heapMem,
            agentId: this.agentId,
            agentStartTime: this.agentStartTime
        };
        this.traceManager.send(data);
        logger.info('pid is: ' + process.pid + ',heapMem is: ' + heapMem);
    }
};

Agent.prototype.loadSampler = function () {
    const profilerSamplingEnable = this.conf.get('profiler.sampling.enable', true);
    const profilerSamplingRate = this.conf.get('profiler.sampling.rate', 1);
    this.sampler = SamplerFactory.createSampler(profilerSamplingEnable, profilerSamplingRate);
    logger.info('load sampler: ' + this.sampler.toString());
};

Agent.prototype.startAgentStatCollector = function () {
    if (!this.traceManagerEnable) {
        logger.info('start agent stat collector in local process');
        const agentStatCollector = require('../commons/metric/agent_stat_monitor.js');
        agentStatCollector(this.udpStatClient);
    }
};


module.exports = Agent;
