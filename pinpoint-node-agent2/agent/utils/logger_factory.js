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
const fs = require('fs');
const _ = require('lodash');
const later = require('later');
const moment = require('moment');
const shell = require('shelljs');
const log4js = require('log4js');

const Config = require('../conf/log4js.js');

const DEFAULT_CATEGORY = Config.defaultCategory;
const DEFAULT_LOG_PATH = Config.defaultLogPath;

const LEVELS = ['trace', 'debug', 'info', 'warn', 'error', 'fatal'];

function reqParser(event) {
    let result = '';
    let req;
    let params;

    if (event.req) {
        req = event.req;
    } else if (_.isArray(event.data)) {
        event.data.forEach(function (arg, i) {
            if (arg && _.isObject(arg) && _.isString(arg.originalUrl)) {
                req = event.req = arg;
                event.data.splice(i, 1);
            }
        });
    }

    if (req) {
        params = _.pick(req, [
            'params',
            'query',
            'body',
            'headers'
        ]);
        if (req.user) {
            params.user = req.user.name;
        }

        result = '[' + req.method + ' ' + req.originalUrl + ' ' + JSON.stringify(params) + ']';
    }

    return result;
}

function parseConfig(logConfig) {
    let newConfig = {
        defaultCategory: logConfig.defaultCategory,
        appenders: [],
        levels: {},
        replaceConsole: logConfig.replaceConsole
    };

    _.each(logConfig.appenders, function (appender) {
        let consoleLayout = {
            type: 'pattern',
            pattern: '%[[%d] [%p] [%c]%] %x{req} %m',
            tokens: {
                req: reqParser
            }
        };
        let levels = LEVELS;
        let newAppender;
        let filePattern;

        if (appender.category === 'console') {
            consoleLayout = {
                type: 'pattern',
                pattern: '%[[%d] [%p] [' + newConfig.defaultCategory + ']%] [console] %m'
            };
        }

        // 增加输出到console的appender
        newConfig.appenders.push({
            type: 'console',
            category: appender.category,
            layout: consoleLayout
        });

        if (appender.type === 'dateFile') {
            filePattern = {
                type: 'pattern',
                pattern: '[%d] [%p] [%c] %x{req} %m',
                tokens: {
                    req: reqParser
                }
            };

            if (appender.category === 'console') {
                filePattern = '[%d] [%p] [' + newConfig.defaultCategory + '] [console] %m';
            }

            newAppender = {
                type: 'dateFile',
                category: appender.category,
                layout: filePattern,
                pattern: '-yyyy-MM-dd.log',
                alwaysIncludePattern: true
            };
        }

        if (logConfig.levels && logConfig.levels[appender.category]) {
            newConfig.levels[appender.category] = logConfig.levels[appender.category];
            levels = LEVELS.slice(LEVELS.indexOf(newConfig.levels[appender.category].toLowerCase()));
        }

        levels.forEach(function (level) {
            const levelAppender = _.clone(newAppender);
            levelAppender.filename = path.join(logConfig.defaultLogPath, appender.category + '-' + level);
            level = level.toUpperCase();
            newConfig.appenders.push({
                category: appender.category,
                type: 'logLevelFilter',
                level: level,
                maxLevel: level,
                appender: levelAppender
            });
        });
    });

    return newConfig;
}

function getLogger(categoryName) {
    const args = Array.prototype.slice.call(arguments);
    let arg;
    let prefix = '';
    let i;
    let logger;
    let pLogger = {};
    const filenameRegexp = /^[\\\/](\S+)\.(\w+?)$/;

    if (args.length < 2) {
        args.unshift(DEFAULT_CATEGORY);
    }
    categoryName = args[0];
    if (typeof args[1] === 'string') {
        args[1] = args[1].replace(process.cwd(), '');
    }

    for (i = 1; i < args.length; i++) {
        arg = args[i];
        if (filenameRegexp.test(arg)) {
            arg = arg.replace(filenameRegexp, '$1').replace(/\\/g, '/');
        }
        prefix += arg;
        if (i !== args.length - 1) {
            prefix += '] [';
        }
    }

    logger = log4js.getLogger(categoryName);
    _.forIn(logger, function (value, key) {
        pLogger[key] = value;
    });

    LEVELS.forEach(function (item) {
        pLogger[item] = function () {
            let p = '';
            if (args.length > 1) {
                p = '[' + prefix + '] ';
            }

            if (args.length) {
                arguments[0] = p + arguments[0];
            }
            logger[item].apply(logger, arguments);
        };
    });
    return pLogger;
}

function scheduleLogClean() {
    function deleteLog() {
        const keepDate = moment().add(-1, 'month').format('YYYY-MM-DD');

        fs.readdir(DEFAULT_LOG_PATH, function (err, files) {
            if (err) {
                console.error('delete log read dir err:', err);
                return;
            }

            const re = /.*-(20\d\d-\d\d-\d\d)\.log.*/;

            _.each(files, function (file) {
                const matches = re.exec(file);

                if (matches !== null && matches[1] < keepDate) {
                    console.log('try delete log:', file);

                    fs.unlink(DEFAULT_LOG_PATH + '/' + file, function (errUnlink) {
                        if (errUnlink) {
                            console.error('delete log %s err:', file, errUnlink);
                        } else {
                            console.log('delete log %s success', file);
                        }
                    });
                }
            });
        });
    }

    function zipLog() {
        // 压缩今天之前的日志
        const today = moment().format('YYYY-MM-DD');

        fs.readdir(DEFAULT_LOG_PATH, function (err, files) {
            if (err) {
                console.error('zip log read dir err:', err);
                return;
            }

            const re = /.*-(20\d\d-\d\d-\d\d)\.log$/;

            files = _.groupBy(files, function (file) {
                const matches = re.exec(file);
                return matches ? matches[1] : '';
            });

            _.each(files, function (file, day) {
                if (day && day < today) {
                    file = file.join(' ');
                    console.log('try zip log:', file);

                    shell.cd(DEFAULT_LOG_PATH);
                    shell.exec('tar zcf ' + DEFAULT_CATEGORY + '-' + day + '.log.tar.gz ' + file);
                    shell.exec('rm -f ' + file);
                }
            });
        });
    }

    later.date.localTime();
    later.setInterval(function () {
        console.log('clean log begin');

        deleteLog();
        zipLog();
    }, later.parse.cron('5 0,1 * * *'));
}

log4js.configure(parseConfig(Config));
scheduleLogClean();

module.exports = {
    getLogger: getLogger,
    getDefaultLogger: log4js.getDefaultLogger,

    addAppender: log4js.addAppender,
    loadAppender: log4js.loadAppender,
    clearAppenders: log4js.clearAppenders,
    configure: log4js.configure,

    replaceConsole: log4js.replaceConsole,
    restoreConsole: log4js.restoreConsole,

    levels: log4js.levels,
    setGlobalLogLevel: log4js.setGlobalLogLevel,

    layouts: log4js.layouts,
    appenders: log4js.appenders,

    connectLogger: log4js.connectLogger
};
