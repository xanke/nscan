const NScan = require('./nscan')

const options = {
  url: 'http://sh.diandianzu.com/listing/p{{page}}',
  query: {
    page: 1
  }
}

const nscan = new NScan(options)