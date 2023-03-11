import Preact from 'preact'
import { useNavigate } from 'react-router'

const Home = () => {
  const navigate = useNavigate()
  return (
    <div
    className={`
    flex
    flex-col
    gap-3
    `}>
        <button
        onClick={() => {
          navigate("/play")
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
          Play with a Stranger
        </button>

        <button
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
          Play with a friend
        </button>
    </div>
  )
}

export default Home