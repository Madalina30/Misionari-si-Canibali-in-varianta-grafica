import './App.css';
import {useEffect, useState} from 'react'
import React, { Component } from 'react';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faArrowAltCircleUp, faArrowAltCircleRight, faNotEqual } from '@fortawesome/free-solid-svg-icons'
function App() {
  const [selectedMod, setMod] = useState(0) // 0 - simple Road, 1 - M&C
  const [height, setHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);
  const [hide, setHide] = useState(1)
  const [hide2, setHide2] = useState(1)
  const [start, setStart] = useState([15, 10])
  const [finish, setFinish] = useState([25,10])

  const [showAlert, setShowAlert] = useState({show:false, message:'', title:'', btnColor:'green', btnText:'OK'})

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

  function simpleRoad() {
  // create a simple road between the 2 colored points on the map
    
  }

  return (
    <div className="App">
      <SweetAlert
        show={showAlert.show}
        title= {showAlert.title}
        text={showAlert.message}
        confirmButtonText={showAlert.btnText}
        confirmButtonColor={showAlert.btnColor}
        onConfirm={() => setShowAlert({...showAlert, show:false})}
      />
      <p style={{position:'fixed', bottom:'5px', left:'5px', color:'green', fontWeight:'bold'}}>
        i <FontAwesomeIcon color="green" icon={faArrowAltCircleUp} /> j <FontAwesomeIcon color="green" icon={faArrowAltCircleRight} />
      </p>
      <svg width="100%" height="100%" className='svg-grid'>
        {selectedMod==1?
          buildGrid().map(coords=>{
            let joinedCoords = coords.join("");
            return(
              <g>
              <rect x={coords[0]*30} y={coords[1]*30} i={coords[0]} j={coords[1]} width="30" height="30" r="0" rx="0" ry="0" fill="#ffffff" stroke="#000" strokeOpacity="0.2" 
                id ={"rect"+joinedCoords} className='click-rect' style={{fill:'transparent', cursor:'not-allowed'}}></rect>
                 <text x={coords[0]*30} y={coords[1]*30+30} font-family="Verdana" font-size="25"></text>
                </g>
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
      {selectedMod==0?
        <p>
           You are in Simple Road mode (default). Here are some instructions:
           <br/>
           TO ADD SOME
        </p>
        :
        <p>
           You are in M&amp;C mode. Here are some instructions:
           <br/>
           TO ADD SOME
        </p>
        }
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
          <button className="search-road" onClick={  // WILL SEARCH ROAD
            simpleRoad() // TODO
          }>Search</button>
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
                <h3 className="stare-label">State:</h3>
                <textarea id="stare" name="stare" rows="2" placeholder="write your state here" required></textarea>
            </div>
            <div>
                <h3 className="transition-label">Transition:</h3>
                <textarea id="transition" name="transition" rows="2" placeholder="write your transition here" required></textarea>
            </div>
            <input type="button" value="Search" id="submitUserData" onClick={
              (e)=>{
                constructMC()
                // will be 3 types of transitions: final, initial->((...),(...),..) and all->((...),(...),...)
                let state = document.getElementById("stare").value
                if (state == "()" || state == "" || state == " " || state == "(())" || state == "((),())" || state == "((),(),)"){
                  // SAU DACA EXISTA DEJA WARNINGURI DE CAND SE INTRODUCE STAREA!!!!!!!!!!
                  setShowAlert({...showAlert, show:true, title:"Nothing here!", message:"One of the states is kinda empty!", btnColor:"red"})
                } else {
                  state = removePh(state)
                  let finalState = state.replaceAll("0", "1")
                  let initialState = state.replaceAll("1", "0")

                  let [leftm, rightm, leftc, rightc] = verifyState(state, setShowAlert, showAlert)
                  let firstBoatPosition = state.split("),")[2]
                  if (!leftm && !rightm & !leftc & !rightc){
                    // NU FACE NICIO SCHIMBARE
                  } else {
                    let transition = document.getElementById("transition").value
                    if (transition == "final") {
                      // verify if possible state -> de la state facuta si sa nu aiba voie sa mearga mai departe!!!!!
                      // adik animatie pana intr-un punct sau dc nu are unde sa mearga (if possible)
                      // here will make an animation of the steps that are required to get to the final state: ((1,1,...),(1,1,...),1)
                      while (state != finalState) {
                        // step by step verification (somehow) + animations
                        break
                      }
                      console.log("in final")
                    } else if (transition.includes("initial->")) {
                      console.log("aici esti")
                      let newState = transition.split("->")[1]
                      let value = removePh(newState)
                      if(value == '' || value =="()"){
                        setShowAlert({...showAlert, show:true, title:"Nothing here!", message:"One of the states is kinda empty!", btnColor:"red"})
                      } else {
                        console.log("mai")
                        let [leftmV, rightmV, leftcV, rightcV] = verifyState(value, setShowAlert, showAlert)
                        console.log("aici",leftm, rightm, leftc, rightc, "\n", leftmV, rightmV, leftcV, rightcV)
                        let lastBoatPosition = value.split("),")[2]


                        if (!leftmV && !rightmV && !leftcV && !rightcV) {
                          // do nothing
                        } else {
                          let valueLength = value.split(",").length, stateLength = state.split(",").length
                          // verifications with the states
                          if (valueLength != stateLength) {
                            setShowAlert({...showAlert, show:true, title:"Different length for states!!", message:"The states do not have the same length! Change one of them!", btnColor:"red", btnText:"OK"} )
                          } else {
                            if (state == finalState){
                              setShowAlert({...showAlert, show:true, title:"Initial state is final!", message:"Change the initial state! It cannot be final!", btnColor:"orange"} )
                            } else if (state == value) {
                              setShowAlert({...showAlert, show:true, title:"Equal states!", message:"Change one of the states!", btnColor:"red"})
                            } else if (value == initialState) {
                              // NU POATE FI VALOARE INITIALA - NU SE POATE INTOARCE
                              setShowAlert({...showAlert, show:true, title:"Final state is initial!", message:"Change the final state! It cannot be initial!", btnColor:"orange"} )
                            } else if (value.split(",")[valueLength-1] == state.split(",")[valueLength-1]) {
                              // + sweetalert
                              setShowAlert({...showAlert, show:true, title:"Boat state unchanged!", message:"The state of the boat remains unchanged even though the positions of the m&c change!", btnColor:"aqua"})
                            }else if (value.split(",")[valueLength-1] != state.split(",")[valueLength-1]) {
                              let ok = 0
                              for (let k = 0; k<valueLength-1; k++) {
                                if (value.split(",")[k] != state.split(",")[k]) {
                                  ok++;
                                }
                              }
                              if (ok == 0) {
                                setShowAlert({...showAlert, show:true, title:"Boat state changed!", message:"The state of the boat is changed, the positions of the m&c does not change! You can do better!", btnColor:"red", btnText:"UNDERSTOOD"})
                              } else if (ok > 2) { // IF THE STATE OF BOAT CHANGE AND SO DOES THE STATE
                                console.log("aici",leftm, rightm, leftc, rightc, "\n", leftmV, rightmV, leftcV, rightcV)
                                if (leftm == leftmV && leftc == leftcV && rightm == rightmV && rightc == rightcV) {
                                  // NU SE PUNE! CAM ACEEASI STARE CU ELEMENTE SCHIMBATE
                                  setShowAlert({...showAlert, show:true, title:"Same state!", message:"You just changed the positions of the m or c in the states!", btnColor:"purple", btnText:"UNDERSTOOD"})
                                } else {
                                  // !!DACA SE SCHIMBA DOAR POZITIA VALORILOR, NU PREA AR TREBUI SA CONTEZE! E CA SI CUM NU AR FACE NIMIC!
                                  // !!TODO: SEE JUST ELEMENTS, NOT POSITIONS!
                                  setShowAlert({...showAlert, show:true, title:"More than 2 changes!", message:"There are detected more than 2 changes on the positions of the m&c! Change them!", btnColor:"orange", btnText:"CHANGING NOW"})
                                }
                              } else if (ok == 2){ // <=2 changes
                                //ANIMATION
                                // PRIMA PARTE A ANIMATIEI
                                showMC(leftc, leftm, rightc, rightm)
                                setTimeout(()=>{
                                  // PART 2 ANIMATION
                                // MAI INTAI STERGE  CE TREBUIE!
                                  document.querySelectorAll('rect').forEach(rect=>{
                                    rect.parentNode.children[1].innerHTML = ""
                                  })
                                  showMC(leftcV, leftmV, rightcV, rightmV)
                                }, 5000)
                                
                                

                                setShowAlert({...showAlert, show:true, title:"Good job!", message:"The transition is correct!", btnColor:"green", btnText:"YEY"})
                                // small animation with boat and transition with the boat remaining where it will go
                                // BONUS: after that if yes -> the STATE changes and you can make another transition from that one if not final
                              } else if (ok == 1) { // VERIFICARI AICI!
                                let boatForNewState = value.split(",")[valueLength-1], boatForState = state.split(",")[valueLength-1]
                                if (boatForState == 1 && boatForNewState == 0) {
                                  console.log("tranzitie cu o miscare - right to left, dar corecta") // + sweetalert
                                  setShowAlert({...showAlert, show:true, title:"Good job!", message:"The transition is correct!", btnColor:"green", btnText:"YEY"})
                                  // small animation with boat and transition with the boat remaining where it will go
                                  // BONUS: after that if yes -> the STATE changes and you can make another transition from that one if not final
                                } else if (boatForState == 0 && boatForNewState == 1) {
                                  setShowAlert({...showAlert, show:true, title:"Good, but not worthy!", message:"The transition is correct, but it looks like you just go around the tail!"})
                                  // small animation with boat and transition with the boat remaining where it will go
                                  // BONUS: after that if yes -> the STATE changes and you can make another transition from that one if not final
                                }
                              
                              }
                              
                            }
                          
                          }
                          
                        }
                        
                      }
                      console.log("in initial static", newState)
                    } else if(transition.includes("all->")){
                      // will search if the composition of the state is correct - FIRST
                      let newState = transition.split("->")[1]
                      let value = removePh(newState)
                      if(value == '' || value =="()"){
                        setShowAlert({...showAlert, show:true, title:"Nothing here!", message:"One of the states is kinda empty!", btnColor:"red"})

                      } else {
                        let [leftm, rightm, leftc, rightc] = verifyState(value, setShowAlert, showAlert)
                        let lastBoatPosition = value.split("),")[2]

                        if (!leftm && !rightm && !leftc && !rightc) {
                          // do nothing
                        } else {
                        // will verify if such a transition can be made
                        // if not -> sweet alert!! -> showNotAllTransition
                        // if yes -> makes the animation and stops if something goes wrong! and will continue (if no wrong) until final state
                        }
                      }
                      console.log("in all")
                    }else {
                      // sweet alert -> the data introduced is not correct for the transition ->  try the following
                      setShowAlert({...showAlert, show:true, title:"Not a transition!", message:"The data introduced is not correct for the transition -> try one the followings: s, initial->((...),(...),..) and all->((...),(...),...)", btnColor:"red", btnText:"WILL DO"})

                    }
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
          }} id="simpleRoad">{selectedMod==0?<><FontAwesomeIcon color="green" icon={faCircleCheck} />Simple Road</>:<p style={{margin:'0',marginLeft:'13.5px'}}>Simple Road</p>}</button>
       
          </div>
        
          <button style={{minHeight:'19px',height:'19px',background:'transparent', border:'none'}} onClick={function(e){
            e.preventDefault();
            if(selectedMod != 1){
              setMod(1);
              console.log("Mod set to", 1)
            }
          }} id="mc">{selectedMod==1?<><FontAwesomeIcon color="green" icon={faCircleCheck} />Missionaries &amp; Cannibals</>:<p style={{margin:'0',marginLeft:'13.5px'}}>Missionaries &amp; Cannibals</p>}</button>
        </form>
      </div>
    </div>
  );
}

function verifyState(value, setShowAlert, showAlert) {
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
    // finished calculated nr of m
    let boatPosition = data[2]
    console.log(misionaries, canibals, boatPosition)

    // input checks
    if(boatPosition=='' || boatPosition == undefined){
      setShowAlert({...showAlert, show:true, title:"No boat!", message:"We cannot find a boat in one of your states!", btnColor:"purple", btnText:"OK"})
      return [0,0,0,0]
    }else if(canibals.length == 0 || canibals == undefined || canibals == ''){
      setShowAlert({...showAlert, show:true, title:"No cannibals!", message:"We cannot find cannibals in one of your states!", btnColor:"purple", btnText:"OK"})
      return [0,0,0,0]
    }else if(misionaries.length == 0 || misionaries == undefined || misionaries == ''){
      setShowAlert({...showAlert, show:true, title:"No missionaries!", message:"We cannot find missionaries in one of your states!", btnColor:"purple", btnText:"OK"})
      return [0,0,0,0]
    }else if(canibals.length != misionaries.length){
      setShowAlert({...showAlert, show:true, title:"Not couples!", message:"You need to write the same amount of cannibals and missionaries", btnColor:"purple", btnText:"OK"})
      return [0,0,0,0]
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
        setShowAlert({...showAlert, show:true, title:"No missionaries on position "+(wrongMisionariesPosition+1)+" !", message:"We cannot find missionaries on position "+(wrongMisionariesPosition+1)+" in one of your states!", btnColor:"purple", btnText:"OK"})
        return [0,0,0,0]
      }else if(wrongCanibals == true){
        setShowAlert({...showAlert, show:true, title:"No cannibals on position "+(wrongCanibalsPosition+1)+" !", message:"We cannot find cannibals on position "+(wrongCanibalsPosition+1)+" in one of your states!", btnColor:"purple", btnText:"OK"})
        return [0,0,0,0]
      }else{
        // check if c>m or not
        console.log("leftm ", leftMissionaries, " rightm ", rightMissionaries, "\nleftc ", leftCanibals, " rightc ", rightCanibals)

        if (leftCanibals > leftMissionaries && leftMissionaries != 0) {
          setShowAlert({...showAlert, show:true, title:"You got eaten!",
          message:"The number of canibals on one side is bigger than the number of missionaries on one of the states! They ate you!"})
          return [0,0,0,0]
        } else if (rightCanibals > rightMissionaries && rightCanibals != 0){
          setShowAlert({...showAlert, show:true, title:"You got eaten!",
          message:"The number of canibals on one side is bigger than the number of missionaries on one of the states! They ate you!"})
          return [0,0,0,0]
        }else {
          console.log("ceva")
          // then put leftm(pink), leftc(blue), rightm(pink), rightc(blue) on their sides
          return [leftMissionaries, rightMissionaries, leftCanibals, rightCanibals]
        }
      }

    }
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

function showMC(leftc, leftm, rightc, rightm) {
  let leftcAici = leftc, leftmAici = leftm, rightcAici = rightc, rightmAici = rightm
  document.querySelectorAll('rect').forEach(rect=>{
    if(rect.style.fill!="transparent"){
      // DUPA BOAT POSITION!!!! NU NUMAI DUPA CULOARE
      if (rect.style.fill == "yellow") {
        // leftm - pink, leftc - blue
        if (leftcAici != 0){
          rect.parentNode.children[1].innerHTML = "C"
          leftcAici--;
        } else if (leftmAici != 0) {
            rect.parentNode.children[1].innerHTML = "M"
            leftmAici--;
        }
      } else if (rect.style.fill == "green") {
        // rightm - pink, rightc - blue
        if (rightcAici != 0){
          rect.parentNode.children[1].innerHTML = "C"
          rightcAici--;
        } else if (rightmAici != 0) {
            rect.parentNode.children[1].innerHTML = "M"
            rightmAici--;
        }
      }
    }
})
}

function constructMC(){
  const rects = document.querySelectorAll('rect');
  let rectMiddle = Math.round(window.innerWidth/60);
  let rectMiddleJ = Math.round(window.innerHeight/60);
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
