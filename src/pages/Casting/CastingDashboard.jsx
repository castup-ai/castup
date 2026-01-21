import { useAuth } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'
import { Link } from 'react-router-dom'

export default function CastingDashboard() {
    const { user } = useAuth()
    const { castingCalls } = useData()

    const myCastingCalls = castingCalls.filter(c => c.createdBy === user?.id)
    const availableCastingCalls = castingCalls.filter(c => c.status === 'Open')

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-display font-bold mb-2">
                        <span className="text-gradient">Casting</span> Dashboard
                    </h1>
                    <p className="text-gray-400">Manage your casting calls and discover opportunities</p>
                </div>
                {(user?.role === 'Director' || user?.role === 'Producer' || user?.role === 'Casting Agent') && (
                    <Link to="/casting/create" className="btn-primary">
                        ➕ Create Casting Call
                    </Link>
                )}
            </div>

            {/* My Casting Calls (for Directors/Producers) */}
            {(user?.role === 'Director' || user?.role === 'Producer' || user?.role === 'Casting Agent') && (
                <div className="mb-12">
                    <h2 className="text-2xl font-display font-bold mb-6">My Casting Calls</h2>
                    {myCastingCalls.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {myCastingCalls.map(casting => (
                                <CastingCard key={casting.id} casting={casting} isOwner />
                            ))}
                        </div>
                    ) : (
                        <div className="glass-card p-12 text-center">
                            <div className="text-6xl mb-4">🎬</div>
                            <h3 className="text-xl font-bold mb-2">No Casting Calls Yet</h3>
                            <p className="text-gray-400 mb-4">Create your first casting call to start finding talent</p>
                            <Link to="/casting/create" className="btn-primary inline-block">
                                Create Casting Call
                            </Link>
                        </div>
                    )}
                </div>
            )}

            {/* Available Opportunities */}
            <div>
                <h2 className="text-2xl font-display font-bold mb-6">Available Opportunities</h2>
                {availableCastingCalls.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {availableCastingCalls.map(casting => (
                            <CastingCard key={casting.id} casting={casting} />
                        ))}
                    </div>
                ) : (
                    <div className="glass-card p-12 text-center">
                        <div className="text-6xl mb-4">📋</div>
                        <h3 className="text-xl font-bold mb-2">No Open Casting Calls</h3>
                        <p className="text-gray-400">Check back later for new opportunities</p>
                    </div>
                )}
            </div>
        </div>
    )
}

function CastingCard({ casting, isOwner = false }) {
    return (
        <div className="glass-card-hover p-6 card-hover-lift">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="text-xl font-bold text-white mb-1">{casting.projectTitle || 'Untitled Project'}</h3>
                    <p className="text-sm text-gray-400">{casting.targetRole || 'Various Roles'}</p>
                </div>
                <span className={`badge text-xs ${casting.status === 'Open' ? 'badge-primary' : 'bg-gray-500/20 text-gray-400'
                    }`}>
                    {casting.status}
                </span>
            </div>

            <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                {casting.description || 'No description provided'}
            </p>

            {casting.requiredSkills && casting.requiredSkills.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {casting.requiredSkills.slice(0, 3).map((skill, index) => (
                        <span key={index} className="badge-secondary text-xs">
                            {skill}
                        </span>
                    ))}
                </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="text-sm text-gray-400">
                    {isOwner ? (
                        <span>{casting.applications?.length || 0} applications</span>
                    ) : (
                        <span>Posted {new Date(casting.createdAt).toLocaleDateString()}</span>
                    )}
                </div>
                <Link to={`/casting/${casting.id}`} className="btn-secondary text-sm px-4 py-2">
                    View Details
                </Link>
            </div>
        </div>
    )
}
