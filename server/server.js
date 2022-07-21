const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(fileUpload());
app.use(cors());


const dotenv = require("dotenv");
dotenv.config();
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 5000;

app.use('/', require('./routes/auth'));
app.use('/admin', require('./routes/admin'));
app.use('/user', require('./routes/user'));



app.listen(PORT, function () {
    console.log('Server has started at port 5000');
});