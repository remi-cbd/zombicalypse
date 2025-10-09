import { useId } from "react"

const Input = ({label, name, type = "text", ...props}) => {
  const randomId = useId()

  return (
    <div className="rounded-md bg-white px-3 pt-2.5 pb-1.5 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary">
      <label htmlFor={randomId} className="block text-xs font-medium text-gray-400">
        {label}
      </label>
      <input
        id={randomId}
        name={name}
        type={type}
        {...props}
        className="block w-full text-gray-900 placeholder:text-gray-200 focus:outline-none sm:text-sm/6"
      />
    </div>
  )
}

export default Input;
