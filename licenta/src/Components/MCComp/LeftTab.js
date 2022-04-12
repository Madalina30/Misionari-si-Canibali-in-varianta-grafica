import '../../App.css';
import {useEffect, useState} from 'react'
import React, { Component } from 'react';

export default function LeftMCTab(props){

    const [infoVisibility,setInfoVisibility] = useState(1);


    return(
        <>
            <button className="open-close" onClick={()=>{
                infoVisibility===0?setInfoVisibility(1):setInfoVisibility(0)
            }
            }></button>
            <div className='user-introduce' style={{display:infoVisibility===0?"none":"block"}}>
 
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
                    <input type="button" value="Search" id="submitUserData" onClick={()=>{
                        // console.log(55)
                        props.setStare(document.getElementById("stare").value)
                        props.setTransition(document.getElementById("transition").value)
                    }}/>
                    {/* aici o sa fie partea in care alege strategia */}
                    <div id="strategies" style={{visibility:"hidden"}}>
                        <label for="strategy" style={{padding:"0px 10px 0px 0px"}}>Choose a strategy:</label>

                        <select name="strategy" id="strategy" required>
                            <option value="random">Random</option>
                            <option value="greedy">Greedy</option>
                        </select>
                    </div>
                    
                </form>
            </div>
        </>
    )
}