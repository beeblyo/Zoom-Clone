//const client = io();
const client = io.connect('http://localhost:3000/room',{ path: '/socket.io'});

const welcome = document.querySelector("#welcome");
const form = document.querySelector("#welcome form");
const chatroom = document.querySelector("#chatroom");
const chatRoomTitle = chatroom.querySelector("h3");
const currentPPL = document.querySelector("#currentPPL");
const input = form.querySelector("#welcome input");



chatroom.hidden = true;

function toggleRoom(){
    chatroom.hidden = false;
    welcome.hidden = true;   
}

function makeMessage(msg){
    const ul = chatroom.querySelector("ul");
    const li = document.createElement("li");
    li.innerHTML = msg;
    ul.appendChild(li);
}


function handleRoomSubmit(evt){
    evt.preventDefault();
    chatRoomTitle.innerHTML = `${input.value}'s Chat Room`;
    client.emit('enter-room', input.value, toggleRoom)
    input.value = "";
}



client.on('welcome',(count)=>{
    makeMessage('[system] someone just joined!')
    currentPPL.innerHTML = `current chat members : ${count}`;
});

client.on('bye',()=>{
    makeMessage('[system] someone just gone!')})

form.addEventListener("submit",handleRoomSubmit);