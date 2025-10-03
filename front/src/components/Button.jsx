const Button = ({ children, type = "button", ...props }) => {
  return (
    <button
      type={type}
      {...props}
      className="rounded-md bg-green-950 px-3.5 py-2.5 text-lg font-semibold text-white shadow-xs hover:bg-green-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-950"
    >
      {children}
    </button>
  )
}

export default Button;