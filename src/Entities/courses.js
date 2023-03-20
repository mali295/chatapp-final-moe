import {Course} from "./course";
import { Assignment } from "./assignment";
import { Quiz } from "../Entities/quiz";
import { Lab } from "../Entities/lab";
import { Exam } from "./exam";
const fs = require('fs')

//let JSON_INFO = require("./classes2")



export class Courses
{
    constructor(courses){
      

      this.courseList = []

      for(let c in courses){

        const course = new Course(courses[c].courseCode);

        course.setName(courses[c].courseName);
        course.setProf(courses[c].prof);
        course.setTerm(courses[c].term);

        course.setSections(courses[c].sections);
        
        for(let s in courses[c].sectionProfs){
            let str = courses[c].sectionProfs[s]
            let num = str.split(":")[0];
            let prof = str.split(":")[1];
            course.setSectionProfs(num, prof);
        }

        course.setTutorialGroups(courses[c].tutorialGroups);

        for(let t in courses[c].tutorialProfs){
          let str = courses[c].tutorialProfs[t]
          let num = str.split(":")[0];
          let prof = str.split(":")[1];
          course.setTutorialProfs(num, prof);
        }

        course.setLabGroups(courses[c].labGroups)

        for(let l in courses[c].labProfs){
          let str = courses[c].labProfs[l]
          let num = str.split(":")[0];
          let prof = str.split(":")[1];
          course.setLabProfs(num, prof);
        }


        for(let a in courses[c].assignments){

    

        let name = courses[c].assignments[a].name
        let grade = courses[c].assignments[a].grade
        let weight = courses[c].assignments[a].weight
        let due = courses[c].assignments[a].due
        let submitted = courses[c].assignments[a].submitted

        let assignment = new Assignment(name, grade, weight, due, submitted)


        course.addAssignment(assignment)
        }

        for(let q in courses[c].quizzes){
        let name = courses[c].quizzes[q].name
        let grade = courses[c].quizzes[q].grade
        let weight = courses[c].quizzes[q].weight
        let due = courses[c].quizzes[q].due
        let submitted = courses[c].quizzes[q].submitted

        let quiz = new Quiz(name, grade, weight, due, submitted)

        course.addQuiz(quiz)
        }

        for(let l in courses[c].labs){
        let name = courses[c].labs[l].name
        let grade = courses[c].labs[l].grade
        let weight = courses[c].labs[l].weight
        let due = courses[c].labs[l].due
        let submitted = courses[c].labs[l].submitted

        let lab = new Lab(name, grade, weight, due, submitted);

        course.addLab(lab)
        }

        for(let e in courses[c].exams){
        let name = courses[c].exams[e].name
        let grade = courses[c].exams[e].grade
        let weight = courses[c].exams[e].weight
        let due = courses[c].exams[e].due
        let submitted = courses[c].exams[e].submitted

        let exam = new Exam(name, grade, weight, due, submitted)

        course.addExam(exam)
        }

        

        // let data = JSON_INFO[c][c2].data;
        // course.setData(data);
        this.addCourse(course);
      
    }
    }

    getCourseList(){
        return this.courseList;
    }

    getCourseCodes(){
      let courseNames = [];
      for(let c in this.courseList){
        courseNames[c] = this.courseList[c].courseCode
      }
      return courseNames;
    }

      addCourse(course){
        this.courseList.push(course)
      }
        

    deleteCourse(courseName){
        let t = true;

        for(let c in this.courseList){
            if(courseName === this.courseList[c].courseCode ){
                
              console.log("in list");
                console.log(this.courseList.indexOf(this.courseList[c]))

                let index = this.courseList.indexOf(this.courseList[c])
                this.courseList.splice(index, 1)
              t = false;
            }
          }
          if(t){
            console.log("not in list");
          }
    }

    getCourse(name){
      for(let c in this.courseList){
        if(name == this.courseList[c].courseCode)
          return this.courseList[c]
      }
    }

    editCourseName(oldName, newName){

      for(let c in this.courseList){
        if(oldName === this.courseList[c].courseCode ){

          let course = this.courseList[c]
          course.setCode(newName);

        }
      }
      
    }

    editCourseData(oldName, newData){
      let t = true;

      for(let c in this.courseList){
        if(oldName === this.courseList[c].courseName ){

          let course = this.courseList[c]
          course.setData(JSON.parse(newData));

        }
      }
      
    }

    //delete, edit, ...
   
}