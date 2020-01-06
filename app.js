var http = require('http')
var fs = require('fs')
var template = require('art-template')
var url = require('url')
var comments = []

http
  .createServer(function (req, res) {
    var urlObj = url.parse(req.url, true)
    var pathName = urlObj.pathname

    if (pathName == '/') {
      fs.readFile('./views/index.html', function (err, data) {
        if (err) {
          return res.end('404')
        }
        let htmlStr = template.render(data.toString(), {
          comments: comments
        })
        res.end(htmlStr)
      })
    } else if (pathName.indexOf('/public/') == 0) {
      fs.readFile('.' + pathName, function (err, data) {
        if (err) {
          return res.end('404 not found')
        }
        res.end(data)
      })
    } else if (pathName == '/post') {
      fs.readFile('./views/post.html', function (err, data) {
        if (err) {
          return res.end('404')
        }
        res.end(data)
      })
    } else if (pathName === '/pinglun') {
      let comment = urlObj.query
      comment.dateTime = new Date()
      comments.unshift(comment)
      res.statusCode = 302
      res.setHeader('location','/')
      res.end()
    } else {
      fs.readFile('./views/404.html', function (err, data) {
        if (err) {
          return res.end('404')
        }
        res.end(data)
      })
    }
  })
  .listen(3000, function () {
    console.log('running...')
  })
