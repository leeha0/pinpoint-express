'use strict';

const thrift = require('thrift');
const Thrift = thrift.Thrift;
// const Q = thrift.Q;

const types = {
    TJvmGcType: {
        'UNKNOWN': 0,
        'SERIAL': 1,
        'PARALLEL': 2,
        'CMS': 3,
        'G1': 4
    }
};

const TServiceInfo = function (args) {
    this.serviceName = null;
    this.serviceLibs = null;
    if (args) {
        if (args.serviceName !== undefined) {
            this.serviceName = args.serviceName;
        }
        if (args.serviceLibs !== undefined) {
            this.serviceLibs = args.serviceLibs;
        }
    }
};

TServiceInfo.prototype.read = function (input) {
    input.readStructBegin();
    while (true) {
        const ret = input.readFieldBegin();
        // const fname = ret.fname;
        const ftype = ret.ftype;
        const fid = ret.fid;

        if (ftype === Thrift.Type.STOP) {
            break;
        }
        switch (fid) {
            case 1:
                if (ftype === Thrift.Type.STRING) {
                    this.serviceName = input.readString();
                } else {
                    input.skip(ftype);
                }
                break;
            case 2:
                if (ftype === Thrift.Type.LIST) {
                    let _rtmp34 = input.readListBegin();
                    let _etype3 = _rtmp34.etype;
                    let _size0 = _rtmp34.size;
                    ;
                    this.serviceLibs = [];

                    for (let _i5 = 0; _i5 < _size0; ++_i5) {
                        const elem6 = input.readString();
                        this.serviceLibs.push(elem6);
                    }
                    input.readListEnd();
                } else {
                    input.skip(ftype);
                }
                break;
            default:
                input.skip(ftype);
        }
        input.readFieldEnd();
    }
    input.readStructEnd();
};

TServiceInfo.prototype.write = function (output) {
    output.writeStructBegin('TServiceInfo');
    if (this.serviceName !== null && this.serviceName !== undefined) {
        output.writeFieldBegin('serviceName', Thrift.Type.STRING, 1);
        output.writeString(this.serviceName);
        output.writeFieldEnd();
    }
    if (this.serviceLibs !== null && this.serviceLibs !== undefined) {
        output.writeFieldBegin('serviceLibs', Thrift.Type.LIST, 2);
        output.writeListBegin(Thrift.Type.STRING, this.serviceLibs.length);
        for (var iter7 in this.serviceLibs) {
            if (this.serviceLibs.hasOwnProperty(iter7)) {
                iter7 = this.serviceLibs[iter7];
                output.writeString(iter7);
            }
        }
        output.writeListEnd();
        output.writeFieldEnd();
    }
    output.writeFieldStop();
    output.writeStructEnd();
};

const TServerMetaData = function (args) {
    this.serverInfo = null;
    this.vmArgs = null;
    this.serviceInfos = null;
    if (args) {
        if (args.serverInfo !== undefined) {
            this.serverInfo = args.serverInfo;
        }
        if (args.vmArgs !== undefined) {
            this.vmArgs = args.vmArgs;
        }
        if (args.serviceInfos !== undefined) {
            this.serviceInfos = args.serviceInfos;
        }
    }
};

TServerMetaData.prototype.read = function (input) {
    input.readStructBegin();
    while (true) {
        const ret = input.readFieldBegin();
        // const fname = ret.fname;
        const ftype = ret.ftype;
        const fid = ret.fid;

        if (ftype === Thrift.Type.STOP) {
            break;
        }

        switch (fid) {
            case 1:
                if (ftype === Thrift.Type.STRING) {
                    this.serverInfo = input.readString();
                } else {
                    input.skip(ftype);
                }
                break;
            case 2:
                if (ftype === Thrift.Type.LIST) {
                    let _rtmp312 = input.readListBegin();
                    // let _etype11 = _rtmp312.etype;
                    let _size8 = _rtmp312.size;
                    this.vmArgs = [];

                    for (let _i13 = 0; _i13 < _size8; ++_i13) {
                        const elem14 = input.readString();
                        this.vmArgs.push(elem14);
                    }
                    input.readListEnd();
                } else {
                    input.skip(ftype);
                }
                break;
            case 10:
                if (ftype === Thrift.Type.LIST) {
                    let _rtmp319 = input.readListBegin();
                    // let _etype18 = _rtmp319.etype;
                    let _size15 = _rtmp319.size;
                    this.serviceInfos = [];

                    for (let _i20 = 0; _i20 < _size15; ++_i20) {
                        const elem21 = new TServiceInfo;
                        elem21.read(input);
                        this.serviceInfos.push(elem21);
                    }
                    input.readListEnd();
                } else {
                    input.skip(ftype);
                }
                break;
            default:
                input.skip(ftype);
        }
        input.readFieldEnd();
    }
    input.readStructEnd();
};

TServerMetaData.prototype.write = function (output) {
    output.writeStructBegin('TServerMetaData');
    if (this.serverInfo !== null && this.serverInfo !== undefined) {
        output.writeFieldBegin('serverInfo', Thrift.Type.STRING, 1);
        output.writeString(this.serverInfo);
        output.writeFieldEnd();
    }
    if (this.vmArgs !== null && this.vmArgs !== undefined) {
        output.writeFieldBegin('vmArgs', Thrift.Type.LIST, 2);
        output.writeListBegin(Thrift.Type.STRING, this.vmArgs.length);
        for (let iter22 in this.vmArgs) {
            if (this.vmArgs.hasOwnProperty(iter22)) {
                iter22 = this.vmArgs[iter22];
                output.writeString(iter22);
            }
        }
        output.writeListEnd();
        output.writeFieldEnd();
    }
    if (this.serviceInfos !== null && this.serviceInfos !== undefined) {
        output.writeFieldBegin('serviceInfos', Thrift.Type.LIST, 10);
        output.writeListBegin(Thrift.Type.STRUCT, this.serviceInfos.length);
        for (let iter23 in this.serviceInfos) {
            if (this.serviceInfos.hasOwnProperty(iter23)) {
                iter23 = this.serviceInfos[iter23];
                iter23.write(output);
            }
        }
        output.writeListEnd();
        output.writeFieldEnd();
    }
    output.writeFieldStop();
    output.writeStructEnd();
};

