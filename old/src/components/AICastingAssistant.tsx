import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Sparkles, ChevronRight, Check, X, MessageSquare } from 'lucide-react';
import { Badge } from './ui/badge';

interface AICastingAssistantProps {
  onViewProfile: (profileId: string) => void;
}

export default function AICastingAssistant({ onViewProfile }: AICastingAssistantProps) {
  const [step, setStep] = useState(1);
  const [projectName, setProjectName] = useState('');
  const [roleTitle, setRoleTitle] = useState('');
  const [roleDescription, setRoleDescription] = useState('');
  const [requiredSkills, setRequiredSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [showResults, setShowResults] = useState(false);

  const aiSuggestedSkills = ['Drama', 'Method Acting', 'Voice Acting', 'Stage Combat', 'Comedy'];

  const mockMatches = [
    {
      id: '1',
      name: 'Emma Richardson',
      role: 'Actor',
      matchScore: 95,
      image: 'https://images.unsplash.com/photo-1573497701119-52dbe8832c17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGJ1c2luZXNzJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc1OTI4MDk5Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      bio: 'Versatile actor with 8 years of experience in indie films',
      skills: ['Drama', 'Comedy', 'Voice Acting'],
      availability: 'Available Now',
    },
    {
      id: '2',
      name: 'Sarah Mitchell',
      role: 'Actor',
      matchScore: 92,
      image: 'https://images.unsplash.com/photo-1570170609489-43197f518df0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBlcnNvbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NTkzMDg3NjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      bio: 'Indie actor passionate about telling authentic stories',
      skills: ['Drama', 'Method Acting', 'Directing'],
      availability: 'Available Soon',
    },
    {
      id: '3',
      name: 'James Wilson',
      role: 'Actor',
      matchScore: 88,
      image: 'https://images.unsplash.com/photo-1597202992582-9ee5c6672095?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBjYXN1YWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTkyODg3MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      bio: 'Character actor with background in improv and sketch',
      skills: ['Comedy', 'Improv', 'Character Work'],
      availability: 'Available Now',
    },
  ];

  const alternateMatches = [
    {
      id: '4',
      name: 'Marcus Chen',
      matchScore: 82,
      reason: 'Strong acting background, available immediately',
    },
    {
      id: '5',
      name: 'Lisa Torres',
      matchScore: 79,
      reason: 'Excellent dramatic range, theater experience',
    },
  ];

  const handleAddSkill = () => {
    if (newSkill.trim() && !requiredSkills.includes(newSkill.trim())) {
      setRequiredSkills([...requiredSkills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleFindMatches = () => {
    setShowResults(true);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF7A5A] to-[#FFC107] flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl text-[#3C3C3C]" style={{ fontWeight: 700 }}>
            AI Casting Assistant
          </h1>
        </div>
        <p className="text-[#6B6B6B] text-lg">
          Let AI find the perfect talent for your project in seconds
        </p>
      </div>

      {!showResults ? (
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= s
                      ? 'bg-gradient-to-br from-[#FF7A5A] to-[#FFC107] text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                  style={{ fontWeight: 600 }}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div
                    className={`flex-1 h-1 mx-4 ${
                      step > s ? 'bg-gradient-to-r from-[#FF7A5A] to-[#FFC107]' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Project Info */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl text-[#3C3C3C]" style={{ fontWeight: 600 }}>
                Tell us about your project
              </h2>
              <div>
                <Label>Project Name</Label>
                <Input
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="e.g., Short Film: The Last Summer"
                  className="mt-2 h-12 rounded-lg"
                />
              </div>
              <div>
                <Label>Project Type</Label>
                <select className="w-full mt-2 h-12 px-4 rounded-lg border border-[rgba(0,0,0,0.1)]">
                  <option>Short Film</option>
                  <option>Feature Film</option>
                  <option>Web Series</option>
                  <option>Documentary</option>
                  <option>Commercial</option>
                </select>
              </div>
              <div>
                <Label>Brief Description</Label>
                <Textarea
                  placeholder="Describe your project..."
                  className="mt-2 min-h-24 rounded-lg"
                />
              </div>
            </div>
          )}

          {/* Step 2: Role Details */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl text-[#3C3C3C]" style={{ fontWeight: 600 }}>
                Define the role
              </h2>
              <div>
                <Label>Role Title</Label>
                <Input
                  value={roleTitle}
                  onChange={(e) => setRoleTitle(e.target.value)}
                  placeholder="e.g., Lead Actor - Sarah"
                  className="mt-2 h-12 rounded-lg"
                />
              </div>
              <div>
                <Label>Role Description</Label>
                <Textarea
                  value={roleDescription}
                  onChange={(e) => setRoleDescription(e.target.value)}
                  placeholder="Describe the character, age range, personality traits..."
                  className="mt-2 min-h-32 rounded-lg"
                />
              </div>
              <div>
                <Label>Age Range</Label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <Input placeholder="Min age" type="number" className="h-12 rounded-lg" />
                  <Input placeholder="Max age" type="number" className="h-12 rounded-lg" />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Required Skills */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl text-[#3C3C3C]" style={{ fontWeight: 600 }}>
                What skills are required?
              </h2>

              {/* AI Suggested Skills */}
              <div className="p-4 bg-[#FFC107]/10 rounded-lg border border-[#FFC107]/30">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-[#FFC107]" />
                  <span className="text-sm text-[#6B6B6B]" style={{ fontWeight: 500 }}>
                    AI Suggested Skills (based on role description)
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {aiSuggestedSkills.map((skill, idx) => (
                    <button
                      key={idx}
                      onClick={() => !requiredSkills.includes(skill) && setRequiredSkills([...requiredSkills, skill])}
                      className="px-3 py-1 bg-white rounded-full text-sm text-[#3C3C3C] border border-[#FFC107] hover:bg-[#FFC107] hover:text-white transition-colors"
                    >
                      + {skill}
                    </button>
                  ))}
                </div>
              </div>

              {/* Manual Skill Input */}
              <div>
                <Label>Add Custom Skills</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                    placeholder="Type a skill..."
                    className="h-12 rounded-lg"
                  />
                  <Button onClick={handleAddSkill} className="bg-[#FF7A5A] hover:bg-[#FF6A4A] rounded-lg px-6">
                    Add
                  </Button>
                </div>
              </div>

              {/* Selected Skills */}
              <div>
                <Label>Required Skills ({requiredSkills.length})</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {requiredSkills.map((skill, idx) => (
                    <Badge
                      key={idx}
                      className="bg-[#FF7A5A] text-white px-3 py-1 flex items-center gap-2"
                    >
                      {skill}
                      <button onClick={() => setRequiredSkills(requiredSkills.filter(s => s !== skill))}>
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label>Location Preference</Label>
                <Input placeholder="Enter city or state" className="mt-2 h-12 rounded-lg" />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-[rgba(0,0,0,0.1)]">
            <Button
              onClick={() => setStep(Math.max(1, step - 1))}
              variant="outline"
              disabled={step === 1}
              className="rounded-lg"
            >
              Previous
            </Button>
            {step < 3 ? (
              <Button
                onClick={() => setStep(step + 1)}
                className="bg-[#FF7A5A] hover:bg-[#FF6A4A] text-white rounded-lg flex items-center gap-2"
              >
                Next <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleFindMatches}
                className="bg-gradient-to-r from-[#FF7A5A] to-[#FFC107] hover:opacity-90 text-white rounded-lg flex items-center gap-2 px-6"
              >
                <Sparkles className="w-5 h-5" />
                Find Matches
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Results Header */}
          <div className="bg-gradient-to-r from-[#FF7A5A] to-[#FFC107] rounded-2xl p-6 text-white">
            <h2 className="text-2xl mb-2" style={{ fontWeight: 700 }}>
              🎯 Found {mockMatches.length} Perfect Matches!
            </h2>
            <p className="opacity-90">
              AI analyzed 1,247 profiles and found the best candidates for your role
            </p>
          </div>

          {/* Top Matches */}
          <div>
            <h3 className="text-xl text-[#3C3C3C] mb-4" style={{ fontWeight: 600 }}>
              Top Matches
            </h3>
            <div className="space-y-4">
              {mockMatches.map((match) => (
                <div
                  key={match.id}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex gap-6">
                    <div className="relative">
                      <div className="w-32 h-32 rounded-xl overflow-hidden">
                        <img
                          src={match.image}
                          alt={match.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -top-2 -right-2 flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-[#FF7A5A] to-[#FFC107] rounded-full text-white text-sm">
                        <Sparkles className="w-4 h-4" />
                        <span style={{ fontWeight: 600 }}>{match.matchScore}%</span>
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-xl text-[#3C3C3C] mb-1" style={{ fontWeight: 600 }}>
                            {match.name}
                          </h4>
                          <div className="flex items-center gap-2 text-[#6B6B6B]">
                            <span>{match.role}</span>
                            <span>•</span>
                            <Badge variant="outline" className="border-[#28A745] text-[#28A745]">
                              {match.availability}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <p className="text-[#6B6B6B] mb-4">{match.bio}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {match.skills.map((skill, idx) => (
                          <Badge
                            key={idx}
                            className="bg-[#FFF8F0] text-[#FF7A5A] border border-[#FF7A5A]/20"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Button
                          onClick={() => onViewProfile(match.id)}
                          className="bg-[#FF7A5A] hover:bg-[#FF6A4A] text-white rounded-lg"
                        >
                          View Profile
                        </Button>
                        <Button variant="outline" className="rounded-lg flex items-center gap-2">
                          <MessageSquare className="w-4 h-4" />
                          Message
                        </Button>
                        <Button className="bg-[#28A745] hover:bg-[#228B3A] text-white rounded-lg flex items-center gap-2">
                          <Check className="w-4 h-4" />
                          Shortlist
                        </Button>
                        <Button variant="outline" className="rounded-lg flex items-center gap-2 text-[#DC3545] border-[#DC3545]/30 hover:bg-red-50">
                          <X className="w-4 h-4" />
                          Decline
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alternate Suggestions */}
          <div>
            <h3 className="text-xl text-[#3C3C3C] mb-4" style={{ fontWeight: 600 }}>
              Alternate Suggestions
            </h3>
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="space-y-3">
                {alternateMatches.map((alt) => (
                  <div
                    key={alt.id}
                    className="flex items-center justify-between p-4 bg-[#FFF8F0] rounded-lg hover:bg-[#FFE5DD] transition-colors cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-[#3C3C3C]" style={{ fontWeight: 600 }}>
                          {alt.name}
                        </span>
                        <Badge variant="outline" className="border-[#FFC107] text-[#FFC107]">
                          {alt.matchScore}% Match
                        </Badge>
                      </div>
                      <p className="text-sm text-[#6B6B6B]">{alt.reason}</p>
                    </div>
                    <Button
                      onClick={() => onViewProfile(alt.id)}
                      variant="outline"
                      className="rounded-lg"
                    >
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Button
            onClick={() => {
              setShowResults(false);
              setStep(1);
            }}
            variant="outline"
            className="w-full h-12 rounded-xl"
          >
            Start New Search
          </Button>
        </div>
      )}
    </div>
  );
}
