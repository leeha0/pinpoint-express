# Pinpoint-express-test
```
Pinpoint & Pinpoint-node-agent 연동 테스트를 위한 프로젝트
```

* [Pinpoint](https://github.com/naver/pinpoint)
* [Pinpoint-node-agent](https://github.com/peaksnail/pinpoint-node-agent)

## Getting Started

### Prerequisites 
Node v8.15.0 
Pinpoint v1.8.1
Java v1.8.0

### Installing
* setting JAVA_HOME
```
export JAVA_6_HOME=$JAVA_7_HOME
export JAVA_7_HOME=$JAVA_7_HOME
export JAVA_8_HOME=$JAVA_8_HOME
export JAVA_9_HOME=$JAVA_11_HOME
```

* Install Pinpoint
```
git clone https://github.com/naver/pinpoint.git
cd pinpoint
./mvnw install -Dmaven.test.skip=true
```
* Start Hbase & Collector & Web
```
$PINPOINT_HOME_PATH/quickstart/bin/start-hbase.sh
$PINPOINT_HOME_PATH/quickstart/bin/init-hbase.sh
$PINPOINT_HOME_PATH/quickstart/bin/start-collector.sh
$PINPOINT_HOME_PATH/quickstart/bin/start-web.sh
```

### Create Express Project
* express-generator
```
npm install -g express-generator
express pinpoint-express
```
* pinpoint-node-agent
```
git clone https://github.com/peaksnail/pinpoint-node-agent.git
```
```javascript
# pinpoint-node-agent/agent/plugins/core/express/wrap.js

# AS-IS
var original_callback = arguments[0];

var callback = interceptor(original_callback, express0Route0get);
var args = [callback];
var ret = original_Route_get.apply(this, args);
return ret;


# TO-BE
let args = [];
for (let original_callback of arguments) {
   const callback = interceptor(original_callback, express0Route0get);
   args.push(callback);
}
return original_Route_get.apply(this, args);

```
* start application
```
npm start
```