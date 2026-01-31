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
import { Avatar } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import { ArrowLeft, Camera, Upload, X, User, Mail, MapPin, Users } from 'lucide-react';

export default function Profile() {
    const { user, updateUser } = useAuth();
    const { profiles } = useData();
    const navigate = useNavigate();

    const userProfile = profiles.find(p => p.id === user?.id || p.userId === user?.id);

    const [profilePhoto, setProfilePhoto] = useState(user?.profilePicture || userProfile?.profilePicture || '');
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        location: userProfile?.location || '',
        department: user?.department || '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const handlePhotoUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const photoData = reader.result;
                setProfilePhoto(photoData);

                // Auto-save photo immediately
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

    const handleSavePhoto = async () => {
        if (!profilePhoto) return;

        setIsSaving(true);
        try {
            // Update user profile immediately in local state
            await updateUser({
                profilePicture: profilePhoto,
            });

            alert('Profile photo saved successfully!');
        } catch (error) {
            console.error('Error saving photo:', error);
            alert('Failed to save photo. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            // Update all user data including photo
            await updateUser({
                ...formData,
                profilePicture: profilePhoto,
            });

            setIsEditing(false);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error saving profile:', error);
            alert('Failed to save profile. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const connections = userProfile?.connections || [];

    return (
        <DashboardLayout>
            <TopHeader title="My Profile" />
            <main className="flex-1 overflow-auto p-8">
                {/* Back Button */}
                <div className="max-w-4xl mx-auto mb-4">
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/dashboard')}
                        className="text-[#6B6B6B] hover:text-[#3C3C3C]"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Dashboard
                    </Button>
                </div>

                <div className="max-w-4xl mx-auto space-y-6">
                    {/* Profile Photo Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Photo</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col md:flex-row items-center gap-6">
                                <div className="relative">
                                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#FF7A5A]/20 to-[#FFC107]/20 flex items-center justify-center text-5xl overflow-hidden">
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
                                    {profilePhoto && (
                                        <button
                                            onClick={handleRemovePhoto}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                                <div className="flex flex-col gap-3">
                                    <p className="text-sm text-[#6B6B6B]">
                                        Upload a profile photo to personalize your account
                                    </p>
                                    <div className="flex gap-3">
                                        <label htmlFor="photo-upload">
                                            <Button variant="outline" className="cursor-pointer" asChild>
                                                <span>
                                                    <Camera className="w-4 h-4 mr-2" />
                                                    {profilePhoto ? 'Change Photo' : 'Upload Photo'}
                                                </span>
                                            </Button>
                                            <input
                                                id="photo-upload"
                                                type="file"
                                                accept="image/*"
                                                onChange={handlePhotoUpload}
                                                className="hidden"
                                            />
                                        </label>
                                        {profilePhoto && (
                                            <Button
                                                variant="outline"
                                                onClick={handleRemovePhoto}
                                                className="text-red-500 hover:text-red-600"
                                                disabled={isSaving}
                                            >
                                                {isSaving ? 'Removing...' : 'Remove'}
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Basic Information */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Basic Information</CardTitle>
                            {!isEditing ? (
                                <Button onClick={() => setIsEditing(true)} variant="outline">
                                    Edit
                                </Button>
                            ) : (
                                <div className="flex gap-2">
                                    <Button onClick={() => setIsEditing(false)} variant="outline">
                                        Cancel
                                    </Button>
                                    <Button onClick={handleSave} disabled={isSaving}>
                                        {isSaving ? 'Saving...' : 'Save Changes'}
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
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        disabled={!isEditing}
                                        placeholder="Optional"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="location">Location</Label>
                                    <Input
                                        id="location"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        disabled={!isEditing}
                                        placeholder="City, Country"
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

                    {/* Connections */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="w-5 h-5" />
                                My Connections ({connections.length})
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
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
                                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF7A5A]/20 to-[#FFC107]/20 flex items-center justify-center">
                                                        {connectedProfile.profilePicture ? (
                                                            <img
                                                                src={connectedProfile.profilePicture}
                                                                alt={connectedProfile.name}
                                                                className="w-full h-full object-cover rounded-full"
                                                            />
                                                        ) : (
                                                            <User className="w-6 h-6 text-[#6B6B6B]" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-[#3C3C3C]">{connectedProfile.name}</h4>
                                                        <p className="text-sm text-[#6B6B6B]">{connectedProfile.role || connectedProfile.department}</p>
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
                                <div className="text-center py-8 text-[#6B6B6B]">
                                    <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
                                    <p>No connections yet</p>
                                    <p className="text-sm mt-1">Start connecting with other professionals!</p>
                                </div>
                            )}
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
                                    onClick={() => navigate('/portfolio/edit')}
                                >
                                    Edit Portfolio Details
                                </Button>
                                <Button
                                    variant="outline"
                                    className="justify-start"
                                    onClick={() => navigate(`/portfolio/${user?.id}`)}
                                >
                                    View My Public Portfolio
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
            </main>
        </DashboardLayout>
    );
}
