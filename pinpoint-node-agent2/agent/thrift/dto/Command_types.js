'use strict';

const thrift = require('thrift');
const Thrift = thrift.Thrift;
// const Q = thrift.Q;

const types = {
    TThreadDumpType: {
        'TARGET': 0,
        'PENDING': 1
    },
    TThreadState: {
        'NEW': 0,
        'RUNNABLE': 1,
        'BLOCKED': 2,
        'WAITING': 3,
        'TIMED_WAITING': 4,
        'TERMINATED': 5
    },
    TRouteResult: {
        'OK': 0,
        'BAD_REQUEST': 200,
        'EMPTY_REQUEST': 201,
        'NOT_SUPPORTED_REQUEST': 202,
        'BAD_RESPONSE': 210,
        'EMPTY_RESPONSE': 211,
        'NOT_SUPPORTED_RESPONSE': 212,
        'TIMEOUT': 220,
        'NOT_FOUND': 230,
        'NOT_ACCEPTABLE': 240,
        'NOT_SUPPORTED_SERVICE': 241,
        'UNKNOWN': -1
    }
};

const TCommandThreadDump = function (args) {
    this.type = 0;
    this.name = null;
    this.pendingTimeMillis = null;
    if (args) {
        if (args.type !== undefined) {
            this.type = args.type;
        }
        if (args.name !== undefined) {
            this.name = args.name;
        }
        if (args.pendingTimeMillis !== undefined) {
            this.pendingTimeMillis = args.pendingTimeMillis;
        }
    }
};

