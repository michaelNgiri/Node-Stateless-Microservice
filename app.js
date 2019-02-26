const express = require('express');
const app = express();

require('dotenv').config();





app.get('/', (req, res)=>{
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('welcome');

});






const port = process.env.PORT || 3000;


app.listen(port, (err)=>{
    if(err){
        console.log(err);
    }
    console.log('server started at port: ' + port);
});