var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');

var app = express();

const route = require('./routes/route');

mongoose.connect('mongodb://blog:arb1tech@ds149373.mlab.com:49373/blog');

mongoose.connection.on('connected', () => {
    console.log('Connected to database');
})
mongoose.connection.on('error', (err) => {
    if (err) {
        console.log('Error in databse connection:' + err);
    }
    console.log('Connected to database');
})
const port = process.env.PORT || 8080;


app.use(cors());

app.use(bodyparser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', route);

app.get('/', (req, res) => {
    res.send('Test');
})

app.listen(port, () => {
    console.log('server started at port', +port);
});