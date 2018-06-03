/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: xank <xank@qq.com>  Blog：https://www.xank.cn
+-----------------------------------------------------------------------------------------------------------------------
| Pipeline 数据输出管道
|
*/

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
