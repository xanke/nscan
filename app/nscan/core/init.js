function init(NScan) {
  
  NScan.prototype._init = function(options) {
    this.options = options
    console.log('init')
  }
}

module.exports = init