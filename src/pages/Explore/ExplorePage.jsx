import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import TopHeader from '../../components/TopHeader';
import { useData } from '../../context/DataContext';
import ProfileCard from '../../components/ProfileCard';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Search } from 'lucide-react';

const CATEGORIES = ['All', 'Actor', 'Actress', 'Director', 'Producer', 'Editor', 'Cinematographer', 'Sound Engineer'];

export default function ExplorePage() {
    const { profiles } = useData();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('recent');

    const filteredProfiles = profiles
        .filter(profile => {
            const matchesSearch = profile.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                profile.bio?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                profile.skills?.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchesCategory = selectedCategory === 'All' || profile.role === selectedCategory || profile.department === selectedCategory;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            if (sortBy === 'recent') return new Date(b.createdAt) - new Date(a.createdAt);
            if (sortBy === 'views') return (b.views || 0) - (a.views || 0);
            if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
            return 0;
        });

    return (
        <DashboardLayout>
            <TopHeader title="Explore Talent" />
            <main className="flex-1 overflow-auto p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Search & Filters */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="md:col-span-2">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6B6B]" />
                                    <Input
                                        placeholder="Search by name, skills, or bio..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-11"
                                    />
                                </div>
                            </div>
                            <div>
                                <select
                                    className="w-full h-12 rounded-xl border border-gray-200 bg-white px-4 text-sm text-[#3C3C3C] focus:outline-none focus:ring-2 focus:ring-[#FF7A5A]"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="recent">Most Recent</option>
                                    <option value="views">Most Viewed</option>
                                    <option value="rating">Highest Rated</option>
                                </select>
                            </div>
                            <div>
                                <Button className="w-full">
                                    🤖 AI Search
                                </Button>
                            </div>
                        </div>

                        {/* Category Pills */}
                        <div className="flex flex-wrap gap-2 mt-4">
                            {CATEGORIES.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                                            ? 'bg-[#FF7A5A] text-white'
                                            : 'bg-[#FFF8F0] text-[#6B6B6B] hover:bg-[#FFE5DD]'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Results */}
                    <div className="mb-4 flex items-center justify-between">
                        <p className="text-[#6B6B6B]">
                            Found <span className="text-[#FF7A5A] font-semibold">{filteredProfiles.length}</span> professionals
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
                        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-xl font-bold text-[#3C3C3C] mb-2">No Results Found</h3>
                            <p className="text-[#6B6B6B]">Try adjusting your search or filters</p>
                        </div>
                    )}
                </div>
            </main>
        </DashboardLayout>
    );
}
