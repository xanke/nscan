const Companies = require('./mongo').Companies

module.exports = {
  // 网址和分页
  scan: {
    url: 'https://www.lagou.com/gongsi/3-0-0.json',
    page: 1,
    data: {
      first: false,
      pn: '{{page}}',
      sortField: 0,
      havemark: 0
    },
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36',
      referer: 'https://www.lagou.com/gongsi/'
    }
  },

  // 全局字段
  data: {
    origin: 'lagou'
  },

  // 列表页判断
  isList() {
    return this.$.result
  },

  // 列表获取 Url
  list() {
    return `/gongsi/${this.$list.companyId}.html`
  },

  // 详情页判断
  isDetail() {
    if (typeof this.$ === 'function') {
      return this.$('.hovertips')
    } else {
      return false
    }
  },

  // 详情页数据
  detail() {
    let name = this.$('.hovertips').text()
    
    const picUrl = this.$('.top_info_wrap img').attr('src')
    const address = this.$('.mlist_li_desc').text()
 
    const insert = {
      name,
      picUrl,
      address
    }
    if (name) {
      // insert.name = insert.name.replace(/(\n)+|(\r\n)+/g, "")
      return insert
    } else {
      return false
    }
  },

  // 插入数据库
  insert(url, data) {
    console.log(data)
    Companies.update(
      { url },
      { $set: data },
      {
        upsert: true
      }
    ).exec()
  }
}
