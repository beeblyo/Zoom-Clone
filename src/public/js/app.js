//const client = io();
const client = io.connect('http://localhost:3000/room', 
    { path: '/socket.io', //transports: ['websocket'] 
    });

const welcome = document.querySelector("#welcome");
const form = document.querySelector("#welcome form");
const chatroom = document.querySelector("#chatroom");

chatroom.hidden = true;

function toggleRoom(){
    chatroom.hidden = false;
    //chatroom.display = true;
    welcome.hidden = true;
}

client.on('newroom',msg=>{console.log('got this msg from server',msg)});

function handleRoomSubmit(evt){
    evt.preventDefault();
    const input = form.querySelector("input");
    client.emit('enter-room', {payload : input.value}, toggleRoom)
    input.value = "";
}

form.addEventListener("submit",handleRoomSubmit);