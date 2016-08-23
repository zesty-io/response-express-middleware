'use strict'

let test = require('ava')
let request = require('supertest')
let express = require('express')
let respond = require('../index')

let app = express()

app.use(respond)

test.cb('Respond with a custom message', (t) => {
  t.plan(1)

  app.get('/message', function (req, res) {
    res.status(200).respond('message')
  })

  request(app)
    .get('/message')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((e, res) => {
      if (e) {
        t.fail(e.message)
      }
      t.is(res.body.message, 'message')
      t.end()
    })
})

test.cb('Respond with a custom message and data', (t) => {
  t.plan(2)

  app.get('/message-and-data', function (req, res) {
    res.status(200).respond('message', {
      test: true
    })
  })

  request(app)
    .get('/message-and-data')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((e, res) => {
      if (e) {
        t.fail(e.message)
      }
      t.is(res.body.message, 'message')
      t.is(res.body.data.test, true)
      t.end()
    })
})

test.cb('Respond with just data. No message is sent.', (t) => {
  t.plan(2)

  app.get('/data', function (req, res) {
    res.status(200).respond({
      test: true
    })
  })

  request(app)
    .get('/data')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((e, res) => {
      if (e) {
        t.fail(e.message)
      }
      t.is(res.body.message, '')
      t.is(res.body.data.test, true)
      t.end()
    })
})

test.cb('Send a completely custom response. Message or data is required.', (t) => {
  t.plan(3)

  app.get('/custom', function (req, res) {
    res.status(200).respond({
      message: 'custom message',
      data: {test: true},
      custom: 'property'
    })
  })

  request(app)
    .get('/custom')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((e, res) => {
      if (e) {
        t.fail(e.message)
      }
      t.is(res.body.message, 'custom message')
      t.is(res.body.data.test, true)
      t.is(res.body.custom, 'property')
      t.end()
    })
})
