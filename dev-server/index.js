var express = require('express');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpack = require('webpack');

var compiler = webpack(require('../webpack.config.js'));
var handler = require('./handler');
var routes = require('../src/routes.json');

// Create server
var app = express ();

// Bind routes
for (var routeId in routes) {
    (function (route) {
        app.get(new RegExp(route.pattern), handler(route));
    })(routes[routeId]);
}


app.use(webpackDevMiddleware(compiler, {
    headers: {
        'X-From-Webpack': true
    }
}));

var port = 8333;
app.listen(port, function () {
    process.stdout.write('Listening on port ' + port);
});
