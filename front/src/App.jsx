import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { XMarkIcon } from "@heroicons/react/24/outline"
import Header from './components/Header'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { useAuth } from './hooks/auth.js'
import './index.css'

const ProtectedRoute = ({ children }) => {
  const { user, isLoggedIn, loading } = useAuth()
  console.log(`user = ${JSON.stringify(user)}`)
  console.log(`isLoggedIn = ${JSON.stringify(isLoggedIn)}`)
  console.log(`loading = ${JSON.stringify(loading)}`)

  if (loading) {
    return <div>The page is LOADING</div>
  }

  if (!isLoggedIn) {
    return <Navigate to='/login' replace />
  }

  return children
}

function App() {
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
    <AuthProvider>
      <div className="h-screen w-screen flex flex-col">
        <Header />
        <main className='flex-1 max-w-6xl w-full mx-auto'>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" index element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </AuthProvider>
  )
}

export default App
