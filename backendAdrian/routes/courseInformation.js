const express = require('express')
const courseRoutes = express.Router()
const fs = require('fs')

const coursesName = '../JSONdata/courses.json'
const courses = require(coursesName)

const requiredCoursesName = '../JSONdata/requiredCourses.json'
const requiredCourses = require(requiredCoursesName)


courseRoutes.route('/getCourses').get(function (req, res) {
    let {id} = req.query
    try {
        const response = courses[id]
        res.status(200).json(response)
    } catch(e) {
        res.status(400).json({error:e})
    }
})

courseRoutes.route('/getRequiredCourses').get(function (req, res) {
    let {program} = req.query
    let response = []
    for (let i=0; i < program.length; i++) {
        response.push(requiredCourses[program[i]])
    }
    try {
        res.status(200).json(response)
    } catch(e) {
        res.status(400).json({error:e})
    }
})


module.exports = courseRoutes