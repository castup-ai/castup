import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { useAuth } from '../../context/AuthContext'
import LoadingSpinner from '../../components/LoadingSpinner'

export default function ViewPortfolio() {
    const { id } = useParams()
    const { getProfileById } = useData()
    const { user } = useAuth()
    const profile = getProfileById(id)

    const [connectionStatus, setConnectionStatus] = useState('none') // 'none', 'pending', 'connected'
    const [isSaved, setIsSaved] = useState(false)

    if (!profile) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="glass-card p-12 text-center">
                    <div className="text-6xl mb-4">❌</div>
                    <h2 className="text-2xl font-bold mb-2">Profile Not Found</h2>
                    <p className="text-gray-400">The profile you're looking for doesn't exist.</p>
                </div>
            </div>
        )
    }

    const skillsList = Array.isArray(profile.skills) ? profile.skills : []
    const socialLinks = profile.socialLinks || {}

    // Check if viewing own profile
    const isOwnProfile = user && user.id === profile.id

    const handleConnect = () => {
        if (connectionStatus === 'none') {
            setConnectionStatus('pending')
            // TODO: Implement backend API call to send connection request
            // For now, just show pending state
            alert('Connection request sent! 🤝')
        } else if (connectionStatus === 'connected') {
            // Already connected
            alert('You are already connected with this user')
        }
    }

    const handleSave = () => {
        setIsSaved(!isSaved)
        if (!isSaved) {
            alert('Profile saved to your favorites! ⭐')
        } else {
            alert('Profile removed from favorites')
        }
    }

    const getConnectButtonText = () => {
        switch (connectionStatus) {
            case 'pending':
                return '⏳ Pending'
            case 'connected':
                return '✓ Connected'
            default:
                return 'Connect'
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header Banner */}
            <div className="glass-card p-8 md:p-12 mb-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-gold-500/10 to-primary-500/10" />
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    <div className="w-32 h-32 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center text-5xl font-bold text-dark-950 shadow-2xl">
                        {profile.profileImage ? (
                            <img src={profile.profileImage} alt={profile.name} className="w-full h-full object-cover rounded-full" />
                        ) : (
                            profile.name?.charAt(0) || '?'
                        )}
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-4xl font-display font-bold mb-2 text-white">{profile.name}</h1>
                        <p className="text-xl text-gold-400 mb-2">{profile.role}</p>
                        {profile.location && (
                            <p className="text-gray-400 mb-4">📍 {profile.location}</p>
                        )}
                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                            <div className="flex items-center space-x-2 text-gray-300">
                                <span>👁️</span>
                                <span>{profile.views || 0} views</span>
                            </div>
                            {profile.experience && (
                                <div className="flex items-center space-x-2 text-gray-300">
                                    <span>🎬</span>
                                    <span>{profile.experience.length || 0} projects</span>
                                </div>
                            )}
                            {profile.verified && (
                                <div className="flex items-center space-x-2 text-green-400">
                                    <span>✓</span>
                                    <span>Verified</span>
                                </div>
                            )}
                        </div>
                    </div>
                    {!isOwnProfile ? (
                        <div className="flex gap-3">
                            <button
                                onClick={handleConnect}
                                disabled={connectionStatus === 'pending'}
                                className={`btn-primary ${connectionStatus === 'pending' ? 'opacity-60 cursor-not-allowed' : ''} ${connectionStatus === 'connected' ? 'bg-green-600 hover:bg-green-700' : ''}`}
                            >
                                {getConnectButtonText()}
                            </button>
                            <button
                                onClick={handleSave}
                                className={`btn-secondary ${isSaved ? 'bg-gold-500/20 text-gold-400' : ''}`}
                            >
                                {isSaved ? '⭐ Saved' : '⭐ Save'}
                            </button>
                        </div>
                    ) : (
                        <div className="text-center md:text-right">
                            <p className="text-sm text-gray-400 mb-2">Your Profile</p>
                            <div className="flex items-center justify-center md:justify-end gap-4">
                                <div className="glass-card px-4 py-2 rounded-lg">
                                    <span className="text-gold-400 font-bold">0</span>
                                    <span className="text-gray-400 text-sm ml-2">Connections</span>
                                </div>
                                <div className="glass-card px-4 py-2 rounded-lg">
                                    <span className="text-gold-400 font-bold">{profile.views || 0}</span>
                                    <span className="text-gray-400 text-sm ml-2">Profile Views</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* My Connections Section - Only show on own profile */}
                    {isOwnProfile && (
                        <div className="glass-card p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-display font-bold">My Connections</h2>
                                <span className="text-sm text-gray-400">0 connections</span>
                            </div>
                            <div className="text-center py-8">
                                <div className="text-6xl mb-4">🤝</div>
                                <p className="text-gray-400 mb-4">You haven't connected with anyone yet</p>
                                <p className="text-sm text-gray-500">
                                    Visit other users' profiles and click "Connect" to build your network
                                </p>
                            </div>
                            {/* TODO: When backend is ready, show actual connections like this:
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {connections.map(connection => (
                                    <div key={connection.id} className="glass-card p-4 text-center hover:bg-white/5 cursor-pointer transition-colors">
                                        <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center text-2xl font-bold text-dark-950 mx-auto mb-2">
                                            {connection.name?.charAt(0)}
                                        </div>
                                        <p className="font-semibold text-sm">{connection.name}</p>
                                        <p className="text-xs text-gray-400">{connection.role}</p>
                                    </div>
                                ))}
                            </div>
                            */}
                        </div>
                    )}

                    {/* Bio */}
                    <div className="glass-card p-6">
                        <h2 className="text-2xl font-display font-bold mb-4">About</h2>
                        <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                            {profile.bio || 'No bio provided.'}
                        </p>
                    </div>

                    {/* Skills */}
                    {skillsList.length > 0 && (
                        <div className="glass-card p-6">
                            <h2 className="text-2xl font-display font-bold mb-4">Skills & Expertise</h2>
                            <div className="flex flex-wrap gap-3">
                                {skillsList.map((skill, index) => (
                                    <span key={index} className="badge-primary px-4 py-2">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Experience */}
                    {profile.experience && (
                        <div className="glass-card p-6">
                            <h2 className="text-2xl font-display font-bold mb-4">Experience</h2>
                            <div className="text-gray-300 whitespace-pre-line">
                                {profile.experience}
                            </div>
                        </div>
                    )}

                    {/* Portfolio/Media */}
                    <div className="glass-card p-6">
                        <h2 className="text-2xl font-display font-bold mb-4">Portfolio & Media</h2>
                        {profile.demoReel || profile.portfolio ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="aspect-video bg-gradient-to-br from-gold-500/20 to-primary-500/20 rounded-lg flex items-center justify-center text-6xl">
                                    🎥
                                </div>
                                <div className="aspect-video bg-gradient-to-br from-gold-500/20 to-primary-500/20 rounded-lg flex items-center justify-center text-6xl">
                                    📸
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-400 text-center py-8">No media available</p>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Contact Info */}
                    <div className="glass-card p-6">
                        <h3 className="font-bold text-white mb-4">Contact & Social</h3>
                        <div className="space-y-3">
                            {socialLinks.imdb && (
                                <a href={socialLinks.imdb} target="_blank" rel="noopener noreferrer"
                                    className="block p-3 glass-card hover:bg-white/10 rounded-lg transition-colors">
                                    <span className="text-gold-400">🎬 IMDb</span>
                                </a>
                            )}
                            {socialLinks.youtube && (
                                <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer"
                                    className="block p-3 glass-card hover:bg-white/10 rounded-lg transition-colors">
                                    <span className="text-red-400">▶️ YouTube</span>
                                </a>
                            )}
                            {socialLinks.instagram && (
                                <a href={`https://instagram.com/${socialLinks.instagram}`} target="_blank" rel="noopener noreferrer"
                                    className="block p-3 glass-card hover:bg-white/10 rounded-lg transition-colors">
                                    <span className="text-pink-400">📸 Instagram</span>
                                </a>
                            )}
                            {!socialLinks.imdb && !socialLinks.youtube && !socialLinks.instagram && (
                                <p className="text-gray-400 text-sm text-center py-4">No social links available</p>
                            )}
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="glass-card p-6">
                        <h3 className="font-bold text-white mb-4">Profile Stats</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 glass-card rounded-lg">
                                <span className="text-gray-400">Profile Views</span>
                                <span className="font-bold text-gold-400">{profile.views || 0}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 glass-card rounded-lg">
                                <span className="text-gray-400">Connections</span>
                                <span className="font-bold text-gold-400">0</span>
                            </div>
                            <div className="flex items-center justify-between p-3 glass-card rounded-lg">
                                <span className="text-gray-400">Rating</span>
                                <span className="font-bold text-gold-400">⭐ {profile.rating || 0}/5</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
