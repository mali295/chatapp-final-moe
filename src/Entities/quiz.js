export class Quiz
{
    constructor(name, grade, weight, due, submitted){

        this.name = name;
        this.grade = grade;
        this.weight = weight;
        this.due = due;
        this.submitted = submitted;
        
    }

    getName(){return this.name;}

    setName(name){this.name = name}

    getGrade(){return this.grade;}

    setGrade(grade){this.grade=grade}

    getWeight(){return this.weight;}

    setWeight(weight){this.weight = weight;}

    getDue(){return this.due;}

    setDue(due){this.due = due}
    
    getSubmission(){return this.submitted}

    setSubmission(submitted){this.submitted = submitted}

}