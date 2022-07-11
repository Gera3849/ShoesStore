const express = require('express');
const app = express();
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 5000;

app.use('/', require('./routes/login'));
app.use('/admin', require('./routes/admin'));
app.use('/user', require('./routes/user'));
app.use(express.static(__dirname + '/public'));

app.listen(PORT, function() {
    console.log('Server has started at port 5000');
});