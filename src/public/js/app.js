const messageList = document.querySelector("ul");
const nicknameForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");


// Create WebSocket connection.
const socket = new WebSocket(`ws://${window.location.host}`);
socket.addEventListener("open",()=>{console.log("connected to server!")});
socket.addEventListener("message",(message)=>{
    const li = document.createElement("li");
    li.innerHTML = message.data;
    messageList.append(li);
});
socket.addEventListener("close",()=>{console.log("disconnected from server")});



function makeMessage(type, payload) {
    const msg = { type, payload };
    return JSON.stringify(msg);
  }


function handleSave(evt){
    evt.preventDefault();
    const input = nicknameForm.querySelector("#nick input");
    socket.send(makeMessage("nickname",input.value));
}

function handleSubmit(evt){
    evt.preventDefault();
    const input = messageForm.querySelector("#message input");
    socket.send(makeMessage("message",input.value));
    input.value = "";
}

nicknameForm.addEventListener("submit",handleSave);
messageForm.addEventListener("submit",handleSubmit);