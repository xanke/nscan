const downloader = require('./core/downloader')
const scheduler = require('./core/scheduler')
const pipeline = require('./core/pipeline')
const init = require('./core/init')

function NScan (options) {
  this._init(options)
  this.initSchedules()
  this.initDownloader()
  this.start()
}

init(NScan)
downloader(NScan)
scheduler(NScan)
pipeline(NScan)

module.exports = NScan