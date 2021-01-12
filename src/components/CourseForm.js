import { GRADES } from "../utils/grades";
import { CREDITS } from "../utils/credits";
import { useContext, useReducer, useState } from "react";
import { sample } from "../App";

const CourseForm = () => {
  const addCourse = useContext(sample)
  const [state,dispatch] = useReducer((prevstate,action) => {
    switch(action.type){
      case 'setname' :
        return {...prevstate,name : action.value}
      case 'setgrd' :
        return {...prevstate,grd : action.value}
      case 'setcrd' :
        return {...prevstate,crd : action.value}
      default : throw new Error();
    }
  },{name:"",grd:"A",crd:"1"})

  return (
    <>
       <form onSubmit ={
          e => {e.preventDefault();
           addCourse(state)}}>
            <td>
           Credit :
        <select onChange = { e => 
            dispatch({type : 'setcrd',value : e.currentTarget.value})
          }>
          {CREDITS.map(item => {
            return <option value={item}>{item}</option>
          })}
        </select>     
          </td>
          <td>
           Grade :
          <select onChange = { e => 
           dispatch({type : 'setgrd',value : e.currentTarget.value})
          }>
          {GRADES.map(item => {
            return <option value={item.name}>{item.name}</option>
          })}
        </select>    
          </td>
          <td>
          ID :
          <input type="text" onChange = { e => 
           dispatch({type : 'setname',value : e.currentTarget.value})
          }/>
          </td>
          <td><button type="submit">+</button></td> 
       </form>
    </>
  );
};

export default CourseForm;