import './App.css';
import {useEffect, useState} from 'react'
import React, { Component } from 'react';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faArrowAltCircleUp, faArrowAltCircleRight, faNotEqual } from '@fortawesome/free-solid-svg-icons'
function App() {
  const [selectedMod, setMod] = useState(0) // 0 - Straight Road, 1 - M&C
  const [height, setHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);
  const [hide, setHide] = useState(1)
  const [hide2, setHide2] = useState(1)
  const [start, setStart] = useState([15, 10])
  const [finish, setFinish] = useState([25,10])

  const [showAlert, setShowAlert] = useState(false)
  const [showNotATransition, setShowNotATransition] = useState(false)
  const [showNothingHere, setShowNothingHere] = useState(false)
  const [showNotEqual, setShowNotEqual] = useState(false)


  // const [showAlert, setShowAlert] = useState(false)
  

  let isDown = false, moveStart = false, moveEnd = false

  useEffect(() => {
    function handleResize() {
      setHeight(window.innerHeight)
      setWidth(window.innerWidth)
  }
    window.addEventListener('resize', handleResize)
  })

  function buildGrid() {
    let gridCoord = []
    for (let i = 0; i < width; i+=30)
    {
      for (let j = 0; j < height; j += 30) {
        gridCoord.push([i/30, j/30])
        
      }
    }
    return gridCoord
  }

  function mouseDownGrid(e) {
    let valueOfE = e.target.classList
    console.log(valueOfE.contains("start"))
    if (valueOfE.contains("start"))
    {
      console.log("e start")
      e.target.classList.remove("start")
      moveStart = true
    } else if (valueOfE.contains("end"))
    {
      console.log("e end")
      e.target.classList.remove("end")
      moveEnd = true
    } else {
      isDown = true
      e.target.style.fill = "plum"
      console.log(e.target)
    }
  }

  function mouseOverGrid(e) {
    if (moveStart) {
      e.target.classList.add("start-hover")
    }else if (moveEnd) {
      e.target.classList.add("end-hover")
    }else if (isDown) {
      if (e.target.classList.contains("start") || e.target.classList.contains("end")) {
        console.log("")
      } else {
        e.target.style.fill = "plum"
      }
      console.log(e.target)
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

  function mouseUpGrid(e, coords) {
    if (moveStart){
      moveStart = false
      e.target.classList.remove("start-hover")
      e.target.classList.add("start")
      // put start on i and j
      setStart(coords)
      console.log(coords)
    } else if (moveEnd) {
      moveEnd = false
      e.target.classList.remove("end-hover")
      e.target.classList.add("end")
      // put end on i and j
      setFinish(coords)
      console.log(coords)
    }
    isDown = false
    console.log(e.target)
  }

  function refreshPage() {
    window.location.reload(false);
  }

  function simpleRoad(e) {
  // create a simple road between the 2 colored points on the map
    
  }

  return (
    <div className="App">
      <SweetAlert
        show={showAlert}
        title="You got eaten!"
        text="The number of canibals on one side is bigger than the number of missionaries on one of the states! They ate you!"
        onConfirm={() => setShowAlert(false)}
      />
      <p style={{position:'fixed', bottom:'5px', left:'5px', color:'green', fontWeight:'bold'}}>
        i <FontAwesomeIcon color="green" icon={faArrowAltCircleUp} /> j <FontAwesomeIcon color="green" icon={faArrowAltCircleRight} />
      </p>
      <svg width="100%" height="100%" className='svg-grid'>
        {selectedMod==1?
          buildGrid().map(coords=>{
            let joinedCoords = coords.join("");
            return(
              <rect x={coords[0]*30} y={coords[1]*30} i={coords[0]} j={coords[1]} width="30" height="30" r="0" rx="0" ry="0" fill="#ffffff" stroke="#000" strokeOpacity="0.2" 
                id ={"rect"+joinedCoords} className='click-rect' style={{fill:'transparent', cursor:'not-allowed'}}></rect>
            )
          })
        :
        buildGrid().map(coords=>{
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
                  mouseUpGrid(e, coords)
                }
              }></rect>
          )
        })}
      </svg>
      <div className='instructions'>
        <p>
            Here will be instructions that will guide you through the 'game'
        </p>
    </div>

    {selectedMod==0?<div className="buttons">
        <p className="select-category__txt">Choose what you do:</p>
        <div className="clear-buttons">
          <button className="clear-walls" onClick={ // CLEAR WALLS
            (e)=>{
              console.log(e.target)
            }
          }>Clear walls</button>
          <button className="clear-path" onClick={ // CLEAR PATH
            (e)=>{
              console.log(e.target)
            }
          }>Clear path</button>
          <button className="reset-all" onClick={  // CLEAR ALL
            refreshPage
          }>Reset</button>
        </div>
    </div>:""}

    

    {/* STATE + TRANSITION FUNCTION FOR THE MOVEMENT */}
    {selectedMod==1?
    <>   <button className="open-close" onClick={
      ()=>{
        hide===0?setHide(1):setHide(0)
      }
    }></button><div className='user-introduce' style={{display:hide===0?"none":"block"}}>
 
        <form action="" className="form-model">
            <h2>
                Introduce your data
            </h2>
            <div className='stare__div'>
                <h3 className="stare-label">Stare:</h3>
                <textarea id="stare" name="stare" rows="2" placeholder="write your state here" required></textarea>
            </div>
            <div>
                <h3 className="transition-label">Tranzitie:</h3>
                <textarea id="transition" name="transition" rows="2" placeholder="write your transition here" required></textarea>
            </div>
            <SweetAlert
              show={showNotATransition}
              title="Not a transition!"
              text= "The data introduced is not correct for the transition -> try one the followings: s, initial->((...),(...),..) and all->((...),(...),...)"
              confirmButtonColor = "red"
              confirmButtonText = "WILL DO"
              // imageUrl = "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg"
              onConfirm={() => setShowNotATransition(false)}
            />
            <SweetAlert
              show={showNothingHere}
              title="One of the states is not correct!"
              text= "A state has the following aspect: ((...),(...),..)!"
              confirmButtonColor = "green"
              confirmButtonText = "GOT IT"
              // imageUrl = "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg"
              onConfirm={() => setShowNothingHere(false)}
            />
            <SweetAlert
              show={showNotEqual}
              title="Equal states!"
              text= "The states cannot be equal! The second one has to 'come' from the other one!"
              confirmButtonColor = "blue"
              confirmButtonText = "GOT IT"
              // imageUrl = "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg"
              onConfirm={() => setShowNotEqual(false)}
            />
            <input type="button" value="Search" id="submitUserData" onClick={
              (e)=>{
                // will be 3 types of transitions: final, initial->((...),(...),..) and all->((...),(...),...)
                let state = document.getElementById("stare").value
                if (state == "()" || state == "" || state == " " || state == "(())" || state == "((),())" || state == "((),(),)"){
                  // SAU DACA EXISTA DEJA WARNINGURI DE CAND SE INTRODUCE STAREA!!!!!!!!!!
                  setShowNothingHere(true)
                } else {
                  state = removePh(state)
                  verifyState(state, setShowAlert)
                  let transition = document.getElementById("transition").value
                  if (transition == "final") {
                    // verify if possible state -> de la state facuta si sa nu aiba voie sa mearga mai departe!!!!!
                    // here will make an animation of the steps that are required to get to the final state: ((1,1,...),(1,1,...),1)
                    console.log("in final")
                  } else if (transition.includes("initial->")) {
                    let newState = transition.split("->")[1]
                    let value = removePh(newState)
                    if(value == '' || value =="()"){
                      setShowNothingHere(true)
                      console.log("nothing here")
                    } else {
                      verifyState(value, setShowAlert)
                      if (state == value) {
                        setShowNotEqual(true)
                        console.log("NOT GOOD BRO")
                      }
                      
                      // see if there is possible a transition from the introduced state to the next one
                      // and if not -> sweet alert -> NOT A POSSIBLE STATE -> IMPOSSIBLE TO GET TO: showNotPossibleTransition
                      // if yes -> small animation with boat and transition with the boat remaining where it will go
                      // BONUS: after that if yes -> the STATE changes and you can make another transition from that one
                    }
                    console.log("in initial static", newState)
                  } else if(transition.includes("all->")){
                    // will search if the composition of the state is correct - FIRST
                    let newState = transition.split("->")[1]
                    let value = removePh(newState)
                    if(value == '' || value =="()"){
                      setShowNothingHere(true)
                      console.log("nothing here") // PLUS ALERTA CA NU E NIMIC
                    } else {
                      verifyState(value, setShowAlert)
                      // will verify if such a transition can be made
                      // if not -> sweet alert!! -> showNotAllTransition
                      // if yes -> makes the animation and stops if something goes wrong! and will continue (if no wrong) until final state
                    }
                    console.log("in all")
                  }else {
                    // sweet alert -> the data introduced is not correct for the transition ->  try the following
                    setShowNotATransition(true)
                  }
                
                }
              }
            }/> 
        </form>
      </div></>:""}
     

      {/* A BUTTON TO START A SIMPLE ROAD */}
      <button className="open-close-menu"  onClick={
        ()=>{
          hide2===0?setHide2(1):setHide2(0)
        }
      }></button>
      <div className='user-choose' style={{display:hide2===0?"none":"block"}}>
        <form>
          <div>
          <button style={{minHeight:'19px',height:'19px',background:'transparent', border:'none'}} onClick={function(e){
            e.preventDefault();

            if(selectedMod != 0){
              setMod(0);
              console.log("Mod set to", 0)

            }
          }} id="straightRoad">{selectedMod==0?<><FontAwesomeIcon color="green" icon={faCircleCheck} />Straight Road</>:<p style={{margin:'0',marginLeft:'13.5px'}}>Straight Road</p>}</button>
       
          </div>
        
          <button style={{minHeight:'19px',height:'19px',background:'transparent', border:'none'}} onClick={function(e){
            e.preventDefault();
            if(selectedMod != 1){
              setMod(1);
              console.log("Mod set to", 1)
            }
          }} id="mc">{selectedMod==1?<><FontAwesomeIcon color="green" icon={faCircleCheck} />Missionaries & Cannibals</>:<p style={{margin:'0',marginLeft:'13.5px'}}>Missionaries & Cannibals</p>}</button>
        </form>
      </div>
    </div>
  );
}

