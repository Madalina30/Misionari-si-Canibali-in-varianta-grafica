import '../App.css';
import {useEffect, useState} from 'react'
import React, { Component } from 'react';
import TopMenuSimpleRoad from './SimpleRoadComp/TopMenuBar';
let isDown = false, moveStart = false, moveEnd = false;
export default function SimpleRoad(props) {
    const [start, setStart] = useState([15, 10])
    const [finish, setFinish] = useState([25,10])

    return(
        <>
        <svg width="100%" height="100%" className='svg-grid'>
        {props.buildGrid().map(coords=>{
            let joinedCoords = coords.join("");
            return(
                <rect x={coords[0]*30} y={coords[1]*30} width="30" height="30" r="0" rx="0" ry="0" fill="#ffffff" stroke="#000" strokeOpacity="0.2" 
                id ={"rect"+joinedCoords} className={joinedCoords===start.join("")?"click-rect start":(joinedCoords===finish.join("")?"click-rect end":"click-rect")}
                onMouseDown={
                  (e)=> {
                    mouseDownGrid(e)
                  }
                }
                onMouseOver={
                  (e)=> {
                     mouseOverGrid(e)
                  }
                }
                onMouseLeave={
                  (e)=>{
                    mouseLeaveGrid(e)
                  }
                }
                onMouseUp={
                  (e)=> {
                    mouseUpGrid(e, coords, setStart, setFinish)
                  }
                }></rect>
            )
          })}
        </svg>
        
        <TopMenuSimpleRoad setShowAlert={props.setShowAlert} showAlert={props.showAlert}/>

        </>
    )
}
function mouseDownGrid(e) {
    let valueOfE = e.target.classList
    if(valueOfE.contains("start")){
      e.target.classList.remove("start")
      moveStart = true
    }else if (valueOfE.contains("end")){
      e.target.classList.remove("end")
      moveEnd = true
    }else{
      isDown = true
      if (!valueOfE.contains("end") || !valueOfE.contains("start"))
        e.target.style.fill = "plum"
      console.log(e.target)
    }
  }

  function mouseOverGrid(e) {
    if(moveStart){
      e.target.classList.add("start-hover")
    }else if(moveEnd) {
      e.target.classList.add("end-hover")
    }else if(isDown) {
      if(e.target.classList.contains("start") || e.target.classList.contains("end")) {
        console.log("")
      }else{
        e.target.style.fill = "plum"
      }
    }
  }


  function mouseLeaveGrid(e) {
    if (moveStart) {
      e.target.classList.remove("start-hover")
    }
    if (moveEnd) {
      e.target.classList.remove("end-hover")
    }
  }

  function mouseUpGrid(e, coords, setStart, setFinish) {
    if (moveStart){
      moveStart = false
      e.target.classList.remove("start-hover")
      e.target.classList.add("start")
      setStart(coords)
      console.log(coords)
    } else if (moveEnd) {
      moveEnd = false
      e.target.classList.remove("end-hover")
      e.target.classList.add("end")
      setFinish(coords)
      console.log(coords)
    }
    isDown = false
  }