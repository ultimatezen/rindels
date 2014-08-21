var fs = require('fs');
var config = require('config');
var koa = require('koa');
var routing = require('koa-routing');
var koaBody = require('koa-body');
var app = koa();


app.use(function * (next) {
    this.res.type = 'application/json';
    this.body = {};
    yield next;
});

app.use(routing(app));
app.use(koaBody());

// Setup modules
var apiPath = './modules';
var files = fs.readdirSync(apiPath);

files.forEach(function (file) {
    var module = require(apiPath + '/' + file);

    if (typeof module.setup === 'function') {
        module.setup(app);
    }
});

console.log('Setup complete');

app.listen(config.server.port);
console.log('Listening on port ' + config.server.port);
