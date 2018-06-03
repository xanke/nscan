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
    const { scan } = this.options
    let { url, page } = scan

    this.url = url

    // 分页解析
    if (page) {
      this.page = page
      url = url.replace('{{page}}', page)
    } else {
      this.page = false
    }

    this.schedules.add(url)
    this.initSchedules = true
  }

  // 完成下载
  NScan.prototype.finishDownload = function(url) {
    const { schedules } = this
    schedules.delete(url)

    if (schedules.size === 0) {
      console.log('finish')
      process.exit()
    }
  }

  // 增加网站
  NScan.prototype.pushSchedules = function(url) {
    this.schedules.add(url)
  }

  // 下一页
  NScan.prototype.nextPage = function() {
    const page = this.page + 1
    const url = this.url.replace('{{page}}', page)
    this.pushSchedules(url)
    this.page = page
  }
}

module.exports = scheduler
