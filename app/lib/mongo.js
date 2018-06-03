const config = require('config-lite')(__dirname)
const Mongolass = require('mongolass')
const mongolass = new Mongolass()


let dbOptions = {
  autoReconnect: false,
  poolSize: 5
}

mongolass.connect(config.mongodb, dbOptions)

// 乐园项目介绍
// exports.ScanDestinations = mongolass.model('Scan_Destinations')