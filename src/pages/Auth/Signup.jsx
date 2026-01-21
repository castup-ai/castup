import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Input from '../../components/Input'
import Button from '../../components/Button'

const DEPARTMENTS = [
    { value: 'Actor', label: '🎭 Actor', icon: '🎭' },
    { value: 'Actress', label: '🎭 Actress', icon: '🎭' },
    { value: 'Director', label: '🎬 Director', icon: '🎬' },
    { value: 'Producer', label: '🎞️ Producer', icon: '🎞️' },
    { value: 'Editor', label: '✂️ Editor', icon: '✂️' },
    { value: 'Cinematographer', label: '📷 Cinematographer', icon: '📷' },
    { value: 'Sound Engineer', label: '🎵 Sound Engineer', icon: '🎵' },
    { value: 'Casting Agent', label: '📋 Casting Agent', icon: '📋' },
    { value: 'Freelancer', label: '💼 Freelancer', icon: '💼' },
    { value: 'Film Student', label: '🎓 Film Student', icon: '🎓' },
]

export default function Signup() {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        department: '',
    })
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const { signup } = useAuth()
    const navigate = useNavigate()

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value })
        if (errors[field]) {
            setErrors({ ...errors, [field]: '' })
        }
    }

    const validateStep1 = () => {
        const newErrors = {}
        if (!formData.name) newErrors.name = 'Name is required'
        if (!formData.email) newErrors.email = 'Email is required'
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
        if (!formData.password) newErrors.password = 'Password is required'
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match'
        }
        return newErrors
    }

    const handleStep1Submit = (e) => {
        e.preventDefault()
        const newErrors = validateStep1()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }
        setStep(2)
    }

    const handleStep2Submit = async (e) => {
        e.preventDefault()
        if (!formData.department) {
            setErrors({ department: 'Please select your department' })
            return
        }

        setLoading(true)
        const result = await signup(formData.email, formData.password, formData.name, formData.department)
        setLoading(false)
        if (result.success) {
            navigate('/portfolio/create')
        } else {
            setErrors({ department: result.error || 'Signup failed' })
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-2xl">
                {/* Progress Indicator */}
                <div className="mb-8">
                    <div className="flex items-center justify-between max-w-md mx-auto">
                        <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-gold-500' : 'text-gray-600'}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-gold-500 text-dark-950' : 'bg-dark-700 text-gray-400'
                                }`}>
                                {step > 1 ? '✓' : '1'}
                            </div>
                            <span className="text-sm font-medium hidden sm:block">Account</span>
                        </div>
                        <div className="flex-1 h-1 mx-4 bg-dark-700 rounded">
                            <div className={`h-full rounded transition-all duration-500 ${step >= 2 ? 'bg-gold-500 w-full' : 'w-0'
                                }`} />
                        </div>
                        <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-gold-500' : 'text-gray-600'}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-gold-500 text-dark-950' : 'bg-dark-700 text-gray-400'
                                }`}>
                                2
                            </div>
                            <span className="text-sm font-medium hidden sm:block">Department</span>
                        </div>
                    </div>
                </div>

                {/* Header */}
                <div className="text-center mb-8 animate-slide-down">
                    <h1 className="text-3xl font-display font-bold mb-2">Join CastUp Today</h1>
                    <p className="text-gray-400">
                        {step === 1 ? 'Create your account to get started' : 'Tell us about your role in the film industry'}
                    </p>
                </div>

                {/* Step 1: Account Details */}
                {step === 1 && (
                    <div className="glass-card p-8 rounded-2xl animate-scale-in">
                        {/* Social Auth Buttons */}
                        <div className="space-y-3 mb-6">
                            <button
                                type="button"
                                onClick={() => window.location.href = 'http://localhost:5000/api/auth/google'}
                                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white hover:bg-gray-100 text-gray-900 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Continue with Google
                            </button>

                            <button
                                type="button"
                                onClick={() => window.location.href = 'http://localhost:5000/api/auth/facebook'}
                                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#1877F2] hover:bg-[#166FE5] text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                                Continue with Facebook
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/10"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-dark-900 text-gray-400">Or continue with email</span>
                            </div>
                        </div>

                        <form onSubmit={handleStep1Submit} className="space-y-6">
                            <Input
                                label="Full Name"
                                value={formData.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                placeholder="John Doe"
                                error={errors.name}
                                icon="👤"
                            />

                            <Input
                                label="Email Address"
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                placeholder="your.email@example.com"
                                error={errors.email}
                                icon="📧"
                            />

                            <Input
                                label="Password"
                                type="password"
                                value={formData.password}
                                onChange={(e) => handleChange('password', e.target.value)}
                                placeholder="••••••••"
                                error={errors.password}
                                icon="🔒"
                            />

                            <Input
                                label="Confirm Password"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                                placeholder="••••••••"
                                error={errors.confirmPassword}
                                icon="🔒"
                            />

                            <Button type="submit" variant="primary" className="w-full">
                                Continue to Department Selection →
                            </Button>
                        </form>

                        <div className="mt-6 text-center text-sm text-gray-400">
                            Already have an account?{' '}
                            <Link to="/login" className="text-gold-400 hover:text-gold-300 font-semibold transition-colors">
                                Sign in
                            </Link>
                        </div>
                    </div>
                )}

                {/* Step 2: Department Selection */}
                {step === 2 && (
                    <div className="glass-card p-8 rounded-2xl animate-scale-in">
                        <form onSubmit={handleStep2Submit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-4">
                                    Select Your Department
                                </label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {DEPARTMENTS.map((dept) => (
                                        <button
                                            key={dept.value}
                                            type="button"
                                            onClick={() => handleChange('department', dept.value)}
                                            className={`p-4 rounded-lg border-2 transition-all duration-300 ${formData.department === dept.value
                                                ? 'border-gold-500 bg-gold-500/10 text-gold-400 scale-105'
                                                : 'border-white/10 bg-white/5 text-gray-300 hover:border-gold-500/50 hover:bg-white/10'
                                                }`}
                                        >
                                            <div className="text-3xl mb-2">{dept.icon}</div>
                                            <div className="text-sm font-semibold">{dept.value}</div>
                                        </button>
                                    ))}
                                </div>
                                {errors.department && (
                                    <p className="text-sm text-red-400 mt-2">{errors.department}</p>
                                )}
                            </div>

                            <div className="flex gap-4">
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={() => setStep(1)}
                                    className="flex-1"
                                >
                                    ← Back
                                </Button>
                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="flex-1"
                                    loading={loading}
                                >
                                    Create Account
                                </Button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}
