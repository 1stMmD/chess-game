import Preact from 'preact'
import { StateUpdater } from 'preact/hooks';
import { pieces } from '../utils/pieces';

const empty = {
    type : "empty",
    canMove : false,
    color : "",
    selected : false
}

type props = {
    move : () => void,
    any_selected : () => boolean,
    clean_up : () => void,
    pawn_move_areas : () => void,
    x_idx : number,
    y_idx : number,
    item : {
        type : string,
        selected : boolean,
        canMove : boolean,
        color : "white" | "black" | ""
    },
    turn : "white" | "black",
    color : "white" | "black" | "",

}

const Pawn : Preact.FunctionComponent<props> = ({
    x_idx,
    y_idx,
    item,
    any_selected,
    clean_up,
    move,
    pawn_move_areas,
    turn,
    color
}) => {
  return (
    <div
    onClick={() => {
        if(turn !== color) return

        if(item.canMove && any_selected()){
            move()
            clean_up()
            return
        }

        if(item.color === color){
            clean_up()
            pawn_move_areas()
            return
        }
        clean_up()
    }}
    className={`
    cursor-pointer
    flex
    items-center
    justify-center
    w-[min(calc(100%_/_8),calc(80vh_/_8))]
    aspect-square
    ${item.canMove ? "border-rose-500 border-2" : ""}
    ${item.selected ? "border-yellow-500 border-2" : ""}
    ${(x_idx + y_idx) % 2 === 0 ? "bg-violet-200" :  "bg-violet-500"}
    `}>

        {(() => {
            const Component = pieces[item.type][item.color];
            return(
                <Component
                className={`
                w-[80%]
                aspect-square
                `}
                />
            )
        })()}

    </div>
  )
}

export default Pawn