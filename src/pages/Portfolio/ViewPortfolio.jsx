import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import TopHeader from '../../components/TopHeader';
import { useData } from '../../context/DataContext';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { MapPin, Mail, Phone, Globe } from 'lucide-react';

export default function ViewPortfolio() {
    const { id } = useParams();
    const { profiles } = useData();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const foundProfile = profiles.find(p => p.id === id);
        setProfile(foundProfile);
    }, [id, profiles]);

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

                                    <div className="mt-4">
                                        <Button>Connect</Button>
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
                    {profile.skills && profile.skills.length > 0 && (
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
                    {profile.experience && profile.experience.length > 0 && (
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
                </div>
            </main>
        </DashboardLayout>
    );
}
