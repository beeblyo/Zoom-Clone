import express from "express";
import path from "path";
import http from "http";
import { Server }  from "socket.io";

const workingDirectory = path.resolve();
const app = express();

app.set("view engine","pug");
app.set("views",workingDirectory +"/src/views");

app.use('/public', express.static(path.join(workingDirectory, 'src/public')));

app.get('/',(req,res)=>{res.render('home')});
app.get("/*",(req,res)=>{res.redirect("/")});


/** create server **/
const httpServer = http.createServer(app);
const server =  new Server(httpServer);

/** create namespace/room **/
const room = server.of('/room');

room.on('connection', (socket) => {
    
    socket.on('disconnect',()=>{ console.log('--disconnected from room namespace--');});

    socket.on('enter-room',(roomName, fuc)=>{
        socket.join(roomName);
        fuc();
        room.to(roomName).emit("welcome", server.engine.clientsCount);
    });

    socket.on('disconnecting', ()=>{
        socket.rooms.forEach((room)=>socket.to(room).emit('bye'))
    })

});


httpServer.listen(3000);