function verifyState(value, setShowAlert) {
  try{
    let data = value.split("),")
    let misionaries = removePh(data[0]).split(",")
    let leftMissionaries = 0, rightMissionaries = 0;
    for (let k = 0; k<misionaries.length; k++) {
      if (misionaries[k] == 0) {
        leftMissionaries ++;
      } else {
        rightMissionaries ++;
      }
    }
    let canibals = removePh(data[1]).split(",")
    let leftCanibals = 0, rightCanibals = 0;
    for (let k = 0; k<canibals.length; k++) {
      if (canibals[k] == 0) {
        leftCanibals ++;
      } else {
        rightCanibals ++;
      }
    }
    console.log("leftm ", leftMissionaries, " rightm ", rightMissionaries, "\nleftc ", leftCanibals, " rightc ", rightCanibals)
    let boatPosition = data[2]
    console.log(misionaries, canibals, boatPosition)

    // input checks
    if(boatPosition=='' || boatPosition == undefined){
      console.log("nush barca")
    }else if(canibals.length == 0 || canibals == undefined || canibals == ''){
      console.log("nush canibali")
    }else if(misionaries.length == 0 || misionaries == undefined || misionaries == ''){
      console.log("nush misionaries")
    }else if(canibals.length != misionaries.length){
      console.log("die mtfk")
    }else{
      // other checks for m&c input
      let wrongCanibals = false;
      let wrongCanibalsPosition = -1;
      canibals.forEach((x,i)=>{
        if(isNaN(x) || x==' ' || x=='' ){
          wrongCanibals = true;
          wrongCanibalsPosition = i
        }
      })
      let wrongMisionaries = false;
      let wrongMisionariesPosition = -1;
      misionaries.forEach((x,i)=>{
        if(isNaN(x) || x==' ' || x==''){
          wrongMisionaries = true;
          wrongMisionariesPosition = i
        }
      })
      if(wrongMisionaries == true){
        console.log("nush misionaries pe pozitia ", wrongMisionariesPosition)
      }else if(wrongCanibals == true){
        console.log("nush canibals pe pozitia ", wrongCanibalsPosition)
      }else{
        // check if c>m or not
        if (leftCanibals > leftMissionaries || rightCanibals > rightMissionaries) {
          setShowAlert(true)
        } else {
          constructMC(misionaries, canibals, boatPosition)
          // then put leftm(pink), leftc(blue), rightm(pink), rightc(blue) on their sides
          
        }
      }

    }
    
    value.shift();
    value = value.join("")
    return value;
  }catch(error){
    // console.log(error)
  }
}

