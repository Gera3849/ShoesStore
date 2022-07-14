const express = require('express');
const app = express();

const dotenv = require("dotenv");
const session = require('express-session');
dotenv.config();
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
// app.use(session({
//     secret: 'oneboy',
//     saveUninitialized: true,
//     resave: true
// }));

const PORT = process.env.PORT || 5000;

app.use('/', require('./routes/auth'));
app.use('/admin', require('./routes/admin'));
app.use('/user', require('./routes/user'));
app.use(express.static(__dirname + '/public'));



app.listen(PORT, function () {
    console.log('Server has started at port 5000');
});