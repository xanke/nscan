/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: xank <xank@qq.com>  Blog：https://www.xank.cn
+-----------------------------------------------------------------------------------------------------------------------
| Scheduler 网址处理器
|
*/

function scheduler(NScan) {
  // 初始化网址列表处理器
  NScan.prototype.initSchedules = function() {
    const { url, query } = this.options
    this.query = query

    for (key in query) {
      let val = query[key]
      let _url = url.replace('{{' + key + '}}', query[key])
      this.schedules.add(_url)
    }
    
    this.initSchedules = true
  }

  // 完成下载
  NScan.prototype.finishDownload = function(url) {
    const { schedules } = this
    schedules.delete(url)

    if (schedules.size === 0 ){
      console.log('finish')
      process.exit()
    }
  }

  // 增加网站
  NScan.prototype.pushSchedules = function(url) {
    this.schedules.add(url)
  }

  NScan.prototype.nextSchedules = function() {}
}

module.exports = scheduler
