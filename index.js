var http = require('http'),
    httpProxy = require('http-proxy');

//
// Create a proxy server with custom application logic
//
var proxy = httpProxy.createProxyServer({});

//
// Create your custom server and just call `proxy.web()` to proxy
// a web request to the target passed in the options
// also you can use `proxy.ws()` to proxy a websockets request
//
var server = http.createServer(function(req, res) {
  // You can define here your custom logic to handle the request
  // and then proxy the request.
  delete req.headers.host
  delete req.headers.referer
  req.headers['x-real-ip'] = '220.181.38.251'
  const url = req.url;
  if (url.indexOf('/?url=http') >= 0) {
    const finalUrl = url.replace('/?url=', '');
    req.url = '';
    proxy.web(req, res, { target: 'https://api.xingzou.art/poetryapi/historytoday/query' });
  } else {
    res.writeHead(404, {
      'Connection': 'close'
    });
    res.end('');
  }
});

console.log("listening on port 5050")
server.listen(5050);