const TJvmInfo = function (args) {
    this.version = 0;
    this.vmVersion = null;
    this.gcType = 0;
    if (args) {
        if (args.version !== undefined) {
            this.version = args.version;
        }
        if (args.vmVersion !== undefined) {
            this.vmVersion = args.vmVersion;
        }
        if (args.gcType !== undefined) {
            this.gcType = args.gcType;
        }
    }
};

TJvmInfo.prototype.read = function (input) {
    input.readStructBegin();
    while (true) {
        const ret = input.readFieldBegin();
        // const fname = ret.fname;
        const ftype = ret.ftype;
        const fid = ret.fid;

        if (ftype === Thrift.Type.STOP) {
            break;
        }

        switch (fid) {
            case 1:
                if (ftype === Thrift.Type.I16) {
                    this.version = input.readI16();
                } else {
                    input.skip(ftype);
                }
                break;
            case 2:
                if (ftype === Thrift.Type.STRING) {
                    this.vmVersion = input.readString();
                } else {
                    input.skip(ftype);
                }
                break;
            case 3:
                if (ftype === Thrift.Type.I32) {
                    this.gcType = input.readI32();
                } else {
                    input.skip(ftype);
                }
                break;
            default:
                input.skip(ftype);
        }
        input.readFieldEnd();
    }
    input.readStructEnd();
};

TJvmInfo.prototype.write = function (output) {
    output.writeStructBegin('TJvmInfo');
    if (this.version !== null && this.version !== undefined) {
        output.writeFieldBegin('version', Thrift.Type.I16, 1);
        output.writeI16(this.version);
        output.writeFieldEnd();
    }
    if (this.vmVersion !== null && this.vmVersion !== undefined) {
        output.writeFieldBegin('vmVersion', Thrift.Type.STRING, 2);
        output.writeString(this.vmVersion);
        output.writeFieldEnd();
    }
    if (this.gcType !== null && this.gcType !== undefined) {
        output.writeFieldBegin('gcType', Thrift.Type.I32, 3);
        output.writeI32(this.gcType);
        output.writeFieldEnd();
    }
    output.writeFieldStop();
    output.writeStructEnd();
};

const TAgentInfo = function (args) {
    this.hostname = null;
    this.ip = null;
    this.ports = null;
    this.agentId = null;
    this.applicationName = null;
    this.serviceType = null;
    this.pid = null;
    this.agentVersion = null;
    this.vmVersion = null;
    this.startTimestamp = null;
    this.endTimestamp = null;
    this.endStatus = null;
    this.serverMetaData = null;
    this.jvmInfo = null;
    if (args) {
        if (args.hostname !== undefined) {
            this.hostname = args.hostname;
        }
        if (args.ip !== undefined) {
            this.ip = args.ip;
        }
        if (args.ports !== undefined) {
            this.ports = args.ports;
        }
        if (args.agentId !== undefined) {
            this.agentId = args.agentId;
        }
        if (args.applicationName !== undefined) {
            this.applicationName = args.applicationName;
        }
        if (args.serviceType !== undefined) {
            this.serviceType = args.serviceType;
        }
        if (args.pid !== undefined) {
            this.pid = args.pid;
        }
        if (args.agentVersion !== undefined) {
            this.agentVersion = args.agentVersion;
        }
        if (args.vmVersion !== undefined) {
            this.vmVersion = args.vmVersion;
        }
        if (args.startTimestamp !== undefined) {
            this.startTimestamp = args.startTimestamp;
        }
        if (args.endTimestamp !== undefined) {
            this.endTimestamp = args.endTimestamp;
        }
        if (args.endStatus !== undefined) {
            this.endStatus = args.endStatus;
        }
        if (args.serverMetaData !== undefined) {
            this.serverMetaData = args.serverMetaData;
        }
        if (args.jvmInfo !== undefined) {
            this.jvmInfo = args.jvmInfo;
        }
    }
};

TAgentInfo.prototype.read = function (input) {
    input.readStructBegin();
    while (true) {
        const ret = input.readFieldBegin();
        // const fname = ret.fname;
        const ftype = ret.ftype;
        const fid = ret.fid;

        if (ftype === Thrift.Type.STOP) {
            break;
        }

        switch (fid) {
            case 1:
                if (ftype === Thrift.Type.STRING) {
                    this.hostname = input.readString();
                } else {
                    input.skip(ftype);
                }
                break;
            case 2:
                if (ftype === Thrift.Type.STRING) {
                    this.ip = input.readString();
                } else {
                    input.skip(ftype);
                }
                break;
            case 3:
                if (ftype === Thrift.Type.STRING) {
                    this.ports = input.readString();
                } else {
                    input.skip(ftype);
                }
                break;
            case 4:
                if (ftype === Thrift.Type.STRING) {
                    this.agentId = input.readString();
                } else {
                    input.skip(ftype);
                }
                break;
            case 5:
                if (ftype === Thrift.Type.STRING) {
                    this.applicationName = input.readString();
                } else {
                    input.skip(ftype);
                }
                break;
            case 6:
                if (ftype === Thrift.Type.I16) {
                    this.serviceType = input.readI16();
                } else {
                    input.skip(ftype);
                }
                break;
            case 7:
                if (ftype === Thrift.Type.I32) {
                    this.pid = input.readI32();
                } else {
                    input.skip(ftype);
                }
                break;
            case 8:
                if (ftype === Thrift.Type.STRING) {
                    this.agentVersion = input.readString();
                } else {
                    input.skip(ftype);
                }
                break;
            case 9:
                if (ftype === Thrift.Type.STRING) {
                    this.vmVersion = input.readString();
                } else {
                    input.skip(ftype);
                }
                break;
            case 10:
                if (ftype === Thrift.Type.I64) {
                    this.startTimestamp = input.readI64();
                } else {
                    input.skip(ftype);
                }
                break;
            case 11:
                if (ftype === Thrift.Type.I64) {
                    this.endTimestamp = input.readI64();
                } else {
                    input.skip(ftype);
                }
                break;
            case 12:
                if (ftype === Thrift.Type.I32) {
                    this.endStatus = input.readI32();
                } else {
                    input.skip(ftype);
                }
                break;
            case 20:
                if (ftype === Thrift.Type.STRUCT) {
                    this.serverMetaData = new TServerMetaData();
                    this.serverMetaData.read(input);
                } else {
                    input.skip(ftype);
                }
                break;
            case 30:
                if (ftype === Thrift.Type.STRUCT) {
                    this.jvmInfo = new TJvmInfo();
                    this.jvmInfo.read(input);
                } else {
                    input.skip(ftype);
                }
                break;
            default:
                input.skip(ftype);
        }
        input.readFieldEnd();
    }
    input.readStructEnd();
};

