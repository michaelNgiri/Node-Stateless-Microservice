const express = require('express');
const router = express.Router();
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginIsValid = require('../middlewares/verify-user');




router.post('/login', async (req, res) => { 
    //check if the request has a username and password
    console.log(req.body);
    if(loginIsValid(req.body) == true){
   //login the user
          const user = req.body.username;
          const authToken = jwt.sign(user, 'secret_key')
            //set cookies
            res.cookie( 'Authorization',authToken, {
            httpOny:true,
                      //signed:true,
                        //secure:secureCookie
                    });
                    res.status(200).json({
                        status:200,
                        message: "login successful 😊",
                        Authorization:authToken,
                        user:user
                    })
            }else {
                    //return authentication failure error
                    res.status(401).json({
                        status:401,
                        message:"login details missing 😞"
                    });
        }
});


module.exports=router;