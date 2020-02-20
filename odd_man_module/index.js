const images=document.querySelector('#images');
const pic1=document.querySelector('#pic1');
const pic2=document.querySelector('#pic2');
const pic3=document.querySelector('#pic3');
const pic4=document.querySelector('#pic4');
var pre=0;
const gen_random=(max)=>
{
    let  num=Math.floor((Math.random() * max))+1;
    if(num!=pre){
        pre=num;
        console.log(num);
    }
    else
    gen_random(max);
}



//let answer=gen_random(4);
//console.log(answer);


images.addEventListener('click',(e)=>
{
    if(e.target.id==answer)
    {
    console.log("correrct answer");
    }
    else
    {
        console.log("wrong answer")
    }
});



//fetch the json data

function FetchImage()
{
        var xmlhttp = new XMLHttpRequest();
        var url = "json/1.json";

         xmlhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        console.log(myArr);
      }
             };
    
   xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
FetchImage();
gen_random(0);




