import express from "express";
import path from "path";

const workingDirectory = path.resolve();
const app = express();

app.set("view engine","pug");
app.set("views",workingDirectory +"/src/views");

app.use('/public', express.static(path.join(workingDirectory, 'src/public')));

app.get('/',(req,res)=>{
    res.render('home')
});

app.listen(3000);
