import Preact from "preact"

type props = {
    className : string
}

const King_White : Preact.FunctionComponent<props> = ({
    className
}) => {
    return(
        <img
        className={className}
        src="/svg/king_white.svg"/>
    )
}

const King_Black : Preact.FunctionComponent<props> = ({
    className
}) => {
    return(
        <img
        className={className}
        src="/svg/king_black.svg"/>
    )
}

const Pawn_Black : Preact.FunctionComponent<props> = ({
    className
}) => {
    return(
        <img
        className={className}
        src="/svg/pawn_black.svg"/>
    )
}

const Pawn_White : Preact.FunctionComponent<props> = ({
    className
}) => {
    return(
        <img
        className={className}
        src="/svg/pawn_white.svg"/>
    )
}

const Knight_White : Preact.FunctionComponent<props> = ({
    className
}) => {
    return(
        <img
        className={className}
        src="/svg/knight_white.svg"/>
    )
}

const Knight_Black : Preact.FunctionComponent<props> = ({
    className
}) => {
    return(
        <img
        className={className}
        src="/svg/knight_black.svg"/>
    )
}

const Bishop_Black : Preact.FunctionComponent<props> = ({
    className
}) => {
    return(
        <img
        className={className}
        src="/svg/bishop_black.svg"/>
    )
}

const Bishop_White : Preact.FunctionComponent<props> = ({
    className
}) => {
    return(
        <img
        className={className}
        src="/svg/bishop_white.svg"/>
    )
}

const Queen_White : Preact.FunctionComponent<props> = ({
    className
}) => {
    return(
        <img
        className={className}
        src="/svg/queen_white.svg"/>
    )
}

const Queen_Black : Preact.FunctionComponent<props> = ({
    className
}) => {
    return(
        <img
        className={className}
        src="/svg/queen_black.svg"/>
    )
}

const Rook_Black : Preact.FunctionComponent<props> = ({
    className
}) => {
    return(
        <img
        className={className}
        src="/svg/rook_black.svg"/>
    )
}

const Rook_White : Preact.FunctionComponent<props> = ({
    className
}) => {
    return(
        <img
        className={className}
        src="/svg/rook_white.svg"/>
    )
}

export const pieces : {
    [name : string] : {
        [name : string] : Preact.FunctionComponent<props>
    }
}  = {
    "queen": {
        "white" : Queen_White,
        "black" : Queen_Black
    },
    "king": {
        "white" : King_White,
        "black" : King_Black
    },
    "bishop": {
        "white" : Bishop_White,
        "black" : Bishop_Black
    },
    "pawn": {
        "white" : Pawn_White,
        "black" : Pawn_Black
    },
    "knight": {
        "white" : Knight_White,
        "black" : Knight_Black
    },
    "rook": {
        "white" : Rook_White,
        "black" : Rook_Black
    },
}