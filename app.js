console.log("here we go .... boom ");


function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

const id=create_UUID();


const messageForm=document.getElementById("message-form");
const msgButton=document.getElementById("message-btn");
const inputField=document.getElementById("message-input");
const messageArea=document.getElementById("messageArea");
const chatWindow=document.getElementById("chat-window");
const inputName=document.getElementById("inputName");
const nameInputbtn=document.getElementById("nameInputbtn");
const nameForm=document.getElementById("nameForm");
const delAllbtn=document.getElementById("delAllbtn");
chatWindow.style.display="none";
messageForm.style.display="none";



let name;

messageForm.addEventListener("submit",event=>{

    event.preventDefault();

    const text=inputField.value;

    if(!text.trim()) return

    const msg={
         id,
         name,
         text, 
         n,
    }

    firebase.database().ref("message").push(msg);
    inputField.value="";
    

});



//extracting data from fire base


firebase.database().ref("message").on("child_added",data=>{
  
    let {id :userId,n,name,text}=data.val();
   
    
  
    const displayMessage=` <li class="msg ${id==userId && "my"}"><span><i class="name">${name}: </i>${text}  <br> <i> ${n} </i></span> </li>`;
    messageArea.innerHTML+=displayMessage;

})


nameForm.addEventListener("submit",e=>{
    e.preventDefault();
    if(!inputName.value.trim()) return alert("please enter Name to continue")
    name=inputName.value;
    chatWindow.style.display="block";
    nameForm.style.display="none";
    messageForm.style.display="block";
    
})


var d = new Date();
var n = d.toLocaleTimeString();


//delete all data from chat app 


delAllbtn.addEventListener("click",()=>{
     firebase.database().ref("message").remove();
     messageArea.innerHTML=""
})
     

