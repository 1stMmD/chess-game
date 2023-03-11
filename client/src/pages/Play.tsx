import Table from '../components/Table'
import { useGame } from '../hooks/useGame'
import { socket } from '../signals/SocketSignal'

const Play = () => {
  const { 
    game , 
    functions , 
    color , 
    turn , 
    loading,
    players
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

            {players?.filter(player => player.color !== color)[0].username}
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

            {players?.filter(player => player.color === color)[0].username}
          </span>
        </>
        :
        <span>
          Waiting for the opponent...
        </span>
      }
    </div>
  )
}

export default Play