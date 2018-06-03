/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: xank <xank@qq.com>  Blog：https://www.xank.cn
+-----------------------------------------------------------------------------------------------------------------------
| Mongolass
|
*/

const config = require('config-lite')(__dirname)
const Mongolass = require('mongolass')
const Schema = Mongolass.Schema

const mongolass = new Mongolass()

mongolass.connect(config.mongodb, {
  autoReconnect: false,
  poolSize: 5
})

exports.Companies = mongolass.model('Companies')

const BuildingsSchema = new Schema('Buildings', {
  name: {
    type: String
  },
  data: {
    type: Object
  },
  utime: {
    type: Date
  },
  origin: {
    type: String
  },
  url: {
    type: String
  }
})
exports.Buildings = mongolass.model('Buildings', BuildingsSchema)
