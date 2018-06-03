const Buildings = require('./mongo').Buildings

module.exports = {
  // 网址和分页
  scan: {
    url: 'http://nb.diandianzu.com/listing/p{{page}}',
    page: 1
  },

  // 全局字段
  data: {
    city: '宁波',
    origin: 'diandianzu'
  },

  // 列表页判断
  isList() {
    return this.$('.list-item-link')
  },

  // 列表获取 Url
  list() {
    return this.host + this.$list.find('a').attr('href')
  },

  // 详情页判断
  isDetail() {
    return this.$('.building-box')
  },

  // 详情页数据
  detail() {
    const name = this.$('.top-buildingName h1').text()
    const finshYear = this.$detail.find('.feature .full').eq(0).find('.f-con').text()
    const address = this.$detail.find('.f-con a').text()
    const picUrl = this.$detail.find('.listing_img').attr('src')
    const data = {
      finshYear,
    }
    const insert = {
      name,
      address,
      picUrl,
      data
    }
    return insert
  },

  // 插入数据库
  insert(url, data) {
    Buildings.update(
      { url },
      { $set: data },
      {
        upsert: true
      }
    ).exec()
  }
}
