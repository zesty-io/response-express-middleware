'use strict'

const merge = require('./merge')

// @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5
module.exports = function res404(msg, opts) {
  this.status(404).json(merge(msg, opts, 'Not Found', 404))
}
