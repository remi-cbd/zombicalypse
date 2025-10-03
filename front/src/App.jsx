import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
	<div>
		<nav>
			<Link to="/">Home</Link> | <Link to="/about">About</Link>
		</nav>

		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/about" element={<AboutPage />} />
			<Route path="*" element={<h2>404 - Page Not Found</h2>} />
		</Routes>
	</div>
  )
}

export default App
