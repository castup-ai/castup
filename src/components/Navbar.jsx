import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'
import { useState } from 'react'

export default function Navbar() {
    const { user, logout, isAuthenticated } = useAuth()
    const { unreadCount } = useData()
    const location = useLocation()
    const navigate = useNavigate()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    const isActive = (path) => location.pathname === path

    return (
        <nav className="glass-card sticky top-0 z-50 border-b border-white/10">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-gold-500 to-gold-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                            <span className="text-2xl font-bold text-dark-950">C</span>
                        </div>
                        <span className="text-2xl font-display font-bold text-gradient">CastUp</span>
                    </Link>

                    {/* Desktop Navigation */}
                    {isAuthenticated && (
                        <div className="hidden md:flex items-center space-x-1">
                            <NavLink to="/dashboard" active={isActive('/dashboard')}>Dashboard</NavLink>
                            <NavLink to="/explore" active={isActive('/explore')}>Explore</NavLink>
                            {(user?.role === 'Director' || user?.role === 'Producer' || user?.role === 'Casting Agent') && (
                                <NavLink to="/casting" active={isActive('/casting')}>Casting</NavLink>
                            )}
                            <NavLink to="/files" active={isActive('/files')}>Files</NavLink>

                            {/* Notifications */}
                            <Link
                                to="/notifications"
                                className={`relative px-4 py-2 rounded-lg transition-all duration-300 ${isActive('/notifications')
                                        ? 'bg-white/10 text-white'
                                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <span>🔔</span>
                                {unreadCount > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                                        {unreadCount > 9 ? '9+' : unreadCount}
                                    </span>
                                )}
                            </Link>
                        </div>
                    )}

                    {/* Right Side */}
                    <div className="hidden md:flex items-center space-x-4">
                        {isAuthenticated ? (
                            <div className="relative">
                                <button
                                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                                    className="flex items-center space-x-3 px-4 py-2 glass-card hover:bg-white/10 rounded-lg transition-all duration-300"
                                >
                                    <div className="w-8 h-8 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center font-semibold text-dark-950">
                                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-semibold text-white">{user?.name}</p>
                                        <p className="text-xs text-gray-400">{user?.department}</p>
                                    </div>
                                    <span className="text-gray-400">▼</span>
                                </button>

                                {/* Dropdown */}
                                {profileDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 glass-card rounded-lg shadow-2xl py-2 animate-slide-down">
                                        <Link
                                            to="/portfolio/edit"
                                            className="block px-4 py-2 text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                                            onClick={() => setProfileDropdownOpen(false)}
                                        >
                                            📝 My Portfolio
                                        </Link>
                                        <Link
                                            to="/shared"
                                            className="block px-4 py-2 text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                                            onClick={() => setProfileDropdownOpen(false)}
                                        >
                                            📁 Shared Files
                                        </Link>
                                        <hr className="my-2 border-white/10" />
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-500/10 transition-colors"
                                        >
                                            🚪 Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link to="/login" className="btn-ghost">Login</Link>
                                <Link to="/signup" className="btn-primary">Get Started</Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden mt-4 glass-card rounded-lg p-4 animate-slide-down">
                        {isAuthenticated ? (
                            <div className="space-y-2">
                                <MobileNavLink to="/dashboard" onClick={() => setMobileMenuOpen(false)}>Dashboard</MobileNavLink>
                                <MobileNavLink to="/explore" onClick={() => setMobileMenuOpen(false)}>Explore</MobileNavLink>
                                {(user?.role === 'Director' || user?.role === 'Producer') && (
                                    <MobileNavLink to="/casting" onClick={() => setMobileMenuOpen(false)}>Casting</MobileNavLink>
                                )}
                                <MobileNavLink to="/files" onClick={() => setMobileMenuOpen(false)}>Files</MobileNavLink>
                                <MobileNavLink to="/notifications" onClick={() => setMobileMenuOpen(false)}>
                                    Notifications {unreadCount > 0 && `(${unreadCount})`}
                                </MobileNavLink>
                                <MobileNavLink to="/portfolio/edit" onClick={() => setMobileMenuOpen(false)}>My Portfolio</MobileNavLink>
                                <hr className="my-2 border-white/10" />
                                <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-500/10 rounded transition-colors">
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <Link to="/login" className="block btn-ghost w-full text-center" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                                <Link to="/signup" className="block btn-primary w-full text-center" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    )
}

function NavLink({ to, active, children }) {
    return (
        <Link
            to={to}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${active
                    ? 'bg-white/10 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
        >
            {children}
        </Link>
    )
}

function MobileNavLink({ to, onClick, children }) {
    return (
        <Link
            to={to}
            onClick={onClick}
            className="block px-4 py-2 text-gray-300 hover:bg-white/10 hover:text-white rounded transition-colors"
        >
            {children}
        </Link>
    )
}
