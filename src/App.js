import { createContext, useEffect, useState, useReducer } from "react";
import CourseCard from "./components/CourseCard";
import CourseForm from "./components/CourseForm";

export const sample = createContext()

function App() {
  const [myCourses, setMyCourse] = useState([]);
  const [GPA, setGPA] = useState(4.0);
  useEffect(() => {
    const temp = localStorage.getItem('f')
    if(temp!=null){
      setMyCourse(JSON.parse(temp))
      calculateGPA(JSON.parse(temp))
    }
  },[])
  useEffect(() => {
    localStorage.setItem('f',JSON.stringify(myCourses))
  },[myCourses]) 

  function calculateGPA(cc) {
    var r_gpa = 0
    var r_cre  = 0 
    var cal_gpa = 0
    cc.forEach((item) => {
      switch(item.grd){
        case 'A' :
          r_gpa = 4
          break;
        case 'B+' :
          r_gpa = 3.5
          break;
        case 'B' :
          r_gpa = 3
          break;
        case 'C+' :
          r_gpa = 2.5
          break;
        case 'C' :
          r_gpa = 2
          break;
        case 'D+' :
          r_gpa = 1.5
          break;
        case 'D' :
          r_gpa = 1
          break;
        case 'F' :
          r_gpa = 0
          break;
      }  
      r_cre += Number(item.crd) 
      cal_gpa += r_gpa * Number(item.crd)
    });
    setGPA(cal_gpa / r_cre) 
  }

  function addCourse(inputData) {
    console.log(inputData)
    const course = [...myCourses,inputData]
    setMyCourse(course)
    calculateGPA(course);
  }

  function onDeleteCourse(id) {
    const course = myCourses.filter(item => {
      return item.name !== id
    })
    setMyCourse(course)
    calculateGPA(course)
  }

  return (
    <sample.Provider value = {addCourse}>
      <div>
        <h1>
          GPA CALCULATOR
        </h1>
        <div>
          <h1>My courses</h1>
          {myCourses.map(item => {
            return <CourseCard name ={item.name} grd = {item.grd} crd ={item.crd} del={onDeleteCourse} />
          })}
          <CourseForm /> 
        </div>
        <p>GPA : {GPA}</p>
    </div>
  </sample.Provider>
  );
}

export default App;