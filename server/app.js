const express = require('express');
const { createServer } = require('http');
const path = require('path');
const cors = require('cors');
const socketio = require('socket.io');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

const server = createServer(app);
 
const io = socketio(server,{
    cors:{
        origin: "http://localhost:5173",
        methods: ["GET","POST"],
        credential: true
    }
});
 
io.on("connection",(socket) => {
    console.log("user connected")
    console.log(socket.id)
    socket.emit("message","User is online")
    socket.on('disconnect',() => {
        console.log("User disconnect" , socket.id)
    })
    socket.on("message",(data)=>{
        console.log(data)
    })
})


app.get('/', function (req, res) {
    res.send("working");
});
server.listen(3000,function(req,res){
    console.log("Server is running")
});

 
