import { useState } from 'react'
import { useData } from '../../context/DataContext'
import ProfileCard from '../../components/ProfileCard'
import Input from '../../components/Input'

const CATEGORIES = ['All', 'Actor', 'Actress', 'Director', 'Producer', 'Editor', 'Cinematographer', 'Sound Engineer']

export default function ExplorePage() {
    const { profiles } = useData()
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [sortBy, setSortBy] = useState('recent')

    const filteredProfiles = profiles
        .filter(profile => {
            const matchesSearch = profile.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                profile.bio?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                profile.skills?.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
            const matchesCategory = selectedCategory === 'All' || profile.role === selectedCategory
            return matchesSearch && matchesCategory
        })
        .sort((a, b) => {
            if (sortBy === 'recent') return new Date(b.createdAt) - new Date(a.createdAt)
            if (sortBy === 'views') return (b.views || 0) - (a.views || 0)
            if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0)
            return 0
        })

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-display font-bold mb-2">
                    Explore <span className="text-gradient">Talent</span>
                </h1>
                <p className="text-gray-400">Discover amazing professionals in the film industry</p>
            </div>

            {/* Search & Filters */}
            <div className="glass-card p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-2">
                        <Input
                            placeholder="Search by name, skills, or bio..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            icon="🔍"
                        />
                    </div>
                    <div>
                        <select
                            className="input-field"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="recent">Most Recent</option>
                            <option value="views">Most Viewed</option>
                            <option value="rating">Highest Rated</option>
                        </select>
                    </div>
                    <div>
                        <button className="btn-primary w-full">
                            🤖 AI Search
                        </button>
                    </div>
                </div>

                {/* Category Pills */}
                <div className="flex flex-wrap gap-2 mt-4">
                    {CATEGORIES.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${selectedCategory === category
                                    ? 'bg-gold-500 text-dark-950'
                                    : 'glass-card text-gray-300 hover:bg-white/10'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Results */}
            <div className="mb-4 flex items-center justify-between">
                <p className="text-gray-400">
                    Found <span className="text-gold-400 font-semibold">{filteredProfiles.length}</span> professionals
                </p>
            </div>

            {/* Profiles Grid */}
            {filteredProfiles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProfiles.map(profile => (
                        <ProfileCard key={profile.id} profile={profile} />
                    ))}
                </div>
            ) : (
                <div className="glass-card p-12 text-center">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-bold mb-2">No Results Found</h3>
                    <p className="text-gray-400">Try adjusting your search or filters</p>
                </div>
            )}
        </div>
    )
}
