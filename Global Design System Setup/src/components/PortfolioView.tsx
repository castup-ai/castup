import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowLeft, MessageSquare, Bookmark, Share2, MapPin, Mail, Phone, Link as LinkIcon, CheckCircle, Briefcase, Award } from 'lucide-react';

interface PortfolioViewProps {
  profileId: string;
  onBack: () => void;
}

export default function PortfolioView({ profileId, onBack }: PortfolioViewProps) {
  // Mock profile data
  const profile = {
    name: 'Emma Richardson',
    role: 'Actor',
    location: 'Los Angeles, CA',
    email: 'emma.richardson@email.com',
    phone: '+1 (555) 123-4567',
    bio: 'Versatile actor with 8 years of experience in indie films and theater. Passionate about bringing authentic characters to life with a focus on emotional depth and nuanced performances. Trained in method acting and stage combat.',
    skills: ['Drama', 'Comedy', 'Voice Acting', 'Method Acting', 'Stage Combat', 'Accent Training'],
    experience: [
      {
        title: 'The Last Summer',
        role: 'Lead Actor',
        year: '2024',
        company: 'Indie Films Co.',
        description: 'Portrayed the protagonist in this coming-of-age drama that premiered at Sundance Film Festival.',
      },
      {
        title: 'Midnight Dreams',
        role: 'Supporting Actor',
        year: '2023',
        company: 'Dream Productions',
        description: 'Played a complex character dealing with loss and redemption in this psychological thriller.',
      },
      {
        title: 'Theater: Hamlet',
        role: 'Ophelia',
        year: '2022',
        company: 'City Theater',
        description: 'Classical theater performance that received critical acclaim and sold-out shows.',
      },
    ],
    image: 'https://images.unsplash.com/photo-1573497701119-52dbe8832c17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGJ1c2luZXNzJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc1OTI4MDk5Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    coverImage: 'https://images.unsplash.com/photo-1616527546362-bf6b7f80a751?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxtJTIwcHJvZHVjdGlvbiUyMGNpbmVtYXxlbnwxfHx8fDE3NTkzMDg2MDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    verified: true,
    socialLinks: {
      imdb: 'https://imdb.com/name/example',
      instagram: '@emmarichardson',
      website: 'www.emmarichardson.com',
    },
  };

  return (
    <div className="h-full overflow-auto bg-[#FFF8F0]">
      {/* Back Button */}
      <div className="bg-white border-b border-[rgba(0,0,0,0.08)] px-8 py-4">
        <Button
          onClick={onBack}
          variant="ghost"
          className="flex items-center gap-2 hover:bg-[#FFF8F0]"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Explore
        </Button>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Cover Photo */}
        <div className="relative h-80 bg-gradient-to-br from-[#FF7A5A]/20 to-[#FFC107]/20">
          <img
            src={profile.coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Profile Header */}
        <div className="relative px-8 pb-8">
          <div className="flex flex-col md:flex-row gap-6 -mt-20">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-40 h-40 rounded-2xl overflow-hidden border-4 border-white shadow-xl">
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {profile.verified && (
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#28A745] rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1 bg-white rounded-2xl shadow-xl p-6 mt-8 md:mt-0">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl text-[#3C3C3C] mb-2" style={{ fontWeight: 700 }}>
                    {profile.name}
                  </h1>
                  <div className="flex items-center gap-3 text-[#6B6B6B] mb-3">
                    <span className="text-lg">{profile.role}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{profile.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="bg-[#FF7A5A] hover:bg-[#FF6A4A] text-white rounded-lg flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Message
                  </Button>
                  <Button variant="outline" className="rounded-lg">
                    <Bookmark className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" className="rounded-lg">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-[rgba(0,0,0,0.1)]">
                <div className="flex items-center gap-2 text-[#6B6B6B]">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{profile.email}</span>
                </div>
                <div className="flex items-center gap-2 text-[#6B6B6B]">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">{profile.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-[#6B6B6B]">
                  <LinkIcon className="w-4 h-4" />
                  <span className="text-sm">{profile.socialLinks.website}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-8 pb-8 space-y-6">
          {/* Bio */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl text-[#3C3C3C] mb-4" style={{ fontWeight: 600 }}>
              About
            </h2>
            <p className="text-[#6B6B6B] leading-relaxed">
              {profile.bio}
            </p>
          </div>

          {/* Skills */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl text-[#3C3C3C] mb-4" style={{ fontWeight: 600 }}>
              Skills & Expertise
            </h2>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, idx) => (
                <Badge
                  key={idx}
                  className="bg-[#FF7A5A] text-white px-4 py-2"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <Briefcase className="w-6 h-6 text-[#FF7A5A]" />
              <h2 className="text-xl text-[#3C3C3C]" style={{ fontWeight: 600 }}>
                Experience & Projects
              </h2>
            </div>

            <div className="space-y-6">
              {profile.experience.map((exp, idx) => (
                <div key={idx} className="border-l-4 border-[#FF7A5A] pl-6 pb-6 last:pb-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg text-[#3C3C3C]" style={{ fontWeight: 600 }}>
                        {exp.title}
                      </h3>
                      <div className="flex items-center gap-2 text-[#6B6B6B] text-sm">
                        <span>{exp.role}</span>
                        <span>•</span>
                        <span>{exp.company}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-[#FFC107] text-[#FFC107]">
                      {exp.year}
                    </Badge>
                  </div>
                  <p className="text-[#6B6B6B]">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Media Gallery */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl text-[#3C3C3C] mb-4" style={{ fontWeight: 600 }}>
              Media Gallery
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="aspect-video rounded-lg bg-gradient-to-br from-[#FF7A5A]/10 to-[#FFC107]/10 overflow-hidden">
                  <img
                    src={profile.image}
                    alt="Gallery"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl text-[#3C3C3C] mb-4" style={{ fontWeight: 600 }}>
              Social Links
            </h2>
            <div className="flex flex-wrap gap-3">
              <a
                href={profile.socialLinks.imdb}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#FFF8F0] rounded-lg hover:bg-[#FFE5DD] transition-colors flex items-center gap-2"
              >
                <LinkIcon className="w-4 h-4" />
                <span style={{ fontWeight: 500 }}>IMDb</span>
              </a>
              <a
                href={`https://instagram.com/${profile.socialLinks.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#FFF8F0] rounded-lg hover:bg-[#FFE5DD] transition-colors flex items-center gap-2"
              >
                <LinkIcon className="w-4 h-4" />
                <span style={{ fontWeight: 500 }}>Instagram</span>
              </a>
              <a
                href={`https://${profile.socialLinks.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#FFF8F0] rounded-lg hover:bg-[#FFE5DD] transition-colors flex items-center gap-2"
              >
                <LinkIcon className="w-4 h-4" />
                <span style={{ fontWeight: 500 }}>Website</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
