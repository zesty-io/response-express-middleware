# Express Responses

[expressjs](http://expressjs.com/) middleware for standardizing and structuring responses.

The http status codes follow the [w3c spec](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.9).

## Message Model
```js
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
```

## Usage - Configuration

This is intended as global middleware to be added before any route handling.

    // Include module
    const respond = require('response-express-middlware')

    // Register middleware
    app.use(respond)

This will register the `respond()` method on the Express `res` object.

## Usage - Examples

Respond with a custom message
```js
res.respond('Your request was totally cool')
res.status(201).respond('This was totally created')
```

Respond with a custom message and data.
```js
res.respond('Here is some data', {...})
res.status(201).respond('Check this out', [0,1,2])
```

Respond with just data. No message is sent.
```js
res.respond(data)
res.status(201).respond(data)
```

Send a completely custom response. Message or data is required.
```js
res.status(201).custom({
  message: 'custom response overrides',
  data: data,
  specialProp: true
})
```

## Developing

If adding new status codes please ensure you run the lint task before committing your code.

    npm run lint
