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
  NScan.prototype.start = async function() {
    console.log('start')
    const { schedules } = this

    if (!schedules) {
      console.log('no schedules')
      return
    }

    for (const url of schedules) {
      await this.download(url)
    }
  }

  // 下载网页
  NScan.prototype.download = async function(url) {
    // console.log(url, 'download', Date.now())
    const data = await superAgent(url)
    const { body } = data

    if (data.text) {
      const $ = cheerio.load(data.text)
      const list = $('.list-item-link')
      const detail = $('.building-box')

      if (list.length === 0 && detail.length === 0) {
        console.log(url, 'no-content')
        return
      }

      // 列表页面
      if (list.length > 0) {
        list.each((index, item) => {
          item = $(item)
          const name = item.find('h2').text()
          const _url = this.host  + item.find('a').attr('href')
          this.pushSchedules(_url)
        })
        this.finishDownload(url)
        // this.start()
      }

      // 详情页面
      if (detail.length > 0) {
        const name = $('.top-buildingName h1').text()
        const finshYear = detail.find('.feature .full').eq(0).find('.f-con').text()
        const address = detail.find('.f-con a').text()
        const picUrl = detail.find('.listing_img').attr('src')
        const origin = 'diandianzu'

        const data = {
          name,
          address,
          finshYear,
          picUrl,
          origin,
          url
        }
        console.log(data)
        this.finishDownload(url)
      }
    }
  }
}

module.exports = downloader
