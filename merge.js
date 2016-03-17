'use strict'

const model = require('./message-model')

module.exports = function merge(msg, opts, status, code) {

  let merged = Object.assign({}, model, opts)

  merged.status = status
  merged.code = code
  merged.message = msg

  return merged
}
