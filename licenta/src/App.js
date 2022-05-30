import './App.css';
import {useEffect, useState} from 'react'
import React, { Component } from 'react';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faArrowAltCircleUp, faArrowAltCircleRight, faNotEqual } from '@fortawesome/free-solid-svg-icons'
import SimpleRoad from './Components/SimpleRoad';
import OptionsInfo from './Components/Info';
import MissionariesCannibals from './Components/Missionaries&Cannibals';
let optionsSelectedCM = {val:''};
function App() {
  const [visibilityOptionsMenu,setVisibilityOptionsMenu] = useState(1);
  const [optionSelected, setOption] = useState(0);
  const [height, setHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);
  const [showAlert, setShowAlert] = useState({show:false, message:'', title:'', btnColor:'green', btnText:'OK'})

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

      {optionSelected==0?
      <>
        <SimpleRoad buildGrid={buildGrid} setShowAlert={setShowAlert} showAlert={showAlert}/>
      </>:
      <>
        <MissionariesCannibals buildGrid={buildGrid} setShowAlert={setShowAlert} showAlert={showAlert}/>
      </>}

      <OptionsInfo selectedOption={optionSelected}/>


      {/* A BUTTON TO START A SIMPLE ROAD */}
      <button className="open-close-menu"  onClick={
        ()=>{
          visibilityOptionsMenu===0?setVisibilityOptionsMenu(1):setVisibilityOptionsMenu(0)
        }
      }></button>
      <div className='user-choose' style={{display:visibilityOptionsMenu===0?"none":"block"}}>
        <h1 className='choose-mode__h1'>Choose a mode</h1>
        <form className='choosing__form'>
          <div>
            {["Simple Road", "Missionaries & Cannibals"].map((option, i)=>{
              return(
              <button key={i} style={{minHeight:'19px',height:'19px',background:'transparent', border:'none', display:'block'}} onClick={function(e){
                e.preventDefault();
                if(optionSelected != i){
                  setOption(i);
                  console.log("Option set to", i, "meaning", option)
                }
              }} id="simpleRoad">{optionSelected==i?
              <><FontAwesomeIcon color="green" icon={faCircleCheck} />{option}</>
              :<p style={{margin:'0',marginLeft:'13.5px'}}>{option}</p>}</button>
            )})}
          </div>
        </form>
      </div>
    </div>
  );
}
export default App;
