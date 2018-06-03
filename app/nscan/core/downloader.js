const superAgent = require('superagent')
const cheerio = require('cheerio')

function downloader(NScan) {
  NScan.prototype.start = function() {
    const { schedules } = this

    if (!schedules) {
      console.log('no schedules')
      return
    }
    schedules.forEach(_ => {
      this.download(_)
    })
  }

  NScan.prototype.download = async function(url) {
    const data = await superAgent(url)
    const { body } = data

    if (data.text) {
      const $ = cheerio.load(data.text)
      const list = []
      $('.list-item-link').each((index, item) => {
        item = $(item)
        const name = item.find('h2').text()

        list.push({
          name
        })
      })

      console.log(list)
    }
  }
}

module.exports = downloader
