import './App.css';
import {useEffect, useState} from 'react'
import React, { Component } from 'react';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faArrowAltCircleUp, faArrowAltCircleRight, faNotEqual } from '@fortawesome/free-solid-svg-icons'
let optionsSelectedCM = {val:''};
function App() {
  const [selectedMod, setMod] = useState(0) // 0 - simple Road, 1 - M&C
  const [height, setHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);
  const [hide, setHide] = useState(1)
  const [hide2, setHide2] = useState(1)
  const [hide3, setHide3] = useState(1)
  const [start, setStart] = useState([15, 10])
  const [finish, setFinish] = useState([25,10])
  const [optionChosen, setOptionChosen] = useState([])

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
         <button className="open-close-instructions" onClick={
      ()=>{
        hide3===0?setHide3(1):setHide3(0)
      }}></button>
      {selectedMod==0?
        <p style={{display:hide3===0?"none":"block"}}>
           You are in Simple Road mode (default). Here are some instructions:
           <ul>
              <li>Start = green, end = red. You can move them around, but the road will be searched from start to end (SEARCH), even diagonally if it is faster;</li>
              <li>In the center menu, you can find explicit named buttons.</li>
              <li>You can add walls that will block your faster route, but you can delete them (DELETE WALLS);</li>
              <li>An animation will appear at search. Also, you can delete the road created (DELETE ROAD);</li>
              <li>You can reset to default configurations (RESET).</li>
            </ul>
        </p>
        :
        <p style={{display:hide3===0?"none":"block"}}>
           You are in M&amp;C mode. Here are some instructions:
           <ul>
             <li>Rule: nr of cannibals &lt; nr of missionaries on all sides;</li>
             <li>You will have to complete the left form;</li>
             <li>Pattern for State: ((m1, m2, ...), (c1, c2, ...), b), where m1, m2, ... = missionaries, c1, c2, ... = cannibals and b is the state of the boat, each with values 0 or 1;</li>
             <li>Pattern for transition (3 options): final,initial-&gt;other_state (same format as before) or all-&gt;...</li>
             <li>After pressing the Search button, if you entered correct data and the road can be made, you need to wait 5 seconds for the transition to be made.</li>
           </ul>
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
    </div>:<div id='chooseOption'>
        <p className="select-category__txt">Your options:</p>
      </div>}

    

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
              (e)=> {
                constructMC()
                // will be 3 types of transitions: final, initial->((...),(...),..) and all->((...),(...),...)
                let state = document.getElementById("stare").value
                if (state == "()" || state == "" || state == " " || state == "(())" || state == "((),())" || state == "((),(),)"){
                  // SAU DACA EXISTA DEJA WARNINGURI DE CAND SE INTRODUCE STAREA!!!!!!!!!!
                  setShowAlert({...showAlert, show:true, title:"Nothing here!", message:"One of the states is kinda empty!", btnColor:"red"})
                } else {
                  state = state.split(" ").join("")
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
                      let newState = "(";
                      console.log(leftm, leftc, rightm, rightc)
                      document.getElementById("chooseOption").innerHTML = `<p class="select-category__txt">The chosen option:</p>`
                      // STAREA ESTE (....),(...)... FARA PARANTEZE!
                      // verify if possible state -> de la state facuta si sa nu aiba voie sa mearga mai departe!!!!!
                      // adik animatie pana intr-un punct sau dc nu are unde sa mearga (if possible)
                      // here will make an animation of the steps that are required to get to the final state: ((1,1,...),(1,1,...),1)
                      if (state == finalState || state == finalState.replace("),1", "),0")){
                          // DOAR O ARATA FINALA SI II SI SPUNE
                          console.log("este finala")
                      } else {
                        console.log("From state ", state, ":\n")
                        let stateToChange = state, boatPos = firstBoatPosition
                        // see finalstate if differ
                        let allLeftc = leftc, allLeftm = leftm, allRightc = rightc, allRightm = rightm
                        // prima stare e deja verificata
                        // MOMENTAN SE INCEPE DOAR CU 0!
                        let inBoatAll = [], options = [], vals = [], i = 1;
                        let steps = []
                        function animationC() {
                          if (stateToChange != finalState) {
                            if ((boatPos == 0 && firstBoatPosition == 0)) { // || (boatPos == 1 && firstBoatPosition == 1)
                            // daca e in cea din care porneste
                            if (stateToChange == initialState) {
                              if ((allLeftc + allRightc) == 1) {
                                inBoatAll = ['M', 'C']
                                boatPos = 1 - boatPos;
                                options = [finalState]
                                vals = [1] // 1 is ok
                                stateToChange = finalState
                                steps.push(stateToChange);
                                // break
                              } else {
                                // 3 options: MM, MC, CC -> fiind inceput, face un random aici mai mult
                                inBoatAll = [['M', 'C'], ['M', 'M'], ['C', 'C']]
                                boatPos = 1 - boatPos;
                                console.log("AICI OPTIONS");
                                stateToChange = changeStateMethod(inBoatAll, allLeftc, allLeftm, allRightc, allRightm, boatPos);
                                  console.log("vezi aici",allLeftm, allRightm, allLeftc, allRightc)

                                if (stateToChange != "no"){
                                  console.log("AM ALES STAREA:", stateToChange)
                                  document.getElementById("chooseOption").innerHTML = `<p class="select-category__txt">The chosen option:
                                  <p>(${stateToChange})</p>`
                                  document.querySelectorAll('rect').forEach(rect=>{
                                      rect.parentNode.children[1].innerHTML = ""
                                  });
                                  showMC(allLeftc, allLeftm, allRightc, allRightm);
                                  [allLeftm, allRightm, allLeftc, allRightc] = verifyState(stateToChange, setShowAlert, showAlert);
                                  // AICI NU MAKE BUTTON, CI VERIF DACA ALEGEREA E BUNA SI TRECE MAI DEPARTE DC DA! (TREBUIE SA AJUNGA CUMVA LA FINAL)
                                  
                                  steps.push(stateToChange);
                                  setTimeout(()=>{
                                    animationC()
                                  }, 3000)

                                }else{
                                  console.log("not good")
                                  // break
                                }
                              }
                            } else { // if not initial state
                              if (allLeftc >= 2) {
                                if (allLeftm >=2) {
                                  // 3 options: MM, MC, CC
                                  inBoatAll = [['M', 'C'], ['M', 'M'], ['C', 'C']]
                                  boatPos = 1 - boatPos;
                                  stateToChange = changeStateMethod(inBoatAll, allLeftc, allLeftm, allRightc, allRightm, boatPos)
                                  if (stateToChange != "no"){
                                  console.log("AM ALES STAREA:", stateToChange)
                                  document.getElementById("chooseOption").innerHTML = `<p class="select-category__txt">The chosen option:
                                  <p>(${stateToChange})</p>`
                                  document.querySelectorAll('rect').forEach(rect=>{
                                      rect.parentNode.children[1].innerHTML = ""
                                  });
                                    showMC(allLeftc, allLeftm, allRightc, allRightm);
                                  [allLeftm, allRightm, allLeftc, allRightc] = verifyState(stateToChange, setShowAlert, showAlert);
                                  
                                  // AICI NU MAKE BUTTON, CI VERIF DACA ALEGEREA E BUNA SI TRECE MAI DEPARTE DC DA! (TREBUIE SA AJUNGA CUMVA LA FINAL)
                                   
                                  steps.push(stateToChange);
                                  setTimeout(()=>{
                                    animationC()
                                  }, 3000)
                                }else{
                                  console.log("not good")
                                  // break
                                }
                                } else if (allLeftm == 1) {
                                  inBoatAll = [['M', 'C'], ['C', 'C']]
                                  boatPos = 1 - boatPos;
                                  stateToChange = changeStateMethod(inBoatAll, allLeftc, allLeftm, allRightc, allRightm, boatPos)
                                  if (stateToChange != "no"){
                                  console.log("AM ALES STAREA:", stateToChange)
                                  document.getElementById("chooseOption").innerHTML = `<p class="select-category__txt">The chosen option:
                                  <p>(${stateToChange})</p>`
                                  document.querySelectorAll('rect').forEach(rect=>{
                                      rect.parentNode.children[1].innerHTML = ""
                                  });
                                    showMC(allLeftc, allLeftm, allRightc, allRightm);
                                  [allLeftm, allRightm, allLeftc, allRightc] = verifyState(stateToChange, setShowAlert, showAlert);
                                  
                                  // AICI NU MAKE BUTTON, CI VERIF DACA ALEGEREA E BUNA SI TRECE MAI DEPARTE DC DA! (TREBUIE SA AJUNGA CUMVA LA FINAL)
                                   
                                  steps.push(stateToChange);
                                  setTimeout(()=>{
                                    animationC()
                                  }, 3000)
                                }else{
                                  console.log("not good")
                                  // break
                                }
                                } else { //lm=0
                                  inBoatAll = [['C', 'C']]
                                  boatPos = 1 - boatPos;
                                  stateToChange = changeStateMethod(inBoatAll, allLeftc, allLeftm, allRightc, allRightm, boatPos)
                                  if (stateToChange != "no"){
                                    console.log("AM ALES STAREA:", stateToChange)
                                    document.getElementById("chooseOption").innerHTML = `<p class="select-category__txt">The chosen option:
                                    <p>(${stateToChange})</p>`
                                    document.querySelectorAll('rect').forEach(rect=>{
                                        rect.parentNode.children[1].innerHTML = ""
                                    });
                                      showMC(allLeftc, allLeftm, allRightc, allRightm);
                                    [allLeftm, allRightm, allLeftc, allRightc] = verifyState(stateToChange, setShowAlert, showAlert);
                                    
                                    // AICI NU MAKE BUTTON, CI VERIF DACA ALEGEREA E BUNA SI TRECE MAI DEPARTE DC DA! (TREBUIE SA AJUNGA CUMVA LA FINAL)
                                    
                                    steps.push(stateToChange);
                                    setTimeout(()=>{
                                      animationC()
                                    }, 3000)
                                  }else{
                                    console.log("not good")
                                    // break
                                  }
                                }
                              } else if (allLeftc == 1) {
                                if (allLeftm >= 2) {
                                  inBoatAll = [['M', 'C'], ['M', 'M']]
                                  boatPos = 1 - boatPos;
                                  stateToChange = changeStateMethod(inBoatAll, allLeftc, allLeftm, allRightc, allRightm, boatPos)
                                  if (stateToChange != "no"){
                                    console.log("AM ALES STAREA:", stateToChange)
                                    document.getElementById("chooseOption").innerHTML = `<p class="select-category__txt">The chosen option:
                                    <p>(${stateToChange})</p>`
                                    document.querySelectorAll('rect').forEach(rect=>{
                                        rect.parentNode.children[1].innerHTML = ""
                                    });
                                      showMC(allLeftc, allLeftm, allRightc, allRightm);
                                    [allLeftm, allRightm, allLeftc, allRightc] = verifyState(stateToChange, setShowAlert, showAlert);
                                    
                                    // AICI NU MAKE BUTTON, CI VERIF DACA ALEGEREA E BUNA SI TRECE MAI DEPARTE DC DA! (TREBUIE SA AJUNGA CUMVA LA FINAL)
                                    
                                    steps.push(stateToChange);
                                    setTimeout(()=>{
                                      animationC()
                                    }, 3000)
                                  }else{
                                    console.log("not good")
                                    // break
                                  }
                                } else if (allLeftm == 1){
                                  inBoatAll = [['M', 'C']]
                                  boatPos = 1 - boatPos;
                                  stateToChange = changeStateMethod(inBoatAll, allLeftc, allLeftm, allRightc, allRightm, boatPos)
                                  if (stateToChange != "no"){
                                    console.log("AM ALES STAREA:", stateToChange)
                                    document.getElementById("chooseOption").innerHTML = `<p class="select-category__txt">The chosen option:
                                    <p>(${stateToChange})</p>`
                                    document.querySelectorAll('rect').forEach(rect=>{
                                        rect.parentNode.children[1].innerHTML = ""
                                    });
                                      showMC(allLeftc, allLeftm, allRightc, allRightm);
                                    [allLeftm, allRightm, allLeftc, allRightc] = verifyState(stateToChange, setShowAlert, showAlert);
                                    
                                    // AICI NU MAKE BUTTON, CI VERIF DACA ALEGEREA E BUNA SI TRECE MAI DEPARTE DC DA! (TREBUIE SA AJUNGA CUMVA LA FINAL)
                                    
                                    steps.push(stateToChange);
                                    setTimeout(()=>{
                                      animationC()
                                    }, 3000)
                                  }else{
                                    console.log("not good")
                                    // break
                                  }
                                } else { //lm=0
                                  console.log("NOT OK!")
                                  setShowAlert({...showAlert, show:true, title:"Not ok!", message:"Not ok - todo!", btnColor:"aqua", btnText:'OK'})
                                  // break
                                  // mesaj game over + search button activate
                                }
                              } else {
                                console.log("nothin here")
                                // break
                              }
                            }
                          } else {
                            // daca e in cea in care e prezenta starea finala!
                            if (allRightc >= 2) {
                              if (allRightm >= 2) {
                                inBoatAll = [['M', 'M'],['M', 'C'],['C', 'C'],['M'],['C']]
                                boatPos = 1 - boatPos;
                                stateToChange = changeStateMethodReverse(inBoatAll, allLeftc, allLeftm, allRightc, allRightm, boatPos)
                                if (stateToChange != "no"){
                                  console.log("AM ALES STAREA:", stateToChange)
                                  document.getElementById("chooseOption").innerHTML = `<p class="select-category__txt">The chosen option:
                                  <p>(${stateToChange})</p>`
                                  document.querySelectorAll('rect').forEach(rect=>{
                                      rect.parentNode.children[1].innerHTML = ""
                                  });
                                    showMC(allLeftc, allLeftm, allRightc, allRightm);
                                  [allLeftm, allRightm, allLeftc, allRightc] = verifyState(stateToChange, setShowAlert, showAlert);
                                  
                                  // AICI NU MAKE BUTTON, CI VERIF DACA ALEGEREA E BUNA SI TRECE MAI DEPARTE DC DA! (TREBUIE SA AJUNGA CUMVA LA FINAL)
                                   
                                  steps.push(stateToChange);
                                  setTimeout(()=>{
                                    animationC()
                                  }, 3000)
                                }else{
                                  console.log("not good")
                                  // break
                                }
                              } else if (allRightm == 1) {
                                inBoatAll = [['M', 'C'],['C', 'C'],['M'],['C']]
                                boatPos = 1 - boatPos;
                                stateToChange = changeStateMethodReverse(inBoatAll, allLeftc, allLeftm, allRightc, allRightm, boatPos)
                                if (stateToChange != "no"){
                                  console.log("AM ALES STAREA:", stateToChange)
                                  document.getElementById("chooseOption").innerHTML = `<p class="select-category__txt">The chosen option:
                                  <p>(${stateToChange})</p>`
                                  document.querySelectorAll('rect').forEach(rect=>{
                                      rect.parentNode.children[1].innerHTML = ""
                                  });
                                    showMC(allLeftc, allLeftm, allRightc, allRightm);
                                  [allLeftm, allRightm, allLeftc, allRightc] = verifyState(stateToChange, setShowAlert, showAlert);
                                  
                                  // AICI NU MAKE BUTTON, CI VERIF DACA ALEGEREA E BUNA SI TRECE MAI DEPARTE DC DA! (TREBUIE SA AJUNGA CUMVA LA FINAL)
                                   
                                  steps.push(stateToChange);
                                  setTimeout(()=>{
                                    animationC()
                                  }, 3000)
                                }else{
                                  console.log("not good")
                                  // break
                                }
                              } else {
                                inBoatAll = [['C', 'C'],['C']]
                                boatPos = 1 - boatPos;
                                stateToChange = changeStateMethodReverse(inBoatAll, allLeftc, allLeftm, allRightc, allRightm, boatPos)
                                if (stateToChange != "no"){
                                  console.log("AM ALES STAREA:", stateToChange)
                                  document.getElementById("chooseOption").innerHTML = `<p class="select-category__txt">The chosen option:
                                  <p>(${stateToChange})</p>`
                                  document.querySelectorAll('rect').forEach(rect=>{
                                      rect.parentNode.children[1].innerHTML = ""
                                  });
                                    showMC(allLeftc, allLeftm, allRightc, allRightm);
                                  [allLeftm, allRightm, allLeftc, allRightc] = verifyState(stateToChange, setShowAlert, showAlert);
                                  
                                  // AICI NU MAKE BUTTON, CI VERIF DACA ALEGEREA E BUNA SI TRECE MAI DEPARTE DC DA! (TREBUIE SA AJUNGA CUMVA LA FINAL)
                                   
                                  steps.push(stateToChange);
                                  setTimeout(()=>{
                                    animationC()
                                  }, 3000)
                                }else{
                                  console.log("not good")
                                  // break
                                }
                              }
                            } else if (allRightc == 1) {
                              if (allRightm >= 2) {
                                inBoatAll = [['M', 'M'],['M', 'C'],['M'],['C']]
                                boatPos = 1 - boatPos;
                                stateToChange = changeStateMethodReverse(inBoatAll, allLeftc, allLeftm, allRightc, allRightm, boatPos)
                                if (stateToChange != "no"){
                                  console.log("AM ALES STAREA:", stateToChange)
                                  document.getElementById("chooseOption").innerHTML = `<p class="select-category__txt">The chosen option:
                                  <p>(${stateToChange})</p>`
                                  document.querySelectorAll('rect').forEach(rect=>{
                                      rect.parentNode.children[1].innerHTML = ""
                                  });
                                    showMC(allLeftc, allLeftm, allRightc, allRightm);
                                  [allLeftm, allRightm, allLeftc, allRightc] = verifyState(stateToChange, setShowAlert, showAlert);
                                  
                                  // AICI NU MAKE BUTTON, CI VERIF DACA ALEGEREA E BUNA SI TRECE MAI DEPARTE DC DA! (TREBUIE SA AJUNGA CUMVA LA FINAL)
                                   
                                  steps.push(stateToChange);
                                  setTimeout(()=>{
                                    animationC()
                                  }, 3000)
                                }else{
                                  console.log("not good")
                                  // break
                                }
                              } else if (allRightm == 1) {
                                inBoatAll = [['M', 'C'],['M'],['C']]
                                boatPos = 1 - boatPos;
                                stateToChange = changeStateMethodReverse(inBoatAll, allLeftc, allLeftm, allRightc, allRightm, boatPos)
                                if (stateToChange != "no"){
                                  console.log("AM ALES STAREA:", stateToChange)
                                  document.getElementById("chooseOption").innerHTML = `<p class="select-category__txt">The chosen option:
                                  <p>(${stateToChange})</p>`
                                  document.querySelectorAll('rect').forEach(rect=>{
                                      rect.parentNode.children[1].innerHTML = ""
                                  });
                                    showMC(allLeftc, allLeftm, allRightc, allRightm);
                                  [allLeftm, allRightm, allLeftc, allRightc] = verifyState(stateToChange, setShowAlert, showAlert);
                                  
                                  // AICI NU MAKE BUTTON, CI VERIF DACA ALEGEREA E BUNA SI TRECE MAI DEPARTE DC DA! (TREBUIE SA AJUNGA CUMVA LA FINAL)
                                   
                                  steps.push(stateToChange);
                                  setTimeout(()=>{
                                    animationC()
                                  }, 3000)
                                }else{
                                  console.log("not good")
                                  // break
                                }
                              } else { //rm=0
                                inBoatAll = [['C']]
                                boatPos = 1 - boatPos;
                                stateToChange = changeStateMethodReverse(inBoatAll, allLeftc, allLeftm, allRightc, allRightm, boatPos)
                                if (stateToChange != "no"){
                                  console.log("AM ALES STAREA:", stateToChange)
                                  document.getElementById("chooseOption").innerHTML = `<p class="select-category__txt">The chosen option:
                                  <p>(${stateToChange})</p>`
                                  document.querySelectorAll('rect').forEach(rect=>{
                                      rect.parentNode.children[1].innerHTML = ""
                                  });
                                    showMC(allLeftc, allLeftm, allRightc, allRightm);
                                  [allLeftm, allRightm, allLeftc, allRightc] = verifyState(stateToChange, setShowAlert, showAlert);
                                  // AICI NU MAKE BUTTON, CI VERIF DACA ALEGEREA E BUNA SI TRECE MAI DEPARTE DC DA! (TREBUIE SA AJUNGA CUMVA LA FINAL)
                                   
                                  steps.push(stateToChange);
                                  setTimeout(()=>{
                                    animationC()
                                  }, 3000)
                                }else{
                                  console.log("not good")
                                  // break
                                }
                              }
                            } else { // rc=0
                              if (allRightm >= 2) {
                                inBoatAll = [['M', 'M'],['M']]
                                boatPos = 1 - boatPos;
                                stateToChange = changeStateMethodReverse(inBoatAll, allLeftc, allLeftm, allRightc, allRightm, boatPos)
                                if (stateToChange != "no"){
                                  console.log("AM ALES STAREA:", stateToChange)
                                  document.getElementById("chooseOption").innerHTML = `<p class="select-category__txt">The chosen option:
                                  <p>(${stateToChange})</p>`
                                  document.querySelectorAll('rect').forEach(rect=>{
                                      rect.parentNode.children[1].innerHTML = ""
                                  });
                                    showMC(allLeftc, allLeftm, allRightc, allRightm);
                                  [allLeftm, allRightm, allLeftc, allRightc] = verifyState(stateToChange, setShowAlert, showAlert);
                                  
                                  // AICI NU MAKE BUTTON, CI VERIF DACA ALEGEREA E BUNA SI TRECE MAI DEPARTE DC DA! (TREBUIE SA AJUNGA CUMVA LA FINAL)
                                   
                                  steps.push(stateToChange);
                                  setTimeout(()=>{
                                    animationC()
                                  }, 3000)
                                }else{
                                  console.log("not good")
                                  // break
                                }
                              } else if (allRightm == 1) {
                                inBoatAll = [['M']]
                                boatPos = 1 - boatPos;
                                stateToChange = changeStateMethodReverse(inBoatAll, allLeftc, allLeftm, allRightc, allRightm, boatPos)
                                if (stateToChange != "no"){
                                  console.log("AM ALES STAREA:", stateToChange)
                                  document.getElementById("chooseOption").innerHTML = `<p class="select-category__txt">The chosen option:
                                  <p>(${stateToChange})</p>`
                                  document.querySelectorAll('rect').forEach(rect=>{
                                      rect.parentNode.children[1].innerHTML = ""
                                  });
                                  showMC(allLeftc, allLeftm, allRightc, allRightm);
                                  [allLeftm, allRightm, allLeftc, allRightc] = verifyState(stateToChange, setShowAlert, showAlert);
                                  
                                  // AICI NU MAKE BUTTON, CI VERIF DACA ALEGEREA E BUNA SI TRECE MAI DEPARTE DC DA! (TREBUIE SA AJUNGA CUMVA LA FINAL)
                                   
                                  steps.push(stateToChange);
                                  setTimeout(()=>{
                                    animationC()
                                  }, 3000)
                                }else{
                                  console.log("not good")
                                  // break
                                }
                              } else {
                                console.log("NOTHING HERE - MAYBE FINAL STATE")
                                // break
                              }
                            }
                            document.querySelectorAll('rect').forEach(rect=>{
                                rect.parentNode.children[1].innerHTML = "";
                            });
                            showMC(allLeftc, allLeftm, allRightc, allRightm);

                          }
                          
                          } else {
                            document.querySelectorAll('rect').forEach(rect=>{
                                rect.parentNode.children[1].innerHTML = "";
                            });
                            showMC(allLeftc, allLeftm, allRightc, allRightm);
                            setShowAlert({...showAlert, show:true, title:"Final!", message:"The animation is completed and you reached the finale! ", btnColor:"red"})

                          }

                        }
                        animationC()
                        // while (stateToChange != finalState) {
                          
                        //   setTimeout(()=>{
                        //     document.querySelectorAll('rect').forEach(rect=>{
                        //       rect.parentNode.children[1].innerHTML = "";
                        //     });
                        //     console.log("aici + ", i)
                        //     showMC(allLeftc, allLeftm, allRightc, allRightm);
                        //     // in functie de optiunea aleasa      
                        //     // idk if right
                        //   }, 3000*i)
                        //   i++;
                        //   console.log(i)
                        // }// end while
                          console.log("your entire progress:")
                          steps.forEach(element => {
                            console.log(element)
                          });
                      } 
                        // so if final state is reached -> message on sweetalert that the road is finished or smth!
                      console.log("in final - ai ajuns la final!")
                    } else if (transition.includes("initial->")) {
                      console.log("aici esti")
                      let newState = transition.split("->")[1].split(" ").join("")
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
                                document.querySelectorAll('rect').forEach(rect=>{
                                                  rect.parentNode.children[1].innerHTML = ""
                                                })
                                showMC(leftc, leftm, rightc, rightm)
                                setTimeout(()=>{
                                  document.querySelectorAll('rect').forEach(rect=>{
                                    rect.parentNode.children[1].innerHTML = ""
                                  })
                                  showMC(leftcV, leftmV, rightcV, rightmV)
                                }, 5000)

                                setShowAlert({...showAlert, show:true, title:"Good job!", message:"The transition is correct!", btnColor:"green", btnText:"YEY"})
                                // small animation with boat and transition with the boat remaining where it will go
                                // BONUS: after that if yes -> the STATE changes and you can make another transition from that one if not final
                              } else if (ok == 1) { // TODO: VERIFICARI AICI!!!!!
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
                      let states = transition.split("->")
                      let baseState = states[1].split(" ").join("")
                      let nextState = states[2].split(" ").join("")
                      baseState = baseState.toLowerCase();
                      nextState = nextState.toLowerCase();
                      baseState = removePh(baseState)
                      nextState = removePh(nextState)
                      console.log(baseState, "\n", nextState)
                      // VERIFY IF THE STATES HAVE THE SAME LENGTH AS THE ONE GIVEN AS STATE
                      console.log("after split: ", baseState.split(",").length, baseState.split(","), " and the state has ", state.split(",").length)
                      if(baseState == '' || baseState =="()" || nextState == '' || nextState =="()"){
                        setShowAlert({...showAlert, show:true, title:"Nothing here!", message:"One of the states is kinda empty!", btnColor:"red"})
                      } else {
                        let vectBaseState = baseState.split(","), vectState = state.split(","), vectNextState = nextState.split(",")
                        if (vectBaseState.length == vectState.length && vectBaseState.length == vectNextState.length) {
                          if (vectBaseState[0].includes("(") && vectBaseState[leftm+rightm-1].includes(")") && vectBaseState[leftm+rightm].includes("(") 
                          && vectBaseState[leftm+rightm+leftc+rightc-1].includes(")") && vectBaseState[vectBaseState.length-1] == "b"
                          && vectNextState[0].includes("(") && vectNextState[leftm+rightm-1].includes(")") && vectNextState[leftm+rightm].includes("(") 
                          && vectNextState[leftm+rightm+leftc+rightc-1].includes(")") && vectNextState[vectNextState.length-1].includes("b")) {
                            console.log("STARI OK YEY")
                            // verify the boat
                            if (vectBaseState[vectBaseState.length-1] == vectNextState[vectNextState.length-1]) {
                              setShowAlert({...showAlert, show:true, title:"Boat state unchanged!", message:"The state of the boat remains unchanged even though the positions of the m&c change!", btnColor:"aqua", btnText:'OK'})
                            } else {
                              let diffComponents = 0
                              let countPM = 0
                              let sameNameOperations = 0, operationsVect = [], differentOperationsMinuses = [], differentOperationsPluses = []
                              for (let i = 0; i < vectBaseState.length - 1; i++) {
                                if (vectBaseState[i].length != vectNextState[i].length) {
                                  // a modification appears
                                  // verify if there is a +/- sign and the names are the same!
                                  if ((vectNextState[i].includes("+") || vectNextState[i].includes("-"))) {
                                    countPM++
                                    if (vectNextState[i].includes("+")) {
                                      differentOperationsPluses.push(vectNextState[i])
                                    } else  if (vectNextState[i].includes("-")){
                                      differentOperationsMinuses.push(vectNextState[i])
                                    }
                                    if((vectBaseState[i].length == vectNextState[i].length - 2 && vectNextState[i].includes(vectBaseState[i]))
                                    || (vectNextState[i].includes(")") && vectBaseState[i].length == vectNextState[i].length - 2)) {
                                      // name is the same!! operations possible - SECOND CASE
                                      sameNameOperations++
                                      operationsVect.push(vectNextState[i])
                                      // also verify if the component from position leftm+rightm-1 is the same, bc is different
                                      // HERE VERIFY IF A NAME DIFFER!
                                    }
                                  }  else if (vectNextState[i].includes(vectBaseState[i]) && vectBaseState[i].length != vectNextState[i].length) {
                                    // names are different, no + or - signs - FIRST CASE
                                    diffComponents++
                                  } else if (!vectNextState[i].includes(vectBaseState[i])) {
                                    // names are totally different, but no +- signs - FIRST CASE TOO
                                    diffComponents++
                                  } else {
                                    //nothing
                                  }
                                  // verify if the components names are different, but there is no + or - sign
                                }
                              } // end for
                              let countTheSame = 0
                              if (differentOperationsPluses.length == differentOperationsPluses.length && (differentOperationsMinuses.length + differentOperationsPluses.length) == countPM) {
                                for (let i = 0; i < differentOperationsPluses.length; i++) {
                                  if (differentOperationsPluses[i].includes("(")) {
                                    differentOperationsPluses[i] = differentOperationsPluses[i].replace("(", "")
                                  } else if (differentOperationsPluses[i].includes(")")) {
                                    differentOperationsPluses[i] = differentOperationsPluses[i].replace(")", "")
                                  } else if (differentOperationsMinuses[i].includes("(")) {
                                    differentOperationsMinuses[i] = differentOperationsMinuses[i].replace("(", "")
                                  } else if (differentOperationsMinuses[i].includes(")")) {
                                    differentOperationsMinuses[i] = differentOperationsMinuses[i].replace(")", "")
                                  }
                                }
                                for (let i = 0; i < differentOperationsMinuses.length;  i++) {
                                  for (let j = 0; j < differentOperationsPluses.length; j++) {
                                    if ((differentOperationsMinuses[i].includes("m") && differentOperationsPluses[j].includes("m"))
                                    ||(differentOperationsMinuses[i].includes("c") && differentOperationsPluses[j].includes("c")) ) {
                                      if (differentOperationsPluses[j].split("+")[1] == differentOperationsMinuses[i].split("-")[1]) {
                                        countTheSame ++
                                      }
                                    }
                                  }
                                }
                              }
                              
                              let plusesToSumM = [], plusesToSumC = [], minusesToSumM = [], minusesToSumC = []
                              if ((sameNameOperations == 0 || countTheSame == 2) && diffComponents != 0) {
                                document.getElementById("chooseOption").innerHTML = `<p className="select-category__txt">Your options:</p>`
                                // FIRST CASE HERE - no = or - here OR M1+V1, ETC
                                // appear buttons for states to choose from! it is written if ok or not!
                                    // the start state is put on the screen
                                    // if press on the wrong one, an animation is done and after 1 sec the 'game' is over and buttons dissapear
                                    // else -> animation for the state chosen -> wait 1 sec and it will change on the screen like initial->
                                    // and then it goes again in the while for dif components and search for next states
                                    // BUTTON FOR END STATE, THE SEARCH BUTTON FROM LEFT IS INACTIVE UNTIL THE GAME ENDS OR THE BUTTON FOR END STATE IS PRESSED
                                  // 
                                // MAKE SEARCH BUTTON INACTIVE??
                                // let searchBtn = document.getElementById("submitUserData")
                                // searchBtn.style.background = "#9a9da1"
                                // searchBtn.disabled = true
                                
                                console.log("diff components nr", diffComponents)
                                let stateToChange = state, boatPos = firstBoatPosition
                                let allLeftc = leftc, allLeftm = leftm, allRightc = rightc, allRightm = rightm
                                let inBoatAll = [], options = [], vals = [], okOrNot
                                
                                while (stateToChange != finalState) {
                                  if ((boatPos == 0 && firstBoatPosition == 0)) { // || (boatPos == 1 && firstBoatPosition == 1)
                                    // daca e in cea din care porneste
                                    if (stateToChange == initialState) {
                                      if ((allLeftc + allRightc) == 1) {
                                        inBoatAll = ['M', 'C']
                                        boatPos = 1 - boatPos;
                                        options = [finalState]
                                        vals = [1] // 1 is ok
                                        okOrNot = makeButton(options, vals, optionChosen, setOptionChosen)
                                        if (okOrNot[1] == 1) {
                                          document.querySelectorAll('rect').forEach(rect=>{
                                              rect.parentNode.children[1].innerHTML = ""
                                          });
                                          showMC(allLeftc, allLeftm, allRightc, allRightm);
                                          [allLeftm, allRightm, allLeftc, allRightc] = verifyState(okOrNot[0], setShowAlert, showAlert);
                                          // animation
                                          setTimeout(() => {
                                            document.querySelectorAll('rect').forEach(rect=>{
                                              rect.parentNode.children[1].innerHTML = ""
                                            });
                                          showMC(allLeftc, allLeftm, allRightc, allRightm);
                                          }, 3000);
                                          // treci la urm
                                        } else {
                                          document.querySelectorAll('rect').forEach(rect=>{
                                              rect.parentNode.children[1].innerHTML = ""
                                          });
                                          showMC(allLeftc, allLeftm, allRightc, allRightm);
                                          [allLeftm, allRightm, allLeftc, allRightc] = verifyState(okOrNot[0], setShowAlert, showAlert);
                                          // animation
                                          setTimeout(() => {
                                            document.querySelectorAll('rect').forEach(rect=>{
                                              rect.parentNode.children[1].innerHTML = ""
                                            });
                                          showMC(allLeftc, allLeftm, allRightc, allRightm);
                                          }, 3000);
                                          // break - se opreste
                                        }
                                        // make button with this option
                                        // if a button is pressed -> do animation
                                        // then see if the option is ok!
                                        // break if final state!
                                        break
                                      } else {
                                        // 3 options: MM, MC, CC
                                        inBoatAll = [['M', 'C'], ['M', 'M'], ['C', 'C']]
                                        boatPos = 1 - boatPos;
                                        [options, vals] = searchForOptions(inBoatAll, allLeftc, allLeftm, allRightc, allRightm, boatPos)
                                        options.forEach(element=>{
                                          console.log("("+element+")")
                                        })
                                        // pt animatie, este nev de toate left right! de la optiunea aleasa!
                                        // THIS CAN BE MADE FROM THE OPTION
                                        makeButton(options, vals, optionChosen, setOptionChosen)
                                        // if (okOrNot) { //true
                                        //   continue
                                        // } else {
                                        //   console.log("pus alerta nu e ok")
                                        //   // activate search button
                                        //   break
                                        // }
                                        break
                                      }
                                    } else { // if not initial state
                                      if (allLeftc >= 2) {
                                        if (allLeftm >=2) {
                                          // 3 options: MM, MC, CC
                                          inBoatAll = [['M', 'C'], ['M', 'M'], ['C', 'C']]
                                          boatPos = 1 - boatPos;
                                          [options, vals] = searchForOptions(inBoatAll, allLeftc, allLeftm, allRightc, allRightm, boatPos)
                                          options.forEach(element=>{
                                            console.log("("+element+")")
                                          })
                                          break
                                          // se fac butoane pt options
                                          // see which one is pressed -> make animation
                                          // then verify if is eaten or final state(break)!
                                          // if not, do nothing! just continue
                                        } else if (allLeftm == 1) {
                                          inBoatAll = [['M', 'C'], ['C', 'C']]
                                          boatPos = 1 - boatPos;
                                          [options, vals] = searchForOptions(inBoatAll, allLeftc, allLeftm, allRightc, allRightm, boatPos)
                                          options.forEach(element=>{
                                            console.log("("+element+")")
                                          })
                                          break
                                          // se fac butoane pt options
                                          // see which one is pressed -> make animation
                                          // then verify if is eaten or final state(break)!
                                          // if not, do nothing! just continue
                                        } else { //lm=0
                                          inBoatAll = [['C', 'C']]
                                          boatPos = 1 - boatPos;
                                          [options, vals] = searchForOptions(inBoatAll, allLeftc, allLeftm, allRightc, allRightm, boatPos)
                                          options.forEach(element=>{
                                            console.log("("+element+")")
                                          })
                                          break
                                          // se fac butoane pt options
                                          // see which one is pressed -> make animation
                                          // then verify if is eaten or final state(break)!
                                          // if not, do nothing! just continue
                                        }
                                      } else if (allLeftc == 1) {
                                        if (allLeftm >= 2) {
                                          inBoatAll = [['M', 'C'], ['M', 'M']]
                                          boatPos = 1 - boatPos;
                                          [options, vals] = searchForOptions(inBoatAll, allLeftc, allLeftm, allRightc, allRightm, boatPos)
                                          options.forEach(element=>{
                                            console.log("("+element+")")
                                          })
                                          break
                                          // se fac butoane pt options
                                          // see which one is pressed -> make animation
                                          // then verify if is eaten or final state(break)!
                                          // if not, do nothing! just continue
                                        } else if (allLeftm == 1){
                                          inBoatAll = [['M', 'C']]
                                          boatPos = 1 - boatPos;
                                          [options, vals] = searchForOptions(inBoatAll, allLeftc, allLeftm, allRightc, allRightm, boatPos)
                                          options.forEach(element=>{
                                            console.log("("+element+")")
                                          })
                                          break
                                          // se fac butoane pt options
                                          // see which one is pressed -> make animation
                                          // then verify if is eaten or final state(break)!
                                          // if not, do nothing! just continue
                                        } else { //lm=0
                                          console.log("NOT OK!")
                                          setShowAlert({...showAlert, show:true, title:"Not ok!", message:"Not ok - todo!", btnColor:"aqua", btnText:'OK'})

                                          break
                                          // mesaj game over + search button activate
                                        }
                                      } else {
                                        console.log("nothin here")
                                        break
                                      }
                                    }
                                  } else {
                                    // daca e in cea in care e prezenta starea finala!
                                    if (allRightc >= 2) {
                                      if (allRightm >= 2) {
                                        inBoatAll = [['M', 'M'],['M', 'C'],['C', 'C'],['M'],['C']]
                                        boatPos = 1 - boatPos;
                                        [options, vals] = searchForOptionsReverse(inBoatAll, allLeftc, allLeftm, allRightc, allRightm, boatPos)
                                        options.forEach(element=>{
                                          console.log("("+element+")")
                                        })
                                        break
                                        // se fac butoane pt options
                                        // see which one is pressed -> make animation
                                        // then verify if is eaten or final state(break)!
                                        // if not, do nothing! just continue
                                      } else if (allRightm == 1) {
                                        inBoatAll = [['M', 'C'],['C', 'C'],['M'],['C']]
                                        boatPos = 1 - boatPos;
                                        [options, vals] = searchForOptionsReverse(inBoatAll, allLeftc, allLeftm, allRightc, allRightm, boatPos)
                                        options.forEach(element=>{
                                          console.log("("+element+")")
                                        })
                                        break
                                        // se fac butoane pt options
                                        // see which one is pressed -> make animation
                                        // then verify if is eaten or final state(break)!
                                        // if not, do nothing! just continue
                                      } else {
                                        inBoatAll = [['C', 'C'],['C']]
                                        boatPos = 1 - boatPos;
                                        [options, vals] = searchForOptionsReverse(inBoatAll, allLeftc, allLeftm, allRightc, allRightm, boatPos)
                                        options.forEach(element=>{
                                          console.log("("+element+")")
                                        })
                                        break
                                        // se fac butoane pt options
                                        // see which one is pressed -> make animation
                                        // then verify if is eaten or final state(break)!
                                        // if not, do nothing! just continue
                                      }
                                    } else if (allRightc == 1) {
                                      if (allRightm >= 2) {
                                        inBoatAll = [['M', 'M'],['M', 'C'],['M'],['C']]
                                        boatPos = 1 - boatPos;
                                        [options, vals] = searchForOptionsReverse(inBoatAll, allLeftc, allLeftm, allRightc, allRightm, boatPos)
                                        options.forEach(element=>{
                                          console.log("("+element+")")
                                        })
                                        break
                                        // se fac butoane pt options
                                        // see which one is pressed -> make animation
                                        // then verify if is eaten or final state(break)!
                                        // if not, do nothing! just continue
                                      } else if (allRightm == 1) {
                                        inBoatAll = [['M', 'C'],['M'],['C']]
                                        boatPos = 1 - boatPos;
                                        [options, vals] = searchForOptionsReverse(inBoatAll, allLeftc, allLeftm, allRightc, allRightm, boatPos)
                                        options.forEach(element=>{
                                          console.log("("+element+")")
                                        })
                                        break
                                        // se fac butoane pt options
                                        // see which one is pressed -> make animation
                                        // then verify if is eaten or final state(break)!
                                        // if not, do nothing! just continue
                                      } else { //rm=0
                                        inBoatAll = [['C']]
                                        boatPos = 1 - boatPos;
                                        [options, vals] = searchForOptionsReverse(inBoatAll, allLeftc, allLeftm, allRightc, allRightm, boatPos)
                                        options.forEach(element=>{
                                          console.log("("+element+")")
                                        })
                                        break
                                        // se fac butoane pt options
                                        // see which one is pressed -> make animation
                                        // then verify if is eaten or final state(break)!
                                        // if not, do nothing! just continue
                                      }
                                    } else { // rc=0
                                      if (allRightm >= 2) {
                                        inBoatAll = [['M', 'M'],['M']]
                                        boatPos = 1 - boatPos;
                                        [options, vals] = searchForOptionsReverse(inBoatAll, allLeftc, allLeftm, allRightc, allRightm, boatPos)
                                        options.forEach(element=>{
                                          console.log("("+element+")")
                                        })
                                        break
                                        // se fac butoane pt options
                                        // see which one is pressed -> make animation
                                        // then verify if is eaten or final state(break)!
                                        // if not, do nothing! just continue
                                      } else if (allRightm == 1) {
                                        inBoatAll = [['M']]
                                        boatPos = 1 - boatPos;
                                        [options, vals] = searchForOptionsReverse(inBoatAll, allLeftc, allLeftm, allRightc, allRightm, boatPos)
                                        options.forEach(element=>{
                                          console.log("("+element+")")
                                        })
                                        break
                                        // se fac butoane pt options
                                        // see which one is pressed -> make animation
                                        // then verify if is eaten or final state(break)!
                                        // if not, do nothing! just continue
                                      } else {
                                        console.log("NOTHING HERE - MAYBE FINAL STATE")
                                        break
                                      }
                                    }

                                  }
                                }
                                  
                              } else {
                                document.getElementById("chooseOption").innerHTML = `<p class="select-category__txt">The next state:</p>`
                                // SECOND CASE HERE - some operations that need to be verified!
                                // 2) verify if there are the same components - names, then verify if the +-es <= 2!
                                // while!!!1
                                  // 2.1) if not ok -> just a message on the screen, not buttons appearing
                                  // 2.2) ELSE buttons appear for states to choose from (even if there is just one)
                                  // and a button for end transition, and search button is inactive until the other one is pressed
                                  // if ok -> make animation and other button for state will appear!
                                // 3) see if there are any other options available!
                                let countPlus = 0, countMinus = 0
                                for (let i = 0; i < operationsVect.length; i++) {
                                  if (operationsVect[i].includes("+")) {
                                    countPlus++
                                    if (operationsVect[i].includes("m")) {
                                      plusesToSumM.push(parseInt(operationsVect[i].split("+")[1]))
                                    } else {
                                      plusesToSumC.push(parseInt(operationsVect[i].split("+")[1]))
                                    }
                                    if (operationsVect[i].includes(")")) {
                                      operationsVect[i] = operationsVect[i].replace(")", "")
                                    } else if (operationsVect[i].includes("(") ){
                                      operationsVect[i] = operationsVect[i].replace("(", "")
                                    }
                                  } else if (operationsVect[i].includes("-")){
                                    countMinus++
                                    if (operationsVect[i].includes("m")) {
                                      minusesToSumM.push(parseInt(operationsVect[i].split("-")[1]))
                                    } else {
                                      minusesToSumC.push(parseInt(operationsVect[i].split("-")[1]))
                                    }
                                    if (operationsVect[i].includes(")")) {
                                      operationsVect[i] = operationsVect[i].replace(")", "")
                                    } else if (operationsVect[i].includes("(") ){
                                      operationsVect[i] = operationsVect[i].replace("(", "")
                                    }
                                  } 
                                } // end for

                                console.log("+:", countPlus, "-:", countMinus, "\n", operationsVect)
                                if (countPM != (countPlus + countMinus)) {
                                  console.log("not ok here-> diff elements combined with same ones!")
                                  setShowAlert({...showAlert, show:true, title:"Not ok!", message:"You combined 2 modes! Look at the instructions again!", btnColor:"red", btnText:'OK'})
                                } else {
                                  let pSumM = plusesToSumM.reduce(function(a, b){
                                                          return a + b;
                                                      }, 0)
                                  let pSumC = plusesToSumC.reduce(function(a, b){
                                                          return a + b;
                                                      }, 0)
                                  let mSumM = minusesToSumM.reduce(function(a, b){
                                                          return a + b;
                                                      }, 0)
                                  let mSumC = minusesToSumC.reduce(function(a, b){
                                                          return a + b;
                                                      }, 0)
                                  if (pSumM+pSumC <= 2) {
                                    if (pSumM+pSumC == mSumM+mSumC) {
                                      if (pSumC == mSumC && pSumM == mSumM) {
                                        // WORKS JUST WITH THE NEXT STATE! LIKE IN INITIAL!
                                        console.log("plusessumc: ", pSumC, " plusessumm: ", pSumM, " minusessumc: ", mSumC, " minusessumm: ", mSumM)
                                        console.log("leftc: ", leftc, " leftm: ", leftm, " rightc: ", rightc, " rightm: ", rightm)
                                        let hereInBoat = [], newState = state
                                        if (firstBoatPosition == 0) { // incepe de la 0
                                          if (leftm < mSumM || leftc < mSumC) {
                                            setShowAlert({...showAlert, show:true, title:"Not ok!", message:"The - sign on m or c is too big!", btnColor:"red", btnText:'OK'})
                                          } else {
                                            if (leftc - mSumC > leftm - mSumM || rightc + pSumC > rightm + pSumM) {
                                              setShowAlert({...showAlert, show:true, title:"You got eaten!",
                                              message:"The number of canibals on one side is bigger than the number of missionaries on one of the states! They ate you!", btnColor:"red", btnText:'OK'})
                                            } else {
                                              newState = constructOption(leftc - mSumC, leftm - mSumM, rightc + pSumC, rightm + pSumM, 1-firstBoatPosition)
                                              console.log("NEW STATE: ", newState)
                                              document.getElementById("chooseOption").innerHTML += `<p class="wait">${newState}</p><p class="wait">Wait 5 seconds for the animation to complete.`
                                              // ANIMATION AS IN INITIAL->
                                              document.querySelectorAll('rect').forEach(rect=>{
                                                  rect.parentNode.children[1].innerHTML = ""
                                                })
                                              showMC(leftc, leftm, rightc, rightm)
                                              setTimeout(()=>{
                                                document.querySelectorAll('rect').forEach(rect=>{
                                                  rect.parentNode.children[1].innerHTML = ""
                                                })
                                                showMC(leftc - mSumC, leftm - mSumM, rightc + pSumC, rightm + pSumM)
                                              }, 5000)
                                            }
                                            
                                          }
                                        } else {
                                          if (rightm < mSumM || rightc < mSumC) {
                                            setShowAlert({...showAlert, show:true, title:"Not ok!", message:"The - sign on m or c is too big!", btnColor:"red", btnText:'OK'})
                                          } else {
                                            if (leftc + mSumC > leftm + mSumM || rightc - pSumC > rightm - pSumM) {
                                              setShowAlert({...showAlert, show:true, title:"You got eaten!",
                                              message:"The number of canibals on one side is bigger than the number of missionaries on one of the states! They ate you!", btnColor:"red", btnText:'OK'})
                                            } else {
                                              newState = constructOption(leftc + mSumC, leftm + mSumM, rightc - pSumC, rightm - pSumM, 1-firstBoatPosition)
                                              console.log("NEW STATE: ", newState)
                                              document.getElementById("chooseOption").innerHTML += `<p class="wait">${newState}</p><p class="wait">Wait 5 seconds for the animation to complete.`
                                              // ANIMATION AS IN INITIAL->
                                              document.querySelectorAll('rect').forEach(rect=>{
                                                  rect.parentNode.children[1].innerHTML = ""
                                                })
                                              showMC(leftc, leftm, rightc, rightm)
                                              setTimeout(()=>{
                                                // PART 2 ANIMATION
                                              // MAI INTAI STERGE  CE TREBUIE!
                                                document.querySelectorAll('rect').forEach(rect=>{
                                                  rect.parentNode.children[1].innerHTML = ""
                                                })
                                                showMC(leftc + mSumC, leftm + mSumM, rightc - pSumC, rightm - pSumM)
                                              }, 5000)

                                            }
                                          }
                                        }
                                        // NU CONTEAZA UNDE SUNT SEMNELE! SE PUN DOAR IN FUNCTIE DE CAT SE PUNE CU - SI +
                                        // face inactiv butonul de search!
                                        // WHILE cu tot 'jocul', pana cand ajunge la final, in fct de starea boat-ului
                                          // AICI SA VEDEM CE PUNE! si pui optiunile ca si butoane (sa-si dea seama ei dc e ok sau nu starea)
                                          // daca alege una not ok, animatie, se activeaza search + break & alerta game over (YOU WERE ANNOUNCED!)
                                          // daca e una corecta => animatie dupa o sec la starea pe care a ales-o si apare un alt set de butoane!
                                        // la finalul jocului, cand ajunge la final, se activeaza search
                                      } else {
                                        setShowAlert({...showAlert, show:true, title:"Not ok!", message:"Not correctly written! Check the instructions for more!", btnColor:"red", btnText:'OK'})
                                      }
                                    } else {
                                      setShowAlert({...showAlert, show:true, title:"Not ok!", message:"Cannot find the same sum for + and -!", btnColor:"red", btnText:'OK'})
                                    }
                                  } else {
                                    console.log("not really + message")
                                    setShowAlert({...showAlert, show:true, title:"Not ok!", message:"Not really + message!", btnColor:"red", btnText:'OK'})
                                  }
                                }
                              }
                            }
                          } else {
                            setShowAlert({...showAlert, show:true, title:"Not ok!", message:"Check the instruction before writing!", btnColor:"red", btnText:'OK'})
                          }
                        } else {
                          console.log("not the same length states")
                          setShowAlert({...showAlert, show:true, title:"Not ok!", message:"The states do not have the same length!", btnColor:"red", btnText:'OK'})
                        }
                      }
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
        <h1 className='choose-mode__h1'>Choose a mode</h1>
        <form className='choosing__form'>
          <div>
          <button style={{minHeight:'19px',height:'19px',background:'transparent', border:'none'}} onClick={function(e){
            e.preventDefault();

            if(selectedMod != 0){
              setMod(0);
              console.log("Mod set to", 0)

            }
          }} id="simpleRoad">{selectedMod==0?
          <><FontAwesomeIcon color="green" icon={faCircleCheck} />Simple Road
          
          </>
          :<p style={{margin:'0',marginLeft:'13.5px'}}>Simple Road</p>}</button>
       
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
        } else if (rightCanibals > rightMissionaries && rightMissionaries != 0){
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

function searchForOptions(vectInBoat, lc, lm, rc, rm, boat) {
  let options = [] // states possible! without (       ), will be put just at btn text
  let llc = lc, llm = lm, rrc = rc, rrm = rm
  let vals = []
  vectInBoat.forEach(element => {
    if (element.join("") == "MM") {
      rrm+=2
      llm-=2
      options.push(constructOption(llc,llm,rrc,rrm, boat))
      if ((rrm < rrc && rrm != 0)|| (llm < llc && llm != 0)) {
        vals.push(0)
      } else {
        vals.push(1)
      }
      llm = lm; rrm = rm
    } else if (element.join("") == "MC") {
      rrm++
      llm--
      rrc++
      llc--
      options.push(constructOption(llc,llm,rrc,rrm, boat))
      if ((rrm < rrc && rrm != 0)|| (llm < llc && llm != 0)) {
        vals.push(0)
      } else {
        vals.push(1)
      }
      llc = lc; llm = lm; rrc = rc; rrm = rm
    } else { // CC
      rrc+=2
      llc-=2
      options.push(constructOption(llc,llm,rrc,rrm, boat))
      if ((rrm < rrc && rrm != 0)|| (llm < llc && llm != 0)) {
        vals.push(0)
      } else {
        vals.push(1)
      }
      llc = lc; rrc = rc
    }
  });
  return [options, vals]
}

function searchForOptionsReverse(vectInBoat, lc, lm, rc, rm, boat) {
  let options = [] // states possible! without (       ), will be put just at btn text
  let llc = lc, llm = lm, rrc = rc, rrm = rm
  let vals = []
  vectInBoat.forEach(element => {
    if (element.join("") == "MM") {
      llm+=2
      rrm-=2
      options.push(constructOption(llc,llm,rrc,rrm, boat))
      if ((rrm < rrc && rrm != 0)|| (llm < llc && llm != 0)) {
        vals.push(0)
      } else {
        vals.push(1)
      }
      llm = lm; rrm = rm
    } else if (element.join("") == "MC") {
      llm++
      rrm--
      llc++
      rrc--
      options.push(constructOption(llc,llm,rrc,rrm, boat))
      if ((rrm < rrc && rrm != 0)|| (llm < llc && llm != 0)) {
        vals.push(0)
      } else {
        vals.push(1)
      }
      llc = lc; llm = lm; rrc = rc; rrm = rm
    } else if (element.join("") == "CC") { 
      llc+=2
      rrc-=2
      options.push(constructOption(llc,llm,rrc,rrm, boat))
      if ((rrm < rrc && rrm != 0)|| (llm < llc && llm != 0)) {
        vals.push(0)
      } else {
        vals.push(1)
      }
      llc = lc; rrc = rc
    } else if (element.join("") == "M") {
      llm++
      rrm--
      options.push(constructOption(llc,llm,rrc,rrm, boat))
      if ((rrm < rrc && rrm != 0)|| (llm < llc && llm != 0)) {
        vals.push(0)
      } else {
        vals.push(1)
      }
      llm = lm; rrm = rm
    } else { // C
      llc++
      rrc--
      options.push(constructOption(llc,llm,rrc,rrm, boat))
      if ((rrm < rrc && rrm != 0)|| (llm < llc && llm != 0)) {
        vals.push(0)
      } else {
        vals.push(1)
      }
      llc = lc; rrc = rc
    }
  });
  return [options, vals]
}

function constructOption(lc, lm, rc, rm, boat) {
  let option = "("
  for (let i = 0; i < lm; i++) {
    if ((lm+rm-1) == i) {
     option += "0"
    } else {
      option += "0,"
    }
  }

  for (let i = lm; i < rm+lm; i++) {
    if ((lm+rm-1) == i) {
     option += "1"
    } else {
      option += "1,"
    }
  }
  option += "),("

  for (let i = 0; i < lc; i++) {
      if ((lc+rc-1) == i) {
      option += "0"
      } else {
        option += "0,"
      }
    }

  for (let i = lc; i < rc+lc; i++) {
    if ((lc+rc-1) == i) {
    option += "1"
    } else {
      option += "1,"
    }
  }
  option += "),"+boat


  return option
}

function changeStateMethod(inBoatAll, allLeftc, allLeftm, allRightc, allRightm, boatPos){
  let state = "";
  console.log("before:", allLeftc, allLeftm, allRightc, allRightm, boatPos)
  let [options, vals] = searchForOptions(inBoatAll, allLeftc, allLeftm, allRightc, allRightm, boatPos)
  console.log("after:", allLeftc, allLeftm, allRightc, allRightm, boatPos)

  if (boatPos == "1" && allRightc == allRightm && allRightc == 0) {
    console.log("AICI ESTI FA IN INITIAL ????????")
    let optionsAvailable = 0
    vals.forEach(element => {
      if (element == 1) 
      optionsAvailable ++;
    });
    if (optionsAvailable > 1) {
      let randomTodo = []
      for (let i = 0; i < vals.length; i++) {
        if (vals[i] == 1) {
          randomTodo.push(options[i])
        }
      }
      state = randomTodo[Math.floor(Math.random() * randomTodo.length)];
    } else {
      for (let i = 0; i < vals.length; i++) {
        if (vals[i] == 1) {
          state = options[i];
        }
      }
    }
    
  } else {
    console.log(vals)
    options.forEach(element=>{
      console.log("("+element+")")
    })
    // daca e initial -> random!

    for (let i = 0; i < vals.length; i++) {
      if (vals[i] == 1) {
        state = options[i];
      }
    }
    
  }
  if (state)
      return state;
    else {
      return "no"
    }
  
}

function changeStateMethodReverse(inBoatAll, allLeftc, allLeftm, allRightc, allRightm, boatPos){
  let state;
  let [options, vals] = searchForOptionsReverse(inBoatAll, allLeftc, allLeftm, allRightc, allRightm, boatPos)
  console.log(vals)
  options.forEach(element=>{
    console.log("("+element+")")
  })
  for (let i = 0; i < vals.length; i++) {
    if (vals[i] == 1) {  // verif dc e initiala?
      state = options[i];
    }
  }
  if (state)
    return state;
  else {
    return "no"
  }
}

let caca=-1;
window.amApasat = function amApasat(opt, val){
    console.log("AICI FA AAA")
    // document.querySelector("#chooseOption").innerHTML = `<p className="select-category__txt">Your options:</p>`

    optionsSelectedCM = {opt:opt, val:val}
    console.log(optionsSelectedCM)

  }

function makeButton(options, vals, optionChosen, setOptionChosen) {
  let btns = ``
  let amAles = ""
  
// TO RETURN THE OPTION CHOSEN
  console.log(setOptionChosen)
  let btn = document.querySelector("#chooseOption")
  for (let i = 0; i < options.length; i++) {
      btns += `<div><input name="same" id="${options[i]}" type='radio'
      onclick="amApasat('${options[i]}', '${vals[i]}')" 
      /><label for="${options[i]}">${options[i]}</label></div>`
  }
  console.log(btns)
  btn.innerHTML+=btns

  console.log(optionsSelectedCM)

  // TODO: in makebutton: facut butoane, apasat pe buton -> alegere optiune
  // dupa ce s-a apasat, se da clear la butoane, se asteapta 2 sec
  // se face animatie scurta pt unde te duce starea aia
  // dupa animatie iti spune dc e ok sau nu
  let chosenornot = false
  // VEZI CARE OPTIUNE E ALEASA

  //   for (let i = 0; i < options.length; i++) {
  //     let button = document.getElementById(options[i])
  //     if (button.checked) {
  //       setOptionChosen(i+1)
  //       isok = vals[i]
  //       chosenornot = true
  //     }else{
  //       continue
  //     }
  //   }

  // document.querySelector("#chooseOption").innerHTML = `<p className="select-category__txt">Your options:</p>`
  // animation todo here
  // if (isok == 0) {
  //   let searchbtn = document.getElementById("submitUserData")
  //   searchbtn.style.background = "purple"
  //   searchbtn.disabled = false
  //   console.log("GAME OVER!")
  //   return false
  // } else {
  //   console.log("next")
  //   return true
  // }
  
}

export default App;
