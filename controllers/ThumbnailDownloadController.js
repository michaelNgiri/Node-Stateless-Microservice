const express = require('express');
const router = express.Router();
const sharp = require('sharp')
const download = require('image-downloader')
const getFileExtension = require('../helpers/FileExtensionHelper')

const fs = require('fs')

const imageDownloadsFolder = 'public/img/downloads'
const thumbnailsFolder = 'public/img/thumbnails'


//route to generate thumbnails
router.post('/', (req, res, next)=>{
const ImageName = getFileExtension(req.body.imageLink)

  const options = {
    url: req.body.imageLink,
    dest: imageDownloadsFolder               
  }

download.image(options)
   .then(({ filename }) => {
        // Resize image to 50x50 and save to desired location.
        // Return conversion status to user.
        sharp(filename)
          .resize(50, 50)
          .toFile(thumbnailsFolder+'/'+ImageName, (err) => {
            if (err) { return next(err) }

            //return the generated thumbnail
            fs.readFile(thumbnailsFolder+'/'+ImageName, function(err, data) {
              if (err) throw err; // Fail if the file can't be read.
             
                //set the response headers
                res.writeHead(200, {'Content-Type': 'image/jpeg'});
                // Send the file data to the cliemt.
                res.end(data); 
               })
          })
          .catch(() => {
            res.status(500).json({ 

              error: 'Could not generate thumbnail, check the link you pasted or try again later' })
          })
     })
})

module.exports=router