TAgentInfo.prototype.write = function (output) {
    output.writeStructBegin('TAgentInfo');
    if (this.hostname !== null && this.hostname !== undefined) {
        output.writeFieldBegin('hostname', Thrift.Type.STRING, 1);
        output.writeString(this.hostname);
        output.writeFieldEnd();
    }
    if (this.ip !== null && this.ip !== undefined) {
        output.writeFieldBegin('ip', Thrift.Type.STRING, 2);
        output.writeString(this.ip);
        output.writeFieldEnd();
    }
    if (this.ports !== null && this.ports !== undefined) {
        output.writeFieldBegin('ports', Thrift.Type.STRING, 3);
        output.writeString(this.ports);
        output.writeFieldEnd();
    }
    if (this.agentId !== null && this.agentId !== undefined) {
        output.writeFieldBegin('agentId', Thrift.Type.STRING, 4);
        output.writeString(this.agentId);
        output.writeFieldEnd();
    }
    if (this.applicationName !== null && this.applicationName !== undefined) {
        output.writeFieldBegin('applicationName', Thrift.Type.STRING, 5);
        output.writeString(this.applicationName);
        output.writeFieldEnd();
    }
    if (this.serviceType !== null && this.serviceType !== undefined) {
        output.writeFieldBegin('serviceType', Thrift.Type.I16, 6);
        output.writeI16(this.serviceType);
        output.writeFieldEnd();
    }
    if (this.pid !== null && this.pid !== undefined) {
        output.writeFieldBegin('pid', Thrift.Type.I32, 7);
        output.writeI32(this.pid);
        output.writeFieldEnd();
    }
    if (this.agentVersion !== null && this.agentVersion !== undefined) {
        output.writeFieldBegin('agentVersion', Thrift.Type.STRING, 8);
        output.writeString(this.agentVersion);
        output.writeFieldEnd();
    }
    if (this.vmVersion !== null && this.vmVersion !== undefined) {
        output.writeFieldBegin('vmVersion', Thrift.Type.STRING, 9);
        output.writeString(this.vmVersion);
        output.writeFieldEnd();
    }
    if (this.startTimestamp !== null && this.startTimestamp !== undefined) {
        output.writeFieldBegin('startTimestamp', Thrift.Type.I64, 10);
        output.writeI64(this.startTimestamp);
        output.writeFieldEnd();
    }
    if (this.endTimestamp !== null && this.endTimestamp !== undefined) {
        output.writeFieldBegin('endTimestamp', Thrift.Type.I64, 11);
        output.writeI64(this.endTimestamp);
        output.writeFieldEnd();
    }
    if (this.endStatus !== null && this.endStatus !== undefined) {
        output.writeFieldBegin('endStatus', Thrift.Type.I32, 12);
        output.writeI32(this.endStatus);
        output.writeFieldEnd();
    }
    if (this.serverMetaData !== null && this.serverMetaData !== undefined) {
        output.writeFieldBegin('serverMetaData', Thrift.Type.STRUCT, 20);
        this.serverMetaData.write(output);
        output.writeFieldEnd();
    }
    if (this.jvmInfo !== null && this.jvmInfo !== undefined) {
        output.writeFieldBegin('jvmInfo', Thrift.Type.STRUCT, 30);
        this.jvmInfo.write(output);
        output.writeFieldEnd();
    }
    output.writeFieldStop();
    output.writeStructEnd();
};

const TJvmGc = function (args) {
    this.type = 0;
    this.jvmMemoryHeapUsed = null;
    this.jvmMemoryHeapMax = null;
    this.jvmMemoryNonHeapUsed = null;
    this.jvmMemoryNonHeapMax = null;
    this.jvmGcOldCount = null;
    this.jvmGcOldTime = null;
    this.jvmGcDetailed = null;
    if (args) {
        if (args.type !== undefined) {
            this.type = args.type;
        }
        if (args.jvmMemoryHeapUsed !== undefined) {
            this.jvmMemoryHeapUsed = args.jvmMemoryHeapUsed;
        }
        if (args.jvmMemoryHeapMax !== undefined) {
            this.jvmMemoryHeapMax = args.jvmMemoryHeapMax;
        }
        if (args.jvmMemoryNonHeapUsed !== undefined) {
            this.jvmMemoryNonHeapUsed = args.jvmMemoryNonHeapUsed;
        }
        if (args.jvmMemoryNonHeapMax !== undefined) {
            this.jvmMemoryNonHeapMax = args.jvmMemoryNonHeapMax;
        }
        if (args.jvmGcOldCount !== undefined) {
            this.jvmGcOldCount = args.jvmGcOldCount;
        }
        if (args.jvmGcOldTime !== undefined) {
            this.jvmGcOldTime = args.jvmGcOldTime;
        }
        if (args.jvmGcDetailed !== undefined) {
            this.jvmGcDetailed = args.jvmGcDetailed;
        }
    }
};

