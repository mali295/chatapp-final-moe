const classesName = './classes2.json'
const classes = require(classesName)

const teachingStaff = './instructors.json'
const staff = require(teachingStaff)

const express = require('express')

const app = express()
const port = process.env.port || 5000
app.use(express.json())
const {static, response} = require('express')
app.use('/images/', static('./Images/'))
const moment = require("moment");
const cors = require('cors')
app.use(cors())
const fs = require("fs");
app.use(express.json())
const announce = "./announcements.json";
const announces = require(announce);

const profilesName = "./profiles.json";
const profiles = require(profilesName);
const events = "./events.json";
const eventss = require(events);


/**
 * ROUTES
 */
const profileRoutes = require('./routes/profileInformation')
app.use('/profile', profileRoutes)

const buttonRoutes = require('./routes/buttonInformation')
app.use('/button', buttonRoutes)

const courseRoutes = require('./routes/courseInformation')
app.use('/course', courseRoutes)



// //UPDATING PROFILES IMAGE
// app.post('/uploadFileAPI', upload.single('file'), (req, res, next) => {
//     let {user} = req.body
//     let type = 'image'
//     const file = req.file
//     console.log(file.filename)
//     if(!file) {
//         const error = new Error('No File')
//         return next(error)
//     }
//     profiles[user][type]=file.filename
//     fs.writeFile(profilesName, JSON.stringify(profiles, null, 2), function writeJSON(err) {
//         if (err) return console.log(err)
//         console.log('writing to ' + profilesName)
//     })
//     res.send(file)
// })

