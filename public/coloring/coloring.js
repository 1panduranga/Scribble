function update(eles,data)
{
  eles.forEach(ele=>{
    ele.innerHTML=data;
  })
}
auth.onAuthStateChanged(user=>{
   
  if(user)
  { 
   
    uid=user['uid'];
    if(user['displayName']==null)
    {
      user.updateProfile({
          displayName:name
      })
      console.log("updated as",name)
      pro_name.innerHTML=name;
    }
    else{
      pro_name.innerHTML=user['displayName'];
    }
  
 

   db.collection('users').doc(uid).get().then(doc=>{
     let data=doc.data();
     update(pro_odd,data['odd'])
     update(pro_pic,data['ipic'])
     update(pro_word,data['iword'])
     update(pro_add,data['a'])
     update(pro_sub,data['s'])
     update(pro_mul,data['m'])
     update(pro_div,data['d'])
     update(pro_num,data['num'])
     update(pro_alpha,data['alpha'])
     
   })
     pro_email.innerHTML= user['email'];
   s_profile.forEach((profile)=>{
       profile.classList.remove("block");
   })
   s_login.forEach((login)=>{
       login.classList.add("block");
   })
   
  }

  else
  
  {
    document.querySelectorAll(".hi").forEach((h)=>{
      h.classList.add("block")
    })
    uid=0;
      s_profile.forEach((profile)=>{
          profile.classList.add("block");
      })
      s_login.forEach((login)=>{
          login.classList.remove("block");
      })
  }
})
let uid=0;
const pro_odd=document.querySelectorAll(".pro_odd");
const pro_pic=document.querySelectorAll(".pro_pic");
const pro_word=document.querySelectorAll(".pro_word");
const pro_add=document.querySelectorAll(".pro_add");
const pro_sub=document.querySelectorAll(".pro_sub");
const pro_mul=document.querySelectorAll(".pro_mul");
const pro_div=document.querySelectorAll(".pro_div");
const pro_num=document.querySelectorAll(".pro_num");
const pro_alpha=document.querySelectorAll(".pro_alpha");
let name;
const pro_name=document.querySelector(".pro_name");
const s_login=document.querySelectorAll(".s_login");
const s_profile=document.querySelectorAll(".s_profile");
const login=document.querySelector(".login");
const signup=document.querySelector(".signup");
const b_login=document.querySelector(".b_login");
const b_signup=document.querySelector(".b_signup");
const login_form=document.querySelector("#login-form");
const signup_form=document.querySelector("#signup-form");
const change=document.querySelector(".change-option");
const chage_content=document.querySelector(".change-option p");
const modal_login=document.querySelector("#modal-login");
const modal_profile=document.querySelector("#modal-profile");
const logout=document.querySelector(".logout");
const pro_email=document.querySelector(".pro_email");
let c=0;
change.addEventListener("click",()=>{
  login.classList.toggle("block");
  signup.classList.toggle("block");
  c++;
  if(c%2!=0)
  {
      chage_content.innerHTML=`Already had an account? <span class="indigo-text"> login</span>`;
  }
  else{
      chage_content.innerHTML=`Not registered?<span class="indigo-text"> SignUp</span>`;
  }
})


login_form.addEventListener("submit",(e)=>{
  e.preventDefault();
  b_login.classList.add("disabled");
  let email=login_form['login-email'].value;
  let password=login_form['login-password'].value;
  auth.signInWithEmailAndPassword(email,password).then((cred)=>{
      M.Modal.getInstance(modal_login).close();
      login_form.reset();
      b_login.classList.remove("disabled");
      
  }).catch(err=>{
      let lerrmsg=document.querySelector(".lerrmsg");
      lerrmsg.setAttribute("style","display:block;")
      b_login.classList.remove("disabled")
      lerrmsg.innerHTML=`<p class="red-text center">${err['message']}</p>`;
      setTimeout(()=>{
          lerrmsg.setAttribute("style","display:none;")
      },3000)
  })
 

});


signup_form.addEventListener("submit",(e)=>{
e.preventDefault();
b_signup.classList.add("disabled");
let email=signup_form['signup-email'].value;
let password=signup_form['signup-password'].value;
auth.createUserWithEmailAndPassword(email,password).then(cred=>{
  name=signup_form['signup-name'].value;
  console.log("name copied")
  M.Modal.getInstance(modal_login).close();
  signup_form.reset();
  b_signup.classList.remove("disabled");
}).catch(err=>{
  let serrmsg=document.querySelector(".serrmsg");
  serrmsg.setAttribute("style","display:block;")
  b_signup.classList.remove("disabled");
  serrmsg.innerHTML=`<p class="red-text center">${err['message']}</p>`;
  setTimeout(()=>{
      serrmsg.setAttribute("style","display:none;")
  },3000)
});
})


logout.addEventListener("click",(e)=>{
e.preventDefault();
auth.signOut().then(()=>{
  const scr=document.querySelectorAll(".scr")
  scr.forEach((s)=>{
      s.innerHTML=0;
  })
  pro_name.innerHTML='null';
  pro_email.innerHTML='null';
  M.Modal.getInstance(modal_profile).close();
});
})








const icp=document.querySelector(".icp");
const artboard=document.querySelector(".artboard");
const present_color=document.querySelector(".present_color");
let copycolor="rgb(255,255,255)";
const plus=document.querySelector(".zoom-in");
const minus=document.querySelector(".zoom-out");
const dragscroll=document.querySelector(".dragscroll");
const r1=document.getElementById("r1");
const r2=document.getElementById("r2");
const r3=document.getElementById("r3");
const ri1=document.getElementById("ri1");
const ri2=document.getElementById("ri2");
const ri3=document.getElementById("ri3");
let red=255;
let blue=255;
let green=255;
let f=0;
plus.addEventListener("click",()=>{;
  let curr_size=dragscroll.getAttribute("style");
  let b=curr_size.indexOf("%");
  let scale_no=Number(curr_size.slice(6,b));
  scale_no+=10;
  if(scale_no<190){
    dragscroll.setAttribute("style","width:"+scale_no+"%;height:"+scale_no+"%;");
  }

});
minus.addEventListener("click",()=>{;
  let curr_size=dragscroll.getAttribute("style");
  let b=curr_size.indexOf("%");
  let scale_no=Number(curr_size.slice(6,b));
  scale_no-=10;
  if(scale_no>99){
    dragscroll.setAttribute("style","width:"+scale_no+"%;height:"+scale_no+"%;");
  }

  }
  );
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
      f=1;
        const c=document.getElementById(e.target.id);
        Array.from(c.parentElement.children).forEach(element => {
        element.classList.remove("selected");   
        });
      c.classList.add("selected");
      let str=c.getAttribute("style");
      copycolor=str.substring(17,str.length-1);
      update_box_present();
    }  

});




artboard.addEventListener("click",(e)=>{

  console.log(e.target);
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



function clear_selc(){
  if(f==1)
  {
    f=0;
    Array.from(icp.children).forEach(element => {
      element.classList.remove("selected");  
  })
  }
}
ri1.addEventListener("input",()=>
{
  clear_selc();
change_red(ri1.value);
update_box_present();

});
ri2.addEventListener("input",()=>
{
  clear_selc();
change_green(ri2.value);
update_box_present();

});
ri3.addEventListener("input",()=>
{
  clear_selc();
change_blue(ri3.value);
update_box_present();

});
