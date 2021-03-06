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

const BuildingsSchema = new Schema('Buildings', {
  name: {
    type: String
  },
  city: {
    type: String
  },
  address: {
    type: String
  },
  picUrl: {
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

const CompaniesSchema = new Schema('Companies', {
  name: {
    type: String
  },
  address: {
    type: String
  },
  picUrl: {
    type: String
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
exports.Companies = mongolass.model('Companies', CompaniesSchema)
