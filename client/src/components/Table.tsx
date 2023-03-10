import Preact from 'preact'
import { useState } from 'preact/hooks'
import Pawn from './Pawn'
import Empty from './Empty'
import { useGame } from '../Hooks/useGame'
import type { piece } from '../Hooks/useSharedGame'

export const empty = {
    type : "empty",
    canMove : false,
    color : "",
    selected : false
}

const pawn = {
    type : "pawn",
    canMove : false,
    color : "white",
    selected : false
}

const pawnBlack = {
    type : "pawn",
    canMove : false,
    color : "black",
    selected : false
}

type props = {
    color : "white" | "black",
    sharedGame : piece[][] | typeof empty[][],
    shareGame : (game : piece[][] | typeof empty[][]) => void
    turn : "white" | "black"
}

const Table : Preact.FunctionComponent<props> = ({
    color , 
    sharedGame,
    shareGame,
    turn
}) => {
    const {game , functions} = useGame(color,sharedGame,shareGame)
      
    return (
    <>
    <div
    className={`
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
                                    share_game={functions.share_game}
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
                                    share_game={functions.share_game}
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
                                    share_game={functions.share_game}
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
                                    share_game={functions.share_game}
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
                                    share_game={functions.share_game}
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
                                    share_game={functions.share_game}
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
                                share_game={functions.share_game}
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
    </div>

    </>
  )
}

export default Table