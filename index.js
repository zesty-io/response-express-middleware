'use strict'

const codes = [200, 201, 202, 400, 401, 402, 403, 404, 408, 500, 501, 502]

module.exports = (req, res, next) => {
  codes.forEach((code) => {
    let response = require(`./${code}`)
    res[`res${code}`] = response.bind(res)
  })

  next()
}
