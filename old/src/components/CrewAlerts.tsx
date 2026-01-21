import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Megaphone, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Bookmark, 
  CheckCircle, 
  Plus, 
  Filter, 
  Star, 
  TrendingUp,
  Users,
  Clock,
  AlertCircle
} from 'lucide-react';
import type { User } from '../App';

interface CrewAlert {
  id: string;
  role: string;
  category: string;
  projectTitle: string;
  projectType: string;
  description: string;
  location: string;
  remote: boolean;
  compensation: 'Paid' | 'Unpaid' | 'Negotiable';
  compensationDetails?: string;
  experienceLevel: 'Beginner' | 'Intermediate' | 'Professional';
  duration: string;
  startDate: string;
  deadline: string;
  spotsAvailable: number;
  spotsTotal: number;
  postedBy: string;
  postedDate: string;
  verified: boolean;
  featured: boolean;
  applicants: number;
  rating?: number;
}

interface CrewAlertsProps {
  user?: User;
}

export default function CrewAlerts({ user }: CrewAlertsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedCompensation, setSelectedCompensation] = useState<string>('all');
  const [selectedExperience, setSelectedExperience] = useState<string>('all');
  const [savedAlerts, setSavedAlerts] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);

  const mockAlerts: CrewAlert[] = [
    {
      id: '1',
      role: 'Cinematographer',
      category: 'Cinematography',
      projectTitle: 'Urban Stories',
      projectType: 'Short Film',
      description: 'Looking for an experienced cinematographer for a 15-minute drama about life in the city. Must have experience with handheld camera work and natural lighting.',
      location: 'Los Angeles, CA',
      remote: false,
      compensation: 'Paid',
      compensationDetails: '$500-800',
      experienceLevel: 'Professional',
      duration: '5 days',
      startDate: '2025-10-15',
      deadline: '2025-10-10',
      spotsAvailable: 1,
      spotsTotal: 1,
      postedBy: 'Sarah Mitchell',
      postedDate: '2025-09-25',
      verified: true,
      featured: true,
      applicants: 12,
      rating: 4.8
    },
    {
      id: '2',
      role: 'Lead Actor',
      category: 'Acting',
      projectTitle: 'The Last Train',
      projectType: 'Feature Film',
      description: 'Seeking a male lead actor (25-35) for an indie drama. Character is a struggling musician dealing with loss. Emotional range required.',
      location: 'New York, NY',
      remote: false,
      compensation: 'Paid',
      compensationDetails: '$2000-3000',
      experienceLevel: 'Intermediate',
      duration: '3 weeks',
      startDate: '2025-11-01',
      deadline: '2025-10-08',
      spotsAvailable: 1,
      spotsTotal: 1,
      postedBy: 'Marcus Chen',
      postedDate: '2025-09-26',
      verified: true,
      featured: true,
      applicants: 28,
      rating: 4.9
    },
    {
      id: '3',
      role: 'Music Composer',
      category: 'Music',
      projectTitle: 'Dreamscape',
      projectType: 'Short Film',
      description: 'Need an original score for a psychological thriller. Looking for ambient, suspenseful music with electronic elements.',
      location: 'Remote',
      remote: true,
      compensation: 'Negotiable',
      compensationDetails: 'Based on experience',
      experienceLevel: 'Intermediate',
      duration: '2 weeks',
      startDate: '2025-10-20',
      deadline: '2025-10-12',
      spotsAvailable: 1,
      spotsTotal: 1,
      postedBy: 'Emma Richardson',
      postedDate: '2025-09-27',
      verified: false,
      featured: false,
      applicants: 8
    },
    {
      id: '4',
      role: 'Video Editor',
      category: 'Editing',
      projectTitle: 'Documentary Series',
      projectType: 'Documentary',
      description: 'Seeking a skilled video editor for a 4-episode documentary series about local artists. Experience with Adobe Premiere Pro required.',
      location: 'Chicago, IL',
      remote: true,
      compensation: 'Paid',
      compensationDetails: '$1500-2500',
      experienceLevel: 'Professional',
      duration: '6 weeks',
      startDate: '2025-10-25',
      deadline: '2025-10-15',
      spotsAvailable: 1,
      spotsTotal: 2,
      postedBy: 'James Wilson',
      postedDate: '2025-09-28',
      verified: true,
      featured: false,
      applicants: 15,
      rating: 4.7
    },
    {
      id: '5',
      role: 'Production Assistant',
      category: 'Production',
      projectTitle: 'Summer Campaign',
      projectType: 'Commercial',
      description: 'Looking for enthusiastic production assistants for a week-long commercial shoot. Great opportunity for beginners to learn.',
      location: 'Miami, FL',
      remote: false,
      compensation: 'Paid',
      compensationDetails: '$200/day',
      experienceLevel: 'Beginner',
      duration: '1 week',
      startDate: '2025-10-18',
      deadline: '2025-10-05',
      spotsAvailable: 2,
      spotsTotal: 3,
      postedBy: 'Lisa Anderson',
      postedDate: '2025-09-29',
      verified: true,
      featured: false,
      applicants: 32
    },
    {
      id: '6',
      role: 'Assistant Director',
      category: 'Direction',
      projectTitle: 'Echoes of Time',
      projectType: 'Short Film',
      description: 'Seeking an organized and creative assistant director for a sci-fi short film. Must have scheduling and coordination experience.',
      location: 'San Francisco, CA',
      remote: false,
      compensation: 'Unpaid',
      compensationDetails: 'Credit + meals provided',
      experienceLevel: 'Intermediate',
      duration: '10 days',
      startDate: '2025-11-05',
      deadline: '2025-10-20',
      spotsAvailable: 1,
      spotsTotal: 1,
      postedBy: 'David Park',
      postedDate: '2025-09-30',
      verified: false,
      featured: false,
      applicants: 6
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories', icon: Megaphone },
    { value: 'Acting', label: 'Acting', icon: Users },
    { value: 'Direction', label: 'Direction', icon: TrendingUp },
    { value: 'Cinematography', label: 'Cinematography', icon: Star },
    { value: 'Music', label: 'Music', icon: Star },
    { value: 'Editing', label: 'Editing', icon: Star },
    { value: 'Production', label: 'Production', icon: Star }
  ];

  const handleSaveAlert = (alertId: string) => {
    setSavedAlerts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(alertId)) {
        newSet.delete(alertId);
      } else {
        newSet.add(alertId);
      }
      return newSet;
    });
  };

  const filteredAlerts = mockAlerts.filter(alert => {
    if (selectedCategory !== 'all' && alert.category !== selectedCategory) return false;
    if (selectedLocation !== 'all') {
      if (selectedLocation === 'remote' && !alert.remote) return false;
      if (selectedLocation !== 'remote' && !alert.location.includes(selectedLocation)) return false;
    }
    if (selectedCompensation !== 'all' && alert.compensation !== selectedCompensation) return false;
    if (selectedExperience !== 'all' && alert.experienceLevel !== selectedExperience) return false;
    return true;
  });

  const recommendedAlerts = user ? mockAlerts.filter(alert => {
    // Simple recommendation logic based on user role
    if (user.role === 'Actor') return alert.category === 'Acting';
    if (user.role === 'Director') return alert.category === 'Direction';
    if (user.role === 'Cinematographer') return alert.category === 'Cinematography';
    return false;
  }) : [];

  const featuredAlerts = mockAlerts.filter(alert => alert.featured);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF7A5A] to-[#FFC107] flex items-center justify-center">
              <Megaphone className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl text-[#3C3C3C]" style={{ fontWeight: 700 }}>
              Crew Alerts
            </h1>
          </div>
          <p className="text-[#6B6B6B] text-lg">
            Find your next film project or assemble your dream team
          </p>
        </div>

        <Button className="bg-[#FF7A5A] hover:bg-[#FF6A4A] text-white rounded-lg flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Post Alert
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[rgba(0,0,0,0.08)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#6B6B6B]">Active Alerts</p>
              <p className="text-2xl text-[#3C3C3C]" style={{ fontWeight: 700 }}>{mockAlerts.length}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#FF7A5A]/10 flex items-center justify-center">
              <Megaphone className="w-5 h-5 text-[#FF7A5A]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-[rgba(0,0,0,0.08)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#6B6B6B]">For You</p>
              <p className="text-2xl text-[#3C3C3C]" style={{ fontWeight: 700 }}>{recommendedAlerts.length}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#FFC107]/10 flex items-center justify-center">
              <Star className="w-5 h-5 text-[#FFC107]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-[rgba(0,0,0,0.08)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#6B6B6B]">Saved</p>
              <p className="text-2xl text-[#3C3C3C]" style={{ fontWeight: 700 }}>{savedAlerts.size}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#28A745]/10 flex items-center justify-center">
              <Bookmark className="w-5 h-5 text-[#28A745]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-[rgba(0,0,0,0.08)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#6B6B6B]">Featured</p>
              <p className="text-2xl text-[#3C3C3C]" style={{ fontWeight: 700 }}>{featuredAlerts.length}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#FFC107]/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#FFC107]" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-[rgba(0,0,0,0.08)] mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-[#6B6B6B]" />
            <span className="text-[#3C3C3C]" style={{ fontWeight: 600 }}>Filters</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedCategory('all');
              setSelectedLocation('all');
              setSelectedCompensation('all');
              setSelectedExperience('all');
            }}
            className="text-[#FF7A5A] hover:text-[#FF6A4A]"
          >
            Clear All
          </Button>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="text-sm text-[#6B6B6B] mb-1 block">Category</label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="rounded-lg">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Acting">Acting</SelectItem>
                <SelectItem value="Direction">Direction</SelectItem>
                <SelectItem value="Cinematography">Cinematography</SelectItem>
                <SelectItem value="Music">Music</SelectItem>
                <SelectItem value="Editing">Editing</SelectItem>
                <SelectItem value="Production">Production</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-[#6B6B6B] mb-1 block">Location</label>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="rounded-lg">
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="Los Angeles">Los Angeles</SelectItem>
                <SelectItem value="New York">New York</SelectItem>
                <SelectItem value="Chicago">Chicago</SelectItem>
                <SelectItem value="Miami">Miami</SelectItem>
                <SelectItem value="San Francisco">San Francisco</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-[#6B6B6B] mb-1 block">Compensation</label>
            <Select value={selectedCompensation} onValueChange={setSelectedCompensation}>
              <SelectTrigger className="rounded-lg">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Unpaid">Unpaid</SelectItem>
                <SelectItem value="Negotiable">Negotiable</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-[#6B6B6B] mb-1 block">Experience</label>
            <Select value={selectedExperience} onValueChange={setSelectedExperience}>
              <SelectTrigger className="rounded-lg">
                <SelectValue placeholder="All Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Professional">Professional</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="bg-white border border-[rgba(0,0,0,0.1)] rounded-xl p-1 mb-6">
          <TabsTrigger value="all" className="rounded-lg data-[state=active]:bg-[#FF7A5A] data-[state=active]:text-white">
            All Alerts ({filteredAlerts.length})
          </TabsTrigger>
          <TabsTrigger value="recommended" className="rounded-lg data-[state=active]:bg-[#FF7A5A] data-[state=active]:text-white">
            For You ({recommendedAlerts.length})
          </TabsTrigger>
          <TabsTrigger value="featured" className="rounded-lg data-[state=active]:bg-[#FF7A5A] data-[state=active]:text-white">
            Featured ({featuredAlerts.length})
          </TabsTrigger>
          <TabsTrigger value="saved" className="rounded-lg data-[state=active]:bg-[#FF7A5A] data-[state=active]:text-white">
            Saved ({savedAlerts.size})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="space-y-4">
            {filteredAlerts.map((alert) => (
              <AlertCard 
                key={alert.id} 
                alert={alert} 
                isSaved={savedAlerts.has(alert.id)}
                onSave={handleSaveAlert}
              />
            ))}
            {filteredAlerts.length === 0 && (
              <div className="text-center py-12">
                <AlertCircle className="w-12 h-12 text-[#6B6B6B] mx-auto mb-4 opacity-50" />
                <p className="text-[#6B6B6B]">No alerts match your filters</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="recommended">
          <div className="space-y-4">
            {recommendedAlerts.length > 0 ? (
              <>
                <div className="bg-gradient-to-r from-[#FFC107]/20 to-[#FF7A5A]/20 rounded-xl p-4 mb-4 border border-[#FFC107]/30">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#FFC107] flex items-center justify-center flex-shrink-0">
                      <Star className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-[#3C3C3C]" style={{ fontWeight: 600 }}>Smart Recommendations</h3>
                      <p className="text-sm text-[#6B6B6B]">
                        These alerts match your profile as a {user?.role}. Apply now to increase your chances!
                      </p>
                    </div>
                  </div>
                </div>
                {recommendedAlerts.map((alert) => (
                  <AlertCard 
                    key={alert.id} 
                    alert={alert} 
                    isSaved={savedAlerts.has(alert.id)}
                    onSave={handleSaveAlert}
                    recommended
                  />
                ))}
              </>
            ) : (
              <div className="text-center py-12">
                <Star className="w-12 h-12 text-[#6B6B6B] mx-auto mb-4 opacity-50" />
                <p className="text-[#6B6B6B]">No recommendations available yet</p>
                <p className="text-sm text-[#6B6B6B] mt-2">Complete your profile to get personalized alerts</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="featured">
          <div className="space-y-4">
            {featuredAlerts.map((alert) => (
              <AlertCard 
                key={alert.id} 
                alert={alert} 
                isSaved={savedAlerts.has(alert.id)}
                onSave={handleSaveAlert}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="saved">
          <div className="space-y-4">
            {mockAlerts.filter(alert => savedAlerts.has(alert.id)).length > 0 ? (
              mockAlerts
                .filter(alert => savedAlerts.has(alert.id))
                .map((alert) => (
                  <AlertCard 
                    key={alert.id} 
                    alert={alert} 
                    isSaved={true}
                    onSave={handleSaveAlert}
                  />
                ))
            ) : (
              <div className="text-center py-12">
                <Bookmark className="w-12 h-12 text-[#6B6B6B] mx-auto mb-4 opacity-50" />
                <p className="text-[#6B6B6B]">No saved alerts yet</p>
                <p className="text-sm text-[#6B6B6B] mt-2">Save alerts to view them later</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function AlertCard({ 
  alert, 
  isSaved, 
  onSave,
  recommended = false 
}: { 
  alert: CrewAlert; 
  isSaved: boolean; 
  onSave: (id: string) => void;
  recommended?: boolean;
}) {
  const daysUntilDeadline = Math.ceil(
    (new Date(alert.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );
  const isUrgent = daysUntilDeadline <= 3;
  const isFilling = alert.spotsAvailable <= alert.spotsTotal / 2;

  return (
    <div className={`bg-white rounded-2xl p-6 shadow-sm border hover:shadow-md transition-shadow ${
      alert.featured ? 'border-[#FFC107]' : 'border-[rgba(0,0,0,0.08)]'
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <h3 className="text-xl text-[#3C3C3C]" style={{ fontWeight: 700 }}>
              {alert.role}
            </h3>
            {alert.verified && (
              <Badge className="bg-[#28A745] text-white border-0 rounded-full flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Verified
              </Badge>
            )}
            {alert.featured && (
              <Badge className="bg-[#FFC107] text-white border-0 rounded-full flex items-center gap-1">
                <Star className="w-3 h-3" />
                Featured
              </Badge>
            )}
            {recommended && (
              <Badge className="bg-[#FF7A5A] text-white border-0 rounded-full">
                For You
              </Badge>
            )}
          </div>
          <p className="text-lg text-[#3C3C3C]" style={{ fontWeight: 600 }}>{alert.projectTitle}</p>
          <p className="text-sm text-[#6B6B6B]">{alert.projectType} · Posted by {alert.postedBy}</p>
          {alert.rating && (
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-4 h-4 text-[#FFC107] fill-[#FFC107]" />
              <span className="text-sm text-[#3C3C3C]" style={{ fontWeight: 600 }}>{alert.rating}</span>
              <span className="text-sm text-[#6B6B6B]">rating</span>
            </div>
          )}
        </div>

        <button
          onClick={() => onSave(alert.id)}
          className={`p-2 rounded-lg transition-colors ${
            isSaved ? 'bg-[#FF7A5A] text-white' : 'bg-gray-100 text-[#6B6B6B] hover:bg-gray-200'
          }`}
        >
          <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-white' : ''}`} />
        </button>
      </div>

      {/* Description */}
      <p className="text-[#6B6B6B] mb-4">{alert.description}</p>

      {/* Details Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-[#6B6B6B] mt-1 flex-shrink-0" />
          <div>
            <p className="text-sm text-[#6B6B6B]">Location</p>
            <p className="text-sm text-[#3C3C3C]" style={{ fontWeight: 600 }}>
              {alert.location}
            </p>
            {alert.remote && (
              <Badge variant="outline" className="mt-1 text-xs border-[#28A745] text-[#28A745]">
                Remote OK
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <DollarSign className="w-4 h-4 text-[#6B6B6B] mt-1 flex-shrink-0" />
          <div>
            <p className="text-sm text-[#6B6B6B]">Compensation</p>
            <p className="text-sm text-[#3C3C3C]" style={{ fontWeight: 600 }}>
              {alert.compensation}
            </p>
            {alert.compensationDetails && (
              <p className="text-xs text-[#6B6B6B]">{alert.compensationDetails}</p>
            )}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <Calendar className="w-4 h-4 text-[#6B6B6B] mt-1 flex-shrink-0" />
          <div>
            <p className="text-sm text-[#6B6B6B]">Duration</p>
            <p className="text-sm text-[#3C3C3C]" style={{ fontWeight: 600 }}>
              {alert.duration}
            </p>
            <p className="text-xs text-[#6B6B6B]">Starts {new Date(alert.startDate).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <Users className="w-4 h-4 text-[#6B6B6B] mt-1 flex-shrink-0" />
          <div>
            <p className="text-sm text-[#6B6B6B]">Experience</p>
            <p className="text-sm text-[#3C3C3C]" style={{ fontWeight: 600 }}>
              {alert.experienceLevel}
            </p>
            <p className="text-xs text-[#6B6B6B]">{alert.applicants} applicants</p>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="flex items-center gap-4 mb-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Clock className={`w-4 h-4 ${isUrgent ? 'text-[#DC3545]' : 'text-[#6B6B6B]'}`} />
          <span className={`text-sm ${isUrgent ? 'text-[#DC3545]' : 'text-[#6B6B6B]'}`} style={{ fontWeight: 600 }}>
            {daysUntilDeadline} days left to apply
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            alert.spotsAvailable > 0 ? 'bg-[#28A745]' : 'bg-[#DC3545]'
          }`} />
          <span className="text-sm text-[#6B6B6B]">
            {alert.spotsAvailable > 0 ? (
              <>
                <span style={{ fontWeight: 600 }}>{alert.spotsAvailable}</span> of {alert.spotsTotal} spots available
              </>
            ) : (
              <span style={{ fontWeight: 600 }}>Spots filled</span>
            )}
          </span>
        </div>

        <Badge variant="outline" className="border-[#FF7A5A] text-[#FF7A5A]">
          {alert.category}
        </Badge>
      </div>

      {/* Warning if filling fast */}
      {isFilling && alert.spotsAvailable > 0 && (
        <div className="bg-[#FFC107]/10 border border-[#FFC107]/30 rounded-lg p-3 mb-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#FFC107]" />
            <span className="text-sm text-[#3C3C3C]" style={{ fontWeight: 600 }}>
              Filling fast! Apply soon to secure your spot.
            </span>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <Button 
          className="flex-1 bg-[#FF7A5A] hover:bg-[#FF6A4A] text-white rounded-lg"
          disabled={alert.spotsAvailable === 0}
        >
          {alert.spotsAvailable === 0 ? 'Spots Filled' : 'Apply Now'}
        </Button>
        <Button variant="outline" className="rounded-lg">
          View Details
        </Button>
      </div>
    </div>
  );
}