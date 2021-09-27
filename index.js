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
  const url = req.url;
  // console.log('param url: ', url);
  if (url.indexOf('/?url=') >= 0) {
    const sourceUrl = url.replace('/?url=', '');
    const finalUrl = decodeURIComponent(sourceUrl);
    // console.log('source url: ', sourceUrl);
    // console.log('proxy url: ', finalUrl);
    req.url = '';
    req.headers['x-real-ip'] = '220.181.38.251'
    proxy.web(req, res, { target: finalUrl, timeout: 120000 });
  } else {
    res.writeHead(404, 'no proxy url', {
      'Connection': 'close'
    });
    res.end('');
  }
});

console.log("listening on port 5050")
server.listen(5050);
