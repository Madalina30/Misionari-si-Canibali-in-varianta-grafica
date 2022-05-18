import Utils from './UTILS'
const utils = new Utils();


export default function handleAllTransition(props, state, baseState, nextState, finalState, firstBoatPosition, initialState, boatPos = 0){
    let [leftm, rightm, leftc, rightc] = utils.verifyState(state, props.setShowAlert, props.showAlert)
    utils.showMC(leftm, rightm,leftc, rightc)
    let vectBaseState = baseState.split(","), vectState = state.split(","), vectNextState = nextState.split(",")
    if (vectBaseState.length == vectState.length && vectBaseState.length == vectNextState.length) {
      if (vectBaseState[0].includes("(") && vectBaseState[leftm+rightm-1].includes(")") && vectBaseState[leftm+rightm].includes("(") 
      && vectBaseState[leftm+rightm+leftc+rightc-1].includes(")") && vectBaseState[vectBaseState.length-1] == "b"
      && vectNextState[0].includes("(") && vectNextState[leftm+rightm-1].includes(")") && vectNextState[leftm+rightm].includes("(") 
      && vectNextState[leftm+rightm+leftc+rightc-1].includes(")") && vectNextState[vectNextState.length-1].includes("b")) {
        console.log("STARI OK YEY")
        // verify the boat
        if (vectBaseState[vectBaseState.length-1] == vectNextState[vectNextState.length-1]) {
          props.setShowAlert({...props.showAlert, show:true, title:"Boat state unchanged!", message:"The state of the boat remains unchanged even though the positions of the m&c change!", btnColor:"aqua", btnText:'OK'})
        } else {
          let diffComponents = 0
          let countPM = 0
          let sameNameOperations = 0, operationsVect = [], differentOperationsMinuses = [], differentOperationsPluses = []
          for (let i = 0; i < vectBaseState.length - 1; i++) {
            console.log("intrat in for")
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
          console.log("same, ", sameNameOperations)
          let countTheSame = 0
          if (differentOperationsPluses.length == differentOperationsMinuses.length && (differentOperationsMinuses.length + differentOperationsPluses.length) == countPM) {
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
          console.log("the same:", countTheSame, diffComponents)
          // diffcomponents da 0 dc e m1+v1 dar trb sa fix it! - putin dif fata de alegerea simpla!
          let plusesToSumM = [], plusesToSumC = [], minusesToSumM = [], minusesToSumC = []
          if ((sameNameOperations == 0 || countTheSame == 2) && diffComponents != 0) {
            // AICI O SA APARA STRATEGIA SI O SA ALEAGA!!!!!! 
            document.getElementById("strategies").style.visibility = "visible"
            
            // sa astepte pana se alege strategia!
            document.getElementById("chooseOption").innerHTML = `<p className="select-category__txt">Your options:</p>`
            
            console.log("diff components nr", diffComponents)
            let stateToChange = state;
            let allLeftc = leftc, allLeftm = leftm, allRightc = rightc, allRightm = rightm
            let inBoatAll = [], options = [], vals = [], okOrNot
            
            if (stateToChange != finalState) {

              if ((boatPos == 0 && firstBoatPosition == 0)) { // || (boatPos == 1 && firstBoatPosition == 1)
                // daca e in cea din care porneste
                if (stateToChange == initialState) {
                  if ((allLeftc + allRightc) == 1) {
                    inBoatAll = ['M', 'C']
                    boatPos = 1 - boatPos;
                    options = [finalState]
                    vals = [1] // 1 is ok
                  } else {
                    // 3 options: MM, MC, CC
                    inBoatAll = [['M', 'C'], ['M', 'M'], ['C', 'C']]
                    transitionAllHandle(boatPos, allLeftc, allLeftm, allRightc, allRightm, inBoatAll,props, state, baseState, nextState, finalState, firstBoatPosition, initialState)
                  }
                } else { // if not initial state
                  if (allLeftc >= 2) {
                    if (allLeftm >=2) {
                      // 3 options: MM, MC, CC
                      inBoatAll = [['M', 'C'], ['M', 'M'], ['C', 'C']]
                      transitionAllHandle(boatPos, allLeftc, allLeftm, allRightc, allRightm, inBoatAll,props, state, baseState, nextState, finalState, firstBoatPosition, initialState)
                    } else if (allLeftm == 1) {
                      inBoatAll = [['M', 'C'], ['C', 'C']]
                      transitionAllHandle(boatPos, allLeftc, allLeftm, allRightc, allRightm, inBoatAll,props, state, baseState, nextState, finalState, firstBoatPosition, initialState)
                    } else { //lm=0
                      inBoatAll = [['C', 'C']]
                      transitionAllHandle(boatPos, allLeftc, allLeftm, allRightc, allRightm, inBoatAll,props, state, baseState, nextState, finalState, firstBoatPosition, initialState)
                    }
                  } else if (allLeftc == 1) {
                    if (allLeftm >= 2) {
                      inBoatAll = [['M', 'C'], ['M', 'M']]
                      transitionAllHandle(boatPos, allLeftc, allLeftm, allRightc, allRightm, inBoatAll,props, state, baseState, nextState, finalState, firstBoatPosition, initialState)
                    } else if (allLeftm == 1){
                      inBoatAll = [['M', 'C']]
                      transitionAllHandle(boatPos, allLeftc, allLeftm, allRightc, allRightm, inBoatAll,props, state, baseState, nextState, finalState, firstBoatPosition, initialState)
                    } else { //lm=0
                      console.log("NOT OK!")
                      props.setShowAlert({...props.showAlert, show:true, title:"Not ok!", message:"Not ok - todo!", btnColor:"aqua", btnText:'OK'})
  
                      // mesaj game over + search button activate
                    }
                  } else {
                    console.log("nothin here")
                  }
                }
              } else {
                // daca e in cea in care e prezenta starea finala!
                if (allRightc >= 2) {
                  if (allRightm >= 2) {
                    inBoatAll = [['M', 'M'],['M', 'C'],['C', 'C'],['M'],['C']]
                    transitionAllHandle(boatPos, allLeftc, allLeftm, allRightc, allRightm, inBoatAll,props, state, baseState, nextState, finalState, firstBoatPosition, initialState)
                  } else if (allRightm == 1) {
                    inBoatAll = [['M', 'C'],['C', 'C'],['M'],['C']]
                    transitionAllHandle(boatPos, allLeftc, allLeftm, allRightc, allRightm, inBoatAll,props, state, baseState, nextState, finalState, firstBoatPosition, initialState)
                  } else {
                    inBoatAll = [['C', 'C'],['C']]
                    transitionAllHandle(boatPos, allLeftc, allLeftm, allRightc, allRightm, inBoatAll,props, state, baseState, nextState, finalState, firstBoatPosition, initialState)
                  }
                } else if (allRightc == 1) {
                  if (allRightm >= 2) {
                    inBoatAll = [['M', 'M'],['M', 'C'],['M'],['C']]
                    transitionAllHandle(boatPos, allLeftc, allLeftm, allRightc, allRightm, inBoatAll,props, state, baseState, nextState, finalState, firstBoatPosition, initialState)
                  } else if (allRightm == 1) {
                    inBoatAll = [['M', 'C'],['M'],['C']]
                    transitionAllHandle(boatPos, allLeftc, allLeftm, allRightc, allRightm, inBoatAll,props, state, baseState, nextState, finalState, firstBoatPosition, initialState)
                  } else { //rm=0
                    inBoatAll = [['C']]
                    transitionAllHandle(boatPos, allLeftc, allLeftm, allRightc, allRightm, inBoatAll,props, state, baseState, nextState, finalState, firstBoatPosition, initialState)
                  }
                } else { // rc=0
                  if (allRightm >= 2) {
                    inBoatAll = [['M', 'M'],['M']]
                    transitionAllHandle(boatPos, allLeftc, allLeftm, allRightc, allRightm, inBoatAll,props, state, baseState, nextState, finalState, firstBoatPosition, initialState)
                  } else if (allRightm == 1) {
                            inBoatAll = [['M']]
                            transitionAllHandle(boatPos, allLeftc, allLeftm, allRightc, allRightm, inBoatAll,props, state, baseState, nextState, finalState, firstBoatPosition, initialState)
                  } else {
                    console.log("NOTHING HERE - MAYBE FINAL STATE")
                    
                  }
                }
  
              }
            }
              
          }  else {
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
              // TODO: AICI IN CAZ CA ARE CEVA DE GENUL: M1+V1,M2-V1 ETC
              props.setShowAlert({...props.showAlert, show:true, title:"Not ok!", message:"You combined 2 modes! Look at the instructions again!", btnColor:"red", btnText:'OK'})
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
                    console.log("plusessumc: ", pSumC, " plusessumm: ", pSumM, " minusessumc: ", mSumC, " minusessumm: ", mSumM)
                    console.log("leftc: ", leftc, " leftm: ", leftm, " rightc: ", rightc, " rightm: ", rightm)
                    let hereInBoat = [], newState = state
                    if (firstBoatPosition == 0) { // incepe de la 0
                      if (leftm < mSumM || leftc < mSumC) {
                        props.setShowAlert({...props.showAlert, show:true, title:"Not ok!", message:"The - sign on m or c is too big!", btnColor:"red", btnText:'OK'})
                      } else {
                        if (leftc - mSumC > leftm - mSumM || rightc + pSumC > rightm + pSumM) {
                          props.setShowAlert({...props.showAlert, show:true, title:"You got eaten!",
                          message:"The number of canibals on one side is bigger than the number of missionaries on one of the states! They ate you!", btnColor:"red", btnText:'OK'})
                        } else {
                          newState = utils.constructOption(leftc - mSumC, leftm - mSumM, rightc + pSumC, rightm + pSumM, 1-firstBoatPosition)
                          console.log("NEW STATE: ", newState)
                          document.getElementById("chooseOption").innerHTML += `<p class="wait">${newState}</p><p class="wait">Wait 5 seconds for the animation to complete.`
                          // ANIMATION AS IN INITIAL->
                          document.querySelectorAll('rect').forEach(rect=>{
                              rect.parentNode.children[1].innerHTML = ""
                            })
                          utils.showMC(leftm, rightm,leftc, rightc)
                          setTimeout(()=>{
                            document.querySelectorAll('rect').forEach(rect=>{
                              rect.parentNode.children[1].innerHTML = ""
                            })
                            utils.showMC(leftm - mSumM, rightm + pSumM, leftc - mSumC, rightc + pSumC)
                          }, 5000)
                        }
                        
                      }
                    } else {
                      if (rightm < mSumM || rightc < mSumC) {
                        props.setShowAlert({...props.showAlert, show:true, title:"Not ok!", message:"The - sign on m or c is too big!", btnColor:"red", btnText:'OK'})
                      } else {
                        if (leftc + mSumC > leftm + mSumM || rightc - pSumC > rightm - pSumM) {
                          props.setShowAlert({...props.showAlert, show:true, title:"You got eaten!",
                          message:"The number of canibals on one side is bigger than the number of missionaries on one of the states! They ate you!", btnColor:"red", btnText:'OK'})
                        } else {
                          newState = utils.constructOption(leftc + mSumC, leftm + mSumM, rightc - pSumC, rightm - pSumM, 1-firstBoatPosition)
                          console.log("NEW STATE: ", newState)
                          document.getElementById("chooseOption").innerHTML += `<p class="wait">${newState}</p><p class="wait">Wait 5 seconds for the animation to complete.`
                          // ANIMATION AS IN INITIAL->
                          document.querySelectorAll('rect').forEach(rect=>{
                              rect.parentNode.children[1].innerHTML = ""
                            })
                          utils.showMC(leftm, rightm,leftc, rightc)
                          setTimeout(()=>{
                            // PART 2 ANIMATION
                          // MAI INTAI STERGE  CE TREBUIE!
                            document.querySelectorAll('rect').forEach(rect=>{
                              rect.parentNode.children[1].innerHTML = ""
                            })
                            utils.showMC(leftm + mSumM, rightm - pSumM, leftc + mSumC, rightc - pSumC)
                          }, 5000)
  
                        }
                      }
                    }
                  } else {
                    props.setShowAlert({...props.showAlert, show:true, title:"Not ok!", message:"Not correctly written! Check the instructions for more!", btnColor:"red", btnText:'OK'})
                  }
                } else {
                  props.setShowAlert({...props.showAlert, show:true, title:"Not ok!", message:"Cannot find the same sum for + and -!", btnColor:"red", btnText:'OK'})
                }
              } else {
                console.log("not really + message")
                props.setShowAlert({...props.showAlert, show:true, title:"Not ok!", message:"Not really + message!", btnColor:"red", btnText:'OK'})
              }
            }
          }
        }
      } else {
        props.setShowAlert({...props.showAlert, show:true, title:"Not ok!", 
        message:"Check the instruction before writing!", btnColor:"red", btnText:'OK'})
      }
    } else {
      console.log("not the same length states")
      props.setShowAlert({...props.showAlert, show:true, title:"Not ok!", message:"The states do not have the same length!", btnColor:"red", btnText:'OK'})
    }
  }
  
  function transitionAllHandle(boatPos, allLeftc, allLeftm, allRightc, allRightm, inBoatAll,props, state, baseState, nextState, finalState, firstBoatPosition, initialState){
    boatPos = 1 - boatPos;
    console.log("boat pos", boatPos)
    // todo searchforoptions si reverse
    let [options, vals] = []
    if (boatPos == 1) {
      [options, vals] = utils.searchForOptions(inBoatAll, allLeftc, allLeftm, allRightc, allRightm, boatPos)
    } else if (boatPos == 0) {
      [options, vals] = utils.searchForOptionsReverse(inBoatAll, allLeftc, allLeftm, allRightc, allRightm, boatPos)
    }
    options.forEach(element=>{
      console.log("("+element+")")
    })
    var select = document.getElementById('strategy');
    var text = select.options[select.selectedIndex].text;
    console.log(text)
    makeButton(props, state, baseState, nextState, finalState, firstBoatPosition, initialState, options, vals, boatPos, text)
  }

