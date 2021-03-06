const express = require('express');
const router = express.Router();
const sharp = require('sharp')
const download = require('image-downloader')
const getFileNameExtension = require('../helpers/FileExtensionHelper')
const verifyToken = require('../middlewares/verifyToken');

const fs = require('fs')

const imageDownloadsFolder = 'public/img/downloads'
const thumbnailsFolder = 'public/img/thumbnails'


//route to generate thumbnails
router.post('/', verifyToken, (req, res, next)=>{
const ImageName = getFileNameExtension(req.body.imageLink)
const imageLink = req.body.imageLink

  const options = {
    url: imageLink,
    dest: imageDownloadsFolder               
  }

download.image(options)
   .then(({ filename }) => {
        // Resize image to 50x50 and save to desired location.
        // Return conversion status to user.
        sharp(filename)
          .resize(50, 50)
          .toFile(thumbnailsFolder+'/'+ImageName, (err) => {
            if (err) { 
            console.log('some errors occured') 
          }

            //return the generated thumbnail
            fs.readFile(thumbnailsFolder+'/'+ImageName, function(err, data) {
              if (err) 
                //set the response headers
                res.writeHead(200, {'Content-Type': 'image/jpeg'});
                // Send file  to the client.
                res.end(data); 
               })
          })
          .catch((err) => {
            res.status(500).json({ 
              error: 'Could not generate thumbnail, check the link you pasted or try again later' })
          })
     })
})

module.exports=router

