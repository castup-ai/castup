import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import TopHeader from '../../components/TopHeader';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useAI } from '../../context/AIContext';
import { userAPI, portfolioAPI } from '../../services/api';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {
    ArrowLeft, Camera, X, User, Mail, MapPin, Users,
    Youtube, Instagram, Linkedin, Globe, Image as ImageIcon,
    Video as VideoIcon, Edit2, Plus, Trash2, Eye, Film, Star
} from 'lucide-react';

export default function Profile() {
    const { user, updateUser } = useAuth();
    const { profiles, castingCalls, applyCastingCall } = useData();
    const { analyzeProfile, recommendOpportunities, generateSummary } = useAI();
    const navigate = useNavigate();

    const userProfile = profiles.find(p => p.id === user?.id || p.userId === user?.id);

    const [activeTab, setActiveTab] = useState('about');
    const [profilePhoto, setProfilePhoto] = useState(user?.profilePicture || userProfile?.profile_picture || '');
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        location: userProfile?.location || '',
        department: user?.department || '',
        bio: userProfile?.bio || '',
    });
    const [socialLinks, setSocialLinks] = useState({
        youtubeUrl: '',
        instagramUrl: '',
        linkedinUrl: '',
        imdbUrl: '',
        website: '',
    });
    const [portfolioWorks, setPortfolioWorks] = useState({
        photos: [],
        videos: [],
    });
    const [skills, setSkills] = useState([]);
    const [experience, setExperience] = useState([]);
    const [aiSuggestions, setAiSuggestions] = useState(null);
    const [aiPitch, setAiPitch] = useState('');
    const [matches, setMatches] = useState([]);
    const [newSkill, setNewSkill] = useState('');

    useEffect(() => {
        const fetchFullPortfolio = async () => {
            try {
                const response = await portfolioAPI.getMyPortfolio();
                if (response.data.success && response.data.portfolio) {
                    const p = response.data.portfolio;

                    // Parse media and external links if they are strings
                    const media = typeof p.media === 'string' ? JSON.parse(p.media) : (p.media || {});
                    const externalLinks = typeof p.external_links === 'string' ? JSON.parse(p.external_links) : (p.external_links || {});

                    setFormData(prev => ({
                        ...prev,
                        bio: p.bio || prev.bio
                    }));

                    setSocialLinks({
                        youtubeUrl: externalLinks.youtubeUrl || '',
                        instagramUrl: externalLinks.instagramUrl || '',
                        linkedinUrl: externalLinks.linkedinUrl || '',
                        imdbUrl: externalLinks.imdbUrl || '',
                        website: externalLinks.website || '',
                    });

                    setPortfolioWorks({
                        photos: media.photos || [],
                        videos: media.videos || [],
                    });

                    setSkills(p.skills || []);
                    setExperience(Array.isArray(p.experience) ? p.experience : (typeof p.experience === 'string' ? JSON.parse(p.experience) : []));
                }
            } catch (error) {
                console.error('Error fetching full portfolio:', error);
            }
        };

        if (user) {
            fetchFullPortfolio();
        }
    }, [user]);

    const [isEditingBasic, setIsEditingBasic] = useState(false);
    const [isEditingSocial, setIsEditingSocial] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const handlePhotoUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const photoData = reader.result;
                setProfilePhoto(photoData);

                setIsSaving(true);
                try {
                    // Persist to backend
                    await userAPI.updateProfile({
                        profilePicture: photoData,
                    });

                    // Update local context
                    updateUser({
                        profilePicture: photoData,
                    });
                    alert('Profile photo saved successfully!');
                } catch (error) {
                    console.error('Error saving photo:', error);
                    alert('Failed to save photo. Please try again.');
                } finally {
                    setIsSaving(false);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemovePhoto = async () => {
        if (!confirm('Are you sure you want to remove your profile photo?')) return;

        setIsSaving(true);
        try {
            // Persist to backend
            await userAPI.updateProfile({
                profilePicture: '',
            });

            setProfilePhoto('');
            updateUser({
                profilePicture: '',
            });
            alert('Profile photo removed successfully!');
        } catch (error) {
            console.error('Error removing photo:', error);
            alert('Failed to remove photo. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleSaveBasicInfo = async () => {
        setIsSaving(true);
        try {
            // 1. Update basic user info in users table
            await userAPI.updateProfile({
                name: formData.name,
                department: formData.department,
                profilePicture: profilePhoto,
            });

            // 2. Update bio in portfolios table
            await portfolioAPI.createOrUpdate({
                bio: formData.bio,
                experience: experience,
                skills: skills,
                media: portfolioWorks,
                externalLinks: socialLinks
            });

            // 3. Update local context
            updateUser({
                ...formData,
                profilePicture: profilePhoto,
            });

            setIsEditingBasic(false);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error saving profile:', error);
            alert('Failed to save profile. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleAnalyzeProfile = () => {
        const analysis = analyzeProfile({
            ...formData,
            skills,
            experience,
            profileImage: profilePhoto,
        });
        setAiSuggestions(analysis);

        // Generate AI Pitch
        if (formData.bio) {
            setAiPitch(generateSummary(formData.bio));
        }

        // Generate Matches
        const recs = recommendOpportunities({
            role: formData.department,
            skills: skills,
            experience: experience,
        }, castingCalls);
        setMatches(recs);
    };

    const handleAddSkill = () => {
        if (newSkill.trim() && !skills.includes(newSkill.trim())) {
            setSkills([...skills, newSkill.trim()]);
            setNewSkill('');
        }
    };

    const handleRemoveSkill = (skillToRemove) => {
        setSkills(skills.filter(s => s !== skillToRemove));
    };

    const handleAddExperience = () => {
        const newExp = { id: Date.now(), title: '', role: '', year: '' };
        setExperience([...experience, newExp]);
    };

    const handleUpdateExperience = (id, field, value) => {
        setExperience(experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp));
    };

    const handleRemoveExperience = (id) => {
        setExperience(experience.filter(exp => exp.id !== id));
    };

    const handleSaveProfessionalDetails = async () => {
        setIsSaving(true);
        try {
            await portfolioAPI.createOrUpdate({
                bio: formData.bio,
                experience: experience,
                skills: skills,
                media: portfolioWorks,
                externalLinks: socialLinks
            });
            alert('Professional details saved successfully!');
        } catch (error) {
            console.error('Error saving professional details:', error);
            alert('Failed to save details.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleSaveSocialLinks = async () => {
        setIsSaving(true);
        try {
            // Update social links in portfolios table
            await portfolioAPI.createOrUpdate({
                bio: formData.bio,
                experience: experience,
                skills: skills,
                media: portfolioWorks,
                externalLinks: socialLinks
            });

            // Update local context
            updateUser({
                ...socialLinks,
            });

            setIsEditingSocial(false);
            alert('Social links updated successfully!');
        } catch (error) {
            console.error('Error saving social links:', error);
            alert('Failed to save social links. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleWorkUpload = async (e, type) => {
        const files = Array.from(e.target.files);

        for (const file of files) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const workData = reader.result;
                const newWork = {
                    url: workData,
                    title: file.name,
                    uploadedAt: new Date().toISOString(),
                };

                // Persist to backend via portfolios API
                try {
                    const currentPhotos = portfolioWorks.photos || [];
                    const currentVideos = portfolioWorks.videos || [];

                    const updatedPhotos = type === 'photo' ? [...currentPhotos, newWork] : currentPhotos;
                    const updatedVideos = type === 'video' ? [...currentVideos, newWork] : currentVideos;

                    await portfolioAPI.createOrUpdate({
                        bio: formData.bio || '',
                        media: { photos: updatedPhotos, videos: updatedVideos },
                        externalLinks: socialLinks || {},
                        experience: experience || [],
                        skills: skills || []
                    });

                    // Update local state after successful API call
                    if (type === 'photo') {
                        setPortfolioWorks(prev => ({
                            ...prev,
                            photos: updatedPhotos
                        }));
                    } else {
                        setPortfolioWorks(prev => ({
                            ...prev,
                            videos: updatedVideos
                        }));
                    }

                    // Update local user context if needed (to keep sync)
                    updateUser({
                        photos: updatedPhotos,
                        videos: updatedVideos
                    });
                } catch (error) {
                    console.error('Error saving work:', error);
                    alert(`Failed to save ${type}. Please try again.`);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteWork = async (type, index) => {
        if (!confirm('Are you sure you want to delete this work?')) return;

        try {
            const updatedPhotos = type === 'photo'
                ? portfolioWorks.photos.filter((_, i) => i !== index)
                : (portfolioWorks.photos || []);

            const updatedVideos = type === 'video'
                ? portfolioWorks.videos.filter((_, i) => i !== index)
                : (portfolioWorks.videos || []);

            // Persist to backend
            await portfolioAPI.createOrUpdate({
                bio: formData.bio || '',
                media: { photos: updatedPhotos, videos: updatedVideos },
                externalLinks: socialLinks || {},
                experience: experience || [],
                skills: skills || []
            });

            // Update local state
            if (type === 'photo') {
                setPortfolioWorks(prev => ({ ...prev, photos: updatedPhotos }));
            } else {
                setPortfolioWorks(prev => ({ ...prev, videos: updatedVideos }));
            }

            // Keep local context in sync
            updateUser({
                photos: updatedPhotos,
                videos: updatedVideos
            });

            alert('Work deleted successfully!');
        } catch (error) {
            console.error('Error deleting work:', error);
            alert('Failed to delete work.');
        }

    };

    const connections = userProfile?.connections || [];
    const stats = {
        views: userProfile?.views || 0,
        works: (portfolioWorks.photos?.length || 0) + (portfolioWorks.videos?.length || 0),
        connections: connections.length,
    };

    return (
        <DashboardLayout>
            <TopHeader title="My Profile" />
            <main className="flex-1 overflow-auto p-8 bg-gray-50">
                {/* Back Button */}
                <div className="max-w-6xl mx-auto mb-4">
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/dashboard')}
                        className="text-[#6B6B6B] hover:text-[#3C3C3C]"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Dashboard
                    </Button>
                </div>

                <div className="max-w-6xl mx-auto space-y-6">
                    {/* Profile Header Card */}
                    <Card>
                        <CardContent className="p-8">
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                {/* Profile Photo */}
                                <div className="relative">
                                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#FF7A5A]/20 to-[#FFC107]/20 flex items-center justify-center overflow-hidden ring-4 ring-white shadow-lg">
                                        {profilePhoto ? (
                                            <img
                                                src={profilePhoto}
                                                alt={user?.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <User className="w-16 h-16 text-[#6B6B6B]" />
                                        )}
                                    </div>
                                    <label htmlFor="photo-upload" className="absolute bottom-0 right-0 bg-[#FF7A5A] text-white rounded-full p-2 cursor-pointer hover:bg-[#FF6A4A] transition-colors shadow-lg">
                                        <Camera className="w-4 h-4" />
                                        <input
                                            id="photo-upload"
                                            type="file"
                                            accept="image/*"
                                            onChange={handlePhotoUpload}
                                            className="hidden"
                                        />
                                    </label>
                                    {profilePhoto && (
                                        <button
                                            onClick={handleRemovePhoto}
                                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 shadow-lg"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>

                                {/* Profile Info */}
                                <div className="flex-1 text-center md:text-left">
                                    <h1 className="text-3xl font-bold text-[#3C3C3C] mb-2">{formData.name}</h1>
                                    <p className="text-lg text-[#6B6B6B] mb-4">{formData.department}</p>

                                    {/* Stats */}
                                    <div className="flex justify-center md:justify-start gap-8 mb-4">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-[#3C3C3C]">{stats.works}</div>
                                            <div className="text-sm text-[#6B6B6B]">Works</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-[#3C3C3C]">{stats.connections}</div>
                                            <div className="text-sm text-[#6B6B6B]">Connections</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-[#3C3C3C]">{stats.views}</div>
                                            <div className="text-sm text-[#6B6B6B]">Views</div>
                                        </div>
                                    </div>

                                    {formData.location && (
                                        <div className="flex items-center justify-center md:justify-start gap-2 text-[#6B6B6B]">
                                            <MapPin className="w-4 h-4" />
                                            <span>{formData.location}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tabs */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="flex border-b border-gray-200">
                            <button
                                onClick={() => setActiveTab('about')}
                                className={`flex-1 px-6 py-4 font-medium transition-colors ${activeTab === 'about'
                                    ? 'text-[#FF7A5A] border-b-2 border-[#FF7A5A]'
                                    : 'text-[#6B6B6B] hover:text-[#3C3C3C]'
                                    }`}
                            >
                                About
                            </button>
                            <button
                                onClick={() => setActiveTab('works')}
                                className={`flex-1 px-6 py-4 font-medium transition-colors ${activeTab === 'works'
                                    ? 'text-[#FF7A5A] border-b-2 border-[#FF7A5A]'
                                    : 'text-[#6B6B6B] hover:text-[#3C3C3C]'
                                    }`}
                            >
                                Works
                            </button>
                            <button
                                onClick={() => setActiveTab('connections')}
                                className={`flex-1 px-6 py-4 font-medium transition-colors ${activeTab === 'connections'
                                    ? 'text-[#FF7A5A] border-b-2 border-[#FF7A5A]'
                                    : 'text-[#6B6B6B] hover:text-[#3C3C3C]'
                                    }`}
                            >
                                Connections
                            </button>
                            <button
                                onClick={() => setActiveTab('matches')}
                                className={`flex-1 px-6 py-4 font-medium transition-colors ${activeTab === 'matches'
                                    ? 'text-[#FF7A5A] border-b-2 border-[#FF7A5A]'
                                    : 'text-[#6B6B6B] hover:text-[#3C3C3C]'
                                    }`}
                            >
                                <span className="flex items-center justify-center gap-1">
                                    Matches
                                    <Badge variant="secondary" className="px-1.5 py-0 text-[10px]">AI</Badge>
                                </span>
                            </button>
                        </div>

                        <div className="p-6">
                            {/* About Tab */}
                            {activeTab === 'about' && (
                                <div className="space-y-6">
                                    {/* Basic Information */}
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between">
                                            <CardTitle>Basic Information</CardTitle>
                                            {!isEditingBasic ? (
                                                <Button onClick={() => setIsEditingBasic(true)} variant="outline" size="sm">
                                                    <Edit2 className="w-4 h-4 mr-2" />
                                                    Edit
                                                </Button>
                                            ) : (
                                                <div className="flex gap-2">
                                                    <Button onClick={() => setIsEditingBasic(false)} variant="outline" size="sm">
                                                        Cancel
                                                    </Button>
                                                    <Button onClick={handleSaveBasicInfo} disabled={isSaving} size="sm">
                                                        {isSaving ? 'Saving...' : 'Save'}
                                                    </Button>
                                                </div>
                                            )}
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid gap-6">
                                                <div className="grid gap-2">
                                                    <Label htmlFor="name">Full Name</Label>
                                                    <Input
                                                        id="name"
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                        disabled={!isEditingBasic}
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="email">Email</Label>
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                        disabled={!isEditingBasic}
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="phone">Phone Number</Label>
                                                    <Input
                                                        id="phone"
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                        disabled={!isEditingBasic}
                                                        placeholder="Optional"
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="location">Location</Label>
                                                    <Input
                                                        id="location"
                                                        value={formData.location}
                                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                                        disabled={!isEditingBasic}
                                                        placeholder="City, Country"
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="bio">Bio</Label>
                                                    <textarea
                                                        id="bio"
                                                        value={formData.bio}
                                                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                                        disabled={!isEditingBasic}
                                                        placeholder="Tell us about yourself..."
                                                        className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="department">Department/Role</Label>
                                                    <Input
                                                        id="department"
                                                        value={formData.department}
                                                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                                        disabled={!isEditingBasic}
                                                        placeholder="Actor, Director, etc."
                                                    />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* AI Suggestions & Completeness */}
                                    <Card className="border-[#FF7A5A]/20 bg-gradient-to-br from-white to-[#FFF8F0]">
                                        <CardHeader>
                                            <div className="flex items-center justify-between">
                                                <CardTitle className="flex items-center gap-2">
                                                    <div className="p-2 bg-[#FF7A5A] rounded-lg text-white">
                                                        <Film className="w-5 h-5" />
                                                    </div>
                                                    AI Profile Analysis
                                                </CardTitle>
                                                <Button onClick={handleAnalyzeProfile} variant="outline" size="sm" className="border-[#FF7A5A] text-[#FF7A5A] hover:bg-[#FF7A5A] hover:text-white">
                                                    🤖 Get AI Suggestions
                                                </Button>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            {aiSuggestions ? (
                                                <>
                                                    <div className="space-y-2">
                                                        <div className="flex justify-between text-sm">
                                                            <span className="font-medium text-[#6B6B6B]">Profile Completeness</span>
                                                            <span className="font-bold text-[#FF7A5A]">{aiSuggestions.completeness}%</span>
                                                        </div>
                                                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                                            <div
                                                                className="h-full bg-gradient-to-r from-[#FF7A5A] to-[#FFC107] transition-all duration-500"
                                                                style={{ width: `${aiSuggestions.completeness}%` }}
                                                            />
                                                        </div>
                                                    </div>

                                                    {aiSuggestions.suggestions.length > 0 && (
                                                        <div className="space-y-2">
                                                            <p className="text-sm font-medium text-[#3C3C3C]">Suggestions to improve:</p>
                                                            <ul className="space-y-1">
                                                                {aiSuggestions.suggestions.map((s, i) => (
                                                                    <li key={i} className="text-sm text-[#6B6B6B] flex items-center gap-2">
                                                                        <span className={`w-1.5 h-1.5 rounded-full ${s.priority === 'high' ? 'bg-red-500' : 'bg-yellow-500'}`} />
                                                                        {s.message}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}

                                                    {aiSuggestions.hashtags.length > 0 && (
                                                        <div className="space-y-2">
                                                            <p className="text-sm font-medium text-[#3C3C3C]">Suggested Hashtags:</p>
                                                            <div className="flex flex-wrap gap-2">
                                                                {aiSuggestions.hashtags.map((tag, i) => (
                                                                    <Badge key={i} variant="secondary" className="bg-white">{tag}</Badge>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {aiPitch && (
                                                        <div className="mt-4 p-4 bg-[#FF7A5A]/5 rounded-lg border border-[#FF7A5A]/10">
                                                            <p className="text-xs font-bold text-[#FF7A5A] uppercase tracking-wider mb-2 flex items-center gap-1">
                                                                <Star className="w-3 h-3" />
                                                                Pro AI Tip: Your Elevator Pitch
                                                            </p>
                                                            <p className="text-sm text-[#3C3C3C] italic leading-relaxed">
                                                                "{aiPitch}"
                                                            </p>
                                                        </div>
                                                    )}
                                                </>
                                            ) : (
                                                <div className="text-center py-4">
                                                    <p className="text-sm text-[#6B6B6B]">Click the button above to analyze your profile and get personalized AI suggestions!</p>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>

                                    {/* Skills & Experience */}
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between">
                                            <CardTitle>Professional Details</CardTitle>
                                            <Button onClick={handleSaveProfessionalDetails} disabled={isSaving} size="sm">
                                                {isSaving ? 'Saving...' : 'Save Changes'}
                                            </Button>
                                        </CardHeader>
                                        <CardContent className="space-y-8">
                                            {/* Skills Section */}
                                            <div className="space-y-4">
                                                <Label className="text-lg font-bold">Skills</Label>
                                                <div className="flex gap-2">
                                                    <Input
                                                        placeholder="Add a skill (e.g. Method Acting)"
                                                        value={newSkill}
                                                        onChange={(e) => setNewSkill(e.target.value)}
                                                        onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                                                    />
                                                    <Button onClick={handleAddSkill} type="button" variant="outline">
                                                        <Plus className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {skills.map((skill, i) => (
                                                        <Badge key={i} className="pl-3 pr-1 py-1 flex items-center gap-1">
                                                            {skill}
                                                            <button onClick={() => handleRemoveSkill(skill)} className="p-0.5 hover:bg-black/10 rounded-full transition-colors">
                                                                <X className="w-3 h-3" />
                                                            </button>
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Experience Section */}
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <Label className="text-lg font-bold">Experience</Label>
                                                    <Button onClick={handleAddExperience} variant="outline" size="sm">
                                                        <Plus className="w-4 h-4 mr-2" />
                                                        Add Entry
                                                    </Button>
                                                </div>
                                                <div className="space-y-4">
                                                    {experience.map((exp, i) => (
                                                        <div key={exp.id || i} className="p-4 rounded-lg border border-gray-100 bg-gray-50/50 space-y-4 relative group">
                                                            <button
                                                                onClick={() => handleRemoveExperience(exp.id)}
                                                                className="absolute top-2 right-2 p-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                <div className="space-y-2">
                                                                    <Label className="text-xs">Project/Company</Label>
                                                                    <Input
                                                                        value={exp.title || ''}
                                                                        onChange={(e) => handleUpdateExperience(exp.id, 'title', e.target.value)}
                                                                        placeholder="e.g. Movie Name or Studio"
                                                                    />
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <Label className="text-xs">Role</Label>
                                                                    <Input
                                                                        value={exp.role || ''}
                                                                        onChange={(e) => handleUpdateExperience(exp.id, 'role', e.target.value)}
                                                                        placeholder="e.g. Lead Actor"
                                                                    />
                                                                </div>
                                                                <div className="space-y-2 md:col-span-2">
                                                                    <Label className="text-xs">Year/Duration</Label>
                                                                    <Input
                                                                        value={exp.year || ''}
                                                                        onChange={(e) => handleUpdateExperience(exp.id, 'year', e.target.value)}
                                                                        placeholder="e.g. 2023 - Present"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    {experience.length === 0 && (
                                                        <p className="text-sm text-[#6B6B6B] text-center py-4 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                                                            No experience entries added yet.
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Social Media Links */}
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between">
                                            <CardTitle>Social Media Links</CardTitle>
                                            {!isEditingSocial ? (
                                                <Button onClick={() => setIsEditingSocial(true)} variant="outline" size="sm">
                                                    <Edit2 className="w-4 h-4 mr-2" />
                                                    Edit
                                                </Button>
                                            ) : (
                                                <div className="flex gap-2">
                                                    <Button onClick={() => setIsEditingSocial(false)} variant="outline" size="sm">
                                                        Cancel
                                                    </Button>
                                                    <Button onClick={handleSaveSocialLinks} disabled={isSaving} size="sm">
                                                        {isSaving ? 'Saving...' : 'Save'}
                                                    </Button>
                                                </div>
                                            )}
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid gap-4">
                                                <div className="flex items-center gap-3">
                                                    <Youtube className="w-5 h-5 text-red-600 flex-shrink-0" />
                                                    <Input
                                                        placeholder="YouTube URL"
                                                        value={socialLinks.youtubeUrl}
                                                        onChange={(e) => setSocialLinks({ ...socialLinks, youtubeUrl: e.target.value })}
                                                        disabled={!isEditingSocial}
                                                    />
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Instagram className="w-5 h-5 text-pink-600 flex-shrink-0" />
                                                    <Input
                                                        placeholder="Instagram URL"
                                                        value={socialLinks.instagramUrl}
                                                        onChange={(e) => setSocialLinks({ ...socialLinks, instagramUrl: e.target.value })}
                                                        disabled={!isEditingSocial}
                                                    />
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Linkedin className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                                    <Input
                                                        placeholder="LinkedIn URL"
                                                        value={socialLinks.linkedinUrl}
                                                        onChange={(e) => setSocialLinks({ ...socialLinks, linkedinUrl: e.target.value })}
                                                        disabled={!isEditingSocial}
                                                    />
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Globe className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                                                    <Input
                                                        placeholder="IMDb URL"
                                                        value={socialLinks.imdbUrl}
                                                        onChange={(e) => setSocialLinks({ ...socialLinks, imdbUrl: e.target.value })}
                                                        disabled={!isEditingSocial}
                                                    />
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Globe className="w-5 h-5 text-gray-600 flex-shrink-0" />
                                                    <Input
                                                        placeholder="Website URL"
                                                        value={socialLinks.website}
                                                        onChange={(e) => setSocialLinks({ ...socialLinks, website: e.target.value })}
                                                        disabled={!isEditingSocial}
                                                    />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Quick Actions */}
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Quick Actions</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid gap-3">
                                                <Button
                                                    variant="outline"
                                                    className="justify-start"
                                                    onClick={() => navigate(`/portfolio/${user?.id}`)}
                                                >
                                                    <Eye className="w-4 h-4 mr-2" />
                                                    View Public Portfolio
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    className="justify-start"
                                                    onClick={() => navigate('/portfolio/edit')}
                                                >
                                                    <Edit2 className="w-4 h-4 mr-2" />
                                                    Edit Portfolio Details
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    className="justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                                                    onClick={() => {
                                                        if (confirm('Are you sure you want to logout?')) {
                                                            navigate('/logout');
                                                        }
                                                    }}
                                                >
                                                    Logout
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            )}

                            {/* Works Tab */}
                            {activeTab === 'works' && (
                                <div className="space-y-6">
                                    {/* Upload Section */}
                                    <div className="flex gap-3 justify-center">
                                        <label htmlFor="photo-works-upload">
                                            <Button variant="outline" className="cursor-pointer" asChild>
                                                <span>
                                                    <ImageIcon className="w-4 h-4 mr-2" />
                                                    Upload Photos
                                                </span>
                                            </Button>
                                            <input
                                                id="photo-works-upload"
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                onChange={(e) => handleWorkUpload(e, 'photo')}
                                                className="hidden"
                                            />
                                        </label>
                                        <label htmlFor="video-works-upload">
                                            <Button variant="outline" className="cursor-pointer" asChild>
                                                <span>
                                                    <VideoIcon className="w-4 h-4 mr-2" />
                                                    Upload Videos
                                                </span>
                                            </Button>
                                            <input
                                                id="video-works-upload"
                                                type="file"
                                                accept="video/*"
                                                multiple
                                                onChange={(e) => handleWorkUpload(e, 'video')}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>

                                    {/* Photos Grid */}
                                    {portfolioWorks.photos && portfolioWorks.photos.length > 0 && (
                                        <div>
                                            <h3 className="text-lg font-semibold text-[#3C3C3C] mb-4 flex items-center gap-2">
                                                <ImageIcon className="w-5 h-5" />
                                                Photos ({portfolioWorks.photos.length})
                                            </h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {portfolioWorks.photos.map((photo, index) => (
                                                    <div key={index} className="relative group aspect-square rounded-lg overflow-hidden bg-gray-100">
                                                        <img
                                                            src={photo.url || photo}
                                                            alt={photo.title || `Photo ${index + 1}`}
                                                            className="w-full h-full object-cover"
                                                        />
                                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                            <Button
                                                                size="sm"
                                                                variant="destructive"
                                                                onClick={() => handleDeleteWork('photo', index)}
                                                            >
                                                                <Trash2 className="w-4 h-4 mr-2" />
                                                                Delete
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Videos Grid */}
                                    {portfolioWorks.videos && portfolioWorks.videos.length > 0 && (
                                        <div>
                                            <h3 className="text-lg font-semibold text-[#3C3C3C] mb-4 flex items-center gap-2">
                                                <VideoIcon className="w-5 h-5" />
                                                Videos ({portfolioWorks.videos.length})
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {portfolioWorks.videos.map((video, index) => (
                                                    <div key={index} className="relative group rounded-lg overflow-hidden bg-gray-100">
                                                        <div className="aspect-video">
                                                            <video
                                                                src={video.url || video}
                                                                controls
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        <div className="p-3 flex items-center justify-between bg-white">
                                                            <p className="text-sm font-medium text-[#3C3C3C] truncate">
                                                                {video.title || `Video ${index + 1}`}
                                                            </p>
                                                            <Button
                                                                size="sm"
                                                                variant="ghost"
                                                                onClick={() => handleDeleteWork('video', index)}
                                                                className="text-red-500 hover:text-red-600"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Empty State */}
                                    {(!portfolioWorks.photos || portfolioWorks.photos.length === 0) &&
                                        (!portfolioWorks.videos || portfolioWorks.videos.length === 0) && (
                                            <div className="text-center py-16">
                                                <Film className="w-16 h-16 mx-auto mb-4 text-[#6B6B6B] opacity-30" />
                                                <h3 className="text-lg font-semibold text-[#3C3C3C] mb-2">No works yet</h3>
                                                <p className="text-[#6B6B6B] mb-6">Upload your photos and videos to showcase your portfolio</p>
                                            </div>
                                        )}
                                </div>
                            )}

                            {/* Connections Tab */}
                            {activeTab === 'connections' && (
                                <div>
                                    {connections.length > 0 ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {connections.map((connectionId, index) => {
                                                const connectedProfile = profiles.find(p => p.id === connectionId);
                                                if (!connectedProfile) return null;

                                                return (
                                                    <Card key={index} className="group hover:shadow-md transition-shadow">
                                                        <CardContent className="p-6 text-center">
                                                            <div className="w-20 h-20 rounded-full bg-gray-100 mx-auto mb-4 overflow-hidden ring-2 ring-[#FF7A5A]/20">
                                                                {connectedProfile.profilePicture ? (
                                                                    <img src={connectedProfile.profilePicture} alt={connectedProfile.name} className="w-full h-full object-cover" />
                                                                ) : (
                                                                    <div className="w-full h-full flex items-center justify-center text-2xl bg-[#FF7A5A]/10 text-[#FF7A5A]">
                                                                        {connectedProfile.name?.charAt(0)}
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <h4 className="font-bold text-[#3C3C3C] mb-1">{connectedProfile.name}</h4>
                                                            <p className="text-xs text-[#6B6B6B] mb-4">{connectedProfile.department || connectedProfile.role}</p>
                                                            <Button size="sm" variant="outline" className="w-full" onClick={() => navigate(`/portfolio/${connectionId}`)}>
                                                                View Profile
                                                            </Button>
                                                        </CardContent>
                                                    </Card>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <div className="text-center py-16">
                                            <Users className="w-16 h-16 mx-auto mb-4 text-[#6B6B6B] opacity-30" />
                                            <h3 className="text-lg font-semibold text-[#3C3C3C] mb-2">No connections yet</h3>
                                            <p className="text-[#6B6B6B] mb-6">Start exploring talent to build your network</p>
                                            <Button onClick={() => navigate('/explore')}>Explore People</Button>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Matches Tab */}
                            {activeTab === 'matches' && (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-bold text-[#3C3C3C] flex items-center gap-2">
                                            <Film className="w-6 h-6 text-[#FF7A5A]" />
                                            Recommended for You
                                        </h3>
                                        <Button onClick={handleAnalyzeProfile} variant="ghost" size="sm" className="text-[#FF7A5A]">
                                            Refresh AI Recommendations
                                        </Button>
                                    </div>

                                    {matches.length > 0 ? (
                                        <div className="grid gap-4">
                                            {matches.map((match, index) => (
                                                <Card key={index} className="overflow-hidden hover:border-[#FF7A5A]/50 transition-colors">
                                                    <CardContent className="p-6">
                                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                                            <div className="flex-1 space-y-2">
                                                                <div className="flex items-center gap-2">
                                                                    <h4 className="text-xl font-bold text-[#3C3C3C]">{match.title || match.projectTitle}</h4>
                                                                    <Badge variant="secondary" className="bg-[#FF7A5A] text-white border-0">
                                                                        {match.matchScore}% Match
                                                                    </Badge>
                                                                </div>
                                                                <p className="text-[#6B6B6B] font-medium">{match.targetRole || match.role}</p>
                                                                <div className="flex flex-wrap gap-4 text-sm text-[#6B6B6B]">
                                                                    <span className="flex items-center gap-1">
                                                                        <MapPin className="w-4 h-4" />
                                                                        {match.location || 'Remote'}
                                                                    </span>
                                                                    <span className="flex items-center gap-1 text-[#FF7A5A]">
                                                                        <Plus className="w-4 h-4" />
                                                                        {match.reason}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="flex gap-2 shrink-0">
                                                                <Button variant="outline" onClick={() => navigate(`/casting/${match.id}`)}>
                                                                    View Details
                                                                </Button>
                                                                <Button onClick={() => applyCastingCall(match.id, user.id, "Interested in this role based on AI recommendation.")}>
                                                                    Quick Apply
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-16 bg-white rounded-lg border border-dashed border-gray-200">
                                            <div className="w-20 h-20 bg-[#FF7A5A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Film className="w-10 h-10 text-[#FF7A5A]" />
                                            </div>
                                            <h3 className="text-lg font-semibold text-[#3C3C3C] mb-2">No active matches found</h3>
                                            <p className="text-[#6B6B6B] max-w-md mx-auto mb-6">
                                                We couldn't find any open casting calls that match your profile right now. Try updating your skills or bio to get better recommendations!
                                            </p>
                                            <Button onClick={() => navigate('/casting')}>Browse All Opportunities</Button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </DashboardLayout>
    );
}
