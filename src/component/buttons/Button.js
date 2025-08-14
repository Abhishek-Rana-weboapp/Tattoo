import { cn } from "../../utils/helperFunctions"

const Button = ({children,className, ...props}) => {
  return (
    <button {...props} className={cn(
      "bg-yellow-400 font-bold p-2 rounded-md hover:scale-105 ease-in-out duration-300",className)}>
      {children}
    </button>
  )
}

export default Button
