import Preact from 'preact'

type props = {
    value : string,
    setValue : (v : string) => void
}

const Input : React.FunctionComponent<props> = ({
    setValue,
    value
}) => {
  return (
    <input
    value={value}
    onChange={(e : any) => {
        setValue(e.target.value)
    }}
    className={`
    w-[300px]
    py-2
    px-3
    rounded-xl
    bg-neutral-100
    border-[2px]
    text-neutral-700
    focus:outline-none
    `}
    >

    </input>
  )
}

export default Input