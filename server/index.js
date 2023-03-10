const dotenv = require("dotenv")
const { createServer } = require("http");
const express = require("express");
const { Server } = require("socket.io");

dotenv.config()

const app = express()

const server = createServer(app)

const io = new Server(server,{
    cors : { origin: "*"}
});

const rooms = []

io.on("connection",(socket) => {
    console.log(socket.id + " connected")

    socket.on("disconnect",() => {
        console.log(socket.id + " disconnected")
    })
})

