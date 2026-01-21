import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Sparkles, Plus, X, Upload, Link as LinkIcon, CheckCircle } from 'lucide-react';
import { Badge } from './ui/badge';
import type { User } from '../App';

interface PortfolioEditProps {
  user: User;
  onUpdateUser: (user: User) => void;
}

export default function PortfolioEdit({ user, onUpdateUser }: PortfolioEditProps) {
  const [bio, setBio] = useState(user.bio || '');
  const [skills, setSkills] = useState<string[]>(user.skills || []);
  const [newSkill, setNewSkill] = useState('');
  const [experience, setExperience] = useState(user.experience || []);
  const [showAISuggestions, setShowAISuggestions] = useState(false);

  const aiSuggestedSkills = ['Method Acting', 'Stage Combat', 'Accent Training', 'Voice Modulation', 'Screen Acting'];

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleAddAISkill = (skill: string) => {
    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
  };

  const handleSummarizeWithAI = () => {
    const aiSummary = `Talented ${user.role.toLowerCase()} with a passion for storytelling and creating compelling performances. Experienced in various genres and committed to bringing authentic characters to life on screen and stage.`;
    setBio(aiSummary);
  };

  const handleSave = () => {
    onUpdateUser({
      ...user,
      bio,
      skills,
      experience,
    });
    alert('Profile updated successfully!');
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* AI Assistant Banner */}
      <div className="mb-8 p-6 bg-gradient-to-r from-[#FF7A5A]/10 to-[#FFC107]/10 rounded-2xl border border-[#FFC107]/30">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-6 h-6 text-[#FFC107]" />
          <h3 className="text-xl text-[#3C3C3C]" style={{ fontWeight: 600 }}>
            Make your profile shine!
          </h3>
        </div>
        <p className="text-[#6B6B6B]">
          Let AI help you optimize your portfolio for maximum visibility and engagement.
        </p>
      </div>

      <div className="space-y-8">
        {/* Header Section */}
        <div>
          <h2 className="text-2xl text-[#3C3C3C] mb-6" style={{ fontWeight: 700 }}>Edit Profile</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Profile Picture */}
            <div>
              <Label className="mb-2">Profile Picture</Label>
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#FF7A5A] to-[#FFC107] flex items-center justify-center text-white text-6xl">
                {user.name.charAt(0)}
              </div>
              <Button variant="outline" className="w-full mt-3 rounded-lg">
                <Upload className="w-4 h-4 mr-2" />
                Upload Photo
              </Button>
            </div>

            {/* Cover Photo */}
            <div>
              <Label className="mb-2">Cover Photo</Label>
              <div className="aspect-[16/9] rounded-2xl bg-gradient-to-r from-[#FF7A5A]/20 to-[#FFC107]/20 flex items-center justify-center">
                <div className="text-center text-[#6B6B6B]">
                  <Upload className="w-8 h-8 mx-auto mb-2" />
                  <p>Upload Cover Photo</p>
                </div>
              </div>
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label>Full Name</Label>
              <Input value={user.name} className="mt-2 h-12 rounded-lg" disabled />
            </div>
            <div>
              <Label>Primary Role</Label>
              <Input value={user.role} className="mt-2 h-12 rounded-lg" disabled />
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Label>Professional Bio</Label>
            <Button
              onClick={handleSummarizeWithAI}
              variant="outline"
              className="flex items-center gap-2 rounded-lg border-[#FFC107] text-[#FFC107] hover:bg-[#FFC107]/10"
            >
              <Sparkles className="w-4 h-4" />
              Summarize with AI
            </Button>
          </div>
          <Textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us about yourself, your experience, and what makes you unique..."
            className="min-h-32 rounded-lg"
          />
          <p className="text-sm text-[#6B6B6B] mt-2">{bio.length} / 500 characters</p>
        </div>

        {/* Skills Section */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Label>Skills & Expertise</Label>
            <Button
              onClick={() => setShowAISuggestions(!showAISuggestions)}
              variant="outline"
              className="flex items-center gap-2 rounded-lg border-[#FFC107] text-[#FFC107] hover:bg-[#FFC107]/10"
            >
              <Sparkles className="w-4 h-4" />
              AI Suggestions
            </Button>
          </div>

          {/* AI Suggested Skills */}
          {showAISuggestions && (
            <div className="mb-4 p-4 bg-[#FFC107]/10 rounded-lg border border-[#FFC107]/30">
              <p className="text-sm text-[#6B6B6B] mb-3">AI Recommended Skills:</p>
              <div className="flex flex-wrap gap-2">
                {aiSuggestedSkills.map((skill, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAddAISkill(skill)}
                    className="px-3 py-1 bg-white rounded-full text-sm text-[#3C3C3C] border border-[#FFC107] hover:bg-[#FFC107] hover:text-white transition-colors flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add Skill Input */}
          <div className="flex gap-2 mb-4">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
              placeholder="Add a skill..."
              className="h-10 rounded-lg"
            />
            <Button onClick={handleAddSkill} className="bg-[#FF7A5A] hover:bg-[#FF6A4A] rounded-lg">
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {/* Current Skills */}
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, idx) => (
              <Badge
                key={idx}
                className="bg-[#FF7A5A] text-white px-3 py-1 flex items-center gap-2"
              >
                {skill}
                <button onClick={() => handleRemoveSkill(skill)}>
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>

        {/* Experience Section */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Label>Experience & Projects</Label>
            <Button variant="outline" className="flex items-center gap-2 rounded-lg">
              <Plus className="w-4 h-4" />
              Add Project
            </Button>
          </div>

          <div className="space-y-4">
            {[1, 2].map((item) => (
              <div key={item} className="p-4 border border-[rgba(0,0,0,0.1)] rounded-lg">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input placeholder="Project Title" className="h-10 rounded-lg" />
                  <Input placeholder="Your Role" className="h-10 rounded-lg" />
                  <Input placeholder="Year" className="h-10 rounded-lg" />
                  <Input placeholder="Production Company" className="h-10 rounded-lg" />
                </div>
                <Textarea placeholder="Description" className="mt-4 rounded-lg" />
              </div>
            ))}
          </div>
        </div>

        {/* Media Gallery */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <Label className="mb-4">Media Gallery</Label>
          <div className="grid md:grid-cols-3 gap-4">
            <button className="aspect-video rounded-lg border-2 border-dashed border-[rgba(0,0,0,0.2)] flex flex-col items-center justify-center text-[#6B6B6B] hover:border-[#FF7A5A] hover:text-[#FF7A5A] transition-colors">
              <Upload className="w-8 h-8 mb-2" />
              <span>Upload Headshot</span>
            </button>
            <button className="aspect-video rounded-lg border-2 border-dashed border-[rgba(0,0,0,0.2)] flex flex-col items-center justify-center text-[#6B6B6B] hover:border-[#FF7A5A] hover:text-[#FF7A5A] transition-colors">
              <Upload className="w-8 h-8 mb-2" />
              <span>Upload Demo Reel</span>
            </button>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <Label className="mb-4">Social Links</Label>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-[#6B6B6B]" />
              <Input placeholder="IMDb Profile URL" className="h-10 rounded-lg" />
            </div>
            <div className="flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-[#6B6B6B]" />
              <Input placeholder="Instagram URL" className="h-10 rounded-lg" />
            </div>
            <div className="flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-[#6B6B6B]" />
              <Input placeholder="YouTube Channel" className="h-10 rounded-lg" />
            </div>
            <div className="flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-[#6B6B6B]" />
              <Input placeholder="Website" className="h-10 rounded-lg" />
            </div>
          </div>
        </div>

        {/* Credentials */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Label>Credentials & Certifications</Label>
              <CheckCircle className="w-5 h-5 text-[#28A745]" />
            </div>
            <Button variant="outline" className="flex items-center gap-2 rounded-lg">
              <Upload className="w-4 h-4" />
              Upload Document
            </Button>
          </div>
          <p className="text-sm text-[#6B6B6B]">
            Upload verified credentials to earn a verified badge on your profile
          </p>
        </div>

        {/* Save Button */}
        <div className="flex gap-4">
          <Button
            onClick={handleSave}
            className="flex-1 h-12 bg-[#FF7A5A] hover:bg-[#FF6A4A] text-white rounded-xl shadow-lg"
          >
            Save Changes
          </Button>
          <Button
            variant="outline"
            className="h-12 px-8 rounded-xl"
          >
            Preview
          </Button>
        </div>
      </div>
    </div>
  );
}
