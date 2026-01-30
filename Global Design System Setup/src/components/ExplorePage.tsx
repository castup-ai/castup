import { useState } from 'react';
import { Search, Filter, MapPin, Star, Sparkles, MessageSquare, Bookmark } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface ExplorePageProps {
  onViewProfile: (profileId: string) => void;
}

const mockProfiles = [
  {
    id: '1',
    name: 'Emma Richardson',
    role: 'Actor',
    location: 'Los Angeles, CA',
    bio: 'Versatile actor with 8 years of experience in indie films and theater',
    skills: ['Drama', 'Comedy', 'Voice Acting'],
    image: 'https://images.unsplash.com/photo-1573497701119-52dbe8832c17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGJ1c2luZXNzJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc1OTI4MDk5Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    matchScore: 95,
    verified: true,
  },
  {
    id: '2',
    name: 'Marcus Chen',
    role: 'Cinematographer',
    location: 'New York, NY',
    bio: 'Award-winning DP specializing in documentary and narrative films',
    skills: ['Lighting', 'Camera Operation', 'Color Grading'],
    image: 'https://images.unsplash.com/photo-1597202992582-9ee5c6672095?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBjYXN1YWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTkyODg3MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    matchScore: 88,
    verified: true,
  },
  {
    id: '3',
    name: 'Sarah Mitchell',
    role: 'Director',
    location: 'Austin, TX',
    bio: 'Indie director passionate about telling authentic human stories',
    skills: ['Directing', 'Script Development', 'Editing'],
    image: 'https://images.unsplash.com/photo-1570170609489-43197f518df0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBlcnNvbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NTkzMDg3NjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    matchScore: 92,
    verified: false,
  },
  {
    id: '4',
    name: 'David Park',
    role: 'Writer',
    location: 'Seattle, WA',
    bio: 'Screenwriter focused on sci-fi and thriller genres',
    skills: ['Screenwriting', 'Story Development', 'Dialogue'],
    image: 'https://images.unsplash.com/photo-1597202992582-9ee5c6672095?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBjYXN1YWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTkyODg3MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    matchScore: 85,
    verified: true,
  },
  {
    id: '5',
    name: 'Lisa Torres',
    role: 'Producer',
    location: 'Miami, FL',
    bio: 'Creative producer with expertise in budget management and fundraising',
    skills: ['Budget Management', 'Fundraising', 'Team Leadership'],
    image: 'https://images.unsplash.com/photo-1573497701119-52dbe8832c17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGJ1c2luZXNzJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc1OTI4MDk5Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    matchScore: 90,
    verified: true,
  },
  {
    id: '6',
    name: 'James Wilson',
    role: 'Actor',
    location: 'Chicago, IL',
    bio: 'Character actor with background in improv and sketch comedy',
    skills: ['Comedy', 'Improv', 'Character Work'],
    image: 'https://images.unsplash.com/photo-1570170609489-43197f518df0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBlcnNvbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NTkzMDg3NjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    matchScore: 87,
    verified: false,
  },
];

