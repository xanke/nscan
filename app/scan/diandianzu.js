module.exports = {
  scan: {
    url: 'http://sh.diandianzu.com/listing/p{{page}}',
    page: 1
  },
  data: {
    city: '上海'
  },
  isList() {
    $('.list-item-link')
  },
  list() {
    this.find('a').attr('href')
  }
}
