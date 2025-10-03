import { Routes, Route, Navigate } from 'react-router-dom'

import Header from './components/Header'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'

import { UserProvider, useUser } from './contexts/UserContext.jsx'

import './index.css'


const ProtectedRoute = ({ user, children }) => {
	if (!user || !user.isLoggedIn)
		return <Navigate to='/login' />

	return <>
		{children}
	</>
}

function App() {

	const user = useUser()

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
