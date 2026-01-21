import { createContext, useContext, useState, useEffect } from 'react'
import { authAPI } from '../services/api'

const AuthContext = createContext()

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Check for existing session and validate with backend
        const checkAuth = async () => {
            const token = localStorage.getItem('token')

            if (token) {
                try {
                    const response = await authAPI.getCurrentUser()
                    setUser(response.data.user)
                } catch (error) {
                    console.error('Session expired:', error)
                    localStorage.removeItem('token')
                    localStorage.removeItem('castup_user')
                }
            }
            setLoading(false)
        }

        checkAuth()
    }, [])

    const login = async (email, password) => {
        try {
            const response = await authAPI.login({ email, password })
            const { user: userData, token } = response.data

            // Store token and user data
            localStorage.setItem('token', token)
            localStorage.setItem('castup_user', JSON.stringify(userData))
            setUser(userData)

            return { success: true, user: userData }
        } catch (error) {
            console.error('Login error:', error)
            return {
                success: false,
                error: error.response?.data?.error || 'Login failed. Please check your credentials.'
            }
        }
    }

    const signup = async (email, password, name, department) => {
        try {
            const response = await authAPI.signup({ email, password, name, department })
            const { user: userData, token } = response.data

            // Store token and user data
            localStorage.setItem('token', token)
            localStorage.setItem('castup_user', JSON.stringify(userData))
            setUser(userData)

            return { success: true, user: userData }
        } catch (error) {
            console.error('Signup error:', error)
            return {
                success: false,
                error: error.response?.data?.error || 'Signup failed. Please try again.'
            }
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('castup_user')
        setUser(null)
    }

    const updateUser = (updates) => {
        const updatedUser = { ...user, ...updates }
        localStorage.setItem('castup_user', JSON.stringify(updatedUser))
        setUser(updatedUser)
    }

    const value = {
        user,
        loading,
        login,
        signup,
        logout,
        updateUser,
        isAuthenticated: !!user,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
