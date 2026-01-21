import { Link } from 'react-router-dom'

export default function ProfileCard({ profile, showActions = true }) {
    return (
        <div className="glass-card-hover p-6 card-hover-lift group">
            {/* Profile Image */}
            <div className="relative mb-4">
                <div className="w-full h-48 bg-gradient-to-br from-gold-500/20 to-primary-500/20 rounded-lg overflow-hidden">
                    {profile.profileImage ? (
                        <img
                            src={profile.profileImage}
                            alt={profile.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-6xl text-gold-400">
                            👤
                        </div>
                    )}
                </div>
                {profile.verified && (
                    <div className="absolute top-2 right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        ✓
                    </div>
                )}
            </div>

            {/* Profile Info */}
            <div className="space-y-3">
                <div>
                    <h3 className="text-xl font-display font-bold text-white group-hover:text-gold-400 transition-colors">
                        {profile.name}
                    </h3>
                    <p className="text-sm text-gray-400">{profile.role || profile.department}</p>
                    {profile.location && (
                        <p className="text-xs text-gray-500 mt-1">📍 {profile.location}</p>
                    )}
                </div>

                {/* Bio */}
                {profile.bio && (
                    <p className="text-sm text-gray-300 line-clamp-2">
                        {profile.bio}
                    </p>
                )}

                {/* Skills */}
                {profile.skills && profile.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {profile.skills.slice(0, 3).map((skill, index) => (
                            <span key={index} className="badge-primary text-xs">
                                {skill}
                            </span>
                        ))}
                        {profile.skills.length > 3 && (
                            <span className="text-xs text-gray-400">+{profile.skills.length - 3} more</span>
                        )}
                    </div>
                )}

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-400 pt-3 border-t border-white/10">
                    <div className="flex items-center space-x-1">
                        <span>👁️</span>
                        <span>{profile.views || 0} views</span>
                    </div>
                    {profile.experience && (
                        <div className="flex items-center space-x-1">
                            <span>🎬</span>
                            <span>{profile.experience.length || 0} projects</span>
                        </div>
                    )}
                </div>

                {/* Actions */}
                {showActions && (
                    <div className="flex gap-2 pt-2">
                        <Link
                            to={`/portfolio/${profile.id}`}
                            className="flex-1 btn-secondary text-sm py-2"
                        >
                            View Profile
                        </Link>
                        <button className="px-4 py-2 glass-card hover:bg-white/10 rounded-lg transition-colors text-gold-400">
                            ⭐
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
