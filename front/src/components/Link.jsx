const Link = ({children, ...props}) => {
  return (
    <a
      {...props}
      className="hover:underline font-semibold"
    >
      {children}
    </a>
  )
}

export default Link
