export default function constructMC(){
    const rects = document.querySelectorAll('rect');
    let rectMiddle = Math.round(window.innerWidth/60);
    let rectMiddleJ = Math.round(window.innerHeight/60);
    rects.forEach(rect=>{
        rect.style.fill = "transparent"
        let i = rect.getAttribute('i');
        let j = rect.getAttribute('j');
        let leftStart = parseInt(i)+2;
        let rightStart = parseInt(i)-2
        if(parseInt(i)==rectMiddle || parseInt(i)+1==rectMiddle || parseInt(i-1)==rectMiddle  ){
          for(let k=0;k<7;k++){
            if(parseInt(j)-k==rectMiddleJ ){
              rect.style.fill = "#9ae7fc"
            }
            if(parseInt(j)+k==rectMiddleJ){
              rect.style.fill = "#9ae7fc"
            }
          }
        }else if(rectMiddle == leftStart || [1,2,3,4,5].map(x=>leftStart+x).includes(rectMiddle)){
          for(let k=0;k<7;k++){
            if(parseInt(j)-k==rectMiddleJ ){
              rect.style.fill = "yellow"
            }
            if(parseInt(j)+k==rectMiddleJ){
              rect.style.fill = "yellow"
            }
          }
          
        }else if(rectMiddle == rightStart || [1,2,3,4,5].map(x=>rightStart-x).includes(rectMiddle) ){
          for(let k=0;k<7;k++){
            if(parseInt(j)-k==rectMiddleJ ){
              rect.style.fill = "green"
            }
            if(parseInt(j)+k==rectMiddleJ){
              rect.style.fill = "green"
            }
          }
        }else{
          rect.style.fill = "transparent"
        }
       // then put leftm(pink), leftc(blue), rightm(pink), rightc(blue) on their sides
  
    })
  }