export default function ExplorePage({ onViewProfile }: ExplorePageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [aiRanking, setAiRanking] = useState(true);
  const [showFilters, setShowFilters] = useState(true);

  const roles = ['All', 'Actor', 'Director', 'Producer', 'Cinematographer', 'Writer', 'Crew'];

  const filteredProfiles = mockProfiles.filter(profile => {
    const matchesSearch = profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         profile.bio.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'All' || profile.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const sortedProfiles = aiRanking
    ? [...filteredProfiles].sort((a, b) => b.matchScore - a.matchScore)
    : filteredProfiles;

  return (
    <div className="h-full flex">
      {/* Sidebar Filters */}
      {showFilters && (
        <aside className="w-80 bg-white border-r border-[rgba(0,0,0,0.08)] p-6 overflow-auto">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg text-[#3C3C3C] mb-3" style={{ fontWeight: 600 }}>Filters</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-[#6B6B6B] mb-2" style={{ fontWeight: 500 }}>
                    Role Category
                  </label>
                  <div className="space-y-2">
                    {roles.map(role => (
                      <button
                        key={role}
                        onClick={() => setSelectedRole(role)}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                          selectedRole === role
                            ? 'bg-[#FF7A5A] text-white'
                            : 'bg-[#FFF8F0] text-[#6B6B6B] hover:bg-[#FFE5DD]'
                        }`}
                        style={{ fontWeight: 500 }}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-[#6B6B6B] mb-2" style={{ fontWeight: 500 }}>
                    Location
                  </label>
                  <Input
                    placeholder="Enter city or state"
                    className="h-10 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#6B6B6B] mb-2" style={{ fontWeight: 500 }}>
                    Experience Level
                  </label>
                  <select className="w-full h-10 px-3 rounded-lg border border-[rgba(0,0,0,0.1)] bg-white">
                    <option>Any</option>
                    <option>Entry Level (0-2 years)</option>
                    <option>Mid Level (3-5 years)</option>
                    <option>Senior (5+ years)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-[#6B6B6B] mb-2" style={{ fontWeight: 500 }}>
                    Availability
                  </label>
                  <select className="w-full h-10 px-3 rounded-lg border border-[rgba(0,0,0,0.1)] bg-white">
                    <option>Any</option>
                    <option>Available Now</option>
                    <option>Available Soon</option>
                    <option>Not Available</option>
                  </select>
                </div>

                <div className="pt-4">
                  <Button className="w-full bg-[#FF7A5A] hover:bg-[#FF6A4A] text-white rounded-lg">
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6B6B]" />
              <Input
                type="text"
                placeholder="Search by name, role, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 rounded-xl border-[rgba(0,0,0,0.1)] bg-white shadow-lg"
                style={{
                  background: 'linear-gradient(90deg, #FFF8F0 0%, #FFFFFF 100%)',
                }}
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-[rgba(0,0,0,0.1)] hover:bg-[#FFF8F0] transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span style={{ fontWeight: 500 }}>Filters</span>
              </button>

              <button
                onClick={() => setAiRanking(!aiRanking)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  aiRanking
                    ? 'bg-gradient-to-r from-[#FF7A5A] to-[#FFC107] text-white'
                    : 'bg-white border border-[rgba(0,0,0,0.1)] hover:bg-[#FFF8F0]'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span style={{ fontWeight: 500 }}>AI Ranking</span>
              </button>
            </div>

            <div className="text-[#6B6B6B]">
              {sortedProfiles.length} profiles found
            </div>
          </div>

          {/* Profile Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProfiles.map(profile => (
              <div
                key={profile.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                {/* Profile Image */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-[#FF7A5A]/10 to-[#FFC107]/10">
                  <img
                    src={profile.image}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                  {aiRanking && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-[#FF7A5A] to-[#FFC107] rounded-full text-white text-sm">
                      <Sparkles className="w-4 h-4" />
                      <span style={{ fontWeight: 600 }}>{profile.matchScore}% Match</span>
                    </div>
                  )}
                  {profile.verified && (
                    <div className="absolute top-3 left-3 px-3 py-1 bg-[#28A745] rounded-full text-white text-sm flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      <span style={{ fontWeight: 600 }}>Verified</span>
                    </div>
                  )}
                </div>

                {/* Profile Info */}
                <div className="p-5">
                  <h3 className="text-xl text-[#3C3C3C] mb-1" style={{ fontWeight: 600 }}>
                    {profile.name}
                  </h3>
                  <div className="flex items-center gap-2 text-[#6B6B6B] text-sm mb-3">
                    <span>{profile.role}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{profile.location}</span>
                    </div>
                  </div>
                  <p className="text-[#6B6B6B] text-sm mb-4 line-clamp-2">
                    {profile.bio}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {profile.skills.slice(0, 3).map((skill, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="bg-[#FFF8F0] text-[#FF7A5A] border-[#FF7A5A]/20"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => onViewProfile(profile.id)}
                      className="flex-1 bg-[#FF7A5A] hover:bg-[#FF6A4A] text-white rounded-lg"
                    >
                      View Profile
                    </Button>
                    <Button
                      variant="outline"
                      className="px-3 rounded-lg border-[rgba(0,0,0,0.1)]"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      className="px-3 rounded-lg border-[rgba(0,0,0,0.1)]"
                    >
                      <Bookmark className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
