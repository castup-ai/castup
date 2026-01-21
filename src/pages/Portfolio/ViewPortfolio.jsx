import { useParams } from 'react-router-dom'
import { useData } from '../../context/DataContext'
import LoadingSpinner from '../../components/LoadingSpinner'

export default function ViewPortfolio() {
    const { id } = useParams()
    const { getProfileById } = useData()
    const profile = getProfileById(id)

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
                    <div className="flex gap-3">
                        <button className="btn-primary">Connect</button>
                        <button className="btn-secondary">⭐ Save</button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
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
