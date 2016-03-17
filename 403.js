'use strict'

const merge = require('./merge')

// @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.4
module.exports = function res403(msg, opts) {
  this.status(403).json(merge(msg, opts, 'Forbidden', 403))
}
