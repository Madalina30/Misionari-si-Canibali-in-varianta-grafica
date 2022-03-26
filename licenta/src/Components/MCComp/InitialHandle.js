import Utils from './UTILS';
const utils = new Utils();


export default function handleRandomTransition(props, value, state, initialState, finalState){

    console.log("mai")
    let [leftm, rightm, leftc, rightc] = utils.verifyState(state, props.setShowAlert, props.showAlert)

    let [leftmV, rightmV, leftcV, rightcV] = utils.verifyState(value, props.setShowAlert, props.showAlert)
    console.log("aici",leftm, rightm, leftc, rightc, "\n", leftmV, rightmV, leftcV, rightcV)
    if (!leftmV && !rightmV && !leftcV && !rightcV) {
      // do nothing
    } else {
      let valueLength = value.split(",").length, stateLength = state.split(",").length
      // verifications with the states
      if (valueLength != stateLength) {
        props.setShowAlert({...props.showAlert, show:true, title:"Different length for states!!", message:"The states do not have the same length! Change one of them!", btnColor:"red", btnText:"OK"} )
      } else {
        if (state == finalState){
          props.setShowAlert({...props.showAlert, show:true, title:"Initial state is final!", message:"Change the initial state! It cannot be final!", btnColor:"orange"} )
        } else if (state == value) {
          props.setShowAlert({...props.showAlert, show:true, title:"Equal states!", message:"Change one of the states!", btnColor:"red"})
        } else if (value == initialState) {
          // NU POATE FI VALOARE INITIALA - NU SE POATE INTOARCE
          props.setShowAlert({...props.showAlert, show:true, title:"Final state is initial!", message:"Change the final state! It cannot be initial!", btnColor:"orange"} )
        } else if (value.split(",")[valueLength-1] == state.split(",")[valueLength-1]) {
          // + sweetalert
          props.setShowAlert({...props.showAlert, show:true, title:"Boat state unchanged!", message:"The state of the boat remains unchanged even though the positions of the m&c change!", btnColor:"aqua"})
        }else if (value.split(",")[valueLength-1] != state.split(",")[valueLength-1]) {
          let ok = 0
          for (let k = 0; k<valueLength-1; k++) {
            if (value.split(",")[k] != state.split(",")[k]) {
              ok++;
            }
          }
          if (ok == 0) {
            props.setShowAlert({...props.showAlert, show:true, title:"Boat state changed!", message:"The state of the boat is changed, the positions of the m&c does not change! You can do better!", btnColor:"red", btnText:"UNDERSTOOD"})
          } else if (ok > 2) { // IF THE STATE OF BOAT CHANGE AND SO DOES THE STATE
            console.log("aici",leftm, rightm, leftc, rightc, "\n", leftmV, rightmV, leftcV, rightcV)
            if (leftm == leftmV && leftc == leftcV && rightm == rightmV && rightc == rightcV) {
              // NU SE PUNE! CAM ACEEASI STARE CU ELEMENTE SCHIMBATE
              props.setShowAlert({...props.showAlert, show:true, title:"Same state!", message:"You just changed the positions of the m or c in the states!", btnColor:"purple", btnText:"UNDERSTOOD"})
            } else {
              // !!DACA SE SCHIMBA DOAR POZITIA VALORILOR, NU PREA AR TREBUI SA CONTEZE! E CA SI CUM NU AR FACE NIMIC!
              // !!TODO: SEE JUST ELEMENTS, NOT POSITIONS!
              props.setShowAlert({...props.showAlert, show:true, title:"More than 2 changes!", message:"There are detected more than 2 changes on the positions of the m&c! Change them!", btnColor:"orange", btnText:"CHANGING NOW"})
            }
          } else if (ok == 2){ // <=2 changes
            document.querySelectorAll('rect').forEach(rect=>{
                              rect.parentNode.children[1].innerHTML = ""
                            })
            utils.showMC(leftm, rightm, leftc, rightc)
            setTimeout(()=>{
              document.querySelectorAll('rect').forEach(rect=>{
                rect.parentNode.children[1].innerHTML = ""
              })
              utils.showMC(leftmV, rightmV, leftcV, rightcV)
            }, 5000)

            props.setShowAlert({...props.showAlert, show:true, title:"Good job!", message:"The transition is correct!", btnColor:"green", btnText:"YEY"})
            // small animation with boat and transition with the boat remaining where it will go
            // BONUS: after that if yes -> the STATE changes and you can make another transition from that one if not final
          } else if (ok == 1) { // TODO: VERIFICARI AICI!!!!!
            let boatForNewState = value.split(",")[valueLength-1], boatForState = state.split(",")[valueLength-1]
            if (boatForState == 1 && boatForNewState == 0) {
              console.log("tranzitie cu o miscare - right to left, dar corecta") // + sweetalert
              props.setShowAlert({...props.showAlert, show:true, title:"Good job!", message:"The transition is correct!", btnColor:"green", btnText:"YEY"})
              // small animation with boat and transition with the boat remaining where it will go
              // BONUS: after that if yes -> the STATE changes and you can make another transition from that one if not final
            } else if (boatForState == 0 && boatForNewState == 1) {
              props.setShowAlert({...props.showAlert, show:true, title:"Good, but not worthy!", message:"The transition is correct, but it looks like you just go around the tail!"})
              // small animation with boat and transition with the boat remaining where it will go
              // BONUS: after that if yes -> the STATE changes and you can make another transition from that one if not final
            }
          
          }
          
        }
      
      }
      
    }

}