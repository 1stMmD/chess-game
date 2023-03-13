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
        const idx = rooms.findIndex(room => !!room.players[socket.data.username]);
        console.log(idx)
        
        if(idx >= 0) return

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
        {game , ID}
    ) => {
        const black_king = game.some(row => row.some(item => item.type === "king" && item.color === "black"))
        const white_king = game.some(row => row.some(item => item.type === "king" && item.color === "white"))
        if(black_king && white_king){
            const idx = rooms.findIndex(room => room.ID === ID);
            const room = rooms[idx];
            room.game = game
            room.turn = opposite_color[room.turn]

            io.to(ID).emit("room:get",room)
        }
        else{
            if(!black_king){
                io.to(ID).emit("room:over",{
                    winner : "white",
                    game
                })
            }

            else {
                io.to(ID).emit("room:over",{
                    winner : "black",
                    game
                })

                io.of('/').in(ID).clients((error, socketIds) => {
                    if (error) throw error;
                  
                    socketIds.forEach(socket => socket.leave(ID));
                  
                  });
            }
            
            const idx = rooms.findIndex((room) => room.ID === ID)
            rooms.splice(idx,1)
        }
    }

    socket.on("room:create",create)
    socket.on("room:update",update)
}

module.exports = gameHandler