const socket = io();

const welcome = document.querySelector("#welcome");
const form = document.querySelector("#welcome form");

function handleRoomSubmit(evt){
    evt.preventDefault();
    const input = form.querySelector("input");
    socket.emit("enter-room", {payload : input.value}, "this is string", ()=>{console.log("hey") })
    input.value = "";
}

form.addEventListener("submit",handleRoomSubmit);