import { useState } from 'preact/hooks'
import Table from './components/Table'
import { useSharedGame } from './Hooks/useSharedGame'


const Game = () => {
  const { sharedGame , shareGame , turn } = useSharedGame()

  return (
    <div
    className={`
    flex
    justify-evenly
    items-center
    h-screen
    w-full
    p-2
    gap-2
    `}>
      <Table
      shareGame={(game) =>{ shareGame(game) }}
      sharedGame={sharedGame}
      turn={turn}
      />
    </div>
  )
}

export default Game