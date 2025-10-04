import { Routes, Route, Navigate } from 'react-router-dom'
import { XMarkIcon} from "@heroicons/react/24/outline"

import Header from './components/Header'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'

import { UserProvider, useUser } from './contexts/UserContext.jsx'

import './index.css'


const ProtectedRoute = ({ user, children }) => {
	if (!user || !user.isLoggedIn)
		return <Navigate to='/login' />
	return children
}

function App() {

	const user = useUser()

	if (window.innerWidth < 1024) {
		return (
			<div className="h-screen w-screen flex flex-col justify-center items-center bg-black text-white text-center">
				<XMarkIcon className='h-20 aspect-square text-primary' strokeWidth="4" />
				<p className='font-bold text-4xl mt-4'>Sorry</p>
				<p className='text-3xl mt-8'>this game is unavailable on small devices</p>
			</div>
		)
	}

	return (
		<UserProvider>
			<div className="h-screen w-screen flex flex-col">
				<Header />
				<main className='flex-1 max-w-6xl w-full mx-auto'>
					<Routes>
						<Route path="/login" element={<LoginPage />} />
						<Route path="/" index element={
							<ProtectedRoute user={user}>
								<HomePage />
							</ProtectedRoute>
						} />
					</Routes>
				</main>
			</div>
		</UserProvider>
	)
}

export default App
