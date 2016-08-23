'use strict'

/**
 * Middleware that binds our .respond() methods
 *
 * Note: for .respond(), data cannot be a string (because it will be interpreted as the message)
 *
 * Usage:
 *
 * res.status(201).respond({message: 'custom response overrides', data: data, specialProp: true})
 * res.status(201).respond('This was totally created')
 * res.status(201).respond('Check this out', data)
 * res.status(201).respond(data)
 * res.respond('Here is some data', data)
 * res.respond('Your request was totally cool')
 * res.respond(data)
 *
 * @param req
 * @param res
 * @param next
 */
module.exports = function(req, res, next) {
  res.respond = respond.bind(res)
  res.custom = custom.bind(res)
  next()
}

const statusMessages = {
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  204: 'No Content',
  301: 'Moved Permanently',
  302: 'Found', // ~ Moved temporarily
  400: 'Bad request',
  401: 'Unauthorized', // ~ Not authenticated
  402: 'Payment Required',
  403: 'Forbidden', // ~ Not authorized
  404: 'Not Found',
  408: 'Request Timeout',
  409: 'Conflict',
  410: 'Gone',
  418: 'I\'m a teapot',
  500: 'Internal Server Error',
  501: 'Not implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout'
}

/**
 * Send a response and optionally set the message and/or data
 *
 * @param {string} [message]
 * @param {object} [data]
 */
function respond(msg, body) {
  let response = {}

  if (typeof msg === typeof '') {
    response.message = msg

    // When message is a string and body was
    // supplied, send it as data
    if (body) {
      response.data = body
    }

  } else {
    response.data = msg
  }

  this.custom(response)
}

function custom(override) {
  let response = Object.assign({
    message: '',
    status: '',
    data: null
  }, override)

  // If there isn't a status already, try to populate
  // a default status for the status code
  if (response.status === '') {
    if (statusMessages.hasOwnProperty(this.statusCode)) {
      response.status = statusMessages[this.statusCode]
    }
  }

  // Status codes must be set by
  // expressjs `status()` method
  response.code = this.statusCode

  this.send(response)
}
