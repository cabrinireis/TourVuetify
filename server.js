var history = require('connect-history-api-fallback');

var express = require('express')
var path = require('path')
var serverStatic = require('serve-static')

var app = express()
app.use(history());  
app.use(serverStatic(path.join(__dirname,`dist`)))

var port = process.env.PORT || 5000
app.listen(port)
console.log('server started' + port)