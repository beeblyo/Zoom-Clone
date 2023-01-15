const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");

// Create WebSocket connection.
const socket = new WebSocket(`ws://${window.location.host}`);
socket.addEventListener("open",()=>{console.log("connected to server!")});
socket.addEventListener("message",(message)=>{console.log(`i've got this message : ${message.data}`)});
socket.addEventListener("close",()=>{console.log("disconnected from server :(")});


function handleSubmit(evt){
    evt.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(input.value);
    input.value = "";
}

messageForm.addEventListener("submit",handleSubmit);