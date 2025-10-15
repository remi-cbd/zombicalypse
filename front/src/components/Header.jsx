import { useLocation } from "react-router-dom"
import Link from "./Link"
import LanguageSwitcher from "./LanguageSwitcher"

const Header = () => {
  const { pathname } = useLocation()

  if (pathname === "/login")
    return null

  return (
    <header className="mx-auto">
      <nav className=" flex justify-between gap-8 py-4">
        {/* <Link href="#">Home</Link>
        <Link href="#">Leaderboard</Link>
        <Link href="#">About</Link> */}
        <LanguageSwitcher />
      </nav>
    </header>
  )
}

export default Header
