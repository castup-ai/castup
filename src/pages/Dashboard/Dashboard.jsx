import { useAuth } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'
import { useAI } from '../../context/AIContext'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ProfileCard from '../../components/ProfileCard'

export default function Dashboard() {
    const { user } = useAuth()
    const { profiles, castingCalls, notifications } = useData()
    const { recommendOpportunities, analyzeProfile } = useAI()
    const [userProfile, setUserProfile] = useState(null)
    const [recommendations, setRecommendations] = useState([])

    useEffect(() => {
        // Find user's profile
        const profile = profiles.find(p => p.userId === user?.id)
        setUserProfile(profile)

        // Get AI recommendations if profile exists
        if (profile) {
            const recs = recommendOpportunities(profile, castingCalls)
            setRecommendations(recs.slice(0, 3))
        }
    }, [profiles, user, castingCalls])

    const stats = [
        { label: 'Profile Views', value: userProfile?.views || 0, icon: '👁️', color: 'from-blue-500 to-blue-600' },
        { label: 'Active Casting Calls', value: castingCalls.filter(c => c.status === 'Open').length, icon: '🎬', color: 'from-gold-500 to-gold-600' },
        { label: 'Notifications', value: notifications.filter(n => !n.read).length, icon: '🔔', color: 'from-primary-500 to-primary-600' },
        { label: 'Your Projects', value: userProfile?.experience?.length || 0, icon: '📁', color: 'from-green-500 to-green-600' },
    ]

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Welcome Header */}
            <div className="mb-8 animate-slide-down">
                <h1 className="text-4xl font-display font-bold mb-2">
                    Welcome back, <span className="text-gradient">{user?.name}!</span>
                </h1>
                <p className="text-gray-400">Here's what's happening with your cinema career today</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="glass-card-hover p-6 animate-scale-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center text-2xl`}>
                                {stat.icon}
                            </div>
                            <div className="text-3xl font-bold text-gradient">{stat.value}</div>
                        </div>
                        <div className="text-sm text-gray-400">{stat.label}</div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Profile Status */}
                    {!userProfile && (
                        <div className="glass-card p-6 border-l-4 border-gold-500 animate-slide-up">
                            <div className="flex items-start space-x-4">
                                <div className="text-3xl">⚠️</div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-white mb-2">Complete Your Profile</h3>
                                    <p className="text-gray-400 mb-4">
                                        Create your portfolio to get discovered by casting directors and find opportunities that match your skills.
                                    </p>
                                    <Link to="/portfolio/create" className="btn-primary inline-block">
                                        Create Portfolio Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* AI Recommendations */}
                    {recommendations.length > 0 && (
                        <div className="glass-card p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-display font-bold">
                                    🤖 AI Recommended for You
                                </h2>
                                <Link to="/casting" className="text-gold-400 hover:text-gold-300 text-sm font-medium">
                                    View All →
                                </Link>
                            </div>
                            <div className="space-y-4">
                                {recommendations.map((rec) => (
                                    <div key={rec.id} className="glass-card-hover p-4 flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="font-bold text-white mb-1">{rec.title || rec.projectTitle}</h3>
                                            <p className="text-sm text-gray-400 mb-2">{rec.role || rec.targetRole}</p>
                                            <div className="flex items-center space-x-2">
                                                <span className="badge-primary text-xs">{rec.matchScore}% Match</span>
                                                <span className="text-xs text-gray-500">{rec.reason}</span>
                                            </div>
                                        </div>
                                        <Link to={`/casting/${rec.id}`} className="btn-secondary text-sm px-4 py-2">
                                            View
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Recent Activity */}
                    <div className="glass-card p-6">
                        <h2 className="text-2xl font-display font-bold mb-6">Recent Activity</h2>
                        <div className="space-y-4">
                            {notifications.slice(0, 5).map((notification) => (
                                <div key={notification.id} className="flex items-start space-x-4 p-3 glass-card rounded-lg">
                                    <div className="text-2xl mt-1">
                                        {notification.type === 'match' ? '🎯' :
                                            notification.type === 'application' ? '📝' :
                                                notification.type === 'view' ? '👁️' : '🔔'}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-gray-200">{notification.message}</p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {new Date(notification.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    {!notification.read && (
                                        <div className="w-2 h-2 bg-gold-500 rounded-full mt-2" />
                                    )}
                                </div>
                            ))}
                            {notifications.length === 0 && (
                                <p className="text-center text-gray-400 py-8">No recent activity</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                    {/* Quick Actions */}
                    <div className="glass-card p-6">
                        <h3 className="text-xl font-displayfont-bold mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <Link to="/portfolio/edit" className="block btn-secondary text-center">
                                📝 Edit Portfolio
                            </Link>
                            <Link to="/explore" className="block btn-secondary text-center">
                                🔍 Explore Talent
                            </Link>
                            {(user?.role === 'Director' || user?.role === 'Producer') && (
                                <Link to="/casting/create" className="block btn-secondary text-center">
                                    ➕ Create Casting Call
                                </Link>
                            )}
                            <Link to="/files" className="block btn-secondary text-center">
                                📁 My Files
                            </Link>
                        </div>
                    </div>

                    {/* Featured Profiles */}
                    <div className="glass-card p-6">
                        <h3 className="text-xl font-display font-bold mb-4">Featured Profiles</h3>
                        <div className="space-y-4">
                            {profiles.slice(0, 2).map((profile) => (
                                <div key={profile.id} className="glass-card p-4">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center font-bold text-dark-950">
                                            {profile.name?.charAt(0) || '?'}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-white truncate">{profile.name}</h4>
                                            <p className="text-xs text-gray-400">{profile.role}</p>
                                        </div>
                                    </div>
                                    <Link
                                        to={`/portfolio/${profile.id}`}
                                        className="block text-xs text-gold-400 hover:text-gold-300 transition-colors"
                                    >
                                        View Profile →
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
