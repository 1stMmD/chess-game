const dotenv = require("dotenv")
const { createServer } = require("http");
const express = require("express");
const { Server } = require("socket.io");
const gameHandler  = require("./src/gameHandler");
const { disconnect } = require("process");

dotenv.config()

const app = express()

const server = createServer(app)

const io = new Server(server,{
    cors : { 
        origin : "*",
    },
});

const rooms = []

const users = []

io.use((socket,next) => {
    const {username , password} = socket.handshake.auth;
    
    const idx = users.findIndex((user) => user.name === username);

    if(idx >= 0){
        const user = users[idx]
        if(user.password === password){
            socket.data = {...user}
            next()
        }
        next(new Error("wrong password bro!"))
    } else {
        const user = {
            username,
            password
        }
        users.push(user)
        socket.data = {...user}
        next()
    }
})

io.on("connection",(socket) => {
    console.log(socket.data.username + " connected")

    // userHandler(io,socket,users)

    gameHandler(io,socket,rooms)
    
    socket.on("disconnect",() => {
        console.log(socket.data.username + " disconnected")
        const idx = rooms.findIndex(item => Object.keys(item.players).some(key => key === socket.id))
        rooms.splice(idx,1)
    })
    
})

const port = process.env.PORT ?? 2020

server.listen(port,() => console.log("listening to port : " + port))

