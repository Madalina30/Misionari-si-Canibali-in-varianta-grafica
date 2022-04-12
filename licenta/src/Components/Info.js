import '../App.css';
import {useEffect, useState} from 'react'
import React, { Component } from 'react';
export default function OptionsInfo(props){

    const [infoVisibility,setInfoVisibility] = useState(1);

    return(
        <div className='instructions'>
            <button className="open-close-instructions" onClick={
                ()=>{
                    infoVisibility===0?setInfoVisibility(1):setInfoVisibility(0)
                }}>
            </button>
            {props.selectedOption == 0?
            <p style={{display:infoVisibility===0?"none":"block"}}>

                You are in Simple Road mode (default). Here are some instructions:
                <ul>
                <li>Start = green, end = red. You can move them around, but the road will be searched from start to end (SEARCH), even diagonally if it is faster;</li>
                <li>In the center menu, you can find explicit named buttons.</li>
                <li>You can add walls that will block your faster route, but you can delete them (DELETE WALLS);</li>
                <li>An animation will appear at search. Also, you can delete the road created (DELETE ROAD);</li>
                <li>You can reset to default configurations (RESET).</li>
                </ul>
            </p>:
            <p style={{display:infoVisibility===0?"none":"block"}}>
              You are in M&amp;C mode. Here are some instructions:
              <ul>
                <li>Rule: nr of cannibals &lt; nr of missionaries on all sides;</li>
                <li>You will have to complete the left form;</li>
                <li>After pressing the Search button, if you entered correct data and the road can be made, you need to wait 5 seconds for the transition to be made.</li>
                <li>Pattern for State: ((m1, m2, ...), (c1, c2, ...), b), where m1, m2, ... = missionaries, c1, c2, ... = cannibals and b is the state of the boat, each with values 0 or 1;</li>
                <li>Pattern for transition (3 options): final,initial-&gt;other_state (same format as before) or all-&gt;TO COMPLETE + READ MORE</li>
              </ul>
           </p>}
        </div>
    )
}