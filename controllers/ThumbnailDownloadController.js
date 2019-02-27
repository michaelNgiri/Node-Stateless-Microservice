const express = require('express');
const router = express.Router();
const sharp = require('sharp')
const download = require('image-downloader')
const getFileExtension = require('../helpers/FileExtensionHelper')


const mimes = ['jpg', 'jpeg', 'rtf', 'tif', 'gif', 'png', 'svg']

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
            return res.status(200).json({
              status: 200+' success',
              thumbnail: thumbnailsFolder,
            })
          })
      })
      .catch(() => {
        res.status(500).json({ 

          error: 'Could not generate thumbnail, check the link you pasted or try again later' })
      })
 
})


module.exports=router

