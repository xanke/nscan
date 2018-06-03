const Buildings = require('../lib/mongo').Buildings

module.exports = {
  scan: {
    url: 'http://sh.diandianzu.com/listing/p{{page}}',
    page: 1
  },
  data: {
    city: '上海'
  },
  isList() {
    return this.$('.list-item-link')
  },
  list() {
    return this.$list.find('a').attr('href')
  },
  isDetail() {
    return this.$('.building-box')
  },
  detail() {
    const name = this.$('.top-buildingName h1').text()
    const finshYear = this.$detail.find('.feature .full').eq(0).find('.f-con').text()
    const address = this.$detail.find('.f-con a').text()
    const picUrl = this.$detail.find('.listing_img').attr('src')
    const origin = 'diandianzu'

    const data = {
      finshYear,
    }

    const insert = {
      name,
      address,
      picUrl,
      data,
      origin
    }
    return insert
  },
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
