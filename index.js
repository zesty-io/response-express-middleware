'use strict'

const defaultMessages = {
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
 * Send a response and override defaults in our base response
 *
 * @param {object} [overrides]
 */
const respondCustom = function(overrides = {}) {
  let data = Object.assign({
    message: '',
    data: null
  }, overrides)

  // Set a property "code" on the response from our current status code
  data.code = this.statusCode

  // If there isn't a message already, try to populate a default message for the status code
  if (data.message === '') {
    if (defaultMessages.hasOwnProperty(this.statusCode)) {
      data.message = defaultMessages[this.statusCode]
    }
  }

  // Send the response
  this.send(data)

}

/**
 * Send a response and optionally set the message and/or data
 *
 * @param {string} [message]
 * @param {object} [data]
 */
const respond = function() {

  let userOverrides = {}

  // If there are two arguments, we expect them to be (message: String, objectProps: Object)
  if (arguments.length === 2) {
    userOverrides = arguments[1]
    userOverrides.message = arguments[0]
  }

  // If there is one argument, we will accept either message:String OR objectProps:Any-non-string
  else if (arguments.length === 1) {
    if (typeof arguments[0] === typeof '') {
      userOverrides.message = arguments[0]
    } else if (typeof arguments[0] === typeof {}) {
      userOverrides = {data: arguments[0]}
    }
  }

  respondCustom.call(this, userOverrides)

}

/**
 * Middleware that binds our .respond() and .respondCustom() methods
 *
 * Note: for .respond(), data cannot be a string (because it will be interpreted as the message)
 *
 * Usage:
 *
 * res.status(201).respondCustom({message: 'custom response overrides', data: data, specialProp: true})
 *
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
module.exports = function bindRespondMethods(req, res, next) {
  res.respond = respond.bind(res)
  res.respondCustom = respondCustom.bind(res)
  next()
}
