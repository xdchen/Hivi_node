var express = require('express');
var ejs = require('ejs');
var app = express();

app.engine('.html', ejs.__express);

app.set('views', __dirname + '/views');

app.set('view engine', 'html');

app.use(express.static(__dirname + '/public'));

app.use(express.cookieParser());

app.use(express.bodyParser());

app.use(express.session({ secret: 'hivinte' }));

app.use(express.errorHandler());

var router = require('./router');

router.route(app);

if (!module.parent) {
    app.listen(3000);
    console.log('Express app started on port 3000');
}