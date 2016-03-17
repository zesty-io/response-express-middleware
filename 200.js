'use strict'

const merge = require('./merge')

// @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.9
module.exports = function res200(msg, opts) {
  this.status(200).json(merge(msg, opts, 'OK', 200))
}
