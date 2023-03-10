import { useEffect, useState } from "preact/hooks"

type piece_type = "king" | "empty" | "queen" | "rook" | "knight" | "bishop" | "pawn"

export type piece = {
    type : piece_type,
    canMove : boolean,
    color : "white" | "black",
    selected : boolean,
    firstTime : boolean
}

export const empty = {
    type : "empty",
    canMove : false,
    color : "",
    selected : false,
    firstTime : false
}

const piece = (
    type : piece_type,
    color : "white" | "black"
) => {
    return{
        type,
        canMove : false,
        color,
        selected : false,
        firstTime : type === "pawn",
    }
}

export const opposite_colors : {
     "black" : "white"
     "white" : "black"
} = {
    "black" : "white",
    "white" : "black"
}

export const useSharedGame = () => {
    const [sharedGame , setSharedGame] = useState<piece[][] | typeof empty[][]>([
        [piece("rook","black"),piece("knight","black"),piece("bishop","black"),piece("queen","black"),piece("king","black"),piece("bishop","black"),piece("knight","black"),piece("rook","black")],
        [piece("pawn","black"),piece("pawn","black"),piece("pawn","black"),piece("pawn","black"),piece("pawn","black"),piece("pawn","black"),piece("pawn","black"),piece("pawn","black")],
        [empty,empty,empty,empty,empty,empty,empty,empty],
        [empty,empty,empty,empty,empty,empty,empty,empty],
        [empty,empty,empty,empty,empty,empty,empty,empty],
        [empty,empty,empty,empty,empty,empty,empty,empty],
        [piece("pawn","white"),piece("pawn","white"),piece("pawn","white"),piece("pawn","white"),piece("pawn","white"),piece("pawn","white"),piece("pawn","white"),piece("pawn","white")],
        [piece("rook","white"),piece("knight","white"),piece("bishop","white"),piece("king","white"),piece("queen","white"),piece("bishop","white"),piece("knight","white"),piece("rook","white")],
    ])

    const [turn , setTurn] = useState<"white"|"black">("white")

    useEffect(() => {
        const black_king = sharedGame.some(item => item.some((i) => i.type === "king" && i.color === "black"))
        const white_king = sharedGame.some(item => item.some((i) => i.type === "king" && i.color === "white"))

        if(!black_king){
            console.log("black king is dead!")
            return
        }

        if(!white_king){
            console.log("white king is dead!")
        }
    },[sharedGame])

    const changeTurn = () => {
        setTurn(prev => opposite_colors[prev])
    }

    const shareGame = (
        game : piece[][] | typeof empty[][]
    ) => {
        setSharedGame(game)
        changeTurn()
    }

    return {
        sharedGame,
        shareGame,
        turn
    }
}