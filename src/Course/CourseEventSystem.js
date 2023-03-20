import Axios from "axios";

export const getRequiredCourse = async (courseID) =>{
    console.log(courseID)
    let course = await Axios.get('http://localhost:5000/getCOURSE_INFO?id='+courseID);
    console.log(course)
    if(course){
     return course.data;
    }else {
        return [];
    }
}