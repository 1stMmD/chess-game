import Preact from 'preact'
import { useState } from 'preact/hooks'
import Pawn from './Pawn'
import Empty from './Empty'
import { piece } from '../utils/types'
import ChosePiece from './ChosePiece'

export const empty = {
    type : "empty",
    canMove : false,
    color : "",
    selected : false
}

type props = {
    game : piece[][],
    functions : {
        any_selected: () => boolean;
        move: (x_idx: number, y_idx: number) => void;
        clean_up: () => void;
        pawn_move_areas: (x_idx: number, y_idx: number) => void;
        king_move_areas: (x_idx: number, y_idx: number) => void;
        rook_move_areas: (x_idx: number, y_idx: number) => void;
        bishop_move_areas: (x_idx: number, y_idx: number) => void;
        knight_move_areas: (x_idx: number, y_idx: number) => void;
        share_game: () => void;
        change_piece: (v : string | "queen" | "bishop" | "rook" | "knight") => void;
    },
    color : "white" | "black" | "",
    turn : "white" | "black",
    replacement : boolean
}

const Table : Preact.FunctionComponent<props> = ({
    game , functions , color , turn , replacement
}) => {
      
    return (
    <div
    className={`
    relative
    w-[min(80vw,70vh)]
    aspect-square
    border-[6px]
    overflow-hidden
    rounded-2xl
    border-violet-700
    flex
    flex-col
    h-fit
    `}>
        {game.map((p_item , p_idx) => {
            return(
                <div
                className={`
                flex
                `}>
                    {p_item.map((item : any,idx : number) => {
                        switch(item.type){
                            case "pawn" :
                                return(
                                    <Pawn
                                    color={color}
                                    turn={turn}
                                    key={p_idx + idx}
                                    any_selected={() => functions.any_selected()}
                                    move={() => functions.move(p_idx,idx)}
                                    clean_up={() => {functions.clean_up()}}
                                    pawn_move_areas={() => {
                                        functions.pawn_move_areas(p_idx,idx)
                                    }}
                                    item={item}
                                    x_idx={p_idx}
                                    y_idx={idx}
                                    />
                                )

                            case "king" :
                                return(
                                    <Pawn
                                    color={color}
                                    turn={turn}
                                    key={p_idx + idx}
                                    any_selected={() => functions.any_selected()}
                                    move={() => functions.move(p_idx,idx)}
                                    clean_up={() => {functions.clean_up()}}
                                    pawn_move_areas={() => {
                                        functions.king_move_areas(p_idx,idx)
                                    }}
                                    item={item}
                                    x_idx={p_idx}
                                    y_idx={idx}
                                    />
                                )

                            case "rook" :
                                return(
                                    <Pawn
                                    color={color}
                                    turn={turn}
                                    key={p_idx + idx}
                                    any_selected={() => functions.any_selected()}
                                    move={() => functions.move(p_idx,idx)}
                                    clean_up={() => {functions.clean_up()}}
                                    pawn_move_areas={() => {
                                        functions.rook_move_areas(p_idx,idx)
                                    }}
                                    item={item}
                                    x_idx={p_idx}
                                    y_idx={idx}
                                    />
                                )

                            case "bishop" :
                                return(
                                    <Pawn
                                    color={color}
                                    turn={turn}
                                    key={p_idx + idx}
                                    any_selected={() => functions.any_selected()}
                                    move={() => functions.move(p_idx,idx)}
                                    clean_up={() => {functions.clean_up()}}
                                    pawn_move_areas={() => {
                                        functions.bishop_move_areas(p_idx,idx)
                                    }}
                                    item={item}
                                    x_idx={p_idx}
                                    y_idx={idx}
                                    />
                                )

                            case "queen" :
                                return(
                                    <Pawn
                                    color={color}
                                    turn={turn}
                                    key={p_idx + idx}
                                    any_selected={() => functions.any_selected()}
                                    move={() => functions.move(p_idx,idx)}
                                    clean_up={() => {functions.clean_up()}}
                                    pawn_move_areas={() => {
                                        functions.bishop_move_areas(p_idx,idx)
                                        functions.rook_move_areas(p_idx,idx)
                                    }}
                                    item={item}
                                    x_idx={p_idx}
                                    y_idx={idx}
                                    />
                                )
                            case "knight" :
                                return(
                                    <Pawn
                                    color={color}
                                    turn={turn}
                                    key={p_idx + idx}
                                    any_selected={() => functions.any_selected()}
                                    move={() => {
                                        functions.move(p_idx,idx)
                                    }}
                                    clean_up={() => {functions.clean_up()}}
                                    pawn_move_areas={() => {
                                        functions.knight_move_areas(p_idx,idx)
                                    }}
                                    item={item}
                                    x_idx={p_idx}
                                    y_idx={idx}
                                    />
                                )

                            default : 
                             return(
                                <Empty
                                color={color}
                                turn={turn}
                                any_selected={() => functions.any_selected()}
                                move={() => functions.move(p_idx,idx)}
                                clean_up={() => {functions.clean_up()}}
                                item={item}
                                x_idx={p_idx}
                                y_idx={idx}
                                key={p_idx + idx}
                                />
                             )
                        }
                    })}
                </div>
            )
        })}


        { replacement ?
            <ChosePiece
            color={color}
            change_piece={functions.change_piece}
            />
            :
            <></>
        }
    </div>
  )
}

export default Table