TJvmGc.prototype.read = function (input) {
    input.readStructBegin();
    while (true) {
        const ret = input.readFieldBegin();
        // const fname = ret.fname;
        const ftype = ret.ftype;
        const fid = ret.fid;
        if (ftype === Thrift.Type.STOP) {
            break;
        }
        switch (fid) {
            case 1:
                if (ftype === Thrift.Type.I32) {
                    this.type = input.readI32();
                } else {
                    input.skip(ftype);
                }
                break;
            case 2:
                if (ftype === Thrift.Type.I64) {
                    this.jvmMemoryHeapUsed = input.readI64();
                } else {
                    input.skip(ftype);
                }
                break;
            case 3:
                if (ftype === Thrift.Type.I64) {
                    this.jvmMemoryHeapMax = input.readI64();
                } else {
                    input.skip(ftype);
                }
                break;
            case 4:
                if (ftype === Thrift.Type.I64) {
                    this.jvmMemoryNonHeapUsed = input.readI64();
                } else {
                    input.skip(ftype);
                }
                break;
            case 5:
                if (ftype === Thrift.Type.I64) {
                    this.jvmMemoryNonHeapMax = input.readI64();
                } else {
                    input.skip(ftype);
                }
                break;
            case 6:
                if (ftype === Thrift.Type.I64) {
                    this.jvmGcOldCount = input.readI64();
                } else {
                    input.skip(ftype);
                }
                break;
            case 7:
                if (ftype === Thrift.Type.I64) {
                    this.jvmGcOldTime = input.readI64();
                } else {
                    input.skip(ftype);
                }
                break;
            case 8:
                if (ftype === Thrift.Type.STRUCT) {
                    this.jvmGcDetailed = new TJvmGcDetailed();
                    this.jvmGcDetailed.read(input);
                } else {
                    input.skip(ftype);
                }
                break;
            default:
                input.skip(ftype);
        }
        input.readFieldEnd();
    }
    input.readStructEnd();
};

TJvmGc.prototype.write = function (output) {
    output.writeStructBegin('TJvmGc');
    if (this.type !== null && this.type !== undefined) {
        output.writeFieldBegin('type', Thrift.Type.I32, 1);
        output.writeI32(this.type);
        output.writeFieldEnd();
    }
    if (this.jvmMemoryHeapUsed !== null && this.jvmMemoryHeapUsed !== undefined) {
        output.writeFieldBegin('jvmMemoryHeapUsed', Thrift.Type.I64, 2);
        output.writeI64(this.jvmMemoryHeapUsed);
        output.writeFieldEnd();
    }
    if (this.jvmMemoryHeapMax !== null && this.jvmMemoryHeapMax !== undefined) {
        output.writeFieldBegin('jvmMemoryHeapMax', Thrift.Type.I64, 3);
        output.writeI64(this.jvmMemoryHeapMax);
        output.writeFieldEnd();
    }
    if (this.jvmMemoryNonHeapUsed !== null && this.jvmMemoryNonHeapUsed !== undefined) {
        output.writeFieldBegin('jvmMemoryNonHeapUsed', Thrift.Type.I64, 4);
        output.writeI64(this.jvmMemoryNonHeapUsed);
        output.writeFieldEnd();
    }
    if (this.jvmMemoryNonHeapMax !== null && this.jvmMemoryNonHeapMax !== undefined) {
        output.writeFieldBegin('jvmMemoryNonHeapMax', Thrift.Type.I64, 5);
        output.writeI64(this.jvmMemoryNonHeapMax);
        output.writeFieldEnd();
    }
    if (this.jvmGcOldCount !== null && this.jvmGcOldCount !== undefined) {
        output.writeFieldBegin('jvmGcOldCount', Thrift.Type.I64, 6);
        output.writeI64(this.jvmGcOldCount);
        output.writeFieldEnd();
    }
    if (this.jvmGcOldTime !== null && this.jvmGcOldTime !== undefined) {
        output.writeFieldBegin('jvmGcOldTime', Thrift.Type.I64, 7);
        output.writeI64(this.jvmGcOldTime);
        output.writeFieldEnd();
    }
    if (this.jvmGcDetailed !== null && this.jvmGcDetailed !== undefined) {
        output.writeFieldBegin('jvmGcDetailed', Thrift.Type.STRUCT, 8);
        this.jvmGcDetailed.write(output);
        output.writeFieldEnd();
    }
    output.writeFieldStop();
    output.writeStructEnd();
};

const TJvmGcDetailed = function (args) {
    this.jvmGcNewCount = null;
    this.jvmGcNewTime = null;
    this.jvmPoolCodeCacheUsed = null;
    this.jvmPoolNewGenUsed = null;
    this.jvmPoolOldGenUsed = null;
    this.jvmPoolSurvivorSpaceUsed = null;
    this.jvmPoolPermGenUsed = null;
    this.jvmPoolMetaspaceUsed = null;
    if (args) {
        if (args.jvmGcNewCount !== undefined) {
            this.jvmGcNewCount = args.jvmGcNewCount;
        }
        if (args.jvmGcNewTime !== undefined) {
            this.jvmGcNewTime = args.jvmGcNewTime;
        }
        if (args.jvmPoolCodeCacheUsed !== undefined) {
            this.jvmPoolCodeCacheUsed = args.jvmPoolCodeCacheUsed;
        }
        if (args.jvmPoolNewGenUsed !== undefined) {
            this.jvmPoolNewGenUsed = args.jvmPoolNewGenUsed;
        }
        if (args.jvmPoolOldGenUsed !== undefined) {
            this.jvmPoolOldGenUsed = args.jvmPoolOldGenUsed;
        }
        if (args.jvmPoolSurvivorSpaceUsed !== undefined) {
            this.jvmPoolSurvivorSpaceUsed = args.jvmPoolSurvivorSpaceUsed;
        }
        if (args.jvmPoolPermGenUsed !== undefined) {
            this.jvmPoolPermGenUsed = args.jvmPoolPermGenUsed;
        }
        if (args.jvmPoolMetaspaceUsed !== undefined) {
            this.jvmPoolMetaspaceUsed = args.jvmPoolMetaspaceUsed;
        }
    }
};

