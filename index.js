var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var upload = require('express-fileupload');

var common_route = require('./routes/common');
var employee_route = require('./routes/employee');
var company_route = require('./routes/company ');
var admin_route = require('./routes/admin');

var env = require('dotenv')
env.config();

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));


app.use(upload());
app.use(session({
  secret: 'your-secret-key',
  resave: true,
    saveUninitialized: true 
}));

app.use('/', common_route);
app.use('/employee', employee_route);
app.use('/company', company_route);
app.use('/admin', admin_route);


app.listen (process.env.PORT);