function removePh(v){
  try{
    let value = v;
    value = value.split("");
    if(value[value.length-1] == ")"){
      value.pop();

    }
    
    value.shift();
    value = value.join("")
    return value;
  }catch(error){
    // console.log(error)
  }
}

function constructMC(misionaries, canibals, boatPosition){
  const rects = document.querySelectorAll('rect');
  let rectMiddle = Math.round(window.innerWidth/60);
  let rectMiddleJ = Math.round(window.innerHeight/60);
  let misionariesLength = misionaries.length;
  let canibalsLength  = canibals.length;
  console.log(rectMiddle)
  rects.forEach(rect=>{
      rect.style.fill = "transparent"
      let i = rect.getAttribute('i');
      let j = rect.getAttribute('j');
      let leftStart = parseInt(i)+2;
      let rightStart = parseInt(i)-2
      if(parseInt(i)==rectMiddle || parseInt(i)+1==rectMiddle || parseInt(i-1)==rectMiddle  ){
        for(let k=0;k<7;k++){
          if(parseInt(j)-k==rectMiddleJ ){
            rect.style.fill = "#9ae7fc"
          }
          if(parseInt(j)+k==rectMiddleJ){
            rect.style.fill = "#9ae7fc"
          }
        }
      }else if(rectMiddle == leftStart || [1,2,3,4,5].map(x=>leftStart+x).includes(rectMiddle)){
        for(let k=0;k<7;k++){
          if(parseInt(j)-k==rectMiddleJ ){
            rect.style.fill = "yellow"
          }
          if(parseInt(j)+k==rectMiddleJ){
            rect.style.fill = "yellow"
          }
        }
        
      }else if(rectMiddle == rightStart || [1,2,3,4,5].map(x=>rightStart-x).includes(rectMiddle) ){
        for(let k=0;k<7;k++){
          if(parseInt(j)-k==rectMiddleJ ){
            rect.style.fill = "green"
          }
          if(parseInt(j)+k==rectMiddleJ){
            rect.style.fill = "green"
          }
        }
      }else{
        rect.style.fill = "transparent"
      }
     // then put leftm(pink), leftc(blue), rightm(pink), rightc(blue) on their sides


  })
}
export default App;
