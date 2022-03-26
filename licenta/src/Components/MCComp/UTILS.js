import { faCommentDollar, faCommentsDollar } from "@fortawesome/free-solid-svg-icons";

export  default class Utils{  
    showMC(leftm, rightm,leftc, rightc) {
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

    changeStateMethodReverse(inBoatAll, allLeftc, allLeftm, allRightc, allRightm, boatPos){
    let state;
    let [options, vals] = this.searchForOptionsReverse(inBoatAll, allLeftc, allLeftm, allRightc, allRightm, boatPos)
    console.log(options, vals, 123)

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

    verifyState(value, setShowAlert, showAlert) {
        try{
          let data = value.split("),")
          let misionaries = this.removePh(data[0]).split(",")
          let leftMissionaries = 0, rightMissionaries = 0;
          for (let k = 0; k<misionaries.length; k++) {
            if (misionaries[k] == 0) {
              leftMissionaries ++;
            } else {
              rightMissionaries ++;
            }
          }
          let canibals = this.removePh(data[1]).split(",")
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
                console.log("x", x)
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
          console.log(error)
        }
    }

    removePh(v){
        try{
          let value = v;
          console.log(v)
          value = value.split("");
          if(value[value.length-1] == ")"){
            value.pop();
      
          }
          
          value.shift();
          value = value.join("")
          return value;
        }catch(error){
          console.log(error)
        }
    }
    constructOption(lc, lm, rc, rm, boat) {
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

    searchForOptionsReverse(vectInBoat, lc, lm, rc, rm, boat) {
      console.log("reverse", vectInBoat)
        let options = [] // states possible! without (       ), will be put just at btn text
        let llc = lc, llm = lm, rrc = rc, rrm = rm
        let vals = []
        vectInBoat.forEach(element => {
          if (element.join("") == "MM") {
            llm+=2
            rrm-=2
            options.push(this.constructOption(llc,llm,rrc,rrm, boat))
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
            options.push(this.constructOption(llc,llm,rrc,rrm, boat))
            if ((rrm < rrc && rrm != 0)|| (llm < llc && llm != 0)) {
              vals.push(0)
            } else {
              vals.push(1)
            }
            llc = lc; llm = lm; rrc = rc; rrm = rm
          } else if (element.join("") == "CC") { 
            llc+=2
            rrc-=2
            options.push(this.constructOption(llc,llm,rrc,rrm, boat))
            if ((rrm < rrc && rrm != 0)|| (llm < llc && llm != 0)) {
              vals.push(0)
            } else {
              vals.push(1)
            }
            llc = lc; rrc = rc
          } else if (element.join("") == "M") {
            llm++
            rrm--
            options.push(this.constructOption(llc,llm,rrc,rrm, boat))
            if ((rrm < rrc && rrm != 0)|| (llm < llc && llm != 0)) {
              vals.push(0)
            } else {
              vals.push(1)
            }
            llm = lm; rrm = rm
          } else { // C
            llc++
            rrc--
            options.push(this.constructOption(llc,llm,rrc,rrm, boat))
            if ((rrm < rrc && rrm != 0)|| (llm < llc && llm != 0)) {
              vals.push(0)
            } else {
              vals.push(1)
            }
            llc = lc; rrc = rc
          }
        });
        console.log("ugh, ", options)
        return [options, vals]
    }

    searchForOptions(vectInBoat, lc, lm, rc, rm, boat) {
      console.log("strsi")
        let options = [] // states possible! without (       ), will be put just at btn text
        let llc = lc, llm = lm, rrc = rc, rrm = rm
        let vals = []
        vectInBoat.forEach(element => {
          if (element.join("") == "MM") {
            rrm+=2
            llm-=2
            options.push(this.constructOption(llc,llm,rrc,rrm, boat))
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
            options.push(this.constructOption(llc,llm,rrc,rrm, boat))
            if ((rrm < rrc && rrm != 0)|| (llm < llc && llm != 0)) {
              vals.push(0)
            } else {
              vals.push(1)
            }
            llc = lc; llm = lm; rrc = rc; rrm = rm
          } else { // CC
            rrc+=2
            llc-=2
            options.push(this.constructOption(llc,llm,rrc,rrm, boat))
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

       changeStateMethod(inBoatAll, allLeftc, allLeftm, allRightc, allRightm, boatPos){
        let state = "";
        let [options, vals] = this.searchForOptions(inBoatAll, allLeftc, allLeftm, allRightc, allRightm, boatPos)
        console.log(options, vals, 123)
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
        if (state){
            console.log(state, "aici")
            return state;
        }else {
            return "no"
          }
        
      }  
}



 