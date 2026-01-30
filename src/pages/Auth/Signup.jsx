import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Video, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

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
];

export default function Signup() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        department: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
        if (errors[field]) {
            setErrors({ ...errors, [field]: '' });
        }
    };

    const validateStep1 = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        return newErrors;
    };

    const handleStep1Submit = (e) => {
        e.preventDefault();
        const newErrors = validateStep1();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setStep(2);
    };

    const handleStep2Submit = async (e) => {
        e.preventDefault();
        if (!formData.department) {
            setErrors({ department: 'Please select your department' });
            return;
        }

        setLoading(true);
        const result = await signup(formData.email, formData.password, formData.name, formData.department);
        setLoading(false);
        if (result.success) {
            navigate('/portfolio/create');
        } else {
            setErrors({ department: result.error || 'Signup failed' });
        }
    };

    return (
        <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                {/* Logo/Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF7A5A] to-[#FFC107] flex items-center justify-center">
                            <Video className="w-7 h-7 text-white" />
                        </div>
                        <span className="text-[#3C3C3C] text-2xl font-bold">CastUp</span>
                    </div>
                    <h1 className="text-3xl text-[#3C3C3C] font-bold mb-2">
                        Create Your Account
                    </h1>
                    <p className="text-[#6B6B6B]">
                        Join the future of film networking
                    </p>
                </div>

                {/* Progress Indicator */}
                <div className="mb-8">
                    <div className="flex items-center justify-between max-w-md mx-auto">
                        <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-[#FF7A5A]' : 'text-[#6B6B6B]'}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-[#FF7A5A] text-white' : 'bg-gray-200 text-[#6B6B6B]'
                                }`}>
                                {step > 1 ? '✓' : '1'}
                            </div>
                            <span className="text-sm font-medium hidden sm:block">Account</span>
                        </div>
                        <div className="flex-1 h-1 mx-4 bg-gray-200 rounded">
                            <div className={`h-full rounded transition-all duration-500 ${step >= 2 ? 'bg-[#FF7A5A] w-full' : 'w-0'
                                }`} />
                        </div>
                        <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-[#FF7A5A]' : 'text-[#6B6B6B]'}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-[#FF7A5A] text-white' : 'bg-gray-200 text-[#6B6B6B]'
                                }`}>
                                2
                            </div>
                            <span className="text-sm font-medium hidden sm:block">Department</span>
                        </div>
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {step === 1 && (
                        <form onSubmit={handleStep1Submit} className="space-y-5">
                            {/* Full Name */}
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6B6B]" />
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="Enter your full name"
                                        value={formData.name}
                                        onChange={(e) => handleChange('name', e.target.value)}
                                        className="pl-11"
                                    />
                                </div>
                                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6B6B]" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="your@email.com"
                                        value={formData.email}
                                        onChange={(e) => handleChange('email', e.target.value)}
                                        className="pl-11"
                                    />
                                </div>
                                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6B6B]" />
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Create a strong password"
                                        value={formData.password}
                                        onChange={(e) => handleChange('password', e.target.value)}
                                        className="pl-11 pr-11"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6B6B] hover:text-[#3C3C3C]"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6B6B]" />
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="Confirm your password"
                                        value={formData.confirmPassword}
                                        onChange={(e) => handleChange('confirmPassword', e.target.value)}
                                        className="pl-11"
                                    />
                                </div>
                                {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
                            </div>

                            <Button type="submit" className="w-full mt-6">
                                Continue
                            </Button>
                        </form>
                    )}

                    {step === 2 && (
                        <form onSubmit={handleStep2Submit} className="space-y-6">
                            <div>
                                <Label className="mb-4 block">Choose Your Primary Role</Label>
                                <div className="grid grid-cols-2 gap-3">
                                    {DEPARTMENTS.map((dept) => (
                                        <button
                                            key={dept.value}
                                            type="button"
                                            onClick={() => handleChange('department', dept.value)}
                                            className={`p-4 rounded-xl border-2 transition-all text-left ${formData.department === dept.value
                                                    ? 'border-[#FF7A5A] bg-[#FFF8F0]'
                                                    : 'border-gray-200 hover:border-[#FF7A5A]/50'
                                                }`}
                                        >
                                            <div className="text-2xl mb-1">{dept.icon}</div>
                                            <div className="text-sm font-medium text-[#3C3C3C]">
                                                {dept.value}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                {errors.department && <p className="text-sm text-red-500 mt-2">{errors.department}</p>}
                            </div>

                            <div className="flex gap-3">
                                <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                                    Back
                                </Button>
                                <Button type="submit" disabled={loading} className="flex-1">
                                    {loading ? 'Creating Account...' : 'Sign Up'}
                                </Button>
                            </div>
                        </form>
                    )}

                    {/* Login Link */}
                    <div className="mt-6 text-center">
                        <span className="text-[#6B6B6B]">Already have an account? </span>
                        <Link to="/login" className="text-[#FF7A5A] hover:text-[#FF6A4A] font-semibold">
                            Log In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
