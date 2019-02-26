const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const jsonpatch = require('fast-json-patch')
const { body, validationResult } = require('express-validator/check')
const validateJsonObjects = require('../middlewares/validate-json-objects')


//route to patch json
router.patch('/', (req, res, next)=>{

    // validateJsonObjects(req.body)
    // retrieve json from request body
    const json = JSON.parse(req.body.json)
    const jsonPatch = JSON.parse(req.body.jsonPatch)

    // Save patch in new variable.
    const patchedJsonObject = jsonpatch.applyPatch(json, jsonPatch).newDocument

    //send patched json to user
    res.status(200).json({ patchedJsonObject })
 
})

module.exports=router