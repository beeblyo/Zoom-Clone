import express from "express";
import path from "path";
import http from "http";
import { Server } from "socket.io";

const workingDirectory = path.resolve();
const app = express();

app.set("view engine","pug");
app.set("views",workingDirectory +"/src/views");

app.use('/public', express.static(path.join(workingDirectory, 'src/public')));

app.get('/',(req,res)=>{res.render('home')});
app.get("/*",(req,res)=>{res.redirect("/")});

const httpServer = http.createServer(app);
const ioServer =  new Server(httpServer);

ioServer.on("connection",socket=>{
    console.log(socket)
});

httpServer.listen(3000);