const icp=document.querySelector(".icp");
const artboard=document.querySelector(".artboard");
const present_color=document.querySelector(".present_color");
let copycolor="rgb(255,255,255)";
const r1=document.getElementById("r1");
const r2=document.getElementById("r2");
const r3=document.getElementById("r3");
const ri1=document.getElementById("ri1");
const ri2=document.getElementById("ri2");
const ri3=document.getElementById("ri3");
let red=255;
let blue=255;
let green=255;
const change_red=(nred)=>
{
  copycolor=`rgb(${nred},${green},${blue})`;
}
const change_green=(ngreen)=>
{
  copycolor=`rgb(${red},${ngreen},${blue})`;
}
const change_blue=(nblue)=>
{
  copycolor=`rgb(${red},${green},${nblue})`;
}
const update_box_present=()=>{

  red=copycolor.slice(copycolor.indexOf("(")+1,copycolor.indexOf(","));
  green=copycolor.slice(copycolor.indexOf(",")+1,copycolor.lastIndexOf(","));
  blue=copycolor.slice(copycolor.lastIndexOf(",")+1,copycolor.indexOf(")"));
  r1.innerText=red;
  r2.innerText=green;
  r3.innerText=blue;
  ri1.value=red;
  ri2.value=green;
  ri3.value=blue;
  present_color.setAttribute("style","background-color:"+copycolor);
};



icp.addEventListener("click",(e)=>
{
    if(e.target.className=='c')
    {
        const c=document.getElementById(e.target.id);
        Array.from(c.parentElement.children).forEach(element => {
        element.classList.remove("selected");   
        });
      c.classList.add("selected");
      let str=c.getAttribute("style");
      copycolor=str.substring(17,str.length-1);
      update_box_present();
     // console.log("copied",copycolor);
     
    }  

});




artboard.addEventListener("click",(e)=>{

  //console.log(e.target.parentElement);
  if(e.target.id=="")
  {
    Array.from(e.target.parentElement.children).forEach(element=>{
      element.setAttribute("style","fill:"+copycolor);
    });
  }
  else{
     const selected_path=document.getElementById(e.target.id);
     selected_path.setAttribute("style","fill:"+copycolor);
  }
});




ri1.addEventListener("input",()=>
{
change_red(ri1.value);
update_box_present();

});
ri2.addEventListener("input",()=>
{
change_green(ri2.value);
update_box_present();

});
ri3.addEventListener("input",()=>
{
change_blue(ri3.value);
update_box_present();

});


