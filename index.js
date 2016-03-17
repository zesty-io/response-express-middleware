'use strict'

const codes = [200, 201, 202, 400, 401, 402, 403, 404, 408, 409, 500, 501, 502]

module.exports = function response(prefix) {
  prefix = prefix || 'res'
  return (req, res, next) => {
    codes.forEach((code) => {
      let response = require(`./${code}`)
      res[`${prefix}${code}`] = response.bind(res)
    })

    next()
  }
}
