import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LandingPage() {
    const { isAuthenticated } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard')
        }
    }, [isAuthenticated, navigate])

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-gold-500 rounded-full blur-3xl animate-pulse-slow" />
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-500 rounded-full blur-3xl animate-pulse-slow delay-1000" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center max-w-5xl mx-auto space-y-8 animate-fade-in">
                        <div className="inline-block mb-4">
                            <span className="badge-primary text-sm px-6 py-2 animate-scale-in">
                                ✨ AI-Powered Platform
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight">
                            Connect. Showcase.{' '}
                            <span className="text-gradient">Transform</span>{' '}
                            Your Cinema Career
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                            CastUp brings together actors, directors, producers, and technicians on an intelligent platform that matches talent with opportunity using cutting-edge AI.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                            <Link to="/signup" className="btn-primary text-lg px-8 py-4 w-full sm:w-auto">
                                🚀 Get Started Free
                            </Link>
                            <Link to="/explore" className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto">
                                🔍 Explore Talent
                            </Link>
                        </div>

                        <div className="flex items-center justify-center gap-8 pt-12 text-sm text-gray-400">
                            <div className="flex items-center gap-2">
                                <span className="text-gold-500 text-2xl">✓</span>
                                <span>10,000+ Professionals</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-gold-500 text-2xl">✓</span>
                                <span>AI-Powered Matching</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-gold-500 text-2xl">✓</span>
                                <span>100% Free to Start</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 container mx-auto px-4">
                <div className="text-center mb-16 animate-slide-up">
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                        Powerful Features for <span className="text-gradient">Film Professionals</span>
                    </h2>
                    <p className="text-xl text-gray-400">Everything you need to succeed in the film industry</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <FeatureCard
                        icon="🎭"
                        title="Dynamic Portfolios"
                        description="Create stunning portfolios with media uploads, demo reels, and professional credentials that wow casting directors."
                    />
                    <FeatureCard
                        icon="🤖"
                        title="AI Smart Matching"
                        description="Our AI analyzes your profile and skills to match you with the perfect casting calls and opportunities."
                    />
                    <FeatureCard
                        icon="🔍"
                        title="Advanced Discovery"
                        description="Find talent or opportunities with intelligent filters, real-time search, and AI-powered recommendations."
                    />
                    <FeatureCard
                        icon="🎬"
                        title="Casting Dashboard"
                        description="Post casting calls, review applications, and manage your projects all in one powerful dashboard."
                    />
                    <FeatureCard
                        icon="🔒"
                        title="Secure File Sharing"
                        description="Share scripts and confidential files securely with token-based access and version control."
                    />
                    <FeatureCard
                        icon="🔔"
                        title="Smart Notifications"
                        description="Never miss an opportunity with real-time alerts for job matches, profile views, and applications."
                    />
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 bg-gradient-to-b from-transparent to-dark-900">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                            How <span className="text-gradient">CastUp</span> Works
                        </h2>
                        <p className="text-xl text-gray-400">Get started in 3 simple steps</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <StepCard
                            number="1"
                            title="Create Your Profile"
                            description="Sign up and choose your department. Build a professional portfolio with your experience, skills, and demo reels."
                        />
                        <StepCard
                            number="2"
                            title="Get AI Recommendations"
                            description="Our AI analyzes your profile and suggests improvements, hashtags, and matching opportunities instantly."
                        />
                        <StepCard
                            number="3"
                            title="Connect & Collaborate"
                            description="Apply to casting calls, share files securely, and network with thousands of film professionals."
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 container mx-auto px-4">
                <div className="glass-card p-12 md:p-16 text-center max-w-4xl mx-auto rounded-3xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-gold-500/10 to-primary-500/10" />
                    <div className="relative z-10 space-y-6">
                        <h2 className="text-3xl md:text-5xl font-display font-bold">
                            Ready to Elevate Your Cinema Career?
                        </h2>
                        <p className="text-xl text-gray-300">
                            Join thousands of professionals already using CastUp to find opportunities and showcase their talent.
                        </p>
                        <div className="pt-4">
                            <Link to="/signup" className="btn-primary text-lg px-10 py-4 inline-block">
                                🎬 Start Your Journey - It's Free!
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

function FeatureCard({ icon, title, description }) {
    return (
        <div className="glass-card-hover p-8 space-y-4 group">
            <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>
            <h3 className="text-2xl font-display font-bold text-white group-hover:text-gold-400 transition-colors">
                {title}
            </h3>
            <p className="text-gray-400 leading-relaxed">
                {description}
            </p>
        </div>
    )
}

function StepCard({ number, title, description }) {
    return (
        <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-gold-500 to-gold-600 rounded-full flex items-center justify-center text-3xl font-bold text-dark-950 mx-auto shadow-2xl shadow-gold-500/50">
                {number}
            </div>
            <h3 className="text-2xl font-display font-bold text-white">
                {title}
            </h3>
            <p className="text-gray-400">
                {description}
            </p>
        </div>
    )
}
