const downloader = require('./core/downloader')
const scheduler = require('./core/scheduler')
const init = require('./core/init')

function NScan (options) {
  this._init(options)
  this.initSchedules()

  this.start()
}

init(NScan)
downloader(NScan)
scheduler(NScan)

module.exports = NScan

