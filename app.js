const express = require('express');
const app = express();


const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require('dotenv').config();

//configure body-parser for express

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

//import authentication module
const auth = require('./controllers/AuthController')
app.use('/auth', auth)











app.get('/', (req, res)=>{
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('welcome');

});








//set the port through env
const port = process.env.PORT || 3000;


app.listen(port, (err)=>{
    if(err){
        console.log(err);
    }
    console.log('server started at port: ' + port);
});