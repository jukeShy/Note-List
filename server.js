let express = require('express')
let path = require('path')
let serveStatic = require('serve-static')

const server = express()

server.use(serveStatic(__dirname))

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
  console.log('Server is runnint on port ' + PORT)
})