function makeButton(props, state, baseState, nextState, finalState, firstBoatPosition, initialState, options, vals, boatPosition, strategy) {
  console.log(vals)
  let btns = ``
  if (state == initialState) {
    let [allLeftm, allRightm, allLeftc, allRightc] = utils.verifyState(state, props.setShowAlert, props.showAlert);
    document.querySelectorAll('rect').forEach(rect=>{
            rect.parentNode.children[1].innerHTML = ""
          });
    utils.showMC(allLeftm, allRightm, allLeftc, allRightc);
  }
  let btn = document.querySelector("#chooseOption")
  let valueForGreedy = 0;
  for (let i = 0; i < options.length; i++) {
    window.mata = (e,val)=>{
      if (val == 0) {
      console.log("NU-I BUN SI DA ANIMATIE")
      props.setShowAlert({...props.showAlert, show:true, title:"You got eaten!",
      message:"The number of canibals on one side is bigger than the number of missionaries on one of the states! They ate you!", btnColor:"red", btnText:'OK'})
      } else{
        // aici lucram si cu greedy
        let [allLeftm, allRightm, allLeftc, allRightc] = utils.verifyState(e, props.setShowAlert, props.showAlert);
        
        document.querySelectorAll('rect').forEach(rect=>{
              rect.parentNode.children[1].innerHTML = ""
            });
        utils.showMC(allLeftm, allRightm, allLeftc, allRightc);
        if (e == finalState) {
          console.log("YEY FINAL!!!!")
          // ANIMATIE -> ASTEAPTA 2 SEC, DISPARE TOT SI APARE PT CEA DE ACUM!
          props.setShowAlert({...props.showAlert, show:true, title:"Finshed!",
        message:"Congrats! You just finished a full transition!", btnColor:"purple", btnText:'GREAT'})
        } else {
          handleAllTransition(props, e, baseState, nextState, finalState, firstBoatPosition, initialState, boatPosition)
        }
        
        // ANIMATIE AICI!!!!!!!
      }
      console.log(val, "hereeeeeeeeeeeee", e)
    }
    if (strategy == "Greedy") {
      if (vals[i] == 1) {
        valueForGreedy++;
        btns += `<div><input name="same" id="${options[i]}" type='radio'
        onclick='mata("${options[i]}", ${vals[i]})'
        /><label for="${options[i]}">${options[i]} - ${valueForGreedy}</label></div>`
      } else {
        btns += `<div><input name="same" id="${options[i]}" type='radio'
        onclick='mata("${options[i]}", ${vals[i]})'
        /><label for="${options[i]}">${options[i]} - 0</label></div>`
      }
    } else if (strategy == "Random") {
       btns += `<div><input name="same" id="${options[i]}" type='radio'
        onclick='mata("${options[i]}", ${vals[i]})'
        /><label for="${options[i]}">${options[i]}</label></div>`
    }
    
    
  }
  btn.innerHTML+=btns
}