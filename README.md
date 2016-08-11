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
      // Can be an array or object
      data: []
    }

The http status codes follow the [w3c spec](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.9).


## Usage - Configuration

This is intended as global middleware to be added before any route handling.
  
    // Include module
    const respond = require('response-express-middlware')
    
    // Register middleware
    app.use(respond)

## Usage - Examples

```js
res.status(201).respondCustom({message: 'custom response overrides', data: data, specialProp: true})

res.status(201).respond('This was totally created')
res.status(201).respond('Check this out', data)
res.status(201).respond(data)
res.respond('Here is some data', data)
res.respond('Your request was totally cool')
res.respond(data)
```


This will register methods onto the `res` object in the form of `respond()` and `respondCustom()`

## Developing

If adding new status codes please ensure you run the lint task before commiting your code.

    npm run lint
