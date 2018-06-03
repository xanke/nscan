const Companies = require('../lib/mongo').Companies

module.exports = {
  insert: async data => {
    return Companies.create(data).exec()
  },

  update: async (find, data) => {
    data.utime = Date.now()
    return Companies.update(
      find,
      { $set: data },
      {
        upsert: true
      }
    ).exec()
  }
}
