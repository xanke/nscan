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
  // 初始化下载解析器
  NScan.prototype.initDownloader = function() {
    const { isList, list, isDetail, detail } = this.options
    this.isList = isList,
    this.list = list,
    this.isDetail = isDetail
    this.detail = detail
  },

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
    console.log(url, 'download', Date.now())
    const data = await superAgent(url)
    const { body } = data

    if (data.text) {
      const $ = cheerio.load(data.text)
      this.$ = $

      const list = this.isList()
      const detail = this.isDetail()

      if (list.length === 0 && detail.length === 0) {
        console.log(url, 'no-content')
        return
      }

      // 列表页面
      if (list.length > 0) {
        list.each((index, item) => {
          this.$list = $(item)
          let _url = this.list()
          _url = this.host + _url
          this.pushSchedules(_url)
        })
        this.finishDownload(url)
        this.nextPage()
      }

      // 详情页面
      if (detail.length > 0) {
        this.$detail = detail
        const insert = this.detail()

        // 合并公共字段
        Object.assign(insert, this.data)
        insert.url = url
        
        // 导入数据库
        await this.insertDb(insert)
        this.finishDownload(url)
      }
    }
  }
}

module.exports = downloader
