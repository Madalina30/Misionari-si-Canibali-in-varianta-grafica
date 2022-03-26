import Utils from './UTILS';
const utils = new Utils();
let steps = []
let boatPos;
export default function handleFinalTransition(props, state, transition, finalState, initialState, firstBoatPosition){
  
  console.log("From state ", state, ":\n")
  let stateToChange = state;
  boatPos = firstBoatPosition;
  // see finalstate if differ
  let [leftm, rightm, leftc, rightc] = utils.verifyState(state, props.setShowAlert, props.showAlert)
  let allLeftc = leftc, allLeftm = leftm, allRightc = rightc, allRightm = rightm
  // prima stare e deja verificata
  // MOMENTAN SE INCEPE DOAR CU 0!
  let inBoatAll = [], options = [], vals = [], i = 1;
    if (stateToChange != finalState) {
      if ((boatPos == 0 && firstBoatPosition == 0)) { // || (boatPos == 1 && firstBoatPosition == 1)
      // daca e in cea din care porneste
        if (stateToChange == initialState) {
          if ((allLeftc + allRightc) == 1) {
            inBoatAll = ['M', 'C']
            options = [finalState]
            vals = [1] // 1 is ok
            stateToChange = finalState
            steps.push(stateToChange);
            // break
          } else {

            // 3 options: MM, MC, CC -> fiind inceput, face un random aici mai mult
            inBoatAll = [['M', 'C'], ['M', 'M'], ['C', 'C']];
            finalTransitionHandle(allLeftm, allRightm, allLeftc, allRightc, inBoatAll, props, state, transition, finalState, initialState, firstBoatPosition)
          }
        } else { // if not initial state
          if (allLeftc >= 2) {
            if (allLeftm >=2) {
              // 3 options: MM, MC, CC
              inBoatAll = [['M', 'C'], ['M', 'M'], ['C', 'C']]
              finalTransitionHandle(allLeftm, allRightm, allLeftc, allRightc, inBoatAll, props, state, transition, finalState, initialState, firstBoatPosition)
            } else if (allLeftm == 1) {
              inBoatAll = [['M', 'C'], ['C', 'C']]
              finalTransitionHandle(allLeftm, allRightm, allLeftc, allRightc, inBoatAll, props, state, transition, finalState, initialState, firstBoatPosition)
            } else { //lm=0
              inBoatAll = [['C', 'C']]
              finalTransitionHandle(allLeftm, allRightm, allLeftc, allRightc, inBoatAll, props, state, transition, finalState, initialState, firstBoatPosition)
            }
          } else if (allLeftc == 1) {
            if (allLeftm >= 2) {
              inBoatAll = [['M', 'C'], ['M', 'M']]
              finalTransitionHandle(allLeftm, allRightm, allLeftc, allRightc, inBoatAll, props, state, transition, finalState, initialState, firstBoatPosition)
            } else if (allLeftm == 1){
              inBoatAll = [['M', 'C']]
              finalTransitionHandle(allLeftm, allRightm, allLeftc, allRightc, inBoatAll, props, state, transition, finalState, initialState, firstBoatPosition)
            } else { //lm=0
              console.log("NOT OK!")
              props.setShowAlert({...props.showAlert, show:true, title:"Not ok!", message:"Not ok - todo!", btnColor:"aqua", btnText:'OK'})
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
          finalTransitionHandle(allLeftm, allRightm, allLeftc, allRightc, inBoatAll, props, state, transition, finalState, initialState, firstBoatPosition)
        } else if (allRightm == 1) {
          inBoatAll = [['M', 'C'],['C', 'C'],['M'],['C']]
          finalTransitionHandle(allLeftm, allRightm, allLeftc, allRightc, inBoatAll, props, state, transition, finalState, initialState, firstBoatPosition)
        } else {
          inBoatAll = [['C', 'C'],['C']]
          finalTransitionHandle(allLeftm, allRightm, allLeftc, allRightc, inBoatAll, props, state, transition, finalState, initialState, firstBoatPosition)
        }
      } else if (allRightc == 1) {
        if (allRightm >= 2) {
          inBoatAll = [['M', 'M'],['M', 'C'],['M'],['C']]
          finalTransitionHandle(allLeftm, allRightm, allLeftc, allRightc, inBoatAll, props, state, transition, finalState, initialState, firstBoatPosition)
        } else if (allRightm == 1) {
          inBoatAll = [['M', 'C'],['M'],['C']]
          finalTransitionHandle(allLeftm, allRightm, allLeftc, allRightc, inBoatAll, props, state, transition, finalState, initialState, firstBoatPosition)
        } else { //rm=0
          inBoatAll = [['C']]
          finalTransitionHandle(allLeftm, allRightm, allLeftc, allRightc, inBoatAll, props, state, transition, finalState, initialState, firstBoatPosition)
        }
      } else { // rc=0
        if (allRightm >= 2) {
          inBoatAll = [['M', 'M'],['M']]
          finalTransitionHandle(allLeftm, allRightm, allLeftc, allRightc, inBoatAll, props, state, transition, finalState, initialState, firstBoatPosition)
        } else if (allRightm == 1) {
          inBoatAll = [['M']]
          finalTransitionHandle(allLeftm, allRightm, allLeftc, allRightc, inBoatAll, props, state, transition, finalState, initialState, firstBoatPosition)
        } else {
          console.log("NOTHING HERE - MAYBE FINAL STATE")
          // break
        }
      }
      // document.querySelectorAll('rect').forEach(rect=>{
      //     rect.parentNode.children[1].innerHTML = "";
      // });
      // utils.showMC(allLeftm, allRightm, allLeftc, allRightc);

    }
    
    } else {
      document.querySelectorAll('rect').forEach(rect=>{
          rect.parentNode.children[1].innerHTML = "";
      });
      utils.showMC(allLeftm, allRightm, allLeftc, allRightc);
      props.setShowAlert({...props.showAlert, show:true, title:"Final!", message:"The animation is completed and you reached the finale! ", btnColor:"red"})

    }
  
}
function finalTransitionHandle(allLeftm, allRightm, allLeftc, allRightc, inBoatAll, props, state, transition, finalState, initialState, firstBoatPosition){
  boatPos = 1 - boatPos;
  
  let stateToChange = ""
  if (boatPos == 1) {
    stateToChange = utils.changeStateMethod(inBoatAll, allLeftc, allLeftm, allRightc, allRightm, boatPos)
  } else if (boatPos == 0) {
    stateToChange = utils.changeStateMethodReverse(inBoatAll, allLeftc, allLeftm, allRightc, allRightm, boatPos)
  }
  if (stateToChange != "no"){
  
    document.getElementById("chooseOption").innerHTML = `<p class="select-category__txt">The chosen option:
    <p>(${stateToChange})</p>`
    document.querySelectorAll('rect').forEach(rect=>{
      rect.parentNode.children[1].innerHTML = ""
    });
    utils.showMC(allLeftm, allRightm, allLeftc, allRightc);
    steps.push(stateToChange);
    setTimeout(()=>{
       handleFinalTransition(props, stateToChange, transition, finalState, initialState, boatPos)
     
    }, 1000)
  }else{
    //nik
  }
}