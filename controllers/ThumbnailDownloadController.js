const express = require('express');
const router = express.Router();
const sharp = require('sharp')
const download = require('image-downloader')


const mimes = ['jpg', 'jpeg', 'rtf', 'tif', 'gif', 'png', 'svg']

const imageDownloadsFolder = 'public/img/downloads'
const thumbnailsFolder = 'public/img/thumbnails'


// const { fileExtension } = (url) => { return url.split('.').pop().split(/\#|\?/)[0] }

// Resize image on post.
//route to patch json
router.post('/', (req, res, next)=>{
 
const options = {
  url: req.body.imageLink,
  dest: thumbnailsFolder                
}
download.image(options)
  .then(({ filename, image }) => {
    console.log('File saved to', filename)
  })
  .catch((err) => {
    console.error(err)
  })
 
})


module.exports=router

