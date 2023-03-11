export type piece_type = "king" | "empty" | "queen" | "rook" | "knight" | "bishop" | "pawn" | ""

export type piece = {
    type : piece_type,
    canMove : boolean,
    color : "white" | "black" | "",
    selected : boolean,
    firstTime : boolean
}