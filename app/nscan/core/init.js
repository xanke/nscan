/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: xank <xank@qq.com>  Blog：https://www.xank.cn
+-----------------------------------------------------------------------------------------------------------------------
| Init 初始化
|
*/

const { getHost } = require('../utils')
const cheerio = require('cheerio')

function init(NScan) {
  NScan.prototype._init = function(options) {
    const { scan, data = {} } = options
    let { url } = scan
    if (!url) {
      console.log('no-url')
      return
    }

    this.cheerio = cheerio
    this.data = data
    this.host = getHost(url)
    this.options = options
    this.schedules = new Set()
  }
}

module.exports = init
