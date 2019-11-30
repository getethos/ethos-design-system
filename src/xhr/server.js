const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('postsdb.json')
const middlewares = jsonServer.defaults()
const port = process.env.PORT || 9004

server.use(middlewares)

server.use(jsonServer.bodyParser)

// Must come before use(router)
server.use(
  jsonServer.rewriter({
    '/api/*': '/$1',
    '/:resource/:id/show': '/:resource/:id',
  })
)

/////////////////////////////////////////////////////////////////
//                Simulate some error responses                //
/////////////////////////////////////////////////////////////////
server.get('/400', (req, res) => {
  const badRequest = 'Request cannot be fulfilled due to bad syntax.'
  res.status(400).jsonp({
    message: badRequest,
    name: 'BadRequest',
    status: '400',
  })
})
server.get('/401', (req, res) => {
  // Would likely be implemented more like this across all requests:
  //  if (isAuthorized(req)) {
  //    next(
  //  } else {
  //    res.sendStatus(401)
  //  }
  const unauthorized =
    'You are not authorized to access the requested resource.'
  res.status(401).jsonp({
    message: unauthorized,
    name: 'Unauthorized',
    status: '401',
  })
})
server.get('/500', (req, res) => {
  res.status(500).jsonp({
    message: 'The server encountered an unexpected error.',
    name: 'FatalError',
    status: '500',
  })
})
server.get('/echo', (req, res) => {
  res.status(200).jsonp({
    message: 'Success',
  })
})

server.use(router)

server.listen(port, () => {
  console.log('JSON Server is running')
})