TJvmGcDetailed.prototype.read = function (input) {
    input.readStructBegin();
    while (true) {
        const ret = input.readFieldBegin();
        // const fname = ret.fname;
        const ftype = ret.ftype;
        const fid = ret.fid;

        if (ftype === Thrift.Type.STOP) {
            break;
        }

        switch (fid) {
            case 1:
                if (ftype === Thrift.Type.I64) {
                    this.jvmGcNewCount = input.readI64();
                } else {
                    input.skip(ftype);
                }
                break;
            case 2:
                if (ftype === Thrift.Type.I64) {
                    this.jvmGcNewTime = input.readI64();
                } else {
                    input.skip(ftype);
                }
                break;
            case 3:
                if (ftype === Thrift.Type.DOUBLE) {
                    this.jvmPoolCodeCacheUsed = input.readDouble();
                } else {
                    input.skip(ftype);
                }
                break;
            case 4:
                if (ftype === Thrift.Type.DOUBLE) {
                    this.jvmPoolNewGenUsed = input.readDouble();
                } else {
                    input.skip(ftype);
                }
                break;
            case 5:
                if (ftype === Thrift.Type.DOUBLE) {
                    this.jvmPoolOldGenUsed = input.readDouble();
                } else {
                    input.skip(ftype);
                }
                break;
            case 6:
                if (ftype === Thrift.Type.DOUBLE) {
                    this.jvmPoolSurvivorSpaceUsed = input.readDouble();
                } else {
                    input.skip(ftype);
                }
                break;
            case 7:
                if (ftype === Thrift.Type.DOUBLE) {
                    this.jvmPoolPermGenUsed = input.readDouble();
                } else {
                    input.skip(ftype);
                }
                break;
            case 8:
                if (ftype === Thrift.Type.DOUBLE) {
                    this.jvmPoolMetaspaceUsed = input.readDouble();
                } else {
                    input.skip(ftype);
                }
                break;
            default:
                input.skip(ftype);
        }
        input.readFieldEnd();
    }
    input.readStructEnd();
    return;
};

TJvmGcDetailed.prototype.write = function (output) {
    output.writeStructBegin('TJvmGcDetailed');
    if (this.jvmGcNewCount !== null && this.jvmGcNewCount !== undefined) {
        output.writeFieldBegin('jvmGcNewCount', Thrift.Type.I64, 1);
        output.writeI64(this.jvmGcNewCount);
        output.writeFieldEnd();
    }
    if (this.jvmGcNewTime !== null && this.jvmGcNewTime !== undefined) {
        output.writeFieldBegin('jvmGcNewTime', Thrift.Type.I64, 2);
        output.writeI64(this.jvmGcNewTime);
        output.writeFieldEnd();
    }
    if (this.jvmPoolCodeCacheUsed !== null && this.jvmPoolCodeCacheUsed !== undefined) {
        output.writeFieldBegin('jvmPoolCodeCacheUsed', Thrift.Type.DOUBLE, 3);
        output.writeDouble(this.jvmPoolCodeCacheUsed);
        output.writeFieldEnd();
    }
    if (this.jvmPoolNewGenUsed !== null && this.jvmPoolNewGenUsed !== undefined) {
        output.writeFieldBegin('jvmPoolNewGenUsed', Thrift.Type.DOUBLE, 4);
        output.writeDouble(this.jvmPoolNewGenUsed);
        output.writeFieldEnd();
    }
    if (this.jvmPoolOldGenUsed !== null && this.jvmPoolOldGenUsed !== undefined) {
        output.writeFieldBegin('jvmPoolOldGenUsed', Thrift.Type.DOUBLE, 5);
        output.writeDouble(this.jvmPoolOldGenUsed);
        output.writeFieldEnd();
    }
    if (this.jvmPoolSurvivorSpaceUsed !== null && this.jvmPoolSurvivorSpaceUsed !== undefined) {
        output.writeFieldBegin('jvmPoolSurvivorSpaceUsed', Thrift.Type.DOUBLE, 6);
        output.writeDouble(this.jvmPoolSurvivorSpaceUsed);
        output.writeFieldEnd();
    }
    if (this.jvmPoolPermGenUsed !== null && this.jvmPoolPermGenUsed !== undefined) {
        output.writeFieldBegin('jvmPoolPermGenUsed', Thrift.Type.DOUBLE, 7);
        output.writeDouble(this.jvmPoolPermGenUsed);
        output.writeFieldEnd();
    }
    if (this.jvmPoolMetaspaceUsed !== null && this.jvmPoolMetaspaceUsed !== undefined) {
        output.writeFieldBegin('jvmPoolMetaspaceUsed', Thrift.Type.DOUBLE, 8);
        output.writeDouble(this.jvmPoolMetaspaceUsed);
        output.writeFieldEnd();
    }
    output.writeFieldStop();
    output.writeStructEnd();
};

