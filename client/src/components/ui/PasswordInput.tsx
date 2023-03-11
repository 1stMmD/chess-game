import Preact from 'preact'
import { useState } from 'preact/hooks'
import { AiOutlineEyeInvisible , AiOutlineEye } from "react-icons/ai"

type props = {
    value : string,
    setValue : (v : string) => void
}

const PasswordInput : React.FunctionComponent<props> = ({
    setValue,
    value
}) => {
    const [show, setShow] = useState<boolean>(false)
  return (
    <div
    className={`
    flex
    justify-center
    w-[300px]
    py-2
    px-3
    rounded-xl
    bg-neutral-100
    border-[2px]
    `}
    >
        <input
        type={show ? "text" : "password"}
        className={`
        bg-transparent
        w-[100%]
        text-neutral-700
        focus:outline-none
        `}
        value={value}
        onChange={(e : any) => {
            setValue(e.target.value)
        }}
        />

        <span
        onClick={() => {
            setShow(prev => !prev)
        }}
        className={`
        text-neutral-500
        flex-shrink-0
        text-[1.5rem]
        cursor-pointer
        `}>
            {
                show ? 
                <AiOutlineEye/>
                :
                <AiOutlineEyeInvisible/>
            }
        </span>

    </div>
  )
}

export default PasswordInput