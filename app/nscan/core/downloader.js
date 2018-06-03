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
    const { isList = false, list = false, isDetail, detail } = this.options
    this.isList = isList,
    this.list = list,
    this.isDetail = isDetail
    this.detail = detail
  },

  // 获取任务
  NScan.prototype.start = async function() {
    const { schedules } = this

    const scan = schedules.pop()

    if (scan) {
      setTimeout(async () => {  
        await this.download(scan)
      }, this.sleep)
    } else {
      console.log('no-schedules')
    }
  }

  // 下载网页
  NScan.prototype.download = async function(scan) {
    const { url, method, data, headers } = scan
    console.log(url, method, Date.now())

    let ret
    try {
      if (method === 'GET') {
        ret = await superAgent(url)
      } else {
        ret = await superAgent.post(url).set(headers).send(data)
      }
    } catch (e) {
      if (!this.isList) {
        this.nextPage()
        this.start()
      }
      return
    }

    // 无内容
    if (!ret.text) {
      return
    }

    // 内容格式判断
    let $, mode
    if (ret.type === 'application/json') {
      $ = ret.body
      mode = 'json'
    } else {
      mode = 'html'
      $ = cheerio.load(ret.text)
    }
    this.$ = $


    let list, detail
    if (this.isList) {
      list = this.isList()
    }

    detail= this.isDetail()

    
    if (mode === 'html' && list && list.length === 0) {
      list = false
    }
    
    if (mode === 'html' && detail && detail.length === 0) {
      detail = false
    }

    // 判断是否无内容
    if (!list && !detail) {
      console.log(url, 'no-content')
      return
    }

    // 列表页面
    if (list) {
      // HTML 模式
      if (mode === 'html') {
        list.each((index, item) => {
          this.$list = $(item)
          let _url = this.list()
          _url = this.host + _url
          this.pushSchedules(_url)
        })
      } else {
        // JSON 模式
        list.forEach(item => {
          this.$list = item
          
          let _url = this.list()
          _url = this.host + _url

          this.pushSchedules(_url)
        })
        this.start()
      }

      this.finishDownload(url)
      this.start()
    } else {
      this.$detail = detail
      const insert = this.detail()

      this.$detail = null

      if (insert) {
        // 合并公共字段
        Object.assign(insert, this.data)
        insert.url = url
        
        // 导入数据库
        await this.insertDb(insert)
      } else {
        console.log(url, 'no-data')
      }
      
      // 直接采集详情页模式
      if (!this.isList) {
        this.nextPage()
      }
      
      this.start()
      this.finishDownload(url)
    }
  }
}

module.exports = downloader