const TCpuLoad = function (args) {
    this.jvmCpuLoad = null;
    this.systemCpuLoad = null;
    if (args) {
        if (args.jvmCpuLoad !== undefined) {
            this.jvmCpuLoad = args.jvmCpuLoad;
        }
        if (args.systemCpuLoad !== undefined) {
            this.systemCpuLoad = args.systemCpuLoad;
        }
    }
};
TCpuLoad.prototype.read = function (input) {
    input.readStructBegin();
    while (true) {
        const ret = input.readFieldBegin();
        // const fname = ret.fname;
        const ftype = ret.ftype;
        const fid = ret.fid;

        if (ftype === Thrift.Type.STOP) {
            break;
        }
        switch (fid) {
            case 1:
                if (ftype === Thrift.Type.DOUBLE) {
                    this.jvmCpuLoad = input.readDouble();
                } else {
                    input.skip(ftype);
                }
                break;
            case 2:
                if (ftype === Thrift.Type.DOUBLE) {
                    this.systemCpuLoad = input.readDouble();
                } else {
                    input.skip(ftype);
                }
                break;
            default:
                input.skip(ftype);
        }
        input.readFieldEnd();
    }
    input.readStructEnd();
};

TCpuLoad.prototype.write = function (output) {
    output.writeStructBegin('TCpuLoad');
    if (this.jvmCpuLoad !== null && this.jvmCpuLoad !== undefined) {
        output.writeFieldBegin('jvmCpuLoad', Thrift.Type.DOUBLE, 1);
        output.writeDouble(this.jvmCpuLoad);
        output.writeFieldEnd();
    }
    if (this.systemCpuLoad !== null && this.systemCpuLoad !== undefined) {
        output.writeFieldBegin('systemCpuLoad', Thrift.Type.DOUBLE, 2);
        output.writeDouble(this.systemCpuLoad);
        output.writeFieldEnd();
    }
    output.writeFieldStop();
    output.writeStructEnd();
};

const TTransaction = function (args) {
    this.sampledNewCount = null;
    this.sampledContinuationCount = null;
    this.unsampledNewCount = null;
    this.unsampledContinuationCount = null;
    if (args) {
        if (args.sampledNewCount !== undefined) {
            this.sampledNewCount = args.sampledNewCount;
        }
        if (args.sampledContinuationCount !== undefined) {
            this.sampledContinuationCount = args.sampledContinuationCount;
        }
        if (args.unsampledNewCount !== undefined) {
            this.unsampledNewCount = args.unsampledNewCount;
        }
        if (args.unsampledContinuationCount !== undefined) {
            this.unsampledContinuationCount = args.unsampledContinuationCount;
        }
    }
};

TTransaction.prototype.read = function (input) {
    input.readStructBegin();
    while (true) {
        const ret = input.readFieldBegin();
        // const fname = ret.fname;
        const ftype = ret.ftype;
        const fid = ret.fid;

        if (ftype === Thrift.Type.STOP) {
            break;
        }

        switch (fid) {
            case 2:
                if (ftype === Thrift.Type.I64) {
                    this.sampledNewCount = input.readI64();
                } else {
                    input.skip(ftype);
                }
                break;
            case 3:
                if (ftype === Thrift.Type.I64) {
                    this.sampledContinuationCount = input.readI64();
                } else {
                    input.skip(ftype);
                }
                break;
            case 4:
                if (ftype === Thrift.Type.I64) {
                    this.unsampledNewCount = input.readI64();
                } else {
                    input.skip(ftype);
                }
                break;
            case 5:
                if (ftype === Thrift.Type.I64) {
                    this.unsampledContinuationCount = input.readI64();
                } else {
                    input.skip(ftype);
                }
                break;
            default:
                input.skip(ftype);
        }
        input.readFieldEnd();
    }
    input.readStructEnd();
};

TTransaction.prototype.write = function (output) {
    output.writeStructBegin('TTransaction');
    if (this.sampledNewCount !== null && this.sampledNewCount !== undefined) {
        output.writeFieldBegin('sampledNewCount', Thrift.Type.I64, 2);
        output.writeI64(this.sampledNewCount);
        output.writeFieldEnd();
    }
    if (this.sampledContinuationCount !== null && this.sampledContinuationCount !== undefined) {
        output.writeFieldBegin('sampledContinuationCount', Thrift.Type.I64, 3);
        output.writeI64(this.sampledContinuationCount);
        output.writeFieldEnd();
    }
    if (this.unsampledNewCount !== null && this.unsampledNewCount !== undefined) {
        output.writeFieldBegin('unsampledNewCount', Thrift.Type.I64, 4);
        output.writeI64(this.unsampledNewCount);
        output.writeFieldEnd();
    }
    if (this.unsampledContinuationCount !== null && this.unsampledContinuationCount !== undefined) {
        output.writeFieldBegin('unsampledContinuationCount', Thrift.Type.I64, 5);
        output.writeI64(this.unsampledContinuationCount);
        output.writeFieldEnd();
    }
    output.writeFieldStop();
    output.writeStructEnd();
};

const TActiveTraceHistogram = function (args) {
    this.version = 0;
    this.histogramSchemaType = null;
    this.activeTraceCount = null;
    if (args) {
        if (args.version !== undefined) {
            this.version = args.version;
        }
        if (args.histogramSchemaType !== undefined) {
            this.histogramSchemaType = args.histogramSchemaType;
        }
        if (args.activeTraceCount !== undefined) {
            this.activeTraceCount = args.activeTraceCount;
        }
    }
};

TActiveTraceHistogram.prototype.read = function (input) {
    input.readStructBegin();
    while (true) {
        const ret = input.readFieldBegin();
        // const fname = ret.fname;
        const ftype = ret.ftype;
        const fid = ret.fid;

        if (ftype === Thrift.Type.STOP) {
            break;
        }

        switch (fid) {
            case 1:
                if (ftype === Thrift.Type.I16) {
                    this.version = input.readI16();
                } else {
                    input.skip(ftype);
                }
                break;
            case 2:
                if (ftype === Thrift.Type.I32) {
                    this.histogramSchemaType = input.readI32();
                } else {
                    input.skip(ftype);
                }
                break;
            case 3:
                if (ftype === Thrift.Type.LIST) {
                    let _rtmp328 = input.readListBegin();
                    // let _etype27 = _rtmp328.etype;
                    let _size24 = _rtmp328.size;
                    this.activeTraceCount = [];

                    for (let _i29 = 0; _i29 < _size24; ++_i29) {
                        const elem30 = input.readI32();
                        this.activeTraceCount.push(elem30);
                    }
                    input.readListEnd();
                } else {
                    input.skip(ftype);
                }
                break;
            default:
                input.skip(ftype);
        }
        input.readFieldEnd();
    }
    input.readStructEnd();
};

