const Button = ({ children, type = "button", ...props }) => {
  return (
    <button
      type={type}
      {...props}
      className="rounded-md bg-secondary px-3.5 py-2.5 text-lg font-semibold text-white shadow-xs hover:bg-secondary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary transition-colors duration-150"
    >
      {children}
    </button>
  )
}

export default Button
