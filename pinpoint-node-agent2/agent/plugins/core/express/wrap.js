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

const interceptor = require('../../../commons/trace/method_interceptor.js');
const PinpointTraceMetaData = require('../../../utils/constants.js').PinpointTraceMetaData;
const ServiceTypeConstants = require('./express_constants.js').ServiceTypeConstants;
const traceContextFactory = require('../../../commons/trace/trace_context.js').traceContextFactory;

const wrap = function (express) {

    const original_Route = express.Route;

    // var original_Router = express.Router;
    // var original_Router_get = original_Router.get;

    const original_Route_get = original_Route.prototype.get;
    express.Route.prototype.get = function get() {
        function express0Route0get(original, proxy, argument) {
            const req = argument[0];
            const res = argument[1];
            const next = argument[2];

            console.log(`express0Route0get - ${req.originalUrl}`);

            let traceContext = req[PinpointTraceMetaData.TRACE_CONTEXT];
            if (traceContext === undefined) {
                traceContext = traceContextFactory();
            } else {
                // express using req to pass traceContext
                // and then use new namespace to continue to other func
                traceContext.resetNamespaceTransaction(traceContext);
            }
            if (!traceContext) {
                return original.apply(proxy, argument);
            }
            if (traceContext.hasInit()) {
                let spanEventRecorder = traceContext.continueTraceObject();
                spanEventRecorder.recordServiceType(ServiceTypeConstants.express);
                spanEventRecorder.recordApi('express.Route.get');
                spanEventRecorder.recordRpcName(req.originalUrl);
            } else {
                let spanRecorder = traceContext.newTraceObject();
                spanRecorder.recordServiceType(ServiceTypeConstants.express);
                spanRecorder.recordApi('express.Route.get');
                spanRecorder.recordRpcName(req.originalUrl);
            }
            // TODO if need,you can judge whether this request come from another node?
            // if yes, you should record endPoint and acceptorHost from $req in spanRecorder
            let ret;
            try {
                const args = [req, res, next];
                console.log(original.toString());
                ret = original.apply(proxy, args);
                if (res.statusCode !== 200) {
                    throw new Error(res.statusCode + ' ' + res.statusMessage);
                }
            } catch (err) {
                traceContext.recordException(err);
            }
            traceContext.endTraceObject();
            return ret;
        }

        let args = [];
        for (let original_callback of arguments) {
            console.log(original_callback.toString());

            const callback = interceptor(original_callback, express0Route0get);
            args.push(callback);
        }
        return original_Route_get.apply(this, args);
    };

    const original_Route_post = original_Route.prototype.post;
    express.Route.prototype.post = function () {

        function express0Route0post(original, proxy, argument) {

            const req = argument[0];
            const res = argument[1];
            const next = argument[2];
            let traceContext = req[PinpointTraceMetaData.TRACE_CONTEXT];
            if (traceContext === undefined) {
                traceContext = traceContextFactory();
            } else {
                //express using req to pass traceContext
                //and then use new namespace to continue to other func
                traceContext.resetNamespaceTransaction(traceContext);
            }
            if (!traceContext) {
                return original.apply(proxy, argument);
            }
            if (traceContext.hasInit()) {
                let spanEventRecorder = traceContext.continueTraceObject();
                spanEventRecorder.recordServiceType(ServiceTypeConstants.express);
                spanEventRecorder.recordApi('express.Route.post');
                spanEventRecorder.recordRpcName(req.originalUrl);
            } else {
                let spanRecorder = traceContext.newTraceObject();
                spanRecorder.recordServiceType(ServiceTypeConstants.express);
                spanRecorder.recordApi('express.Route.post');
                spanRecorder.recordRpcName(req.originalUrl);
            }
            let ret;
            try {
                const args = [req, res, next];
                ret = original.apply(proxy, args);
                if (res.statusCode !== 200) {
                    throw new Error(res.statusCode + ' ' + res.statusMessage);
                }
            } catch (err) {
                traceContext.recordException(err);
            }
            traceContext.endTraceObject();
            return ret;
        }

        let args = [];
        for (let original_callback of arguments) {
            console.log(original_callback.toString());

            const callback = interceptor(original_callback, express0Route0post);
            args.push(callback);
        }
        return original_Route_post.apply(this, args);
    };

    const original_Route_put = original_Route.prototype.put;
    express.Route.prototype.put = function () {
        function express0Route0put(original, proxy, argument) {

            const req = argument[0];
            const res = argument[1];
            const next = argument[2];
            let traceContext = req[PinpointTraceMetaData.TRACE_CONTEXT];
            if (traceContext === undefined) {
                traceContext = traceContextFactory();
            } else {
                //express using req to pass traceContext
                //and then use namespace to continue to other func
                traceContext.resetNamespaceTransaction(traceContext);
            }
            if (!traceContext) {
                return original.apply(proxy, argument);
            }
            if (traceContext.hasInit()) {
                let spanEventRecorder = traceContext.continueTraceObject();
                spanEventRecorder.recordServiceType(ServiceTypeConstants.express);
                spanEventRecorder.recordApi('express.Route.put');
                spanEventRecorder.recordRpcName(req.originalUrl);
            } else {
                let spanRecorder = traceContext.newTraceObject();
                spanRecorder.recordServiceType(ServiceTypeConstants.express);
                spanRecorder.recordApi('express.Route.put');
                spanRecorder.recordRpcName(req.originalUrl);
            }
            let ret;
            try {
                const args = [req, res, next];
                ret = original.apply(proxy, args);
                if (res.statusCode !== 200) {
                    throw new Error(res.statusCode + ' ' + res.statusMessage);
                }
            } catch (err) {
                traceContext.recordException(err);
            }
            traceContext.endTraceObject();
            return ret;
        }

        let args = [];
        for (let original_callback of arguments) {
            console.log(original_callback.toString());

            const callback = interceptor(original_callback, express0Route0put);
            args.push(callback);
        }
        return original_Route_put.apply(this, args);
    };

    var original_Route_delete = original_Route.prototype.delete;
    express.Route.prototype.delete = function () {

        function express0Route0delete(original, proxy, argument) {

            const req = argument[0];
            const res = argument[1];
            let traceContext = req[PinpointTraceMetaData.TRACE_CONTEXT];
            if (traceContext === undefined) {
                traceContext = traceContextFactory();
            } else {
                //express using req to pass traceContext
                //and then use namespace to continue to other func
                traceContext.resetNamespaceTransaction(traceContext);
            }
            if (!traceContext) {
                return original.apply(proxy, argument);
            }
            if (traceContext.hasInit()) {
                let spanEventRecorder = traceContext.continueTraceObject();
                spanEventRecorder.recordServiceType(ServiceTypeConstants.express);
                spanEventRecorder.recordApi('express.Route.delete');
                spanEventRecorder.recordRpcName(req.originalUrl);
            } else {
                let spanRecorder = traceContext.newTraceObject();
                spanRecorder.recordServiceType(ServiceTypeConstants.express);
                spanRecorder.recordApi('express.Route.delete');
                spanRecorder.recordRpcName(req.originalUrl);
            }
            let ret;
            try {
                ret = original.apply(proxy, argument);
                if (res.statusCode !== 200) {
                    throw new Error(res.statusCode + ' ' + res.statusMessage);
                }
            } catch (err) {
                traceContext.recordException(err);
            }
            traceContext.endTraceObject();
            return ret;
        }

        let args = [];
        for (let original_callback of arguments) {
            console.log(original_callback.toString());

            const callback = interceptor(original_callback, express0Route0delete);
            args.push(callback);
        }
        return original_Route_delete.apply(this, args);
    };

    // express application
    const original_application_handle = express.application.handle;

    function express0application0handle(original, proxy, argument) {
        const req = argument[0];
        const res = argument[1];
        const traceContext = traceContextFactory();
        if (!traceContext) {
            return original.apply(proxy, argument);
        }
        if (traceContext.hasInit()) {
            let spanEventRecorder = traceContext.continueTraceObject();
            spanEventRecorder.recordServiceType(ServiceTypeConstants.express);
            spanEventRecorder.recordApi('express.application.handle');
            spanEventRecorder.recordRpcName(req.url);
        } else {
            return original.apply(proxy, argument);
        }

        req[PinpointTraceMetaData.TRACE_CONTEXT] = traceContext;
        // use req to pass traceContext and tell the cls
        // not record now
        traceContext.transferNs = true;
        argument[0] = req;
        let ret;
        try {
            ret = original.apply(proxy, argument);
            if (res.statusCode !== 200) {
                throw new Error(res.statusCode + ' ' + res.statusMessage);
            }
        } catch (err) {
            traceContext.recordException(err);
        }
        traceContext.endTraceObject();
        return ret;

    }

    express.application.handle = interceptor(original_application_handle, express0application0handle);

    return express;
};

module.exports = wrap;