TActiveTraceHistogram.prototype.write = function (output) {
    output.writeStructBegin('TActiveTraceHistogram');
    if (this.version !== null && this.version !== undefined) {
        output.writeFieldBegin('version', Thrift.Type.I16, 1);
        output.writeI16(this.version);
        output.writeFieldEnd();
    }
    if (this.histogramSchemaType !== null && this.histogramSchemaType !== undefined) {
        output.writeFieldBegin('histogramSchemaType', Thrift.Type.I32, 2);
        output.writeI32(this.histogramSchemaType);
        output.writeFieldEnd();
    }
    if (this.activeTraceCount !== null && this.activeTraceCount !== undefined) {
        output.writeFieldBegin('activeTraceCount', Thrift.Type.LIST, 3);
        output.writeListBegin(Thrift.Type.I32, this.activeTraceCount.length);
        for (let iter31 in this.activeTraceCount) {
            if (this.activeTraceCount.hasOwnProperty(iter31)) {
                iter31 = this.activeTraceCount[iter31];
                output.writeI32(iter31);
            }
        }
        output.writeListEnd();
        output.writeFieldEnd();
    }
    output.writeFieldStop();
    output.writeStructEnd();
};

const TActiveTrace = function (args) {
    this.histogram = null;
    if (args) {
        if (args.histogram !== undefined) {
            this.histogram = args.histogram;
        }
    }
};

TActiveTrace.prototype.read = function (input) {
    input.readStructBegin();
    while (true) {
        const ret = input.readFieldBegin();
        // const fname = ret.fname;
        const ftype = ret.ftype;
        const fid = ret.fid;

        if (ftype === Thrift.Type.STOP) {
            break;
        }

        switch (fid) {
            case 1:
                if (ftype === Thrift.Type.STRUCT) {
                    this.histogram = new TActiveTraceHistogram();
                    this.histogram.read(input);
                } else {
                    input.skip(ftype);
                }
                break;
            case 0:
                input.skip(ftype);
                break;
            default:
                input.skip(ftype);
        }
        input.readFieldEnd();
    }
    input.readStructEnd();
};

TActiveTrace.prototype.write = function (output) {
    output.writeStructBegin('TActiveTrace');
    if (this.histogram !== null && this.histogram !== undefined) {
        output.writeFieldBegin('histogram', Thrift.Type.STRUCT, 1);
        this.histogram.write(output);
        output.writeFieldEnd();
    }
    output.writeFieldStop();
    output.writeStructEnd();
};

const TAgentStat = function (args) {
    this.agentId = null;
    this.startTimestamp = null;
    this.timestamp = null;
    this.collectInterval = null;
    this.gc = null;
    this.cpuLoad = null;
    this.transaction = null;
    this.activeTrace = null;
    this.metadata = null;
    if (args) {
        if (args.agentId !== undefined) {
            this.agentId = args.agentId;
        }
        if (args.startTimestamp !== undefined) {
            this.startTimestamp = args.startTimestamp;
        }
        if (args.timestamp !== undefined) {
            this.timestamp = args.timestamp;
        }
        if (args.collectInterval !== undefined) {
            this.collectInterval = args.collectInterval;
        }
        if (args.gc !== undefined) {
            this.gc = args.gc;
        }
        if (args.cpuLoad !== undefined) {
            this.cpuLoad = args.cpuLoad;
        }
        if (args.transaction !== undefined) {
            this.transaction = args.transaction;
        }
        if (args.activeTrace !== undefined) {
            this.activeTrace = args.activeTrace;
        }
        if (args.metadata !== undefined) {
            this.metadata = args.metadata;
        }
    }
};

TAgentStat.prototype.read = function (input) {
    input.readStructBegin();
    while (true) {
        const ret = input.readFieldBegin();
        // const fname = ret.fname;
        const ftype = ret.ftype;
        const fid = ret.fid;

        if (ftype === Thrift.Type.STOP) {
            break;
        }

        switch (fid) {
            case 1:
                if (ftype === Thrift.Type.STRING) {
                    this.agentId = input.readString();
                } else {
                    input.skip(ftype);
                }
                break;
            case 2:
                if (ftype === Thrift.Type.I64) {
                    this.startTimestamp = input.readI64();
                } else {
                    input.skip(ftype);
                }
                break;
            case 3:
                if (ftype === Thrift.Type.I64) {
                    this.timestamp = input.readI64();
                } else {
                    input.skip(ftype);
                }
                break;
            case 4:
                if (ftype === Thrift.Type.I64) {
                    this.collectInterval = input.readI64();
                } else {
                    input.skip(ftype);
                }
                break;
            case 10:
                if (ftype === Thrift.Type.STRUCT) {
                    this.gc = new TJvmGc();
                    this.gc.read(input);
                } else {
                    input.skip(ftype);
                }
                break;
            case 20:
                if (ftype === Thrift.Type.STRUCT) {
                    this.cpuLoad = new TCpuLoad();
                    this.cpuLoad.read(input);
                } else {
                    input.skip(ftype);
                }
                break;
            case 30:
                if (ftype === Thrift.Type.STRUCT) {
                    this.transaction = new TTransaction();
                    this.transaction.read(input);
                } else {
                    input.skip(ftype);
                }
                break;
            case 40:
                if (ftype === Thrift.Type.STRUCT) {
                    this.activeTrace = new TActiveTrace();
                    this.activeTrace.read(input);
                } else {
                    input.skip(ftype);
                }
                break;
            case 200:
                if (ftype === Thrift.Type.STRING) {
                    this.metadata = input.readString();
                } else {
                    input.skip(ftype);
                }
                break;
            default:
                input.skip(ftype);
        }
        input.readFieldEnd();
    }
    input.readStructEnd();
};

