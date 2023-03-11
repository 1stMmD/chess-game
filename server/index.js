const dotenv = require("dotenv")
const { createServer } = require("http");
const express = require("express");
const { Server } = require("socket.io");
const gameHandler  = require("./gameHandler");
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

io.on("connection",(socket) => {
    console.log(socket.id + " connected")

    gameHandler(io,socket,rooms)
    
    socket.on("disconnect",() => {
        console.log(socket.id + " disconnected")
    })
})

io.on("disconnect", socket => {
    const idx = rooms.findIndex(item => Object.keys(item.players).some(key => key === socket.id))
    rooms.splice(idx,1)
})

const port = process.env.PORT ?? 2020

server.listen(port,() => console.log("listening to port : " + port))

