import '../App.css';
import {useEffect, useState} from 'react'
import React, { Component } from 'react';
import constructMC from './MCComp/ConstructTerrain';
import LeftMCTab from './MCComp/LeftTab';
import Utils from './MCComp/UTILS';
import handleAllTransition from './MCComp/Allhandle';
import handleFinalTransition from './MCComp/FinalHandle';
import handleRandomTransition from './MCComp/InitialHandle';
const utils = new Utils();
export default function MissionariesCannibals(props){

    const [state, setState] = useState('[loaded]');
    const [transition, setTransition] = useState('');

    useEffect(()=>{
        if(state!='[loaded]'){
            console.log("state variable modified to", state)
            checkStateInserts(props, state, transition);
            setState('[loaded]')
        }else{
            console.log("state variable loaded")
        }
    }, [state])

    return(
        <>

        <svg width="100%" height="100%" className='svg-grid'>
            { props.buildGrid().map((coords, i)=>{
                let joinedCoords = coords.join("");
                return(
                    <g key={i}>
                        <rect x={coords[0]*30} y={coords[1]*30} i={coords[0]} j={coords[1]} width="30" height="30" r="0" rx="0" ry="0" fill="#ffffff" stroke="#000" strokeOpacity="0.2" 
                        id ={"rect"+joinedCoords} className='click-rect' style={{fill:'transparent', cursor:'not-allowed'}}></rect>
                        <text x={coords[0]*30} y={coords[1]*30+30} font-family="Verdana" font-size="25"></text>
                    </g>
                )
            })}
        </svg>

        {/* 
        Timeout pt a se incarca la urma; 
        Conform JS, Timeout duce functia in queue si 
        asteapta executarea elementelor asincrone.
        */}
        {constructMC()}
        
        {/* Returneaza state si tranzition prin functiile setState si setTransition */}
        <LeftMCTab setStare={setState} setTransition={setTransition}/>
        <div id='chooseOption'>
        <p className="select-category__txt">Your options:</p>
      </div>
        </>
    )
}

function checkStateInserts(props, state, transition){
    if (state == "()" || state == "" || state == " " || state == "(())" || state == "((),())" || state == "((),(),)"){
        props.setShowAlert({...props.showAlert, show:true, title:"Nothing here!", message:"One of the states is kinda empty!", btnColor:"red"})
    }else{
        let newState = state.split(" ").join("")
        newState = utils.removePh(newState);
        let [leftm, rightm, leftc, rightc] = utils.verifyState(newState, props.setShowAlert, props.showAlert)
        if (!leftm && !rightm & !leftc & !rightc){

        } else {
            checkTranzitionInserts(props, newState, transition)
        }
    } 
}

function checkTranzitionInserts(props, state, transition){
    let finalState = state.replaceAll("0", "1")
    let initialState = state.replaceAll("1", "0")
    let firstBoatPosition = state.split("),")[2]
    document.getElementById("strategies").style.visibility = "hidden"


    if(transition=="final"){
        document.getElementById("chooseOption").innerHTML = `<p class="select-category__txt">The chosen option:</p>`
        if(state == finalState){
            console.log("este finala")
        }else{
            handleFinalTransition(props, state, transition, finalState, initialState, firstBoatPosition);
        }
    }else if(transition.includes("initial->")){

        let newState = transition.split("->")[1].split(" ").join("")
        let value = utils.removePh(newState);

        if(value == '' || value =="()"){
            props.setShowAlert({...props.showAlert, show:true, title:"Nothing here!", message:"One of the states is kinda empty!", btnColor:"red"})
        } else {
            handleRandomTransition(props, value, state, initialState, finalState);
        }
    }else if(transition.includes("all->")){
      let states = transition.split("->")
      let baseState = states[1].split(" ").join("")
      let nextState = states[2].split(" ").join("")
      baseState = baseState.toLowerCase();
      nextState = nextState.toLowerCase();
      baseState = utils.removePh(baseState);
      nextState = utils.removePh(nextState);
      console.log(baseState, "\n", nextState)
      // VERIFY IF THE STATES HAVE THE SAME LENGTH AS THE ONE GIVEN AS STATE
      console.log("after split: ", baseState.split(",").length, baseState.split(","), " and the state has ", state.split(",").length)
      if(baseState == '' || baseState =="()" || nextState == '' || nextState =="()"){
        props.setShowAlert({...props.showAlert, show:true, title:"Nothing here!", message:"One of the states is kinda empty!", btnColor:"red"})
      } else {
        handleAllTransition(props, state, baseState, nextState, finalState, firstBoatPosition,  initialState);
      }
    }else{
      props.setShowAlert({...props.showAlert, show:true, title:"Not a transition!", message:"The data introduced is not correct for the transition -> try one the followings: s, initial->((...),(...),..) and all->((...),(...),...)", btnColor:"red", btnText:"WILL DO"})
    }
}