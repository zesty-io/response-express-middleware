# Express Responses

[expressjs](http://expressjs.com/) middleware for standardizing and structuring responses. 

## Message Model

The message model is defined in `message-model.js` and currently adheres to this structure,

    {
      // Custom author provided message
      message: '',
      // Human readable status message
      status: '',
      // Http status code number
      code: '',
      // If this request returned data
      // all data is returned in an array
      data: [],
      // Any error message that may be returned
      // we do not expose stack traces to clients
      error: ''
    }

The http status codes follow the [w3c spec](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.9).


## Usage

This is intended as global middleware to be added before any route handling.
  
    // Include module
    const responses = require('response-express-middlware')
    
    // Register middleware
    app.use(responses())

This will register methods onto the `res` object in the form of `res200`, `res404`, etc... Each method takes 2 parameters, a custom message and an object of options to override the default model. 

_Example response_
    
    // This provides a custom message
    // and `data` to return with response
    res.res201('Successfully uploaded file', {
      data: {...}
    })
    
    // Would return
    {
      message: 'Successfully uploaded file',
      status: 'Created',
      code: 201,
      data: [{...}],
      error: ''
    }

### Custom Prefix

By default this middleware will prefix all the methods with `res` generating methods with signatures of `res200`, `res404`, etc... This prefix can be customized to your usage prefences by providing a prefix string to the module when use it as middleware.

__Example custom prefix__
	
	const responses = require('response-express-middlware')
    app.use(responses('send'))
    
    // Response method signatures will now be
    // registered like this.
    res.send200()


## Developing

If adding new status codes please ensure you run the lint task before commiting your code.

    npm run lint
