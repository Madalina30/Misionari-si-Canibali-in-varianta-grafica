export default function TopMenuSimpleRoad(){
    return(
        <div className="buttons">
            <p className="select-category__txt">Choose what you do:</p>
            <div className="clear-buttons">
            <button className="clear-walls" onClick={ // CLEAR WALLS
                (e)=>{
                    let rects = document.querySelectorAll('rect')
                    rects.forEach(rect=>{
                    if(rect.style.fill == 'plum'){
                        rect.style.fill='none'
                    }
                })
                }
            }>Clear walls</button>
            <button className="clear-path" onClick={ // CLEAR PATH
                (e)=>{
                    let rects = document.querySelectorAll('rect')
                    rects.forEach(rect=>{
                    if(rect.style.fill == 'orange'){
                        rect.style.fill='none'
                    }
                    })
                }
            }>Clear path</button>
            <button className="reset-all" onClick={ // CLEAR WALLS & PATH & start positions?
                (e)=>{
                    let rects = document.querySelectorAll('rect')
                    rects.forEach(rect=>{
                    if(rect.style.fill == 'plum' || rect.style.fill == 'orange'){
                        rect.style.fill='none'
                    }
                    })
                    // TODO: START & END POSITIONS
            }
            }>Reset</button>
            <button className="search-road" onClick={ // search straight road
                (e)=>{
                    let startRect = document.querySelector('.start');
                    let endRect = document.querySelector(".end");
                    let startendRect = false
                    if(startRect.classList.contains('end') || endRect.classList.contains("start")){
                        startendRect = true
                    }
                    if (startendRect) {
                        console.log("not bad")
                        // sweetalert
                    } else {
                        console.log(startRect.getAttribute("x"))
                        if (startRect.getAttribute("x") != endRect.getAttribute("x") && startRect.getAttribute("y") != endRect.getAttribute("y")) {
                            console.log("nu se poate")
                        }else if (startRect.getAttribute("x") == endRect.getAttribute("x")) {
                            console.log("making vertical road")
                            let rects = document.querySelectorAll('rect')
                            let bad = 0;
                            // verificare dc e mai mic sau mai mare y
                            if (startRect.getAttribute("y") > endRect.getAttribute("y")) {
                                bad = 0;
                                rects.forEach(rect=>{
                                    if(rect.style.fill == 'plum'){
                                        if (rect.getAttribute("x") == startRect.getAttribute("x") && rect.getAttribute("y") < startRect.getAttribute("y") && rect.getAttribute("y") > endRect.getAttribute("y")) {
                                            bad += 1;
                                        }
                                    }
                                })
                                if (bad >= 1) {
                                    console.log("not ok")
                                } else {
                                    console.log("yes")
                                    rects.forEach(rect=> {
                                        if (rect.getAttribute("x") == startRect.getAttribute("x") && rect.getAttribute("y") < startRect.getAttribute("y") && rect.getAttribute("y") > endRect.getAttribute("y")) {
                                            rect.style.fill = "orange"
                                        }
                                    })
                                }
                            } else if (startRect.getAttribute("y") < endRect.getAttribute("y")) {
                                bad = 0;
                                rects.forEach(rect=>{
                                    if(rect.style.fill == 'plum'){
                                        if (rect.getAttribute("x") == startRect.getAttribute("x") && rect.getAttribute("y") > startRect.getAttribute("y") && rect.getAttribute("y") < endRect.getAttribute("y")) {
                                            bad += 1;
                                        }
                                    }
                                })
                                if (bad >= 1) {
                                    console.log("not  ok")
                                } else {
                                    console.log("yes")
                                    rects.forEach(rect=> {
                                        if (rect.getAttribute("x") == startRect.getAttribute("x") && rect.getAttribute("y") > startRect.getAttribute("y") && rect.getAttribute("y") < endRect.getAttribute("y")) {
                                            rect.style.fill = "orange"
                                        }
                                    })
                                }
                            }
                            
                        } else if (startRect.getAttribute("y") == endRect.getAttribute("y")) {
                            console.log("making horizontal road")
                            // verificare pereti
                             let rects = document.querySelectorAll('rect')
                            let bad = 0;
                            // verificare dc e mai mic sau mai mare y
                            if (startRect.getAttribute("x") > endRect.getAttribute("x")) {
                                bad = 0;
                                rects.forEach(rect=>{
                                    if(rect.style.fill == 'plum'){
                                        if (rect.getAttribute("y") == startRect.getAttribute("y") && rect.getAttribute("x") < startRect.getAttribute("x") && rect.getAttribute("x") > endRect.getAttribute("x")) {
                                            bad += 1;
                                        }
                                    }
                                })
                                if (bad >= 1) {
                                    console.log("not ok")
                                } else {
                                    console.log("yes")
                                    rects.forEach(rect=> {
                                        if (rect.getAttribute("y") == startRect.getAttribute("y") && rect.getAttribute("x") < startRect.getAttribute("x") && rect.getAttribute("x") > endRect.getAttribute("x")) {
                                            rect.style.fill = "orange"
                                        }
                                    })
                                }
                            } else if (startRect.getAttribute("x") < endRect.getAttribute("x")) {
                                bad = 0;
                                rects.forEach(rect=>{
                                    if(rect.style.fill == 'plum'){
                                        if (rect.getAttribute("y") == startRect.getAttribute("y") && rect.getAttribute("x") > startRect.getAttribute("x") && rect.getAttribute("x") < endRect.getAttribute("x")) {
                                            bad += 1;
                                        }
                                    }
                                })
                                if (bad >= 1) {
                                    console.log("not  ok")
                                } else {
                                    console.log("yes")
                                    rects.forEach(rect=> {
                                        if (rect.getAttribute("y") == startRect.getAttribute("y") && rect.getAttribute("x") > startRect.getAttribute("x") && rect.getAttribute("x") < endRect.getAttribute("x")) {
                                            rect.style.fill = "orange"
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