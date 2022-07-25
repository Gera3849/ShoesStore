const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const session = require('express-session');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();
const passport = require('passport');
const { loginCheck } = require("./auth/passport");
loginCheck(passport)
// Mongo DB conncetion
const database = process.env.MONGOLAB_URI;
mongoose.connect(database, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('e don connect'))
    .catch(err => console.log(err));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'shoes',
    saveUninitialized: true,
    resave: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));
app.use(fileUpload());
app.use(cors());


app.set('view engine', 'ejs');

const PORT = process.env.PORT || 5000;

app.use('/', require('./routes/auth/login'));
app.use('/login', require('./routes/auth/login'));
app.use('/signup', require('./routes/auth/signup'));
app.use('/dashboard', require('./routes/dashboard'));



app.listen(PORT, function () {
    console.log('Server has started at port 5000');
});