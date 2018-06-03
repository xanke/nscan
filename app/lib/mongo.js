/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: xank <xank@qq.com>  Blog：https://www.xank.cn
+-----------------------------------------------------------------------------------------------------------------------
| Mongolass
|
*/

const config = require('config-lite')(__dirname)
const Mongolass = require('mongolass')

const mongolass = new Mongolass()
const dbOptions = {
  autoReconnect: false,
  poolSize: 5
}

mongolass.connect(config.mongodb, dbOptions)

exports.Companies = mongolass.model('Companies')
exports.Buildings = mongolass.model('Buildings')