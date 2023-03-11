const shortid = require("shortid")

const opposite_color = {
    "black" : "white",
    "white" : "black"
}

const piece = (
    type,
    color 
) => {
    return{
        type,
        canMove : false,
        color,
        selected : false,
        firstTime : type === "pawn",
    }
}

const gameHandler = (
    io,
    socket,
    rooms
) => {
    const create = (
        payload,
        cb
    ) => {
        const index = rooms.findIndex(room => room.open === true)

        if(index >= 0){
            const room = rooms[index]
            room.players[socket.data.username] = {
                color : "black",
                username : socket.data.username
            }

            room.open = false

            socket.join(room.ID)
            io.to(room.ID).emit("room:get" , room)
            cb()
        }
        else{
            const room = {
                ID : shortid.generate(),
                players : {
                    [socket.data.username] : {
                        color : "white",
                        username : socket.data.username,
                    }
                },
                game : [
                    [piece("rook","black"),piece("knight","black"),piece("bishop","black"),piece("queen","black"),piece("king","black"),piece("bishop","black"),piece("knight","black"),piece("rook","black")],
                    [piece("pawn","black"),piece("pawn","black"),piece("pawn","black"),piece("pawn","black"),piece("pawn","black"),piece("pawn","black"),piece("pawn","black"),piece("pawn","black")],
                    [piece("empty",""),piece("empty",""),piece("empty",""),piece("empty",""),piece("empty",""),piece("empty",""),piece("empty",""),piece("empty","")],
                    [piece("empty",""),piece("empty",""),piece("empty",""),piece("empty",""),piece("empty",""),piece("empty",""),piece("empty",""),piece("empty","")],
                    [piece("empty",""),piece("empty",""),piece("empty",""),piece("empty",""),piece("empty",""),piece("empty",""),piece("empty",""),piece("empty","")],
                    [piece("empty",""),piece("empty",""),piece("empty",""),piece("empty",""),piece("empty",""),piece("empty",""),piece("empty",""),piece("empty","")],
                    [piece("pawn","white"),piece("pawn","white"),piece("pawn","white"),piece("pawn","white"),piece("pawn","white"),piece("pawn","white"),piece("pawn","white"),piece("pawn","white")],
                    [piece("rook","white"),piece("knight","white"),piece("bishop","white"),piece("queen","white"),piece("king","white"),piece("bishop","white"),piece("knight","white"),piece("rook","white")],
                ],
                turn : "white",
                open : true,
            }
            
            rooms.push(room)
            socket.join(room.ID)
            io.to(room.ID).emit("room:get",room)
            cb()
        }
    }

    const update = (
        payload
    ) => {
        const idx = rooms.findIndex(room => room.ID === payload.ID);
        const room = rooms[idx];
        room.game = payload.game
        room.turn = opposite_color[room.turn]

        io.to(payload.ID).emit("room:get",room)
    }

    socket.on("room:create",create)
    socket.on("room:update",update)
}

module.exports = gameHandler