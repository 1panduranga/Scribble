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
     hi=data['ipic'];
     update(hi_score_content,data['ipic'])
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








const p_option=document.querySelectorAll(".p_option");
const next_ques=document.querySelector(".next_ques");
const p_options_panel=document.querySelector(".p_options_panel");
const p_que=document.querySelector(".p_que img");
const gify=document.querySelector(".gify");
const msg=document.querySelector(".msg");
const msg_content=document.querySelector(".msg_content");
const p_ani_flash=document.querySelector(".p_option");
const p_wrapper=document.querySelector(".p_wrapper");
const go_shade=document.querySelector(".go_shade");
const go_wrapper =document.querySelector(".go_wrapper ");
const go_img=document.querySelector(".go_img");
const go_word=document.querySelector(".go_word");
const go_Score=document.querySelector(".go_Score");
const play_again=document.querySelector(".pa");
const large_score_content=document.querySelector(".large_score_content");
let three_prelist=[],four_prelist=[];
let prev_num=-1;
let p_answer,vals=[],p_que_img,flag=0,score=0,p_que_answer;
setTimeout(()=>{gify.setAttribute("src","../images/normal.gif");
p_wrapper.setAttribute("style","display:block");
let data;
},3100);
function p_flash()
{

  p_que.setAttribute("style","animation-name:flash;");
  p_option.forEach((op)=>{
    op.setAttribute("style","animation-name:flash;");
  })
  setTimeout(()=>{
    p_que.setAttribute("style","");
    p_option.forEach((op)=>{
      op.setAttribute("style","");
    })
  },1000)
  setTimeout(()=>{
    vals.forEach((val,i)=>{
      i++;
      const id=document.querySelector("#p_op"+i);
      id.innerHTML=val;

    })
    p_que.setAttribute("src",p_que_img);
  },120);
    
 
  
  
}
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
      let curr=[];
      while(curr.length<3)
      {
          let  num=Math.floor((Math.random() * n));
          if(!three_prelist.includes(num)&&!curr.includes(num))
          {
              curr.push(num);
          }
      }
      three_prelist=curr;
      return curr;
    }
    else if(mode==4)
    {
      let curr=[];
        while(curr.length<4 )
        {
            let  num=Math.floor((Math.random() * n));
            if(!four_prelist.includes(num)&&!curr.includes(num))
            {
                curr.push(num);
            }
        }
        four_prelist=curr;
        return curr;
    }
}
play_again.addEventListener("click",()=>{
  go_shade.setAttribute("style","display:none;");
      go_wrapper.setAttribute("style","display:none;");
      p_options_panel.setAttribute("style","display:block;");
      question_w();
      p_flash();
      flag=0;
      score=0;
      large_score_content.innerHTML=score;
      update(hi_score_content,hi)

})

Array.from(p_option).forEach(ele=>{
  ele.addEventListener('click',(e)=>
  {   
      if(e.target.id=="p_op"+p_answer)
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
          p_flash();
      },1500);
      question_w();

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
      go_word.innerHTML=p_que_answer;
      go_shade.setAttribute("style","display:block;");
      go_wrapper.setAttribute("style","display:block;");
      p_options_panel.setAttribute("style","display:none;");
      if(uid!=0 && score>hi)
       {
         hi=score;
         db.collection('users').doc(uid).update({
           ipic:hi
         })
         update(hi_score_content,hi)
         update(pro_pic,hi)
       }
      }
      
  });

});


//fetch the json data

function question_w(){
  vals=[];
 p_answer=randgen(4,1);
 p_answer++;
 let images=randgen(97,4);
 images.forEach((img,i)=>{
   if(i+1==p_answer)
   {
     p_que_img=data[img].src;
     p_que_answer=data[img].name;
   }
   vals.push(data[img].name);
 });
   }


   fetch("word.json")
   .then(response=>{
       return response.json()
   })
   .then(data_f=>{
     data=data_f;
     question_w();
     p_flash();
   }
     )
   .catch(err=>console.log("error",err))



    







