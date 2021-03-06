/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: xank <xank@qq.com>  Blog：https://www.xank.cn
+-----------------------------------------------------------------------------------------------------------------------
| Init 初始化
|
*/

const { getHost } = require('../utils')
const { warn } = require('../utils/debug')
const cheerio = require('cheerio')

function init(NScan) {
  NScan.prototype._init = function(options) {
    const { scan, data = {} } = options
    let { url, sleep = 0 } = scan
    if (!url) {
      warn('缺少 url')
    }

    this.sleep = sleep
    this.cheerio = cheerio
    this.data = data
    this.host = getHost(url)
    this.options = options
    this.schedules = []
    this.urls = new Set()
  }
}

module.exports = init
