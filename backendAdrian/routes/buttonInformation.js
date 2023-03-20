const express = require('express')
const buttonRoutes = express.Router()
const fs = require('fs')

const userButtonsName = '../JSONdata/userButtons.json'
const userButtonsNameWrite = './JSONdata/userButtons.json'
const userButtons = require(userButtonsName)


buttonRoutes.route('/getUserButtons').get(function (req, res) {
    let {id} = req.query
    try {
        const response = userButtons[id]
        res.status(200).json(response)
    } catch(e) {
        res.status(400).json({error:e})
    }
})

buttonRoutes.route('/addUserButton').put(function (req, res) {
    let {url, name, user} = req.body
    userButtons[user][userButtons[user].length] = {"buttonName": name.toString(), "buttonSRC": `https://s2.googleusercontent.com/s2/favicons?domain=${url}`, "link":`https://${url}`}
    fs.writeFile(userButtonsNameWrite, JSON.stringify(userButtons, null, 2), function writeJSON(err) {
        if (err) return console.log(err)
        console.log('writing to ' + userButtonsName)
    })
})

module.exports = buttonRoutes