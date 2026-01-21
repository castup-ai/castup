import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { DataProvider } from './context/DataContext'
import { AIProvider } from './context/AIContext'

// Pages
import LandingPage from './pages/Home/LandingPage'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import AuthCallback from './pages/Auth/AuthCallback'
import Dashboard from './pages/Dashboard/Dashboard'
import CreatePortfolio from './pages/Portfolio/CreatePortfolio'
import ViewPortfolio from './pages/Portfolio/ViewPortfolio'
import EditPortfolio from './pages/Portfolio/EditPortfolio'
import ExplorePage from './pages/Explore/ExplorePage'
import CastingDashboard from './pages/Casting/CastingDashboard'
import CreateCastingCall from './pages/Casting/CreateCastingCall'
import ViewCastingCall from './pages/Casting/ViewCastingCall'
import ScriptLocker from './pages/Files/ScriptLocker'
import SharedFiles from './pages/Files/SharedFiles'
import NotificationsPage from './pages/Notifications/NotificationsPage'

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Protected Route Component
function ProtectedRoute({ children }) {
    const token = localStorage.getItem('token')
    return token ? children : <Navigate to="/login" />
}

function App() {
    return (
        <Router>
            <AuthProvider>
                <DataProvider>
                    <AIProvider>
                        <div className="min-h-screen flex flex-col">
                            <Navbar />
                            <main className="flex-1">
                                <Routes>
                                    {/* Public Routes */}
                                    <Route path="/" element={<LandingPage />} />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/signup" element={<Signup />} />
                                    <Route path="/auth/callback" element={<AuthCallback />} />

                                    {/* Protected Routes */}
                                    <Route path="/dashboard" element={
                                        <ProtectedRoute><Dashboard /></ProtectedRoute>
                                    } />
                                    <Route path="/portfolio/create" element={
                                        <ProtectedRoute><CreatePortfolio /></ProtectedRoute>
                                    } />
                                    <Route path="/portfolio/:id" element={
                                        <ProtectedRoute><ViewPortfolio /></ProtectedRoute>
                                    } />
                                    <Route path="/portfolio/edit" element={
                                        <ProtectedRoute><EditPortfolio /></ProtectedRoute>
                                    } />
                                    <Route path="/explore" element={
                                        <ProtectedRoute><ExplorePage /></ProtectedRoute>
                                    } />
                                    <Route path="/casting" element={
                                        <ProtectedRoute><CastingDashboard /></ProtectedRoute>
                                    } />
                                    <Route path="/casting/create" element={
                                        <ProtectedRoute><CreateCastingCall /></ProtectedRoute>
                                    } />
                                    <Route path="/casting/:id" element={
                                        <ProtectedRoute><ViewCastingCall /></ProtectedRoute>
                                    } />
                                    <Route path="/files" element={
                                        <ProtectedRoute><ScriptLocker /></ProtectedRoute>
                                    } />
                                    <Route path="/shared" element={
                                        <ProtectedRoute><SharedFiles /></ProtectedRoute>
                                    } />
                                    <Route path="/notifications" element={
                                        <ProtectedRoute><NotificationsPage /></ProtectedRoute>
                                    } />
                                </Routes>
                            </main>
                            <Footer />
                        </div>
                    </AIProvider>
                </DataProvider>
            </AuthProvider>
        </Router>
    )
}

export default App
