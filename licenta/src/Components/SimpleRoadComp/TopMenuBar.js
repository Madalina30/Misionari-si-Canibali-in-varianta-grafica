export default function TopMenuSimpleRoad(props){
    return(
        <div className="buttons">
            <p className="select-category__txt">Choose what you do:</p>
            <div className="clear-buttons">
            <button className="clear-walls" onClick={ 
                (e)=>{
                    let rects = document.querySelectorAll('rect')
                    rects.forEach(rect=>{
                        if(rect.style.fill == 'plum'){
                            rect.removeAttribute('style')
                        }
                    })
                }
            }>Clear walls</button>
            <button className="clear-path" onClick={ // CLEAR PATH
                (e)=>{
                    let rects = document.querySelectorAll('rect')
                    rects.forEach(rect=>{
                        if(rect.style.fill == 'orange'){
                            rect.removeAttribute('style')
                        }
                    })
                }
            }>Clear path</button>
            <button className="reset-all" onClick={ // CLEAR WALLS & PATH & start positions?
                (e)=>{
                    let rects = document.querySelectorAll('rect')
                    rects.forEach(rect=>{
                        if(rect.style.fill == 'plum' || rect.style.fill == 'orange'){
                            rect.removeAttribute('style')
                        }
                    })

            }
            }>Reset</button>
            <button className="search-road" onClick={ // search straight road
                (e)=>{
                    let startRect = document.querySelector('.start');
                    let endRect = document.querySelector(".end");
                    let startendRect = false
                    let startX = parseInt(startRect.getAttribute("x")), startY = parseInt(startRect.getAttribute("y"))
                    let endX = parseInt(endRect.getAttribute("x")), endY = parseInt(endRect.getAttribute("y"))

                    if(startRect.classList.contains('end') || endRect.classList.contains("start")){
                        startendRect = true
                    }
                    if (startendRect) {
                        console.log("not bad")
                        props.setShowAlert({...props.showAlert, show:true, title:"Same point", message:"The start and end points can't be the same!", btnColor:"red", btnText:'OK'})

                        // sweetalert
                    } else {
                        console.log(startX)
                        if (startX != endX && startY != endY) {
                            props.setShowAlert({...props.showAlert, show:true, title:"Just straight road for now", message:"There can't exist diagonal or other road combinations except from the straight ones!", btnColor:"red", btnText:'OK'})

                        }else if (startX == endX) {
                            console.log("making vertical road")
                            let rects = document.querySelectorAll('rect')
                            let bad = 0;
                            // verificare dc e mai mic sau mai mare y
                            if (startY > endY) {
                                bad = 0;
                                rects.forEach(rect=>{
                                    if(rect.style.fill == 'plum'){
                                        if (parseInt(rect.getAttribute("x")) == startX && parseInt(rect.getAttribute("y")) < startY && parseInt(rect.getAttribute("y")) > endY) {
                                            bad += 1;
                                        }
                                    }
                                })
                                if (bad >= 1) {
                                    props.setShowAlert({...props.showAlert, show:true, title:"Just straight road for now", message:"There can't exist diagonal or other road combinations except from the straight ones!", btnColor:"red", btnText:'OK'})

                                } else {
                                    console.log("yes")
                                    rects.forEach(rect=> {
                                        if (parseInt(rect.getAttribute("x")) == startX && parseInt(rect.getAttribute("y")) < startY && parseInt(rect.getAttribute("y")) > endY) {
                                            rect.style.fill = "orange"
                                        }
                                    })
                                }
                            } else if (startY < endY) {
                                bad = 0;
                                rects.forEach(rect=>{
                                    if(rect.style.fill == 'plum'){
                                        if (parseInt(rect.getAttribute("x")) == startX && parseInt(rect.getAttribute("y")) > startY && parseInt(rect.getAttribute("y")) < endY) {
                                            bad += 1;
                                        }
                                    }
                                })
                                if (bad >= 1) {
                                    props.setShowAlert({...props.showAlert, show:true, title:"Just straight road for now", message:"There can't exist diagonal or other road combinations except from the straight ones!", btnColor:"red", btnText:'OK'})

                                } else {
                                    console.log("yes")
                                    rects.forEach(rect=> {
                                        if (parseInt(rect.getAttribute("x")) == startX && parseInt(rect.getAttribute("y")) > startY && parseInt(rect.getAttribute("y")) < endY) {
                                            rect.style.fill = "orange"
                                        }
                                    })
                                }
                            }
                            
                        } else if (startY == endY) {
                            console.log("making horizontal road")
                            // verificare pereti
                             let rects = document.querySelectorAll('rect')
                            let bad = 0;
                            // verificare dc e mai mic sau mai mare y
                            if (startX > endX) {
                                bad = 0;
                                rects.forEach(rect=>{
                                    if(rect.style.fill == 'plum'){
                                        if (parseInt(rect.getAttribute("y")) == startY && parseInt(rect.getAttribute("x")) < startX && parseInt(rect.getAttribute("x")) > endX) {
                                            bad += 1;
                                        }
                                    }
                                })
                                if (bad >= 1) {
                                    props.setShowAlert({...props.showAlert, show:true, title:"Just straight road for now", message:"There can't exist diagonal or other road combinations except from the straight ones!", btnColor:"red", btnText:'OK'})
                                    
                                } else {
                                    console.log("yes")
                                    rects.forEach(rect=> {
                                        if (parseInt(rect.getAttribute("y")) == startY && parseInt(rect.getAttribute("x")) < startX && parseInt(rect.getAttribute("x")) > endX) {
                                            rect.style.fill = "orange"
                                        }
                                    })
                                }
                            } else if (startX < endX) {
                                bad = 0;
                                rects.forEach(rect=>{
                                    if(rect.style.fill == 'plum'){
                                        if (parseInt(rect.getAttribute("y")) == startY && parseInt(rect.getAttribute("x")) > startX && parseInt(rect.getAttribute("x")) < endX) {
                                            bad += 1;
                                        }
                                    }
                                })
                                if (bad >= 1) {
                                    props.setShowAlert({...props.showAlert, show:true, title:"Just straight road for now", message:"There can't exist diagonal or other road combinations except from the straight ones!", btnColor:"red", btnText:'OK'})
                                    
                                } else {
                                    console.log("yes")
                                    rects.forEach(rect=> {
                                        if (parseInt(rect.getAttribute("y")) == startY && parseInt(rect.getAttribute("x")) > startX && parseInt(rect.getAttribute("x")) < endX) {
                                            rect.style.fill = "orange"
                                            
                                            console.log(parseInt(rect.getAttribute("x")))
                                            if (60 == parseInt(rect.getAttribute("x"))) {
                                                console.log("why say something?")
                                            }
                                        }
                                    })
                                }
                            }
                        }
                    }
                
                }
            }>Search</button>
            </div>
        </div>
    )
} 