TCommandThreadDump.prototype.read = function (input) {
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
                if (ftype === Thrift.Type.STRING) {
                    this.name = input.readString();
                } else {
                    input.skip(ftype);
                }
                break;
            case 3:
                if (ftype === Thrift.Type.I64) {
                    this.pendingTimeMillis = input.readI64();
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

TCommandThreadDump.prototype.write = function (output) {
    output.writeStructBegin('TCommandThreadDump');
    if (this.type !== null && this.type !== undefined) {
        output.writeFieldBegin('type', Thrift.Type.I32, 1);
        output.writeI32(this.type);
        output.writeFieldEnd();
    }
    if (this.name !== null && this.name !== undefined) {
        output.writeFieldBegin('name', Thrift.Type.STRING, 2);
        output.writeString(this.name);
        output.writeFieldEnd();
    }
    if (this.pendingTimeMillis !== null && this.pendingTimeMillis !== undefined) {
        output.writeFieldBegin('pendingTimeMillis', Thrift.Type.I64, 3);
        output.writeI64(this.pendingTimeMillis);
        output.writeFieldEnd();
    }
    output.writeFieldStop();
    output.writeStructEnd();
};

const TMonitorInfo = function (args) {
    this.stackDepth = null;
    this.stackFrame = null;
    if (args) {
        if (args.stackDepth !== undefined) {
            this.stackDepth = args.stackDepth;
        }
        if (args.stackFrame !== undefined) {
            this.stackFrame = args.stackFrame;
        }
    }
};

TMonitorInfo.prototype.read = function (input) {
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
                    this.stackDepth = input.readI32();
                } else {
                    input.skip(ftype);
                }
                break;
            case 2:
                if (ftype === Thrift.Type.STRING) {
                    this.stackFrame = input.readString();
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

TMonitorInfo.prototype.write = function (output) {
    output.writeStructBegin('TMonitorInfo');
    if (this.stackDepth !== null && this.stackDepth !== undefined) {
        output.writeFieldBegin('stackDepth', Thrift.Type.I32, 1);
        output.writeI32(this.stackDepth);
        output.writeFieldEnd();
    }
    if (this.stackFrame !== null && this.stackFrame !== undefined) {
        output.writeFieldBegin('stackFrame', Thrift.Type.STRING, 2);
        output.writeString(this.stackFrame);
        output.writeFieldEnd();
    }
    output.writeFieldStop();
    output.writeStructEnd();
};

const TThreadDump = function (args) {
    this.threadName = null;
    this.threadId = null;
    this.blockedTime = null;
    this.blockedCount = null;
    this.waitedTime = null;
    this.waitedCount = null;
    this.lockName = null;
    this.lockOwnerId = null;
    this.lockOwnerName = null;
    this.inNative = null;
    this.suspended = null;
    this.threadState = null;
    this.stackTrace = null;
    this.lockedMonitors = null;
    this.lockedSynchronizers = null;
    if (args) {
        if (args.threadName !== undefined) {
            this.threadName = args.threadName;
        }
        if (args.threadId !== undefined) {
            this.threadId = args.threadId;
        }
        if (args.blockedTime !== undefined) {
            this.blockedTime = args.blockedTime;
        }
        if (args.blockedCount !== undefined) {
            this.blockedCount = args.blockedCount;
        }
        if (args.waitedTime !== undefined) {
            this.waitedTime = args.waitedTime;
        }
        if (args.waitedCount !== undefined) {
            this.waitedCount = args.waitedCount;
        }
        if (args.lockName !== undefined) {
            this.lockName = args.lockName;
        }
        if (args.lockOwnerId !== undefined) {
            this.lockOwnerId = args.lockOwnerId;
        }
        if (args.lockOwnerName !== undefined) {
            this.lockOwnerName = args.lockOwnerName;
        }
        if (args.inNative !== undefined) {
            this.inNative = args.inNative;
        }
        if (args.suspended !== undefined) {
            this.suspended = args.suspended;
        }
        if (args.threadState !== undefined) {
            this.threadState = args.threadState;
        }
        if (args.stackTrace !== undefined) {
            this.stackTrace = args.stackTrace;
        }
        if (args.lockedMonitors !== undefined) {
            this.lockedMonitors = args.lockedMonitors;
        }
        if (args.lockedSynchronizers !== undefined) {
            this.lockedSynchronizers = args.lockedSynchronizers;
        }
    }
};

TThreadDump.prototype.read = function (input) {
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
                    this.threadName = input.readString();
                } else {
                    input.skip(ftype);
                }
                break;
            case 2:
                if (ftype === Thrift.Type.I64) {
                    this.threadId = input.readI64();
                } else {
                    input.skip(ftype);
                }
                break;
            case 3:
                if (ftype === Thrift.Type.I64) {
                    this.blockedTime = input.readI64();
                } else {
                    input.skip(ftype);
                }
                break;
            case 4:
                if (ftype === Thrift.Type.I64) {
                    this.blockedCount = input.readI64();
                } else {
                    input.skip(ftype);
                }
                break;
            case 5:
                if (ftype === Thrift.Type.I64) {
                    this.waitedTime = input.readI64();
                } else {
                    input.skip(ftype);
                }
                break;
            case 6:
                if (ftype === Thrift.Type.I64) {
                    this.waitedCount = input.readI64();
                } else {
                    input.skip(ftype);
                }
                break;
            case 7:
                if (ftype === Thrift.Type.STRING) {
                    this.lockName = input.readString();
                } else {
                    input.skip(ftype);
                }
                break;
            case 8:
                if (ftype === Thrift.Type.I64) {
                    this.lockOwnerId = input.readI64();
                } else {
                    input.skip(ftype);
                }
                break;
            case 9:
                if (ftype === Thrift.Type.STRING) {
                    this.lockOwnerName = input.readString();
                } else {
                    input.skip(ftype);
                }
                break;
            case 10:
                if (ftype === Thrift.Type.BOOL) {
                    this.inNative = input.readBool();
                } else {
                    input.skip(ftype);
                }
                break;
            case 11:
                if (ftype === Thrift.Type.BOOL) {
                    this.suspended = input.readBool();
                } else {
                    input.skip(ftype);
                }
                break;
            case 12:
                if (ftype === Thrift.Type.I32) {
                    this.threadState = input.readI32();
                } else {
                    input.skip(ftype);
                }
                break;
            case 13:
                if (ftype === Thrift.Type.LIST) {
                    const _rtmp34 = input.readListBegin();
                    // const _etype3 = _rtmp34.etype;
                    const _size0 = _rtmp34.size;
                    this.stackTrace = [];

                    for (let _i5 = 0; _i5 < _size0; ++_i5) {
                        const elem6 = input.readString();
                        this.stackTrace.push(elem6);
                    }
                    input.readListEnd();
                } else {
                    input.skip(ftype);
                }
                break;
            case 14:
                if (ftype === Thrift.Type.LIST) {
                    const _rtmp311 = input.readListBegin();
                    // const _etype10 = _rtmp311.etype;
                    const _size7 = _rtmp311.size;
                    this.lockedMonitors = [];

                    for (let _i12 = 0; _i12 < _size7; ++_i12) {
                        const elem13 = new TMonitorInfo();
                        elem13.read(input);
                        this.lockedMonitors.push(elem13);
                    }
                    input.readListEnd();
                } else {
                    input.skip(ftype);
                }
                break;
            case 15:
                if (ftype === Thrift.Type.LIST) {
                    const _rtmp318 = input.readListBegin();
                    // const _etype17 = _rtmp318.etype;
                    const _size14 = _rtmp318.size;
                    this.lockedSynchronizers = [];

                    for (let _i19 = 0; _i19 < _size14; ++_i19) {
                        const elem20 = input.readString();
                        this.lockedSynchronizers.push(elem20);
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

TThreadDump.prototype.write = function (output) {
    output.writeStructBegin('TThreadDump');
    if (this.threadName !== null && this.threadName !== undefined) {
        output.writeFieldBegin('threadName', Thrift.Type.STRING, 1);
        output.writeString(this.threadName);
        output.writeFieldEnd();
    }
    if (this.threadId !== null && this.threadId !== undefined) {
        output.writeFieldBegin('threadId', Thrift.Type.I64, 2);
        output.writeI64(this.threadId);
        output.writeFieldEnd();
    }
    if (this.blockedTime !== null && this.blockedTime !== undefined) {
        output.writeFieldBegin('blockedTime', Thrift.Type.I64, 3);
        output.writeI64(this.blockedTime);
        output.writeFieldEnd();
    }
    if (this.blockedCount !== null && this.blockedCount !== undefined) {
        output.writeFieldBegin('blockedCount', Thrift.Type.I64, 4);
        output.writeI64(this.blockedCount);
        output.writeFieldEnd();
    }
    if (this.waitedTime !== null && this.waitedTime !== undefined) {
        output.writeFieldBegin('waitedTime', Thrift.Type.I64, 5);
        output.writeI64(this.waitedTime);
        output.writeFieldEnd();
    }
    if (this.waitedCount !== null && this.waitedCount !== undefined) {
        output.writeFieldBegin('waitedCount', Thrift.Type.I64, 6);
        output.writeI64(this.waitedCount);
        output.writeFieldEnd();
    }
    if (this.lockName !== null && this.lockName !== undefined) {
        output.writeFieldBegin('lockName', Thrift.Type.STRING, 7);
        output.writeString(this.lockName);
        output.writeFieldEnd();
    }
    if (this.lockOwnerId !== null && this.lockOwnerId !== undefined) {
        output.writeFieldBegin('lockOwnerId', Thrift.Type.I64, 8);
        output.writeI64(this.lockOwnerId);
        output.writeFieldEnd();
    }
    if (this.lockOwnerName !== null && this.lockOwnerName !== undefined) {
        output.writeFieldBegin('lockOwnerName', Thrift.Type.STRING, 9);
        output.writeString(this.lockOwnerName);
        output.writeFieldEnd();
    }
    if (this.inNative !== null && this.inNative !== undefined) {
        output.writeFieldBegin('inNative', Thrift.Type.BOOL, 10);
        output.writeBool(this.inNative);
        output.writeFieldEnd();
    }
    if (this.suspended !== null && this.suspended !== undefined) {
        output.writeFieldBegin('suspended', Thrift.Type.BOOL, 11);
        output.writeBool(this.suspended);
        output.writeFieldEnd();
    }
    if (this.threadState !== null && this.threadState !== undefined) {
        output.writeFieldBegin('threadState', Thrift.Type.I32, 12);
        output.writeI32(this.threadState);
        output.writeFieldEnd();
    }
    if (this.stackTrace !== null && this.stackTrace !== undefined) {
        output.writeFieldBegin('stackTrace', Thrift.Type.LIST, 13);
        output.writeListBegin(Thrift.Type.STRING, this.stackTrace.length);
        for (let iter21 in this.stackTrace) {
            if (this.stackTrace.hasOwnProperty(iter21)) {
                iter21 = this.stackTrace[iter21];
                output.writeString(iter21);
            }
        }
        output.writeListEnd();
        output.writeFieldEnd();
    }
    if (this.lockedMonitors !== null && this.lockedMonitors !== undefined) {
        output.writeFieldBegin('lockedMonitors', Thrift.Type.LIST, 14);
        output.writeListBegin(Thrift.Type.STRUCT, this.lockedMonitors.length);
        for (let iter22 in this.lockedMonitors) {
            if (this.lockedMonitors.hasOwnProperty(iter22)) {
                iter22 = this.lockedMonitors[iter22];
                iter22.write(output);
            }
        }
        output.writeListEnd();
        output.writeFieldEnd();
    }
    if (this.lockedSynchronizers !== null && this.lockedSynchronizers !== undefined) {
        output.writeFieldBegin('lockedSynchronizers', Thrift.Type.LIST, 15);
        output.writeListBegin(Thrift.Type.STRING, this.lockedSynchronizers.length);
        for (let iter23 in this.lockedSynchronizers) {
            if (this.lockedSynchronizers.hasOwnProperty(iter23)) {
                iter23 = this.lockedSynchronizers[iter23];
                output.writeString(iter23);
            }
        }
        output.writeListEnd();
        output.writeFieldEnd();
    }
    output.writeFieldStop();
    output.writeStructEnd();
};

const TCommandThreadDumpResponse = function (args) {
    this.threadDumps = null;
    if (args) {
        if (args.threadDumps !== undefined) {
            this.threadDumps = args.threadDumps;
        }
    }
};

TCommandThreadDumpResponse.prototype.read = function (input) {
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
                if (ftype === Thrift.Type.LIST) {
                    const _rtmp328 = input.readListBegin();
                    // const _etype27 = _rtmp328.etype;
                    const _size24 = _rtmp328.size;
                    this.threadDumps = [];

                    for (let _i29 = 0; _i29 < _size24; ++_i29) {
                        const elem30 = new TThreadDump();
                        elem30.read(input);
                        this.threadDumps.push(elem30);
                    }
                    input.readListEnd();
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

TCommandThreadDumpResponse.prototype.write = function (output) {
    output.writeStructBegin('TCommandThreadDumpResponse');
    if (this.threadDumps !== null && this.threadDumps !== undefined) {
        output.writeFieldBegin('threadDumps', Thrift.Type.LIST, 1);
        output.writeListBegin(Thrift.Type.STRUCT, this.threadDumps.length);
        for (let iter31 in this.threadDumps) {
            if (this.threadDumps.hasOwnProperty(iter31)) {
                iter31 = this.threadDumps[iter31];
                iter31.write(output);
            }
        }
        output.writeListEnd();
        output.writeFieldEnd();
    }
    output.writeFieldStop();
    output.writeStructEnd();
};

const TCmdActiveThreadCount = function (args) {
};

TCmdActiveThreadCount.prototype.read = function (input) {
    input.readStructBegin();
    while (true) {
        const ret = input.readFieldBegin();
        // const fname = ret.fname;
        const ftype = ret.ftype;
        // const fid = ret.fid;

        if (ftype === Thrift.Type.STOP) {
            break;
        }
        input.skip(ftype);
        input.readFieldEnd();
    }
    input.readStructEnd();
};

TCmdActiveThreadCount.prototype.write = function (output) {
    output.writeStructBegin('TCmdActiveThreadCount');
    output.writeFieldStop();
    output.writeStructEnd();
};

const TCmdActiveThreadCountRes = function (args) {
    this.histogramSchemaType = null;
    this.activeThreadCount = null;
    this.timeStamp = null;
    if (args) {
        if (args.histogramSchemaType !== undefined) {
            this.histogramSchemaType = args.histogramSchemaType;
        }
        if (args.activeThreadCount !== undefined) {
            this.activeThreadCount = args.activeThreadCount;
        }
        if (args.timeStamp !== undefined) {
            this.timeStamp = args.timeStamp;
        }
    }
};

TCmdActiveThreadCountRes.prototype.read = function (input) {
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
                    this.histogramSchemaType = input.readI32();
                } else {
                    input.skip(ftype);
                }
                break;
            case 2:
                if (ftype === Thrift.Type.LIST) {
                    const _rtmp336 = input.readListBegin();
                    // const _etype35 = _rtmp336.etype;
                    const _size32 = _rtmp336.size;
                    this.activeThreadCount = [];

                    for (let _i37 = 0; _i37 < _size32; ++_i37) {
                        const elem38 = input.readI32();
                        this.activeThreadCount.push(elem38);
                    }
                    input.readListEnd();
                } else {
                    input.skip(ftype);
                }
                break;
            case 3:
                if (ftype === Thrift.Type.I64) {
                    this.timeStamp = input.readI64();
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

TCmdActiveThreadCountRes.prototype.write = function (output) {
    output.writeStructBegin('TCmdActiveThreadCountRes');
    if (this.histogramSchemaType !== null && this.histogramSchemaType !== undefined) {
        output.writeFieldBegin('histogramSchemaType', Thrift.Type.I32, 1);
        output.writeI32(this.histogramSchemaType);
        output.writeFieldEnd();
    }
    if (this.activeThreadCount !== null && this.activeThreadCount !== undefined) {
        output.writeFieldBegin('activeThreadCount', Thrift.Type.LIST, 2);
        output.writeListBegin(Thrift.Type.I32, this.activeThreadCount.length);
        for (let iter39 in this.activeThreadCount) {
            if (this.activeThreadCount.hasOwnProperty(iter39)) {
                iter39 = this.activeThreadCount[iter39];
                output.writeI32(iter39);
            }
        }
        output.writeListEnd();
        output.writeFieldEnd();
    }
    if (this.timeStamp !== null && this.timeStamp !== undefined) {
        output.writeFieldBegin('timeStamp', Thrift.Type.I64, 3);
        output.writeI64(this.timeStamp);
        output.writeFieldEnd();
    }
    output.writeFieldStop();
    output.writeStructEnd();
};

const TActiveThreadDump = function (args) {
    this.execTime = null;
    this.threadDump = null;
    if (args) {
        if (args.execTime !== undefined) {
            this.execTime = args.execTime;
        }
        if (args.threadDump !== undefined) {
            this.threadDump = args.threadDump;
        }
    }
};

TActiveThreadDump.prototype.read = function (input) {
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
                    this.execTime = input.readI64();
                } else {
                    input.skip(ftype);
                }
                break;
            case 2:
                if (ftype === Thrift.Type.STRUCT) {
                    this.threadDump = new TThreadDump();
                    this.threadDump.read(input);
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

TActiveThreadDump.prototype.write = function (output) {
    output.writeStructBegin('TActiveThreadDump');
    if (this.execTime !== null && this.execTime !== undefined) {
        output.writeFieldBegin('execTime', Thrift.Type.I64, 1);
        output.writeI64(this.execTime);
        output.writeFieldEnd();
    }
    if (this.threadDump !== null && this.threadDump !== undefined) {
        output.writeFieldBegin('threadDump', Thrift.Type.STRUCT, 2);
        this.threadDump.write(output);
        output.writeFieldEnd();
    }
    output.writeFieldStop();
    output.writeStructEnd();
};

const TCmdActiveThreadDump = function (args) {
    this.execTime = null;
    if (args) {
        if (args.execTime !== undefined) {
            this.execTime = args.execTime;
        }
    }
};

TCmdActiveThreadDump.prototype.read = function (input) {
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
                    this.execTime = input.readI64();
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

TCmdActiveThreadDump.prototype.write = function (output) {
    output.writeStructBegin('TCmdActiveThreadDump');
    if (this.execTime !== null && this.execTime !== undefined) {
        output.writeFieldBegin('execTime', Thrift.Type.I64, 1);
        output.writeI64(this.execTime);
        output.writeFieldEnd();
    }
    output.writeFieldStop();
    output.writeStructEnd();
};

const TCmdActiveThreadDumpRes = function (args) {
    this.threadDumps = null;
    if (args) {
        if (args.threadDumps !== undefined) {
            this.threadDumps = args.threadDumps;
        }
    }
};

TCmdActiveThreadDumpRes.prototype.read = function (input) {
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
                if (ftype === Thrift.Type.LIST) {
                    const _rtmp344 = input.readListBegin();
                    // const _etype43 = _rtmp344.etype;
                    const _size40 = _rtmp344.size;
                    this.threadDumps = [];

                    for (let _i45 = 0; _i45 < _size40; ++_i45) {
                        const elem46 = new TActiveThreadDump();
                        elem46.read(input);
                        this.threadDumps.push(elem46);
                    }
                    input.readListEnd();
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

TCmdActiveThreadDumpRes.prototype.write = function (output) {
    output.writeStructBegin('TCmdActiveThreadDumpRes');
    if (this.threadDumps !== null && this.threadDumps !== undefined) {
        output.writeFieldBegin('threadDumps', Thrift.Type.LIST, 1);
        output.writeListBegin(Thrift.Type.STRUCT, this.threadDumps.length);
        for (let iter47 in this.threadDumps) {
            if (this.threadDumps.hasOwnProperty(iter47)) {
                iter47 = this.threadDumps[iter47];
                iter47.write(output);
            }
        }
        output.writeListEnd();
        output.writeFieldEnd();
    }
    output.writeFieldStop();
    output.writeStructEnd();
};

const TCommandEcho = function (args) {
    this.message = null;
    if (args) {
        if (args.message !== undefined) {
            this.message = args.message;
        }
    }
};

TCommandEcho.prototype.read = function (input) {
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
                    this.message = input.readString();
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

TCommandEcho.prototype.write = function (output) {
    output.writeStructBegin('TCommandEcho');
    if (this.message !== null && this.message !== undefined) {
        output.writeFieldBegin('message', Thrift.Type.STRING, 1);
        output.writeString(this.message);
        output.writeFieldEnd();
    }
    output.writeFieldStop();
    output.writeStructEnd();
};

const TCommandTransfer = function (args) {
    this.applicationName = null;
    this.agentId = null;
    this.startTime = null;
    this.payload = null;
    if (args) {
        if (args.applicationName !== undefined) {
            this.applicationName = args.applicationName;
        }
        if (args.agentId !== undefined) {
            this.agentId = args.agentId;
        }
        if (args.startTime !== undefined) {
            this.startTime = args.startTime;
        }
        if (args.payload !== undefined) {
            this.payload = args.payload;
        }
    }
};

TCommandTransfer.prototype.read = function (input) {
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
                    this.applicationName = input.readString();
                } else {
                    input.skip(ftype);
                }
                break;
            case 2:
                if (ftype === Thrift.Type.STRING) {
                    this.agentId = input.readString();
                } else {
                    input.skip(ftype);
                }
                break;
            case 3:
                if (ftype === Thrift.Type.I64) {
                    this.startTime = input.readI64();
                } else {
                    input.skip(ftype);
                }
                break;
            case 4:
                if (ftype === Thrift.Type.STRING) {
                    this.payload = input.readBinary();
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

TCommandTransfer.prototype.write = function (output) {
    output.writeStructBegin('TCommandTransfer');
    if (this.applicationName !== null && this.applicationName !== undefined) {
        output.writeFieldBegin('applicationName', Thrift.Type.STRING, 1);
        output.writeString(this.applicationName);
        output.writeFieldEnd();
    }
    if (this.agentId !== null && this.agentId !== undefined) {
        output.writeFieldBegin('agentId', Thrift.Type.STRING, 2);
        output.writeString(this.agentId);
        output.writeFieldEnd();
    }
    if (this.startTime !== null && this.startTime !== undefined) {
        output.writeFieldBegin('startTime', Thrift.Type.I64, 3);
        output.writeI64(this.startTime);
        output.writeFieldEnd();
    }
    if (this.payload !== null && this.payload !== undefined) {
        output.writeFieldBegin('payload', Thrift.Type.STRING, 4);
        output.writeBinary(this.payload);
        output.writeFieldEnd();
    }
    output.writeFieldStop();
    output.writeStructEnd();
};

const TCommandTransferResponse = function (args) {
    this.routeResult = null;
    this.payload = null;
    this.message = null;
    if (args) {
        if (args.routeResult !== undefined) {
            this.routeResult = args.routeResult;
        }
        if (args.payload !== undefined) {
            this.payload = args.payload;
        }
        if (args.message !== undefined) {
            this.message = args.message;
        }
    }
};

TCommandTransferResponse.prototype.read = function (input) {
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
                    this.routeResult = input.readI32();
                } else {
                    input.skip(ftype);
                }
                break;
            case 2:
                if (ftype === Thrift.Type.STRING) {
                    this.payload = input.readBinary();
                } else {
                    input.skip(ftype);
                }
                break;
            case 3:
                if (ftype === Thrift.Type.STRING) {
                    this.message = input.readString();
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

TCommandTransferResponse.prototype.write = function (output) {
    output.writeStructBegin('TCommandTransferResponse');
    if (this.routeResult !== null && this.routeResult !== undefined) {
        output.writeFieldBegin('routeResult', Thrift.Type.I32, 1);
        output.writeI32(this.routeResult);
        output.writeFieldEnd();
    }
    if (this.payload !== null && this.payload !== undefined) {
        output.writeFieldBegin('payload', Thrift.Type.STRING, 2);
        output.writeBinary(this.payload);
        output.writeFieldEnd();
    }
    if (this.message !== null && this.message !== undefined) {
        output.writeFieldBegin('message', Thrift.Type.STRING, 3);
        output.writeString(this.message);
        output.writeFieldEnd();
    }
    output.writeFieldStop();
    output.writeStructEnd();
};

module.exports = {
    types: types,
    TCommandThreadDump: TCommandThreadDump,
    TMonitorInfo: TMonitorInfo,
    TThreadDump: TThreadDump,
    TCommandThreadDumpResponse: TCommandThreadDumpResponse,
    TCmdActiveThreadCount: TCmdActiveThreadCount,
    TCmdActiveThreadCountRes: TCmdActiveThreadCountRes,
    TActiveThreadDump: TActiveThreadDump,
    TCmdActiveThreadDump: TCmdActiveThreadDump,
    TCmdActiveThreadDumpRes: TCmdActiveThreadDumpRes,
    TCommandEcho: TCommandEcho,
    TCommandTransfer: TCommandTransfer,
    TCommandTransferResponse: TCommandTransferResponse
};