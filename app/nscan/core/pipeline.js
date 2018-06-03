// const CompaniesModel = require('../../models/companies')
const Buildings = require('../../lib/mongo').Buildings

function pipeline(NScan) {
  NScan.prototype.insertDb = async function(data) {
    const { url } = data
    data.utime = Date.now()
    await Buildings.update(
      { url },
      { $set: data },
      {
        upsert: true
      }
    ).exec()
  }
}

module.exports = pipeline
