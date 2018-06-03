/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: xank <xank@qq.com>  Blog：https://www.xank.cn
+-----------------------------------------------------------------------------------------------------------------------
| Init 初始化
|
*/

const { getHost } = require('../../utils')

function init(NScan) {
  NScan.prototype._init = function(options) {
    const { url } = options
    if (!url) {
      console.log('no-url')
      return
    }

    this.host = getHost(url)
    this.options = options
    this.schedules = new Set()
  }
}

module.exports = init
