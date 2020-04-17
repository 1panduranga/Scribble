
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
     hi=data['s'];
     update(hi_score_content,hi)
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
   document.querySelector(".hiscore").classList.add("block")
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
      document.querySelector(".hiscore").classList.remove("block")
  }
})
let hi;
let name;
let flaggy=1;
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
const hi_score_content=document.querySelectorAll(".hi_score_content")

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







var cadd=0;
var csub=0;
var cmul=0;
var cdiv=0;
var m_answer;
var a,b,op;
const m_que_wrapper=document.querySelector(".m_que_wrapper");
const m_drag_container=document.querySelector("#m_drag_container");
const m_ans_wrapper=document.querySelector(".m_ans_wrapper");
let m_drag_src,m_drag_id;
let check=0,m_no=0;

function add()
{
    if(cadd<=20)//change cadd,csub,smul,sdiv condition
    {
        a=Math.floor((Math.random() * 9))+1;
        b=Math.floor((Math.random() * 9))+1;
    }
    else if(cadd>20 && cadd<=40)
    {
        a=Math.floor((Math.random() * (99-10)))+10;
        b=Math.floor((Math.random() * (99-10)))+10;
    }
    else
    {
        a=Math.floor((Math.random() * (999-100)))+100;
        b=Math.floor((Math.random() * (999-100)))+100;
    }
    m_answer=a+b;
}

function sub()
{
    if(csub<=20)
    {
        a=Math.floor((Math.random() * 9))+1;
        b=Math.floor((Math.random() * 9))+1;
    }
    else if(csub>20 && csub<=40)
    {
        a=Math.floor((Math.random() * (99-10)))+10;
        b=Math.floor((Math.random() * (99-10)))+10;
    }
    else
    {
        a=Math.floor((Math.random() * (999-100)))+100;
        b=Math.floor((Math.random() * (999-100)))+100;
    }
    if(a<b)
    {
        let temp=a;
        a=b;
        b=temp;
    }
    m_answer=a-b;
}

function mul()
{
    if(cmul<=20)
    {
        a=Math.floor((Math.random() * 9))+1;
        b=Math.floor((Math.random() * 9))+1;
    }
    else if(cmul>20 && cmul<=30)
    {
        a=Math.floor((Math.random() * (99-10)))+10;
        b=Math.floor((Math.random() * (9)))+1;
    }
    else if(cmul>30 && cmul<=40)
    {
        a=Math.floor((Math.random() * (999-100)))+100;
        b=Math.floor((Math.random() * (9)))+1;
        
    }
    else if(cmul>40 && cmul<=50)
    {
        a=Math.floor((Math.random() * (99-10)))+10;
        b=Math.floor((Math.random() * (99-10)))+10;
    }
    else if(cmul>50 && cmul<=60){
        a=Math.floor((Math.random() * (999-100)))+100;
        b=Math.floor((Math.random() * (99-10)))+10;
    }
    else{
        a=Math.floor((Math.random() * (999-100)))+100;
        b=Math.floor((Math.random() * (999-100)))+100;
    }
    m_answer= a*b;
}

function div()
{
    if(cdiv<=20)
    {
        b=Math.floor((Math.random() * 9))+1;
        a=(Math.floor((Math.random() * 9))+1)*b;
    }
    else if(cdiv>20 &&cdiv<=40)
    {
        b=Math.floor((Math.random() * 9))+1;
        a=(Math.floor((Math.random() * 99))+10)*b;
    
    }
    else{
        b=Math.floor((Math.random() * 9))+1;
        a=(Math.floor((Math.random() * 999))+100)*b;
    }
    m_answer=a/b;
}

function Mathop(op)
{
    switch(op)
    {
        case 'a':
            add(cadd);
            break;
        case 's':
            sub(csub);
            break;
        case 'm':
            mul(cmul);
            break;
        case 'd':
            div(cdiv);
            break;
    }
}
function render()
{
    let s_a=a.toString();
    let l_a=s_a.length;
    let s_b=b.toString();
    let l_b=s_b.length;
    let i=0;
    m_que_wrapper.innerHTML="";
    m_ans_wrapper.innerHTML="";
    while(i<l_a)
    {
        let div=document.createElement('div');
        div.setAttribute("class","m_que m_block");
        let img=document.createElement("img");
        img.setAttribute("src","../images/numbers/type 1/"+s_a[i]+".png");
        img.setAttribute("draggable","false");
        div.appendChild(img);
        m_que_wrapper.appendChild(div);
        i++;
    } 
    let div=document.createElement('div');
    div.setAttribute("class","m_operator m_block");
    let img=document.createElement("img");
    img.setAttribute("src","../images/numbers/operations/"+op+".png");
    img.setAttribute("draggable","false");
    div.appendChild(img);
    m_que_wrapper.appendChild(div);
    i=0;
    while(i<l_b)
    {
        let div=document.createElement('div');
        div.setAttribute("class","m_que m_block");
        let img=document.createElement("img");
        img.setAttribute("src","../images/numbers/type 1/"+s_b[i]+".png");
        img.setAttribute("draggable","false");
        div.appendChild(img);
        m_que_wrapper.appendChild(div);
        i++;
    }
    let s_ans=m_answer.toString();
    let l_ans=s_ans.length;
     i=0;
    while(i<l_ans)
    {
        let div=document.createElement('div');
        div.setAttribute("class","m_ans m_block");
        div.setAttribute("id",s_ans[i]);
        m_ans_wrapper.appendChild(div);
        i++;
        div.addEventListener("drop",(ev)=>{
            
                let m_child=document.createElement('img')
                m_child.setAttribute("src",m_drag_src);
                m_child.setAttribute("id",m_drag_id);
            ev.target.appendChild(m_child);
            flaggy=1;
            document.querySelectorAll('.m_ans').forEach(box=>{
               if(box.firstChild==null)
               {
                  flaggy=0;
               }
            })
            if(flaggy==1)
            {
                let check=1;
                document.querySelectorAll('.m_ans').forEach(box=>{
                    if(box.firstChild.id.search(box.id)==-1)
                    {
                       check=0;
                    }

                 })
                 if(check==1)
                 {
                     
                    csub++;
                    update(document.querySelectorAll('.score_content'),csub)
                     Mathop(op);
                     render();
                     
                 }
                 else{
                    const gomodal=document.querySelector("#modalgo")
                     document.querySelector('.res').innerHTML=`${a}-${b}=${a-b}`
                    M.Modal.getInstance(gomodal).open();
                    if(hi<csub)
                    {
                        hi=csub;
                        update(hi_score_content,hi)
                        db.collection('users').doc(uid).update({
                            s:hi
                          })
                          update(pro_sub,hi)
                    }
                 }
            }


            
       
        
      })
      document.querySelector('.pa').addEventListener('click',()=>{
          location.reload();
          cadd=0;
      })
    div.addEventListener("dragover",ev=>{
      ev.preventDefault();
    })
    } 


}
  Array.from(m_drag_container.childNodes).forEach((e)=>{e.addEventListener("dragstart",(ev)=>{
m_drag_src=ev.target.getAttribute("src");
m_drag_id=ev.target.id;

  })});




csub=0;
op="s";
Mathop(op);
render();