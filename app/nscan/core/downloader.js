/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: xank <xank@qq.com>  Blog：https://www.xank.cn
+-----------------------------------------------------------------------------------------------------------------------
| Downloader 下载器
|
*/

const superAgent = require('superagent')
const cheerio = require('cheerio')

function downloader(NScan) {
  // 启动下载器
  NScan.prototype.start = function() {
    const { schedules } = this

    if (!schedules) {
      console.log('no schedules')
      return
    }

    for (url of schedules) {
      this.download(url)
    }
  }

  // 下载网页
  NScan.prototype.download = async function(url) {
    console.log(url, 'download')
    const data = await superAgent(url)
    const { body } = data

    if (data.text) {
      const $ = cheerio.load(data.text)
      const list = $('.list-item-link')
      const detail = $('.building-box')

      if (!list && !detail) {
        console.log(url, 'no-content')
        return
      }

      // 列表页面
      if (list) {
        list.each((index, item) => {
          item = $(item)
          const name = item.find('h2').text()
          const url = this.host  + item.find('a').attr('href')
          this.pushSchedules(url)
        })
      }

      // 详情页面
      if (detail) {
        const name = detail.find('h3').text()
        console.log(name)
        
        this.finishDownload(url)
      }

      this.finishDownload(url)
      this.start()
    }
  }
}

module.exports = downloader
