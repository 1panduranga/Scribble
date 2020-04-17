
function update(eles,data)
{
  eles.forEach(ele=>{
    ele.innerHTML=data;
  })
}
auth.onAuthStateChanged(user=>{
   
  if(user)
  { 
    document.querySelectorAll(".hi").forEach((h)=>{
      h.classList.remove("block")
    })
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
     hi=data['alpha'];
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
let hi;
let name;
let uid=0;
const drop_box=document.querySelectorAll(".drop_box");
let flaggy=1;
const pro_odd=document.querySelectorAll(".pro_odd");
const pro_pic=document.querySelectorAll(".pro_pic");
const pro_word=document.querySelectorAll(".pro_word");
const pro_add=document.querySelectorAll(".pro_add");
const pro_sub=document.querySelectorAll(".pro_sub");
const pro_mul=document.querySelectorAll(".pro_mul");
const pro_div=document.querySelectorAll(".pro_div");
const pro_num=document.querySelectorAll(".pro_num");
const pro_alpha=document.querySelectorAll(".pro_alpha");
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
  db.collection('users').doc(cred['user']['uid']).set({
    a:0,
    alpha:0,
    d:0,
    ipic:0,
    iword:0,
    m:0,
    num:0,
    odd:0,
    s:0
  })
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






let score=0;
const drop_container=document.querySelector("#drop_container");
const drag_container=document.querySelector("#drag_container");
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array;
}

let a_seq=shuffleArray(['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']);
a_seq.forEach((a,i)=>{
  i++;
const id=document.querySelector(".A_"+i);
id.setAttribute("src","../images/alphabets/png/"+a+".png");
id.setAttribute("id","DRAG"+a);
});
document.querySelector('.pa').addEventListener('click',()=>{
  location.reload();
})
  Array.from(drop_container.childNodes).forEach((e)=>{e.addEventListener("drop",(ev)=>{
    if(ev.target.id.search("DRAG")==-1)
    {
      ev.preventDefault();
      var data = ev.dataTransfer.getData("text");
      let dref=document.getElementById(data);
      dref.setAttribute("style","margin:0px;");
      ev.target.appendChild(dref);
      flaggy=1;
      drop_box.forEach(box=>{
      if(box.firstChild==null)
      {
        flaggy=0;
      }
      })
      if(flaggy==1)
      {
        drop_box.forEach((box)=>{
          if(box.firstChild.id.search(box.id)!=-1)
          {
            score++;
          }
           
        })
        const go=document.querySelector("#modalgo") 
        if(score==26)
        {
          document.querySelector('.tit').innerHTML="congratulations";
        }
        else
        {
          document.querySelector('.tit').innerHTML="Better luck next time";
        }
        
        document.querySelector('.goscore').innerHTML=score;
        $(go).modal('open');
        if(hi<score)
        {
          hi=score;
          db.collection('users').doc(uid).update({
            alpha:score
          })
          update(pro_alpha,hi)
        }
      }

    }
    else{
      console.log("oyyy already one pic exits there");
    } 
  })
e.addEventListener("dragover",ev=>ev.preventDefault())
});
  Array.from(drag_container.childNodes).forEach((e)=>{e.addEventListener("dragstart",(ev)=>{
    ev.dataTransfer.setData("text", ev.target.id);
  })});
