import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import TopHeader from '../../components/TopHeader';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {
    ArrowLeft, Camera, X, User, Mail, MapPin, Users,
    Youtube, Instagram, Linkedin, Globe, Image as ImageIcon,
    Video as VideoIcon, Edit2, Plus, Trash2, Eye, Film
} from 'lucide-react';

export default function Profile() {
    const { user, updateUser } = useAuth();
    const { profiles } = useData();
    const navigate = useNavigate();

    const userProfile = profiles.find(p => p.id === user?.id || p.userId === user?.id);

    const [activeTab, setActiveTab] = useState('about');
    const [profilePhoto, setProfilePhoto] = useState(user?.profilePicture || userProfile?.profilePicture || '');
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        location: userProfile?.location || '',
        department: user?.department || '',
        bio: userProfile?.bio || '',
    });
    const [socialLinks, setSocialLinks] = useState({
        youtubeUrl: userProfile?.youtubeUrl || '',
        instagramUrl: userProfile?.instagramUrl || '',
        linkedinUrl: userProfile?.linkedinUrl || '',
        imdbUrl: userProfile?.imdbUrl || '',
        website: userProfile?.website || '',
    });
    const [portfolioWorks, setPortfolioWorks] = useState({
        photos: userProfile?.photos || [],
        videos: userProfile?.videos || [],
    });

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
                    await updateUser({
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
            setProfilePhoto('');
            await updateUser({
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
            await updateUser({
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

    const handleSaveSocialLinks = async () => {
        setIsSaving(true);
        try {
            await updateUser({
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

                if (type === 'photo') {
                    setPortfolioWorks(prev => ({
                        ...prev,
                        photos: [...prev.photos, newWork]
                    }));
                } else {
                    setPortfolioWorks(prev => ({
                        ...prev,
                        videos: [...prev.videos, newWork]
                    }));
                }

                // Auto-save to user profile
                try {
                    const updatedWorks = type === 'photo'
                        ? { photos: [...portfolioWorks.photos, newWork] }
                        : { videos: [...portfolioWorks.videos, newWork] };

                    await updateUser(updatedWorks);
                } catch (error) {
                    console.error('Error saving work:', error);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteWork = async (type, index) => {
        if (!confirm('Are you sure you want to delete this work?')) return;

        const updatedWorks = type === 'photo'
            ? portfolioWorks.photos.filter((_, i) => i !== index)
            : portfolioWorks.videos.filter((_, i) => i !== index);

        if (type === 'photo') {
            setPortfolioWorks(prev => ({ ...prev, photos: updatedWorks }));
        } else {
            setPortfolioWorks(prev => ({ ...prev, videos: updatedWorks }));
        }

        // Save to user profile
        try {
            await updateUser(type === 'photo' ? { photos: updatedWorks } : { videos: updatedWorks });
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
                                                        disabled
                                                        className="bg-gray-50"
                                                    />
                                                    <p className="text-xs text-[#6B6B6B]">Department cannot be changed</p>
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
                                        <div className="grid gap-4">
                                            {connections.map((connectionId, index) => {
                                                const connectedProfile = profiles.find(p => p.id === connectionId);
                                                if (!connectedProfile) return null;

                                                return (
                                                    <div
                                                        key={index}
                                                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-[#FFF8F0] transition-colors"
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF7A5A]/20 to-[#FFC107]/20 flex items-center justify-center overflow-hidden">
                                                                {connectedProfile.profilePicture ? (
                                                                    <img
                                                                        src={connectedProfile.profilePicture}
                                                                        alt={connectedProfile.name}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                ) : (
                                                                    <User className="w-8 h-8 text-[#6B6B6B]" />
                                                                )}
                                                            </div>
                                                            <div>
                                                                <h4 className="font-semibold text-[#3C3C3C]">{connectedProfile.name}</h4>
                                                                <p className="text-sm text-[#6B6B6B]">{connectedProfile.role || connectedProfile.department}</p>
                                                                {connectedProfile.location && (
                                                                    <p className="text-xs text-[#6B6B6B] flex items-center gap-1 mt-1">
                                                                        <MapPin className="w-3 h-3" />
                                                                        {connectedProfile.location}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <Button
                                                            variant="outline"
                                                            onClick={() => navigate(`/portfolio/${connectionId}`)}
                                                        >
                                                            View Profile
                                                        </Button>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <div className="text-center py-16">
                                            <Users className="w-16 h-16 mx-auto mb-4 text-[#6B6B6B] opacity-30" />
                                            <h3 className="text-lg font-semibold text-[#3C3C3C] mb-2">No connections yet</h3>
                                            <p className="text-[#6B6B6B] mb-6">Start connecting with other professionals!</p>
                                            <Button onClick={() => navigate('/explore')}>
                                                Explore People
                                            </Button>
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
