import Preact from 'preact'
import { useState } from 'preact/hooks'
import Input from '../components/ui/Input'
import PasswordInput from '../components/ui/PasswordInput'
import { io } from 'socket.io-client'
import { changeSocket } from '../signals/SocketSignal'
import { useNavigate } from 'react-router'

const Auth = () => {
  const [username , setUsername] = useState("")
  const [password , setPassword] = useState("")

  const navigate = useNavigate()

  return (
    <div
    className={`
    flex
    flex-col
    gap-2
    `}>

      <form
      onSubmit={(e) => {
        e.preventDefault()

        const socket = io(import.meta.env.VITE_SOCKET_URL,{
          auth : {
              username,
              password
          }
      })

      socket.on("connect",() => {
        changeSocket({
          socket,
          pending : false,
          error : null
        })
        navigate("/")
      })

      }}
      className={`
      flex
      flex-col
      gap-3
      `}>
        <div
        className={`
        flex
        flex-col
        `}>
          <span>
            Name : 
          </span>
          <Input
          value={username}
          setValue={(value) => {
            setUsername(value)
          }}
          />
        </div>

        <div>
          <span>
            Password :
          </span>
          <PasswordInput
          value={password}
          setValue={(value) => {
            setPassword(value)
          }}
          />
        </div>

        <button
        className={`
        bg-violet-500
        text-violet-100
        font-medium
        uppercase
        p-2
        rounded-xl
        `}>
          continue
        </button>

      </form>

    </div>
  )
}

export default Auth