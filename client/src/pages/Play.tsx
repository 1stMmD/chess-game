import { useNavigate } from 'react-router'
import Table from '../components/Table'
import { useGame } from '../hooks/useGame'
import { socket } from '../signals/SocketSignal'
const Play = () => {
  const navigate = useNavigate()
  
  const { 
    game , 
    functions , 
    color , 
    turn , 
    loading,
    players,
    winner
  } = useGame()


  return (
    <div
    className={`
    flex
    flex-col
    gap-3
    `}>

      { !loading ?
        <>
          <span
          className={`
          self-end
          flex
          items-center
          flex-row-reverse
          gap-3
          text-neutral-700
          font-medium
          `}>
            <span
            className={`
            flex
            flex-col
            w-[50px]
            border-[2px]
            rounded-xl
            aspect-square
            bg-neutral-100
            `}/>

            {players?.filter(player => player.color !== color)[0]?.username}
          </span>

          <Table
          game={game}
          functions={functions}
          color={color}
          turn={turn}
          />

          <span
          className={`
          self-start
          flex
          items-center
          gap-3
          text-neutral-700
          font-medium
          `}>

            <span
            className={`
            flex
            flex-col
            w-[50px]
            border-[2px]
            rounded-xl
            aspect-square
            bg-neutral-100
            `}/>

            {players?.filter(player => player.color === color)[0]?.username}
          </span>
        </>
        :
        <span
        className={`
        font-medium
        text-neutral-600
        `}>
          Waiting for the opponent...
        </span>
      }

      {!!winner ? 
        <div
        className={`
        top-0
        left-0
        fixed
        flex
        w-full
        h-full
        items-center
        justify-center
        `}>

          <div
          className={`
          bg-white
          border-[2px]
          rounded-xl
          p-4
          gap-3
          flex
          flex-col
          items-center
          justify-center
          `}>
            <span
            className={`
            text-[3rem]
            font-bold
            mb-3
            ${winner === color ? "text-yellow-400" : "text-neutral-600"}
            `}>
              {winner === color ? "Victory" : "Defeat"}
            </span>

            <button
            onClick={() => {
              functions.clear_game()
              socket?.value?.emit("room:create","",() => {})
            }}
            className={`
            w-[300px]
            transition-colors
            bg-violet-500
            border-violet-500
            hover:bg-violet-600
            hover:border-violet-600
            border-[2px]
            text-violet-50
            font-medium
            py-2
            px-3
            rounded-xl
            `}>
              Find new opponent
            </button>

            <button
            onClick={() => {
              navigate("/")
            }}
            className={`
            w-[300px]
            transition-colors
            text-violet-500
            border-violet-500
            hover:bg-violet-500
            hover:text-white
            border-[2px]
            font-medium
            py-2
            px-3
            rounded-xl
            `}>
              Return to home
            </button>

          </div>

        </div>
        :
        <></>
      }
    </div>
  )
}

export default Play