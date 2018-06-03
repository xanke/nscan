const CompaniesModel = require('../../models/companies')

function pipeline(NScan) {
  NScan.prototype.insertDb = function(data) {
    console.log(data)
    // CompaniesModel.insert(data)
  }
}

module.exports = pipeline