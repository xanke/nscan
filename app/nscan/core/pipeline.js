// const CompaniesModel = require('../../models/companies')
// const Buildings = require('../../lib/mongo').Buildings

function pipeline(NScan) {
  NScan.prototype.initPipeline = function() {
    const { insert } = this.options
    this.insert = insert
  }

  NScan.prototype.insertDb = async function(data) {
    const { url } = data
    await this.insert(url, data)
  }
}

module.exports = pipeline
