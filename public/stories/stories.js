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















const mode=document.querySelector(".mode");
const body=document.querySelector("body");
const p=document.querySelectorAll("p");
const mode_button=document.querySelector(".mode_button");
const font_up=document.querySelector(".font_up");
const font_down=document.querySelector(".font_down");
const f_style=document.querySelector(".f_style");
const story=document.querySelector(".story");
let local_font=localStorage.getItem("font");
let local_mode=localStorage.getItem("mode");
const pen =document.querySelector(".pen");
const time =document.querySelector(".time");
if(local_font!=null)
{
	story.setAttribute("style",local_font);
}
if(local_mode!=null)
{
	if(local_mode=="light")
		light_mode();
	else
		dark_mode();
}
let present_style=story.getAttribute("style");
console.log(present_style);
let size=new Number(present_style.slice(present_style.search(":")+1,present_style.search("em")));
console.log("size",size);
let f_lib=[
    "font-family: 'Muli', sans-serif;",
    "font-family: 'Raleway', sans-serif;",
"font-family: 'PT Sans', sans-serif;"];
let f_num=0;
f_style.addEventListener("click",()=>
{
f_num=(f_num+1)%3;
let sa=story.getAttribute("style");
let tot=sa.slice(0,sa.search(";")+1)+f_lib[f_num];
localStorage.setItem("font",tot);
story.setAttribute("style",tot);
});


font_up.addEventListener("click",(e)=>
{
size+=0.1;
let sa=story.getAttribute("style");
let tot="font-size:"+size+"em;"+sa.slice(sa.search(";")+1);
console.log(tot);
localStorage.setItem("font",tot);
story.setAttribute("style",tot);
  
});
font_down.addEventListener("click",(e)=>
{
    size-=0.1;
    let sa=story.getAttribute("style");
    let tot="font-size:"+size+"em;"+sa.slice(sa.search(";")+1);
    localStorage.setItem("font",tot);
    console.log(tot);
    story.setAttribute("style",tot);
  
});
mode.addEventListener("click",(e)=>
{

   
    if(mode_button.getAttribute("src").search("sun")!=-1)
    {
    	light_mode();
    	localStorage.setItem("mode","light");
    }
    else 
    {
    	dark_mode();
        localStorage.setItem("mode","dark");
    }
});

function dark_mode()
{
	body.setAttribute("class","dark");
    mode_button.setAttribute("src","../images/stroy/sun.png");
    pen.setAttribute("src","../images/stroy/dark pen.png");
    time.setAttribute("src","../images/stroy/dark time.png");
}
function light_mode()
{
	body.setAttribute("class","light");
    mode_button.setAttribute("src","../images/stroy/moon.png");
    pen.setAttribute("src","../images/stroy/pen.png");
    time.setAttribute("src","../images/stroy/time.png");
}