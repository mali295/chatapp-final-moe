

const express = require('express')
const profileRoutes = express.Router()
const fs = require('fs')

const multer = require('multer')
const profileNameWrite = './JSONdata/profiles.json'
const profilesName = '../JSONdata/profiles.json'
const profiles = require(profilesName)

const upload = multer({dest: './Images/'})
/*const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads')
    }
})*/

profileRoutes.route('/uploadFileAPI', upload.single('file')).post(async function (req, res, next) {
    let {user} = req.body
    let type = 'image'
    const file = req.file
    if(!file) {
        const error = new Error('No File')
        return next(error)
    }
    profiles[user][type]=file.filename
    fs.writeFile(profilesName, JSON.stringify(profiles, null, 2), function writeJSON(err) {
        if (err) return console.log(err)
        console.log('writing to ' + profilesName)
    })
    res.send(file)
})

profileRoutes.route('/getJSON').get(function (req, res) {
    let {id} = req.query


    try {
        const response = profiles[id]
        res.status(200).json(response)
    } catch(e) {
        res.status(400).json({error:e})
    }
    
})

profileRoutes.route('/updateJSON').put(function (req, res) {
    let {item, value, user} = req.body
    
    profiles[user][item] = value
    fs.writeFile(profileNameWrite, JSON.stringify(profiles, null, 2), function writeJSON(err) {
        if (err) return console.log(err)
            console.log('writing to ' + profilesName)
        
    })
    
})


module.exports = profileRoutes