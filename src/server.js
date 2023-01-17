import express from "express";
import path from "path";
import http from "http";
import { WebSocketServer } from "ws";

const workingDirectory = path.resolve();
const app = express();

app.set("view engine","pug");
app.set("views",workingDirectory +"/src/views");

app.use('/public', express.static(path.join(workingDirectory, 'src/public')));

app.get('/',(req,res)=>{res.render('home')});
app.get("/*",(req,res)=>{res.redirect("/")});

// http와 webSocket 서버를 같은 port로 listening 해준다
// function handleConnection(socket) {console.log(socket);
// 각각의 브라우저 sockets 을 서버에서 받는다
const server = http.createServer(app);
const wss = new WebSocketServer({server});

const sockets = [];

wss.on("connection", (socket)=>{
    // console.log("connected to browser");
    sockets.push(socket);
    socket["nickname"] = "anonymous";

    socket.on("message",(message)=>{
        const parsed = JSON.parse(message);
        if(parsed.type == "message"){
            const userMessage = parsed.payload;
            sockets.forEach((broswerSocket)=>{
            broswerSocket.send(`${userMessage}`)
        })}
        if(parsed.type == "nickname"){
            const nickname = parsed.payload;
            socket["nickname"] = nickname;
        }



    })
        
    socket.on("close",()=>{console.log("broswer is closed")})
});

server.listen(3000);
