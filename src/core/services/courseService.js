export const Courses = [
    'COURSE 1',
    'COURSE 2',
    'COURSE 3',
    'COURSE 4',
    'COURSE 5',
];


export const addCourse = (values) =>{
    Courses.push(values);
    // Post request here
}
export const getAllCourses = (index) =>{
    return Courses;
    // get request here
}

export const getCourse = (index) =>{
    return Courses[index];
    // delete request here
}
export const updateCourse = (index,data) =>{
    return Courses[index] = data;
    // put request here
}

export const deleteCourse = (index) =>{
    Courses.splice(index,1);
    // delete request here
}