//Test backend
app.get('/', (req,res) => {
    res.send('Backend Running')
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

//JSON Commands profiles
app.get('/getJSON', (req, res) => {
    let {id} = req.query


    try {
        const response = profiles[id]
        res.status(200).json(response)
    } catch(e) {
        res.status(400).json({error:e})
    }
    
})

//JSON Commands courses
app.get('/getJSON_INFO', (req, res) => {
    let {id} = req.query

    try {
        const response = classes[id]
        res.status(200).json(response)
    } catch(e) {
        res.status(400).json({error:e})
    }
    
})

app.get('/getINSTRUCTORS_INFO', (req, res) => {
    let {id} = req.query


    try {
        const response = staff[id];
        
        res.status(200).json(response)
    } catch(e) {
        res.status(400).json({error:e})
    }
    
})

//COURSE TEMPLATE PAGE GET SPECIFIC COURSE INFO
app.get('/getCOURSE_INFO', (req, res) => {
    let {id} = req.query
    console.log(id)

    try{
        for(let c in classes["courses"]){
            if(id == classes["courses"][c].courseCode.replace(/\s/g, "")){
                const response = classes["courses"][c];
                res.status(200).json(response)
            }
        }
        
    } catch(e) {
        res.status(400).json({error:e})
    }
})

//update profiles
app.put('/updateJSON', async function(req, res) {
    let {item, value, user} = req.body
    
    profiles[user][item] = value
    fs.writeFile(profilesName, JSON.stringify(profiles, null, 2), function writeJSON(err) {
        if (err) return console.log(err)
            console.log('writing to ' + profilesName)
        
    })
})

//update courses
app.post('/updateCOURSESJSON', async function(req, res) {
  
    classes["courses"] = JSON.parse(req.body.values);
    
    
    fs.writeFile(classesName, JSON.stringify(classes, null, 2), function writeJSON(err) {
        if (err) return console.log(err)
        console.log('writing to ' + classesName)
    })
})

//get courses
app.get('/getCourses', (req, res) => {
    let {id} = req.query
    try {
        const response = courses[id]
        res.status(200).json(response)
        console.log(response);
    } catch(e) {
        res.status(400).json({error:e})
    }
    
})



//get required courses
app.get('/getRequiredCourses', (req, res) => {
    let {id, program} = req.query
    try {
        let required = requiredCourses[program]
        let currentCourses = []
        for (let i=0; i < courses[id].length; i++) {
            if (courses[id][i].status === "Passed") {
                currentCourses.push(courses[id][i].id)
            }
        }
        let amountCompleted = 0
        for (let i=0; i<required.length; i++) {
            for (let x=0; x<currentCourses.length; x++) {
                if (required[i] === currentCourses[x]) {
                    amountCompleted++
                }
            }
        }

        const response = Math.trunc((amountCompleted/required.length)*100)
        res.status(200).json(response)
    } catch(e) {
        res.status(400).json({error:e})
    }
    
})

/**
 * FOR USER BUTTONS
 */

 app.get('/getUserButtons', (req, res) => {
    let {id} = req.query
    try {
        const response = userButtons[id]
        res.status(200).json(response)
    } catch(e) {
        res.status(400).json({error:e})
    }
    
})

app.put('/addUserButton', async function(req, res) {
    let {url, name, user} = req.body
    userButtons[user][userButtons[user].length] = {"buttonName": name.toString(), "buttonSRC": `https://s2.googleusercontent.com/s2/favicons?domain=${url}`, "link":`https://${url}`}
    fs.writeFile(userButtonsName, JSON.stringify(userButtons, null, 2), function writeJSON(err) {
        if (err) return console.log(err)
        console.log('writing to ' + userButtonsName)
    })
})


//ALI API CALLS hreeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee333

app.put("/updateJSON", async function (req, res) {
    let { item, value, user } = req.body;
    profiles[user][item] = value;
    fs.writeFile(
      profilesName,
      JSON.stringify(profiles, null, 2),
      function writeJSON(err) {
        if (err) return console.log(err);
        console.log("writing to " + profilesName);
      }
    );
  });
  
  app.get("/events/:type", async (req, res) => {
    let typeName = req.params.type;
    console.log(typeName);
    const data = eventss.filter((el) => el.eventType === typeName);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(200).json([]);
    }
  });
  
  app.post("/events", async function (req, res) {
    eventss.push({
      id: eventss.length + 1,
      ...req.body,
    });
    fs.writeFile(events, JSON.stringify(eventss), function writeJSON(err) {
      if (err) return console.log(err);
      console.log("writing to " + profilesName);
      res.status(200).json("Updated");
    });
  });
  
  app.get("/upcomingEvents", async (req, res) => {
    let currentDate = moment();
  
    let weekStart = currentDate.clone().startOf("week");
    let weekEnd = currentDate.clone().endOf("week");
  
    let currentWeekEvents = [];
    eventss.sort(function (a, b) {
      return new Date(b.dueDate) - new Date(a.dueDate);
    });
    eventss.forEach((el) => {
      el.dueDate = moment(el.dueDate);
      if (
        (el.eventType !== "Announcements" &&
          moment(el.dueDate).isBetween(weekStart, weekEnd)) ||
        moment(el.dueDate).isSame(weekStart) ||
        moment(el.dueDate).isSame(weekEnd)
      ) {
        currentWeekEvents.push({ ...el });
      }
    });
  
    return res.status(200).json(currentWeekEvents);
  });
  
  app.post("/singledate", async (req, res) => {
    let currentDate = moment(req.body.date);
  
    let dayStart = currentDate.clone().startOf("day");
    let dayEnd = currentDate.clone().endOf("day");
    let currentWeekEvents = [];
    eventss.forEach((el) => {
      el.dueDate = moment(el.dueDate);
      if (
        moment(el.dueDate).isBetween(dayStart, dayEnd) ||
        moment(el.dueDate).isSame(dayStart) ||
        moment(el.dueDate).isSame(dayEnd)
      ) {
        currentWeekEvents.push({
          ...el,
          dueDate: moment(el.dueDate).format("MMMM Do YYYY, h:mm:ss a"),
        });
      }
    });
    return res.status(200).json(currentWeekEvents);
  });
  
  app.get("/upcomingEventsAll", async (req, res) => {
    let currentDate = moment();
  
    let weekStart = currentDate.clone().startOf("week");
    let weekEnd = currentDate.clone().add(12, "week").endOf("week");
  
    let currentWeekEvents = [];
    eventss.sort(function (a, b) {
      return new Date(b.dueDate) - new Date(a.dueDate);
    });
    eventss.forEach((el) => {
      el.dueDate = moment(el.dueDate);
      if (
        (el.eventType !== "Announcement" &&
          moment(el.dueDate).isBetween(weekStart, weekEnd)) ||
        moment(el.dueDate).isSame(weekStart) ||
        moment(el.dueDate).isSame(weekEnd)
      ) {
        currentWeekEvents.push({ ...el, dueDate: moment(el.dueDate) });
      }
    });
  
    return res.status(200).json(currentWeekEvents);
  });
  
  app.get("/announcements", async (req, res) => {
    let typeName = req.params.type;
    console.log(typeName);
    let data = [];
    announces.forEach((el) => {
      data.push({
        ...el,
        creationDate: moment(el.creationDate).format("MMMM Do YYYY, h:mm:ss a"),
      });
    });
  
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(200).json([]);
    }
  });
  
  app.post("/announcements", async function (req, res) {
    announces.push({
      id: announces.length + 1,
      ...req.body,
    });
    fs.writeFile(announce, JSON.stringify(announces), function writeJSON(err) {
      if (err) return console.log(err);
      console.log("writing to Announcement");
      res.status(200).json("Updated");
    });
  });
  
//To here
