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
    let { url, page, data, headers } = scan

    this.url = url

    // 分页解析
    if (page) {
      this.page = page

      // POST 带参数
      if (data) {
        for (let key in data) {
          let val = data[key]
          if (val === '{{page}}') {
            data[key] = this.page
          }
        }
        const scan = {
          url,
          method: 'POST',
          data,
          headers
        }
        this.pushSchedules(scan)
      } else {
        url = url.replace('{{page}}', page)
        this.pushSchedules(url)
      }

    } else {
      this.page = false
    }
    this.initSchedules = true
  }

  // 完成下载
  NScan.prototype.finishDownload = function(url) {
    const { schedules, urls } = this
    urls.delete(url)

    // 列表完成进入下一页
    if (schedules.length === 0) {
      this.nextPage()
    }
  }

  // 增加网站
  NScan.prototype.pushSchedules = function(scan) {
    let url, method, data

    if (typeof scan === 'string') {
      url = scan
      scan = {
        url,
        method: 'GET'
      }
    } else {
      url = scan.url
    }
    
    // 判断重复
    if (this.urls.has(url)) return

    this.schedules.push(scan)
    this.urls.add(url)
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
