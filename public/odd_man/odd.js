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
     hi=data['odd'];
     update(hi_score_content,data['odd'])
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
const hi_score_content=document.querySelectorAll(".hi_score_content");
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
  console.log("uid",cred['user']['uid'])
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











const option=document.querySelectorAll(".option");
const gify=document.querySelector(".gify");
const options_panel=document.querySelector(".options_panel");
const msg=document.querySelector(".msg");
const msg_content=document.querySelector(".msg_content");
const ani_flash=document.querySelectorAll(".option img");
const o_wrapper=document.querySelector(".o_wrapper");
const go_shade=document.querySelector(".go_shade");
const go_wrapper =document.querySelector(".go_wrapper ");
const go_img=document.querySelector(".go_img");
const go_word1=document.querySelector(".go_word1");
const go_word2=document.querySelector(".go_word2");
const go_Score=document.querySelector(".go_Score");
const play_again=document.querySelector(".pa");
const large_score_content=document.querySelector(".large_score_content");
let hint_f;
let hint_s;
let p_que_img;
let score=0,flag;
// console.log(ani_flash);
let prelist=[],prelist_3=[];
let prev_num=-1;
let answer,seq,sources=[],indices=[];

  setTimeout(()=>{gify.setAttribute("src","../images/normal.gif");
  o_wrapper.setAttribute("style","display:block");},3100);

function flash_fn()
{
  Array.from(ani_flash).forEach(ele=>{
    ele.setAttribute("style","animation-name:flash;");
  });
  setTimeout(()=>{Array.from(ani_flash).forEach(ele=>{
    ele.setAttribute("style","");
  })},1000)
setTimeout(()=>{
sources.forEach((source,i)=>{
  const id=document.querySelector("#op"+indices[i]);
id.setAttribute("src",sources[i]);
});
sources=[];
indices=[];
},120);
}
play_again.addEventListener("click",()=>{
  go_shade.setAttribute("style","display:none;");
      go_wrapper.setAttribute("style","display:none;");
      options_panel.setAttribute("style","display:block;");
      question();
      flash_fn();
      flag=0;
      score=0;
      large_score_content.innerHTML=score;
      update(hi_score_content,hi)

})

function randgen(n,mode)
{
    if(mode==1)
    {
        let  num=Math.floor((Math.random() * n));
        while(num==prev_num)
        {
            num=Math.floor((Math.random() * n));
        }
        prev_num=num;
        return num;
    
        }
        
    else if(mode==3){
        while(prelist_3.length<3)
        {
            let  num=Math.floor((Math.random() * n));
            if(!prelist_3.includes(num))
            {
                prelist_3.push(num);
            }
        }
        let temp=prelist_3;
        prelist_3=[];
        return temp;
    }
    else if(mode==4)
    {
        while(prelist.length<4 )
        {
            let  num=Math.floor((Math.random() * n));
            if(!prelist.includes(num))
            {
                prelist.push(num);
            }
        }
        let temp=prelist;
        prelist=[];
        return temp;
    }
}


Array.from(option).forEach(ele=>{
  ele.addEventListener('click',(e)=>
  {
    //   console.log(e.target.id);
      let t=document.querySelector("#"+e.target.id);
     
      if(e.target.id=="op"+answer)
      {
        if(flag==0)
        {
          score++;
          large_score_content.innerHTML=score;
        gify.setAttribute("src","../images/correct.gif");
        msg.setAttribute("style","display:block;");
        msg_content.innerHTML=`WOAH !!<br><span class="hint">It's correct answer</span>`;
        
        setTimeout(()=>{
          gify.setAttribute("src","../images/normal.gif");
          msg.setAttribute("style","display:none;");
          flash_fn();
      },1500);
      question();
        }
        
        
      }
      else
      {
        flag=1;
        gify.setAttribute("src","../images/wrong.gif");
        setTimeout(()=>{
          gify.setAttribute("src","../images/normal.gif");
      },1900);
      go_img.setAttribute("src",p_que_img);
      go_Score.innerHTML=score;
      go_shade.setAttribute("style","display:block;");
      go_wrapper.setAttribute("style","display:block;");
      options_panel.setAttribute("style","display:none;");
      go_word1.innerHTML=hint_f;
      go_word2.innerHTML=hint_s;
      if(uid!=0 && score>hi)
       {
         hi=score;
         db.collection('users').doc(uid).update({
           odd:hi
         })
         update(hi_score_content,hi)
         update(pro_odd,hi)
       }
      }
      
  });

});


//fetch the json data

function question(){
  console.log("score",score);
    seq=randgen(4,4);
    // console.log("op seq",seq);
    flag=0;

fetch("json/main.json")
.then(response=>{
    return response.json()
})
.then(data=>{
    let first_folder=randgen(11,1);
    let second_folder=randgen(11,1);
    //console.log("first_folder",data[first_folder].name);
    //console.log("second_folder",data[second_folder].name);
    hint_f=data[first_folder].name;
    hint_s=data[second_folder].name;
    let f_no=data[first_folder].count;
    let s_no=data[second_folder].count;
    // console.log("f_no",f_no);
    // console.log("s_no",s_no);
    let f_i_no=randgen(f_no,1);
      let s_i_no=randgen(s_no,3);
      //console.log("f_i_no",f_i_no);
      //console.log("s_i_no",s_i_no);
    fetch(data[first_folder].src)
    .then(response=>{
        return response.json()
    }).then(data=>{
        answer=seq.indexOf(0)+1;
        // console.log("correct answwer",answer);
      // let op1=document.querySelector("#op"+answer);
      // console.log(op1);
      indices.push(answer);
      sources.push(data[f_i_no].src);
      p_que_img=data[f_i_no].src;
      // op1.setAttribute("src",data[f_i_no].src);
      //console.log("op1",data[f_i_no].src);    
    })

    fetch(data[second_folder].src)
    .then(response=>{
        return response.json()
    }).then(data=>{
      s_i_no.forEach((s_i,i)=>{
          let nu=i+1;
          let pos=seq.indexOf(nu)+1;
          // console.log("i,nu,pos",i,nu,pos);
          indices.push(pos);
        //  const id=document.querySelector("#op"+pos);
        console.log("op",data[s_i].src);
        sources.push(data[s_i].src);
        // id.setAttribute("src",data[s_i].src); 
      })
    })
})
.catch(err=>console.log("error",err))
}
question();
flash_fn();
    







