'use strict';

const thrift = require('thrift');
const Thrift = thrift.Thrift;
// const Q = thrift.Q;

const types = module.exports = {};

const TIntStringValue = function (args) {
    this.intValue = null;
    this.stringValue = null;
    if (args) {
        if (args.intValue !== undefined) {
            this.intValue = args.intValue;
        }
        if (args.stringValue !== undefined) {
            this.stringValue = args.stringValue;
        }
    }
};

TIntStringValue.prototype.read = function (input) {
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
                    this.intValue = input.readI32();
                } else {
                    input.skip(ftype);
                }
                break;
            case 2:
                if (ftype === Thrift.Type.STRING) {
                    this.stringValue = input.readString();
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

TIntStringValue.prototype.write = function (output) {
    output.writeStructBegin('TIntStringValue');
    if (this.intValue !== null && this.intValue !== undefined) {
        output.writeFieldBegin('intValue', Thrift.Type.I32, 1);
        output.writeI32(this.intValue);
        output.writeFieldEnd();
    }
    if (this.stringValue !== null && this.stringValue !== undefined) {
        output.writeFieldBegin('stringValue', Thrift.Type.STRING, 2);
        output.writeString(this.stringValue);
        output.writeFieldEnd();
    }
    output.writeFieldStop();
    output.writeStructEnd();
};

const TIntStringStringValue = function (args) {
    this.intValue = null;
    this.stringValue1 = null;
    this.stringValue2 = null;
    if (args) {
        if (args.intValue !== undefined) {
            this.intValue = args.intValue;
        }
        if (args.stringValue1 !== undefined) {
            this.stringValue1 = args.stringValue1;
        }
        if (args.stringValue2 !== undefined) {
            this.stringValue2 = args.stringValue2;
        }
    }
};

TIntStringStringValue.prototype.read = function (input) {
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
                    this.intValue = input.readI32();
                } else {
                    input.skip(ftype);
                }
                break;
            case 2:
                if (ftype === Thrift.Type.STRING) {
                    this.stringValue1 = input.readString();
                } else {
                    input.skip(ftype);
                }
                break;
            case 3:
                if (ftype === Thrift.Type.STRING) {
                    this.stringValue2 = input.readString();
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

TIntStringStringValue.prototype.write = function (output) {
    output.writeStructBegin('TIntStringStringValue');
    if (this.intValue !== null && this.intValue !== undefined) {
        output.writeFieldBegin('intValue', Thrift.Type.I32, 1);
        output.writeI32(this.intValue);
        output.writeFieldEnd();
    }
    if (this.stringValue1 !== null && this.stringValue1 !== undefined) {
        output.writeFieldBegin('stringValue1', Thrift.Type.STRING, 2);
        output.writeString(this.stringValue1);
        output.writeFieldEnd();
    }
    if (this.stringValue2 !== null && this.stringValue2 !== undefined) {
        output.writeFieldBegin('stringValue2', Thrift.Type.STRING, 3);
        output.writeString(this.stringValue2);
        output.writeFieldEnd();
    }
    output.writeFieldStop();
    output.writeStructEnd();
};

const TAnnotationValue = function (args) {
    this.stringValue = null;
    this.boolValue = null;
    this.intValue = null;
    this.longValue = null;
    this.shortValue = null;
    this.doubleValue = null;
    this.binaryValue = null;
    this.byteValue = null;
    this.intStringValue = null;
    this.intStringStringValue = null;
    if (args) {
        if (args.stringValue !== undefined) {
            this.stringValue = args.stringValue;
        }
        if (args.boolValue !== undefined) {
            this.boolValue = args.boolValue;
        }
        if (args.intValue !== undefined) {
            this.intValue = args.intValue;
        }
        if (args.longValue !== undefined) {
            this.longValue = args.longValue;
        }
        if (args.shortValue !== undefined) {
            this.shortValue = args.shortValue;
        }
        if (args.doubleValue !== undefined) {
            this.doubleValue = args.doubleValue;
        }
        if (args.binaryValue !== undefined) {
            this.binaryValue = args.binaryValue;
        }
        if (args.byteValue !== undefined) {
            this.byteValue = args.byteValue;
        }
        if (args.intStringValue !== undefined) {
            this.intStringValue = args.intStringValue;
        }
        if (args.intStringStringValue !== undefined) {
            this.intStringStringValue = args.intStringStringValue;
        }
    }
};

TAnnotationValue.prototype.read = function (input) {
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
                    this.stringValue = input.readString();
                } else {
                    input.skip(ftype);
                }
                break;
            case 2:
                if (ftype === Thrift.Type.BOOL) {
                    this.boolValue = input.readBool();
                } else {
                    input.skip(ftype);
                }
                break;
            case 3:
                if (ftype === Thrift.Type.I32) {
                    this.intValue = input.readI32();
                } else {
                    input.skip(ftype);
                }
                break;
            case 4:
                if (ftype === Thrift.Type.I64) {
                    this.longValue = input.readI64();
                } else {
                    input.skip(ftype);
                }
                break;
            case 5:
                if (ftype === Thrift.Type.I16) {
                    this.shortValue = input.readI16();
                } else {
                    input.skip(ftype);
                }
                break;
            case 6:
                if (ftype === Thrift.Type.DOUBLE) {
                    this.doubleValue = input.readDouble();
                } else {
                    input.skip(ftype);
                }
                break;
            case 7:
                if (ftype === Thrift.Type.STRING) {
                    this.binaryValue = input.readBinary();
                } else {
                    input.skip(ftype);
                }
                break;
            case 8:
                if (ftype === Thrift.Type.BYTE) {
                    this.byteValue = input.readByte();
                } else {
                    input.skip(ftype);
                }
                break;
            case 9:
                if (ftype === Thrift.Type.STRUCT) {
                    this.intStringValue = new TIntStringValue();
                    this.intStringValue.read(input);
                } else {
                    input.skip(ftype);
                }
                break;
            case 10:
                if (ftype === Thrift.Type.STRUCT) {
                    this.intStringStringValue = new TIntStringStringValue();
                    this.intStringStringValue.read(input);
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

TAnnotationValue.prototype.write = function (output) {
    output.writeStructBegin('TAnnotationValue');
    if (this.stringValue !== null && this.stringValue !== undefined) {
        output.writeFieldBegin('stringValue', Thrift.Type.STRING, 1);
        output.writeString(this.stringValue);
        output.writeFieldEnd();
    }
    if (this.boolValue !== null && this.boolValue !== undefined) {
        output.writeFieldBegin('boolValue', Thrift.Type.BOOL, 2);
        output.writeBool(this.boolValue);
        output.writeFieldEnd();
    }
    if (this.intValue !== null && this.intValue !== undefined) {
        output.writeFieldBegin('intValue', Thrift.Type.I32, 3);
        output.writeI32(this.intValue);
        output.writeFieldEnd();
    }
    if (this.longValue !== null && this.longValue !== undefined) {
        output.writeFieldBegin('longValue', Thrift.Type.I64, 4);
        output.writeI64(this.longValue);
        output.writeFieldEnd();
    }
    if (this.shortValue !== null && this.shortValue !== undefined) {
        output.writeFieldBegin('shortValue', Thrift.Type.I16, 5);
        output.writeI16(this.shortValue);
        output.writeFieldEnd();
    }
    if (this.doubleValue !== null && this.doubleValue !== undefined) {
        output.writeFieldBegin('doubleValue', Thrift.Type.DOUBLE, 6);
        output.writeDouble(this.doubleValue);
        output.writeFieldEnd();
    }
    if (this.binaryValue !== null && this.binaryValue !== undefined) {
        output.writeFieldBegin('binaryValue', Thrift.Type.STRING, 7);
        output.writeBinary(this.binaryValue);
        output.writeFieldEnd();
    }
    if (this.byteValue !== null && this.byteValue !== undefined) {
        output.writeFieldBegin('byteValue', Thrift.Type.BYTE, 8);
        output.writeByte(this.byteValue);
        output.writeFieldEnd();
    }
    if (this.intStringValue !== null && this.intStringValue !== undefined) {
        output.writeFieldBegin('intStringValue', Thrift.Type.STRUCT, 9);
        this.intStringValue.write(output);
        output.writeFieldEnd();
    }
    if (this.intStringStringValue !== null && this.intStringStringValue !== undefined) {
        output.writeFieldBegin('intStringStringValue', Thrift.Type.STRUCT, 10);
        this.intStringStringValue.write(output);
        output.writeFieldEnd();
    }
    output.writeFieldStop();
    output.writeStructEnd();
};

const TAnnotation = function (args) {
    this.key = null;
    this.value = null;
    if (args) {
        if (args.key !== undefined) {
            this.key = args.key;
        }
        if (args.value !== undefined) {
            this.value = args.value;
        }
    }
};

TAnnotation.prototype.read = function (input) {
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
                    this.key = input.readI32();
                } else {
                    input.skip(ftype);
                }
                break;
            case 2:
                if (ftype === Thrift.Type.STRUCT) {
                    this.value = new TAnnotationValue();
                    this.value.read(input);
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

TAnnotation.prototype.write = function (output) {
    output.writeStructBegin('TAnnotation');
    if (this.key !== null && this.key !== undefined) {
        output.writeFieldBegin('key', Thrift.Type.I32, 1);
        output.writeI32(this.key);
        output.writeFieldEnd();
    }
    if (this.value !== null && this.value !== undefined) {
        output.writeFieldBegin('value', Thrift.Type.STRUCT, 2);
        this.value.write(output);
        output.writeFieldEnd();
    }
    output.writeFieldStop();
    output.writeStructEnd();
};

const TSpanEvent = function (args) {
    this.spanId = null;
    this.sequence = null;
    this.startElapsed = null;
    this.endElapsed = 0;
    this.rpc = null;
    this.serviceType = null;
    this.endPoint = null;
    this.annotations = null;
    this.depth = -1;
    this.nextSpanId = -1;
    this.destinationId = null;
    this.apiId = null;
    this.exceptionInfo = null;
    this.asyncId = null;
    this.nextAsyncId = null;
    this.asyncSequence = null;
    if (args) {
        if (args.spanId !== undefined) {
            this.spanId = args.spanId;
        }
        if (args.sequence !== undefined) {
            this.sequence = args.sequence;
        }
        if (args.startElapsed !== undefined) {
            this.startElapsed = args.startElapsed;
        }
        if (args.endElapsed !== undefined) {
            this.endElapsed = args.endElapsed;
        }
        if (args.rpc !== undefined) {
            this.rpc = args.rpc;
        }
        if (args.serviceType !== undefined) {
            this.serviceType = args.serviceType;
        }
        if (args.endPoint !== undefined) {
            this.endPoint = args.endPoint;
        }
        if (args.annotations !== undefined) {
            this.annotations = args.annotations;
        }
        if (args.depth !== undefined) {
            this.depth = args.depth;
        }
        if (args.nextSpanId !== undefined) {
            this.nextSpanId = args.nextSpanId;
        }
        if (args.destinationId !== undefined) {
            this.destinationId = args.destinationId;
        }
        if (args.apiId !== undefined) {
            this.apiId = args.apiId;
        }
        if (args.exceptionInfo !== undefined) {
            this.exceptionInfo = args.exceptionInfo;
        }
        if (args.asyncId !== undefined) {
            this.asyncId = args.asyncId;
        }
        if (args.nextAsyncId !== undefined) {
            this.nextAsyncId = args.nextAsyncId;
        }
        if (args.asyncSequence !== undefined) {
            this.asyncSequence = args.asyncSequence;
        }
    }
};

TSpanEvent.prototype.read = function (input) {
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
            case 7:
                if (ftype === Thrift.Type.I64) {
                    this.spanId = input.readI64();
                } else {
                    input.skip(ftype);
                }
                break;
            case 8:
                if (ftype === Thrift.Type.I16) {
                    this.sequence = input.readI16();
                } else {
                    input.skip(ftype);
                }
                break;
            case 9:
                if (ftype === Thrift.Type.I32) {
                    this.startElapsed = input.readI32();
                } else {
                    input.skip(ftype);
                }
                break;
            case 10:
                if (ftype === Thrift.Type.I32) {
                    this.endElapsed = input.readI32();
                } else {
                    input.skip(ftype);
                }
                break;
            case 11:
                if (ftype === Thrift.Type.STRING) {
                    this.rpc = input.readString();
                } else {
                    input.skip(ftype);
                }
                break;
            case 12:
                if (ftype === Thrift.Type.I16) {
                    this.serviceType = input.readI16();
                } else {
                    input.skip(ftype);
                }
                break;
            case 13:
                if (ftype === Thrift.Type.STRING) {
                    this.endPoint = input.readString();
                } else {
                    input.skip(ftype);
                }
                break;
            case 14:
                if (ftype === Thrift.Type.LIST) {
                    const _rtmp34 = input.readListBegin();
                    // const _etype3 = _rtmp34.etype;
                    const _size0 = _rtmp34.size;
                    this.annotations = [];

                    for (let _i5 = 0; _i5 < _size0; ++_i5) {
                        const elem6 = new TAnnotation();
                        elem6.read(input);
                        this.annotations.push(elem6);
                    }
                    input.readListEnd();
                } else {
                    input.skip(ftype);
                }
                break;
            case 15:
                if (ftype === Thrift.Type.I32) {
                    this.depth = input.readI32();
                } else {
                    input.skip(ftype);
                }
                break;
            case 16:
                if (ftype === Thrift.Type.I64) {
                    this.nextSpanId = input.readI64();
                } else {
                    input.skip(ftype);
                }
                break;
            case 20:
                if (ftype === Thrift.Type.STRING) {
                    this.destinationId = input.readString();
                } else {
                    input.skip(ftype);
                }
                break;
            case 25:
                if (ftype === Thrift.Type.I32) {
                    this.apiId = input.readI32();
                } else {
                    input.skip(ftype);
                }
                break;
            case 26:
                if (ftype === Thrift.Type.STRUCT) {
                    this.exceptionInfo = new TIntStringValue();
                    this.exceptionInfo.read(input);
                } else {
                    input.skip(ftype);
                }
                break;
            case 30:
                if (ftype === Thrift.Type.I32) {
                    this.asyncId = input.readI32();
                } else {
                    input.skip(ftype);
                }
                break;
            case 31:
                if (ftype === Thrift.Type.I32) {
                    this.nextAsyncId = input.readI32();
                } else {
                    input.skip(ftype);
                }
                break;
            case 32:
                if (ftype === Thrift.Type.I16) {
                    this.asyncSequence = input.readI16();
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

TSpanEvent.prototype.write = function (output) {
    output.writeStructBegin('TSpanEvent');
    if (this.spanId !== null && this.spanId !== undefined) {
        output.writeFieldBegin('spanId', Thrift.Type.I64, 7);
        output.writeI64(this.spanId);
        output.writeFieldEnd();
    }
    if (this.sequence !== null && this.sequence !== undefined) {
        output.writeFieldBegin('sequence', Thrift.Type.I16, 8);
        output.writeI16(this.sequence);
        output.writeFieldEnd();
    }
    if (this.startElapsed !== null && this.startElapsed !== undefined) {
        output.writeFieldBegin('startElapsed', Thrift.Type.I32, 9);
        output.writeI32(this.startElapsed);
        output.writeFieldEnd();
    }
    if (this.endElapsed !== null && this.endElapsed !== undefined) {
        output.writeFieldBegin('endElapsed', Thrift.Type.I32, 10);
        output.writeI32(this.endElapsed);
        output.writeFieldEnd();
    }
    if (this.rpc !== null && this.rpc !== undefined) {
        output.writeFieldBegin('rpc', Thrift.Type.STRING, 11);
        output.writeString(this.rpc);
        output.writeFieldEnd();
    }
    if (this.serviceType !== null && this.serviceType !== undefined) {
        output.writeFieldBegin('serviceType', Thrift.Type.I16, 12);
        output.writeI16(this.serviceType);
        output.writeFieldEnd();
    }
    if (this.endPoint !== null && this.endPoint !== undefined) {
        output.writeFieldBegin('endPoint', Thrift.Type.STRING, 13);
        output.writeString(this.endPoint);
        output.writeFieldEnd();
    }
    if (this.annotations !== null && this.annotations !== undefined) {
        output.writeFieldBegin('annotations', Thrift.Type.LIST, 14);
        output.writeListBegin(Thrift.Type.STRUCT, this.annotations.length);
        for (let iter7 in this.annotations) {
            if (this.annotations.hasOwnProperty(iter7)) {
                iter7 = this.annotations[iter7];
                iter7.write(output);
            }
        }
        output.writeListEnd();
        output.writeFieldEnd();
    }
    if (this.depth !== null && this.depth !== undefined) {
        output.writeFieldBegin('depth', Thrift.Type.I32, 15);
        output.writeI32(this.depth);
        output.writeFieldEnd();
    }
    if (this.nextSpanId !== null && this.nextSpanId !== undefined) {
        output.writeFieldBegin('nextSpanId', Thrift.Type.I64, 16);
        output.writeI64(this.nextSpanId);
        output.writeFieldEnd();
    }
    if (this.destinationId !== null && this.destinationId !== undefined) {
        output.writeFieldBegin('destinationId', Thrift.Type.STRING, 20);
        output.writeString(this.destinationId);
        output.writeFieldEnd();
    }
    if (this.apiId !== null && this.apiId !== undefined) {
        output.writeFieldBegin('apiId', Thrift.Type.I32, 25);
        output.writeI32(this.apiId);
        output.writeFieldEnd();
    }
    if (this.exceptionInfo !== null && this.exceptionInfo !== undefined) {
        output.writeFieldBegin('exceptionInfo', Thrift.Type.STRUCT, 26);
        this.exceptionInfo.write(output);
        output.writeFieldEnd();
    }
    if (this.asyncId !== null && this.asyncId !== undefined) {
        output.writeFieldBegin('asyncId', Thrift.Type.I32, 30);
        output.writeI32(this.asyncId);
        output.writeFieldEnd();
    }
    if (this.nextAsyncId !== null && this.nextAsyncId !== undefined) {
        output.writeFieldBegin('nextAsyncId', Thrift.Type.I32, 31);
        output.writeI32(this.nextAsyncId);
        output.writeFieldEnd();
    }
    if (this.asyncSequence !== null && this.asyncSequence !== undefined) {
        output.writeFieldBegin('asyncSequence', Thrift.Type.I16, 32);
        output.writeI16(this.asyncSequence);
        output.writeFieldEnd();
    }
    output.writeFieldStop();
    output.writeStructEnd();
};

const TSpan = function (args) {
    this.agentId = null;
    this.applicationName = null;
    this.agentStartTime = null;
    this.transactionId = null;
    this.spanId = null;
    this.parentSpanId = -1;
    this.startTime = null;
    this.elapsed = 0;
    this.rpc = null;
    this.serviceType = null;
    this.endPoint = null;
    this.remoteAddr = null;
    this.annotations = null;
    this.flag = 0;
    this.err = null;
    this.spanEventList = null;
    this.parentApplicationName = null;
    this.parentApplicationType = null;
    this.acceptorHost = null;
    this.apiId = null;
    this.exceptionInfo = null;
    this.applicationServiceType = null;
    this.loggingTransactionInfo = null;
    if (args) {
        if (args.agentId !== undefined) {
            this.agentId = args.agentId;
        }
        if (args.applicationName !== undefined) {
            this.applicationName = args.applicationName;
        }
        if (args.agentStartTime !== undefined) {
            this.agentStartTime = args.agentStartTime;
        }
        if (args.transactionId !== undefined) {
            this.transactionId = args.transactionId;
        }
        if (args.spanId !== undefined) {
            this.spanId = args.spanId;
        }
        if (args.parentSpanId !== undefined) {
            this.parentSpanId = args.parentSpanId;
        }
        if (args.startTime !== undefined) {
            this.startTime = args.startTime;
        }
        if (args.elapsed !== undefined) {
            this.elapsed = args.elapsed;
        }
        if (args.rpc !== undefined) {
            this.rpc = args.rpc;
        }
        if (args.serviceType !== undefined) {
            this.serviceType = args.serviceType;
        }
        if (args.endPoint !== undefined) {
            this.endPoint = args.endPoint;
        }
        if (args.remoteAddr !== undefined) {
            this.remoteAddr = args.remoteAddr;
        }
        if (args.annotations !== undefined) {
            this.annotations = args.annotations;
        }
        if (args.flag !== undefined) {
            this.flag = args.flag;
        }
        if (args.err !== undefined) {
            this.err = args.err;
        }
        if (args.spanEventList !== undefined) {
            this.spanEventList = args.spanEventList;
        }
        if (args.parentApplicationName !== undefined) {
            this.parentApplicationName = args.parentApplicationName;
        }
        if (args.parentApplicationType !== undefined) {
            this.parentApplicationType = args.parentApplicationType;
        }
        if (args.acceptorHost !== undefined) {
            this.acceptorHost = args.acceptorHost;
        }
        if (args.apiId !== undefined) {
            this.apiId = args.apiId;
        }
        if (args.exceptionInfo !== undefined) {
            this.exceptionInfo = args.exceptionInfo;
        }
        if (args.applicationServiceType !== undefined) {
            this.applicationServiceType = args.applicationServiceType;
        }
        if (args.loggingTransactionInfo !== undefined) {
            this.loggingTransactionInfo = args.loggingTransactionInfo;
        }
    }
};

TSpan.prototype.read = function (input) {
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
                if (ftype === Thrift.Type.STRING) {
                    this.applicationName = input.readString();
                } else {
                    input.skip(ftype);
                }
                break;
            case 3:
                if (ftype === Thrift.Type.I64) {
                    this.agentStartTime = input.readI64();
                } else {
                    input.skip(ftype);
                }
                break;
            case 4:
                if (ftype === Thrift.Type.STRING) {
                    this.transactionId = input.readBinary();
                } else {
                    input.skip(ftype);
                }
                break;
            case 7:
                if (ftype === Thrift.Type.I64) {
                    this.spanId = input.readI64();
                } else {
                    input.skip(ftype);
                }
                break;
            case 8:
                if (ftype === Thrift.Type.I64) {
                    this.parentSpanId = input.readI64();
                } else {
                    input.skip(ftype);
                }
                break;
            case 9:
                if (ftype === Thrift.Type.I64) {
                    this.startTime = input.readI64();
                } else {
                    input.skip(ftype);
                }
                break;
            case 10:
                if (ftype === Thrift.Type.I32) {
                    this.elapsed = input.readI32();
                } else {
                    input.skip(ftype);
                }
                break;
            case 11:
                if (ftype === Thrift.Type.STRING) {
                    this.rpc = input.readString();
                } else {
                    input.skip(ftype);
                }
                break;
            case 12:
                if (ftype === Thrift.Type.I16) {
                    this.serviceType = input.readI16();
                } else {
                    input.skip(ftype);
                }
                break;
            case 13:
                if (ftype === Thrift.Type.STRING) {
                    this.endPoint = input.readString();
                } else {
                    input.skip(ftype);
                }
                break;
            case 14:
                if (ftype === Thrift.Type.STRING) {
                    this.remoteAddr = input.readString();
                } else {
                    input.skip(ftype);
                }
                break;
            case 15:
                if (ftype === Thrift.Type.LIST) {
                    const _rtmp312 = input.readListBegin();
                    // const _etype11 = _rtmp312.etype;
                    const _size8 = _rtmp312.size;
                    this.annotations = [];

                    for (let _i13 = 0; _i13 < _size8; ++_i13) {
                        const elem14 = new TAnnotation();
                        elem14.read(input);
                        this.annotations.push(elem14);
                    }
                    input.readListEnd();
                } else {
                    input.skip(ftype);
                }
                break;
            case 16:
                if (ftype === Thrift.Type.I16) {
                    this.flag = input.readI16();
                } else {
                    input.skip(ftype);
                }
                break;
            case 17:
                if (ftype === Thrift.Type.I32) {
                    this.err = input.readI32();
                } else {
                    input.skip(ftype);
                }
                break;
            case 18:
                if (ftype === Thrift.Type.LIST) {
                    const _rtmp319 = input.readListBegin();
                    // const _etype18 = _rtmp319.etype;
                    const _size15 = _rtmp319.size;
                    this.spanEventList = [];

                    for (let _i20 = 0; _i20 < _size15; ++_i20) {
                        const elem21 = new TSpanEvent();
                        elem21.read(input);
                        this.spanEventList.push(elem21);
                    }
                    input.readListEnd();
                } else {
                    input.skip(ftype);
                }
                break;
            case 19:
                if (ftype === Thrift.Type.STRING) {
                    this.parentApplicationName = input.readString();
                } else {
                    input.skip(ftype);
                }
                break;
            case 20:
                if (ftype === Thrift.Type.I16) {
                    this.parentApplicationType = input.readI16();
                } else {
                    input.skip(ftype);
                }
                break;
            case 21:
                if (ftype === Thrift.Type.STRING) {
                    this.acceptorHost = input.readString();
                } else {
                    input.skip(ftype);
                }
                break;
            case 25:
                if (ftype === Thrift.Type.I32) {
                    this.apiId = input.readI32();
                } else {
                    input.skip(ftype);
                }
                break;
            case 26:
                if (ftype === Thrift.Type.STRUCT) {
                    this.exceptionInfo = new TIntStringValue();
                    this.exceptionInfo.read(input);
                } else {
                    input.skip(ftype);
                }
                break;
            case 30:
                if (ftype === Thrift.Type.I16) {
                    this.applicationServiceType = input.readI16();
                } else {
                    input.skip(ftype);
                }
                break;
            case 31:
                if (ftype === Thrift.Type.BYTE) {
                    this.loggingTransactionInfo = input.readByte();
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

TSpan.prototype.write = function (output) {
    output.writeStructBegin('TSpan');
    if (this.agentId !== null && this.agentId !== undefined) {
        output.writeFieldBegin('agentId', Thrift.Type.STRING, 1);
        output.writeString(this.agentId);
        output.writeFieldEnd();
    }
    if (this.applicationName !== null && this.applicationName !== undefined) {
        output.writeFieldBegin('applicationName', Thrift.Type.STRING, 2);
        output.writeString(this.applicationName);
        output.writeFieldEnd();
    }
    if (this.agentStartTime !== null && this.agentStartTime !== undefined) {
        output.writeFieldBegin('agentStartTime', Thrift.Type.I64, 3);
        output.writeI64(this.agentStartTime);
        output.writeFieldEnd();
    }
    if (this.transactionId !== null && this.transactionId !== undefined) {
        output.writeFieldBegin('transactionId', Thrift.Type.STRING, 4);
        output.writeBinary(this.transactionId);
        output.writeFieldEnd();
    }
    if (this.spanId !== null && this.spanId !== undefined) {
        output.writeFieldBegin('spanId', Thrift.Type.I64, 7);
        output.writeI64(this.spanId);
        output.writeFieldEnd();
    }
    if (this.parentSpanId !== null && this.parentSpanId !== undefined) {
        output.writeFieldBegin('parentSpanId', Thrift.Type.I64, 8);
        output.writeI64(this.parentSpanId);
        output.writeFieldEnd();
    }
    if (this.startTime !== null && this.startTime !== undefined) {
        output.writeFieldBegin('startTime', Thrift.Type.I64, 9);
        output.writeI64(this.startTime);
        output.writeFieldEnd();
    }
    if (this.elapsed !== null && this.elapsed !== undefined) {
        output.writeFieldBegin('elapsed', Thrift.Type.I32, 10);
        output.writeI32(this.elapsed);
        output.writeFieldEnd();
    }
    if (this.rpc !== null && this.rpc !== undefined) {
        output.writeFieldBegin('rpc', Thrift.Type.STRING, 11);
        output.writeString(this.rpc);
        output.writeFieldEnd();
    }
    if (this.serviceType !== null && this.serviceType !== undefined) {
        output.writeFieldBegin('serviceType', Thrift.Type.I16, 12);
        output.writeI16(this.serviceType);
        output.writeFieldEnd();
    }
    if (this.endPoint !== null && this.endPoint !== undefined) {
        output.writeFieldBegin('endPoint', Thrift.Type.STRING, 13);
        output.writeString(this.endPoint);
        output.writeFieldEnd();
    }
    if (this.remoteAddr !== null && this.remoteAddr !== undefined) {
        output.writeFieldBegin('remoteAddr', Thrift.Type.STRING, 14);
        output.writeString(this.remoteAddr);
        output.writeFieldEnd();
    }
    if (this.annotations !== null && this.annotations !== undefined) {
        output.writeFieldBegin('annotations', Thrift.Type.LIST, 15);
        output.writeListBegin(Thrift.Type.STRUCT, this.annotations.length);
        for (let iter22 in this.annotations) {
            if (this.annotations.hasOwnProperty(iter22)) {
                iter22 = this.annotations[iter22];
                iter22.write(output);
            }
        }
        output.writeListEnd();
        output.writeFieldEnd();
    }
    if (this.flag !== null && this.flag !== undefined) {
        output.writeFieldBegin('flag', Thrift.Type.I16, 16);
        output.writeI16(this.flag);
        output.writeFieldEnd();
    }
    if (this.err !== null && this.err !== undefined) {
        output.writeFieldBegin('err', Thrift.Type.I32, 17);
        output.writeI32(this.err);
        output.writeFieldEnd();
    }
    if (this.spanEventList !== null && this.spanEventList !== undefined) {
        output.writeFieldBegin('spanEventList', Thrift.Type.LIST, 18);
        output.writeListBegin(Thrift.Type.STRUCT, this.spanEventList.length);
        for (let iter23 in this.spanEventList) {
            if (this.spanEventList.hasOwnProperty(iter23)) {
                iter23 = this.spanEventList[iter23];
                iter23.write(output);
            }
        }
        output.writeListEnd();
        output.writeFieldEnd();
    }
    if (this.parentApplicationName !== null && this.parentApplicationName !== undefined) {
        output.writeFieldBegin('parentApplicationName', Thrift.Type.STRING, 19);
        output.writeString(this.parentApplicationName);
        output.writeFieldEnd();
    }
    if (this.parentApplicationType !== null && this.parentApplicationType !== undefined) {
        output.writeFieldBegin('parentApplicationType', Thrift.Type.I16, 20);
        output.writeI16(this.parentApplicationType);
        output.writeFieldEnd();
    }
    if (this.acceptorHost !== null && this.acceptorHost !== undefined) {
        output.writeFieldBegin('acceptorHost', Thrift.Type.STRING, 21);
        output.writeString(this.acceptorHost);
        output.writeFieldEnd();
    }
    if (this.apiId !== null && this.apiId !== undefined) {
        output.writeFieldBegin('apiId', Thrift.Type.I32, 25);
        output.writeI32(this.apiId);
        output.writeFieldEnd();
    }
    if (this.exceptionInfo !== null && this.exceptionInfo !== undefined) {
        output.writeFieldBegin('exceptionInfo', Thrift.Type.STRUCT, 26);
        this.exceptionInfo.write(output);
        output.writeFieldEnd();
    }
    if (this.applicationServiceType !== null && this.applicationServiceType !== undefined) {
        output.writeFieldBegin('applicationServiceType', Thrift.Type.I16, 30);
        output.writeI16(this.applicationServiceType);
        output.writeFieldEnd();
    }
    if (this.loggingTransactionInfo !== null && this.loggingTransactionInfo !== undefined) {
        output.writeFieldBegin('loggingTransactionInfo', Thrift.Type.BYTE, 31);
        output.writeByte(this.loggingTransactionInfo);
        output.writeFieldEnd();
    }
    output.writeFieldStop();
    output.writeStructEnd();
};

const TSpanChunk = function (args) {
    this.agentId = null;
    this.applicationName = null;
    this.agentStartTime = null;
    this.serviceType = null;
    this.transactionId = null;
    this.spanId = null;
    this.endPoint = null;
    this.spanEventList = null;
    this.applicationServiceType = null;
    if (args) {
        if (args.agentId !== undefined) {
            this.agentId = args.agentId;
        }
        if (args.applicationName !== undefined) {
            this.applicationName = args.applicationName;
        }
        if (args.agentStartTime !== undefined) {
            this.agentStartTime = args.agentStartTime;
        }
        if (args.serviceType !== undefined) {
            this.serviceType = args.serviceType;
        }
        if (args.transactionId !== undefined) {
            this.transactionId = args.transactionId;
        }
        if (args.spanId !== undefined) {
            this.spanId = args.spanId;
        }
        if (args.endPoint !== undefined) {
            this.endPoint = args.endPoint;
        }
        if (args.spanEventList !== undefined) {
            this.spanEventList = args.spanEventList;
        }
        if (args.applicationServiceType !== undefined) {
            this.applicationServiceType = args.applicationServiceType;
        }
    }
};

TSpanChunk.prototype.read = function (input) {
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
                if (ftype === Thrift.Type.STRING) {
                    this.applicationName = input.readString();
                } else {
                    input.skip(ftype);
                }
                break;
            case 3:
                if (ftype === Thrift.Type.I64) {
                    this.agentStartTime = input.readI64();
                } else {
                    input.skip(ftype);
                }
                break;
            case 4:
                if (ftype === Thrift.Type.I16) {
                    this.serviceType = input.readI16();
                } else {
                    input.skip(ftype);
                }
                break;
            case 5:
                if (ftype === Thrift.Type.STRING) {
                    this.transactionId = input.readBinary();
                } else {
                    input.skip(ftype);
                }
                break;
            case 8:
                if (ftype === Thrift.Type.I64) {
                    this.spanId = input.readI64();
                } else {
                    input.skip(ftype);
                }
                break;
            case 9:
                if (ftype === Thrift.Type.STRING) {
                    this.endPoint = input.readString();
                } else {
                    input.skip(ftype);
                }
                break;
            case 10:
                if (ftype === Thrift.Type.LIST) {
                    const _rtmp328 = input.readListBegin();
                    // const _etype27 = _rtmp328.etype;
                    const _size24 = _rtmp328.size;
                    this.spanEventList = [];

                    for (let _i29 = 0; _i29 < _size24; ++_i29) {
                        const elem30 = new TSpanEvent();
                        elem30.read(input);
                        this.spanEventList.push(elem30);
                    }
                    input.readListEnd();
                } else {
                    input.skip(ftype);
                }
                break;
            case 11:
                if (ftype === Thrift.Type.I16) {
                    this.applicationServiceType = input.readI16();
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

TSpanChunk.prototype.write = function (output) {
    output.writeStructBegin('TSpanChunk');
    if (this.agentId !== null && this.agentId !== undefined) {
        output.writeFieldBegin('agentId', Thrift.Type.STRING, 1);
        output.writeString(this.agentId);
        output.writeFieldEnd();
    }
    if (this.applicationName !== null && this.applicationName !== undefined) {
        output.writeFieldBegin('applicationName', Thrift.Type.STRING, 2);
        output.writeString(this.applicationName);
        output.writeFieldEnd();
    }
    if (this.agentStartTime !== null && this.agentStartTime !== undefined) {
        output.writeFieldBegin('agentStartTime', Thrift.Type.I64, 3);
        output.writeI64(this.agentStartTime);
        output.writeFieldEnd();
    }
    if (this.serviceType !== null && this.serviceType !== undefined) {
        output.writeFieldBegin('serviceType', Thrift.Type.I16, 4);
        output.writeI16(this.serviceType);
        output.writeFieldEnd();
    }
    if (this.transactionId !== null && this.transactionId !== undefined) {
        output.writeFieldBegin('transactionId', Thrift.Type.STRING, 5);
        output.writeBinary(this.transactionId);
        output.writeFieldEnd();
    }
    if (this.spanId !== null && this.spanId !== undefined) {
        output.writeFieldBegin('spanId', Thrift.Type.I64, 8);
        output.writeI64(this.spanId);
        output.writeFieldEnd();
    }
    if (this.endPoint !== null && this.endPoint !== undefined) {
        output.writeFieldBegin('endPoint', Thrift.Type.STRING, 9);
        output.writeString(this.endPoint);
        output.writeFieldEnd();
    }
    if (this.spanEventList !== null && this.spanEventList !== undefined) {
        output.writeFieldBegin('spanEventList', Thrift.Type.LIST, 10);
        output.writeListBegin(Thrift.Type.STRUCT, this.spanEventList.length);
        for (let iter31 in this.spanEventList) {
            if (this.spanEventList.hasOwnProperty(iter31)) {
                iter31 = this.spanEventList[iter31];
                iter31.write(output);
            }
        }
        output.writeListEnd();
        output.writeFieldEnd();
    }
    if (this.applicationServiceType !== null && this.applicationServiceType !== undefined) {
        output.writeFieldBegin('applicationServiceType', Thrift.Type.I16, 11);
        output.writeI16(this.applicationServiceType);
        output.writeFieldEnd();
    }
    output.writeFieldStop();
    output.writeStructEnd();
};

const TStringMetaData = function (args) {
    this.agentId = null;
    this.agentStartTime = null;
    this.stringId = null;
    this.stringValue = null;
    if (args) {
        if (args.agentId !== undefined) {
            this.agentId = args.agentId;
        }
        if (args.agentStartTime !== undefined) {
            this.agentStartTime = args.agentStartTime;
        }
        if (args.stringId !== undefined) {
            this.stringId = args.stringId;
        }
        if (args.stringValue !== undefined) {
            this.stringValue = args.stringValue;
        }
    }
};

TStringMetaData.prototype.read = function (input) {
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
                    this.agentStartTime = input.readI64();
                } else {
                    input.skip(ftype);
                }
                break;
            case 4:
                if (ftype === Thrift.Type.I32) {
                    this.stringId = input.readI32();
                } else {
                    input.skip(ftype);
                }
                break;
            case 5:
                if (ftype === Thrift.Type.STRING) {
                    this.stringValue = input.readString();
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

TStringMetaData.prototype.write = function (output) {
    output.writeStructBegin('TStringMetaData');
    if (this.agentId !== null && this.agentId !== undefined) {
        output.writeFieldBegin('agentId', Thrift.Type.STRING, 1);
        output.writeString(this.agentId);
        output.writeFieldEnd();
    }
    if (this.agentStartTime !== null && this.agentStartTime !== undefined) {
        output.writeFieldBegin('agentStartTime', Thrift.Type.I64, 2);
        output.writeI64(this.agentStartTime);
        output.writeFieldEnd();
    }
    if (this.stringId !== null && this.stringId !== undefined) {
        output.writeFieldBegin('stringId', Thrift.Type.I32, 4);
        output.writeI32(this.stringId);
        output.writeFieldEnd();
    }
    if (this.stringValue !== null && this.stringValue !== undefined) {
        output.writeFieldBegin('stringValue', Thrift.Type.STRING, 5);
        output.writeString(this.stringValue);
        output.writeFieldEnd();
    }
    output.writeFieldStop();
    output.writeStructEnd();
};

const TSqlMetaData = function (args) {
    this.agentId = null;
    this.agentStartTime = null;
    this.sqlId = null;
    this.sql = null;
    if (args) {
        if (args.agentId !== undefined) {
            this.agentId = args.agentId;
        }
        if (args.agentStartTime !== undefined) {
            this.agentStartTime = args.agentStartTime;
        }
        if (args.sqlId !== undefined) {
            this.sqlId = args.sqlId;
        }
        if (args.sql !== undefined) {
            this.sql = args.sql;
        }
    }
};

TSqlMetaData.prototype.read = function (input) {
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
                    this.agentStartTime = input.readI64();
                } else {
                    input.skip(ftype);
                }
                break;
            case 4:
                if (ftype === Thrift.Type.I32) {
                    this.sqlId = input.readI32();
                } else {
                    input.skip(ftype);
                }
                break;
            case 5:
                if (ftype === Thrift.Type.STRING) {
                    this.sql = input.readString();
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

TSqlMetaData.prototype.write = function (output) {
    output.writeStructBegin('TSqlMetaData');
    if (this.agentId !== null && this.agentId !== undefined) {
        output.writeFieldBegin('agentId', Thrift.Type.STRING, 1);
        output.writeString(this.agentId);
        output.writeFieldEnd();
    }
    if (this.agentStartTime !== null && this.agentStartTime !== undefined) {
        output.writeFieldBegin('agentStartTime', Thrift.Type.I64, 2);
        output.writeI64(this.agentStartTime);
        output.writeFieldEnd();
    }
    if (this.sqlId !== null && this.sqlId !== undefined) {
        output.writeFieldBegin('sqlId', Thrift.Type.I32, 4);
        output.writeI32(this.sqlId);
        output.writeFieldEnd();
    }
    if (this.sql !== null && this.sql !== undefined) {
        output.writeFieldBegin('sql', Thrift.Type.STRING, 5);
        output.writeString(this.sql);
        output.writeFieldEnd();
    }
    output.writeFieldStop();
    output.writeStructEnd();
};

const TApiMetaData = function (args) {
    this.agentId = null;
    this.agentStartTime = null;
    this.apiId = null;
    this.apiInfo = null;
    this.line = null;
    this.type = null;
    if (args) {
        if (args.agentId !== undefined) {
            this.agentId = args.agentId;
        }
        if (args.agentStartTime !== undefined) {
            this.agentStartTime = args.agentStartTime;
        }
        if (args.apiId !== undefined) {
            this.apiId = args.apiId;
        }
        if (args.apiInfo !== undefined) {
            this.apiInfo = args.apiInfo;
        }
        if (args.line !== undefined) {
            this.line = args.line;
        }
        if (args.type !== undefined) {
            this.type = args.type;
        }
    }
};

TApiMetaData.prototype.read = function (input) {
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
                    this.agentStartTime = input.readI64();
                } else {
                    input.skip(ftype);
                }
                break;
            case 4:
                if (ftype === Thrift.Type.I32) {
                    this.apiId = input.readI32();
                } else {
                    input.skip(ftype);
                }
                break;
            case 5:
                if (ftype === Thrift.Type.STRING) {
                    this.apiInfo = input.readString();
                } else {
                    input.skip(ftype);
                }
                break;
            case 6:
                if (ftype === Thrift.Type.I32) {
                    this.line = input.readI32();
                } else {
                    input.skip(ftype);
                }
                break;
            case 10:
                if (ftype === Thrift.Type.I32) {
                    this.type = input.readI32();
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

TApiMetaData.prototype.write = function (output) {
    output.writeStructBegin('TApiMetaData');
    if (this.agentId !== null && this.agentId !== undefined) {
        output.writeFieldBegin('agentId', Thrift.Type.STRING, 1);
        output.writeString(this.agentId);
        output.writeFieldEnd();
    }
    if (this.agentStartTime !== null && this.agentStartTime !== undefined) {
        output.writeFieldBegin('agentStartTime', Thrift.Type.I64, 2);
        output.writeI64(this.agentStartTime);
        output.writeFieldEnd();
    }
    if (this.apiId !== null && this.apiId !== undefined) {
        output.writeFieldBegin('apiId', Thrift.Type.I32, 4);
        output.writeI32(this.apiId);
        output.writeFieldEnd();
    }
    if (this.apiInfo !== null && this.apiInfo !== undefined) {
        output.writeFieldBegin('apiInfo', Thrift.Type.STRING, 5);
        output.writeString(this.apiInfo);
        output.writeFieldEnd();
    }
    if (this.line !== null && this.line !== undefined) {
        output.writeFieldBegin('line', Thrift.Type.I32, 6);
        output.writeI32(this.line);
        output.writeFieldEnd();
    }
    if (this.type !== null && this.type !== undefined) {
        output.writeFieldBegin('type', Thrift.Type.I32, 10);
        output.writeI32(this.type);
        output.writeFieldEnd();
    }
    output.writeFieldStop();
    output.writeStructEnd();
};

const TResult = function (args) {
    this.success = null;
    this.message = null;
    if (args) {
        if (args.success !== undefined) {
            this.success = args.success;
        }
        if (args.message !== undefined) {
            this.message = args.message;
        }
    }
};

TResult.prototype.read = function (input) {
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
                if (ftype === Thrift.Type.BOOL) {
                    this.success = input.readBool();
                } else {
                    input.skip(ftype);
                }
                break;
            case 2:
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

TResult.prototype.write = function (output) {
    output.writeStructBegin('TResult');
    if (this.success !== null && this.success !== undefined) {
        output.writeFieldBegin('success', Thrift.Type.BOOL, 1);
        output.writeBool(this.success);
        output.writeFieldEnd();
    }
    if (this.message !== null && this.message !== undefined) {
        output.writeFieldBegin('message', Thrift.Type.STRING, 2);
        output.writeString(this.message);
        output.writeFieldEnd();
    }
    output.writeFieldStop();
    output.writeStructEnd();
};

module.exports = {
    types: types,
    TIntStringValue: TIntStringValue,
    TIntStringStringValue: TIntStringStringValue,
    TAnnotationValue: TAnnotationValue,
    TAnnotation: TAnnotation,
    TSpanEvent: TSpanEvent,
    TSpan: TSpan,
    TSpanChunk: TSpanChunk,
    TStringMetaData: TStringMetaData,
    TSqlMetaData: TSqlMetaData,
    TApiMetaData: TApiMetaData,
    TResult: TResult
};