TAgentStat.prototype.write = function (output) {
    output.writeStructBegin('TAgentStat');
    if (this.agentId !== null && this.agentId !== undefined) {
        output.writeFieldBegin('agentId', Thrift.Type.STRING, 1);
        output.writeString(this.agentId);
        output.writeFieldEnd();
    }
    if (this.startTimestamp !== null && this.startTimestamp !== undefined) {
        output.writeFieldBegin('startTimestamp', Thrift.Type.I64, 2);
        output.writeI64(this.startTimestamp);
        output.writeFieldEnd();
    }
    if (this.timestamp !== null && this.timestamp !== undefined) {
        output.writeFieldBegin('timestamp', Thrift.Type.I64, 3);
        output.writeI64(this.timestamp);
        output.writeFieldEnd();
    }
    if (this.collectInterval !== null && this.collectInterval !== undefined) {
        output.writeFieldBegin('collectInterval', Thrift.Type.I64, 4);
        output.writeI64(this.collectInterval);
        output.writeFieldEnd();
    }
    if (this.gc !== null && this.gc !== undefined) {
        output.writeFieldBegin('gc', Thrift.Type.STRUCT, 10);
        this.gc.write(output);
        output.writeFieldEnd();
    }
    if (this.cpuLoad !== null && this.cpuLoad !== undefined) {
        output.writeFieldBegin('cpuLoad', Thrift.Type.STRUCT, 20);
        this.cpuLoad.write(output);
        output.writeFieldEnd();
    }
    if (this.transaction !== null && this.transaction !== undefined) {
        output.writeFieldBegin('transaction', Thrift.Type.STRUCT, 30);
        this.transaction.write(output);
        output.writeFieldEnd();
    }
    if (this.activeTrace !== null && this.activeTrace !== undefined) {
        output.writeFieldBegin('activeTrace', Thrift.Type.STRUCT, 40);
        this.activeTrace.write(output);
        output.writeFieldEnd();
    }
    if (this.metadata !== null && this.metadata !== undefined) {
        output.writeFieldBegin('metadata', Thrift.Type.STRING, 200);
        output.writeString(this.metadata);
        output.writeFieldEnd();
    }
    output.writeFieldStop();
    output.writeStructEnd();
};

const TAgentStatBatch = function (args) {
    this.agentId = null;
    this.startTimestamp = null;
    this.agentStats = null;
    if (args) {
        if (args.agentId !== undefined) {
            this.agentId = args.agentId;
        }
        if (args.startTimestamp !== undefined) {
            this.startTimestamp = args.startTimestamp;
        }
        if (args.agentStats !== undefined) {
            this.agentStats = args.agentStats;
        }
    }
};

TAgentStatBatch.prototype.read = function (input) {
    input.readStructBegin();
    while (true) {
        const ret = input.readFieldBegin();
        // const fname = ret.fname;
        const ftype = ret.ftype;
        const fid = ret.fid;

        if (ftype === Thrift.Type.STOP) {
            break;
        }

        switch (fid) {
            case 1:
                if (ftype === Thrift.Type.STRING) {
                    this.agentId = input.readString();
                } else {
                    input.skip(ftype);
                }
                break;
            case 2:
                if (ftype === Thrift.Type.I64) {
                    this.startTimestamp = input.readI64();
                } else {
                    input.skip(ftype);
                }
                break;
            case 10:
                if (ftype === Thrift.Type.LIST) {
                    const _rtmp336 = input.readListBegin();
                    // const _etype35 = _rtmp336.etype;
                    const _size32 = _rtmp336.size;
                    this.agentStats = [];

                    for (let _i37 = 0; _i37 < _size32; ++_i37) {
                        const elem38 = new TAgentStat();
                        elem38.read(input);
                        this.agentStats.push(elem38);
                    }
                    input.readListEnd();
                } else {
                    input.skip(ftype);
                }
                break;
            default:
                input.skip(ftype);
        }
        input.readFieldEnd();
    }
    input.readStructEnd();
};

TAgentStatBatch.prototype.write = function (output) {
    output.writeStructBegin('TAgentStatBatch');
    if (this.agentId !== null && this.agentId !== undefined) {
        output.writeFieldBegin('agentId', Thrift.Type.STRING, 1);
        output.writeString(this.agentId);
        output.writeFieldEnd();
    }
    if (this.startTimestamp !== null && this.startTimestamp !== undefined) {
        output.writeFieldBegin('startTimestamp', Thrift.Type.I64, 2);
        output.writeI64(this.startTimestamp);
        output.writeFieldEnd();
    }
    if (this.agentStats !== null && this.agentStats !== undefined) {
        output.writeFieldBegin('agentStats', Thrift.Type.LIST, 10);
        output.writeListBegin(Thrift.Type.STRUCT, this.agentStats.length);
        for (let iter39 in this.agentStats) {
            if (this.agentStats.hasOwnProperty(iter39)) {
                iter39 = this.agentStats[iter39];
                iter39.write(output);
            }
        }
        output.writeListEnd();
        output.writeFieldEnd();
    }
    output.writeFieldStop();
    output.writeStructEnd();
};

module.exports = {
    types: types,
    TServiceInfo: TServiceInfo,
    TServerMetaData: TServerMetaData,
    TJvmInfo: TJvmInfo,
    TAgentInfo: TAgentInfo,
    TJvmGc: TJvmGc,
    TJvmGcDetailed: TJvmGcDetailed,
    TCpuLoad: TCpuLoad,
    TTransaction: TTransaction,
    TActiveTraceHistogram: TActiveTraceHistogram,
    TActiveTrace: TActiveTrace,
    TAgentStat: TAgentStat,
    TAgentStatBatch: TAgentStatBatch
};