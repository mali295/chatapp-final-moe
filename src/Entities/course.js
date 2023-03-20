import {Assignment} from "./assignment.js";
import {Quiz} from "./quiz.js";
import {Lab} from "./lab.js";
import {Exam} from "./exam.js";


export class Course
{
    constructor(courseCode = "", assignments = [], quizzes = [], labs = [], exams = [], courseName = "", term = "", 
                sections = "0", sectionProfs = [], tutorialGroups = "0", tutorialProfs = [], labGroups = "0", 
                labProfs = [], prof = ""){

        this.courseCode = courseCode;
        
        this.assignments = assignments;
        this.quizzes = quizzes;
        this.labs = labs;
        this.exams = exams;

        this.courseName = courseName; 
        this.term = term;

        this.sections = sections;
        this.sectionProfs = sectionProfs;

        this.tutorialGroups = tutorialGroups;
        this.tutorialProfs = tutorialProfs;

        this.labGroups = labGroups;
        this.labProfs = labProfs;

        this.prof = prof;
        
    }

    setCode(name){this.courseCode = name;}

    getCode(){return this.courseCode}

    setName(name){this.courseName = name}

    setTerm(term){this.term = term}

    setSections(sections){this.sections = sections}

    setTutorialGroups(tutorialGroups){this.tutorialGroups = tutorialGroups;}
    
    setLabGroups(labGroups){this.labGroups = labGroups;}
    
    addAssignment(assignmentName, grade, weight, due, submission){
        let assignment = new Assignment(assignmentName, grade, weight, due, submission);
        this.assignments.push(assignment)
    }

    addAssignment(assignment){
        this.assignments.push(assignment)
    }

    getAssignments(){
        return this.assignments
    }

    editAssignment(assignment, data){
        for(let a in this.assignments){
            if(assignment == this.assignments[a]){
                
                switch(data){
                    case "name":
                        this.assignments[a].setName(data);
                        break;
                    case "grade":
                        this.assignments[a].setGrade(data);
                        break;
                    case "weight":
                        this.assignments[a].setWeight(data);
                        break;
                    case "due":
                        this.assignments[a].setDue(data);
                        break;
                    case "submission":
                        this.assignments[a].setSubmission(data);
                        break;

                }

            }
        }
    }

    deleteAssignment(assignment){
        for(let a in this.assignments){
            if(assignment == this.assignments[a]){
            
                let index = this.assignments.indexOf(this.assignments[a])
                this.assignments.splice(index, 1)
            }
        }
    }

    addQuiz(quizName, grade, weight, due, submission){
        let quiz = new Quiz(quizName, grade, weight, due, submission);
        this.quizzes.push(quiz)
    }

    addQuiz(quiz){
        this.quizzes.push(quiz)
    }

    editQuiz(quiz, data){
        for(let q in this.quizzes){
            if(quiz == this.quizzes[q]){
                
                switch(data){
                    case "name":
                        this.quizzes[q].setName(data);
                        break;
                    case "grade":
                        this.quizzes[q].setGrade(data);
                        break;
                    case "weight":
                        this.quizzes[q].setWeight(data);
                        break;
                    case "due":
                        this.quizzes[q].setDue(data);
                        break;
                    case "submission":
                        this.quizzes[q].setSubmission(data);
                        break;

                }

            }
        }
    }

    deleteQuiz(quiz){
        for(let q in this.quizzes){
            if(quiz == this.quizzes[q]){
            
                let index = this.quizzes.indexOf(this.quizzes[q])
                this.quizzes.splice(index, 1)
            }
        }
    }

    addLab(labName, grade, weight, due, submission){
        let lab = new Lab(labName, grade, weight, due, submission);
        this.labs.push(lab)
    }

    addLab(lab){
        this.labs.push(lab)
    }

    editLab(lab, data){
        for(let l in this.labs){
            if(lab == this.labs[l]){
                
                switch(data){
                    case "name":
                        this.labs[l].setName(data);
                        break;
                    case "grade":
                        this.labs[l].setGrade(data);
                        break;
                    case "weight":
                        this.labs[l].setWeight(data);
                        break;
                    case "due":
                        this.labs[l].setDue(data);
                        break;
                    case "submission":
                        this.labs[l].setSubmission(data);
                        break;

                }

            }
        }
    }

    deleteLab(lab){
        for(let l in this.labs){
            if(lab == this.labs[l]){
            
                let index = this.labs.indexOf(this.labs[l])
                this.labs.splice(index, 1)
            }
        }
    }

    addExam(examName, grade, weight, due, submission){
        let exam = new Exam(examName, grade, weight, due, submission);
        this.exams.push(exam)
    }

    addExam(exam){
        this.exams.push(exam)
    }

    editExam(exam, data){
        for(let e in this.exams){
            if(exam == this.exams[e]){
                
                switch(data){
                    case "name":
                        this.exams[e].setName(data);
                        break;
                    case "grade":
                        this.exams[e].setGrade(data);
                        break;
                    case "weight":
                        this.exams[e].setWeight(data);
                        break;
                    case "due":
                        this.exams[e].setDue(data);
                        break;
                    case "submission":
                        this.exams[e].setSubmission(data);
                        break;

                }

            }
        }
    }

    deleteExam(exam){
        for(let e in this.exams){
            if(exam == this.exams[e]){
            
                let index = this.exams.indexOf(this.exams[e])
                this.exams.splice(index, 1)
            }
        }
    }

    setSectionProfs(num, profName){
        let pair = `${num}:${profName}`;
        this.sectionProfs.push(pair);
    }

    setTutorialProfs(num, profName){
        let pair = `${num}:${profName}`;
        this.tutorialProfs.push(pair);
    }

    setLabProfs(num, profName){
        let pair = `${num}:${profName}`;
        this.labProfs.push(pair);
    }

    setProf(prof){
        this.prof = prof;
    }

    getProf(){
        return this.prof;
    }

    
   
}


    

