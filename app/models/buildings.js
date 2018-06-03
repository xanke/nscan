const Buildings = require('../lib/mongo').Buildings

module.exports = {
  insert: async data => {
    return Buildings.create(data).exec()
  },

  update: async (find, data) => {
    data.utime = Date.now()
    return Buildings.update(
      find,
      { $set: data },
      {
        upsert: true
      }
    ).exec()
  }
}
