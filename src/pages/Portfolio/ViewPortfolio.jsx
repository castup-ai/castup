import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import TopHeader from '../../components/TopHeader';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { MapPin, Mail, Phone, Globe, Youtube, Instagram, Linkedin, Image, Video, ArrowLeft } from 'lucide-react';

export default function ViewPortfolio() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { profiles } = useData();
    const [profile, setProfile] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);

    useEffect(() => {
        // Handle both string and number IDs
        const foundProfile = profiles.find(p => p.id == id || p.id === parseInt(id));
        setProfile(foundProfile);

        // Check if already connected
        if (foundProfile && user) {
            const userProfile = profiles.find(p => p.id === user.id || p.userId === user.id);
            if (userProfile?.connections) {
                setIsConnected(userProfile.connections.includes(foundProfile.id) || userProfile.connections.includes(foundProfile.userId));
            }
        }
    }, [id, profiles, user]);

    const handleConnect = async () => {
        if (!user) {
            alert('Please login to connect with users');
            return;
        }

        setIsConnecting(true);
        try {
            // TODO: Call API to connect/disconnect
            // For now, just toggle local state
            setIsConnected(!isConnected);

            // Show success message
            setTimeout(() => {
                alert(isConnected ? 'Disconnected successfully' : 'Connection request sent!');
            }, 300);
        } catch (error) {
            console.error('Error toggling connection:', error);
            alert('Failed to update connection');
        } finally {
            setIsConnecting(false);
        }
    };

    if (!profile) {
        return (
            <DashboardLayout>
                <TopHeader title="Portfolio" />
                <main className="flex-1 overflow-auto p-8">
                    <Card>
                        <CardContent className="p-12 text-center">
                            <p className="text-[#6B6B6B]">Profile not found</p>
                        </CardContent>
                    </Card>
                </main>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <TopHeader title={`${profile.name}'s Portfolio`} />
            <main className="flex-1 overflow-auto p-8">
                {/* Back Button */}
                <div className="max-w-5xl mx-auto mb-4">
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/dashboard')}
                        className="text-[#6B6B6B] hover:text-[#3C3C3C]"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Dashboard
                    </Button>
                </div>
                <div className="max-w-5xl mx-auto space-y-6">
                    {/* Header Card */}
                    <Card>
                        <CardContent className="p-8">
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="w-32 h-32 rounded-xl bg-gradient-to-br from-[#FF7A5A]/20 to-[#FFC107]/20 flex items-center justify-center text-6xl">
                                    {profile.profilePicture ? (
                                        <img src={profile.profilePicture} alt={profile.name} className="w-full h-full object-cover rounded-xl" />
                                    ) : (
                                        '👤'
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h1 className="text-3xl font-bold text-[#3C3C3C] mb-2">{profile.name}</h1>
                                    <p className="text-lg text-[#6B6B6B] mb-4">{profile.role || profile.department}</p>

                                    <div className="flex flex-wrap gap-4 text-sm text-[#6B6B6B]">
                                        {profile.location && (
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4" />
                                                <span>{profile.location}</span>
                                            </div>
                                        )}
                                        {profile.email && (
                                            <div className="flex items-center gap-2">
                                                <Mail className="w-4 h-4" />
                                                <span>{profile.email}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-4 flex gap-3">
                                        <Button
                                            onClick={handleConnect}
                                            disabled={isConnecting || !user || profile.id === user?.id}
                                            className={isConnected ? 'bg-[#6B6B6B] hover:bg-[#3C3C3C]' : ''}
                                        >
                                            {isConnecting ? 'Processing...' : isConnected ? 'Disconnect' : 'Connect'}
                                        </Button>
                                        {profile.email && (
                                            <Button variant="outline">
                                                Message
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Bio */}
                    {profile.bio && (
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-xl font-bold text-[#3C3C3C] mb-3">About</h2>
                                <p className="text-[#6B6B6B]">{profile.bio}</p>
                            </CardContent>
                        </Card>
                    )}

                    {/* Skills */}
                    {profile.skills && Array.isArray(profile.skills) && profile.skills.length > 0 && (
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-xl font-bold text-[#3C3C3C] mb-3">Skills</h2>
                                <div className="flex flex-wrap gap-2">
                                    {profile.skills.map((skill, index) => (
                                        <Badge key={index} variant="secondary">{skill}</Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Experience */}
                    {profile.experience && Array.isArray(profile.experience) && profile.experience.length > 0 && (
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-xl font-bold text-[#3C3C3C] mb-3">Experience</h2>
                                <div className="space-y-4">
                                    {profile.experience.map((exp, index) => (
                                        <div key={index} className="border-l-2 border-[#FF7A5A] pl-4">
                                            <h3 className="font-semibold text-[#3C3C3C]">{exp.title || exp.project}</h3>
                                            <p className="text-sm text-[#6B6B6B]">{exp.company || exp.role} • {exp.year}</p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Social Links */}
                    {(profile.youtubeUrl || profile.imdbUrl || profile.instagramUrl || profile.linkedinUrl || profile.website) && (
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-xl font-bold text-[#3C3C3C] mb-4">Links</h2>
                                <div className="flex flex-wrap gap-3">
                                    {profile.youtubeUrl && (
                                        <a href={profile.youtubeUrl} target="_blank" rel="noopener noreferrer">
                                            <Button variant="outline" className="gap-2">
                                                <Youtube className="w-4 h-4 text-red-600" />
                                                YouTube
                                            </Button>
                                        </a>
                                    )}
                                    {profile.imdbUrl && (
                                        <a href={profile.imdbUrl} target="_blank" rel="noopener noreferrer">
                                            <Button variant="outline" className="gap-2">
                                                <Globe className="w-4 h-4 text-yellow-600" />
                                                IMDb
                                            </Button>
                                        </a>
                                    )}
                                    {profile.instagramUrl && (
                                        <a href={profile.instagramUrl} target="_blank" rel="noopener noreferrer">
                                            <Button variant="outline" className="gap-2">
                                                <Instagram className="w-4 h-4 text-pink-600" />
                                                Instagram
                                            </Button>
                                        </a>
                                    )}
                                    {profile.linkedinUrl && (
                                        <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer">
                                            <Button variant="outline" className="gap-2">
                                                <Linkedin className="w-4 h-4 text-blue-600" />
                                                LinkedIn
                                            </Button>
                                        </a>
                                    )}
                                    {profile.website && (
                                        <a href={profile.website} target="_blank" rel="noopener noreferrer">
                                            <Button variant="outline" className="gap-2">
                                                <Globe className="w-4 h-4" />
                                                Website
                                            </Button>
                                        </a>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Photos */}
                    {profile.photos && Array.isArray(profile.photos) && profile.photos.length > 0 && (
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-xl font-bold text-[#3C3C3C] mb-4 flex items-center gap-2">
                                    <Image className="w-5 h-5" />
                                    Photos
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">\
                                    {profile.photos.map((photo, index) => (
                                        <div key={index} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                                            <img
                                                src={photo.url || photo}
                                                alt={`Photo ${index + 1}`}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Videos */}
                    {profile.videos && Array.isArray(profile.videos) && profile.videos.length > 0 && (
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-xl font-bold text-[#3C3C3C] mb-4 flex items-center gap-2">
                                    <Video className="w-5 h-5" />
                                    Videos
                                </h2>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {profile.videos.map((video, index) => (
                                        <div key={index} className="space-y-2">
                                            <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                                                {video.url && (
                                                    <iframe
                                                        src={video.url}
                                                        className="w-full h-full"
                                                        allowFullScreen
                                                        title={video.title || `Video ${index + 1}`}
                                                    />
                                                )}
                                            </div>
                                            {video.title && (
                                                <p className="font-medium text-[#3C3C3C]">{video.title}</p>
                                            )}
                                            {video.description && (
                                                <p className="text-sm text-[#6B6B6B]">{video.description}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </main>
        </DashboardLayout >
    );
}
