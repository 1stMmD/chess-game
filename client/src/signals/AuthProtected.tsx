import Preact from "preact"
import {socket_pending , socket} from "./SocketSignal"
import { useNavigate , Navigate } from "react-router"
type props = {
    children : Preact.ComponentChildren
}

const AuthProtected : Preact.FunctionComponent<props> = ({
    children
}) => {

  const navigate = useNavigate()

  // if(!socket_pending.value) return(
  //   <div
  //   className={`
  //   flex
  //   w-full
  //   h-full
  //   bg-white
  //   `}>

  //   </div>
  // )
  
  return (
    <>
    { !!socket.value ? children : <Navigate to={"/auth"}/> }
    </>
  )
}

export default AuthProtected