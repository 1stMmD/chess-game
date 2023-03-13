import Preact from 'preact'
import { useState } from 'preact/hooks'
import { pieces } from '../utils/pieces';

type props = {
    color : "white" | "black" | "",
    change_piece : (v : "queen"| "bishop" | "rook" | "knight" | string) => void
}

const ChosePiece : Preact.FunctionComponent<props> = ({
    color , change_piece
}) => {
    const [piece , setPiece] = useState<"queen"| "bishop" | "rook" | "knight">("queen");
  return (
    <div
    className={`
    fixed
    w-full
    h-full
    top-0
    left-0
    flex
    items-center
    justify-center
    `}>

        <div
        className={`
        flex
        flex-col
        bg-white
        border-[2px]
        rounded-xl
        p-3
        gap-3
        `}>
            <div
            className={`
            flex
            gap-2

            `}>
            {changeable_pieces.map((item , idx) => {
                return(
                    <span
                    onClick={() => {
                        setPiece((item as "queen"| "bishop" | "rook" | "knight"))
                    }}
                    className={`
                    cursor-pointer
                    relative
                    flex
                    items-center
                    justify-center
                    border-[2px]
                    ${piece === item ? "border-yellow-400" : "border-violet-600"}
                    w-[50px]
                    bg-violet-500
                    aspect-square
                    rounded-lg
                    `}>
                        {(() => {
                            const SVG = pieces[item][(color as "white" | "black")]
                            return<SVG className='w-[80%] aspect-square'></SVG>
                        })()}
                    </span>
                )
            })}
            </div>

            <button
            onClick={() => {
                change_piece(piece)
            }}
            className={`
            bg-violet-500
            uppercase
            font-medium
            text-violet-50
            py-2
            rounded-xl
            `}>
                Confirm
            </button>
        </div>

    </div>
  )
}

export default ChosePiece

const changeable_pieces = [
    "queen",
    "bishop",
    "rook",
    "knight"
]