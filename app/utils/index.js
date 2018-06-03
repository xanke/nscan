exports.getHost = function getHost(url) {
  const reg = /^http(s)?:\/\/(.*?)\//
  const host = reg.exec(url)[2]
  return 'http://' + host
}