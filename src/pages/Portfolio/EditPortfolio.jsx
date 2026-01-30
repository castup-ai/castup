import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import TopHeader from '../../components/TopHeader';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useAI } from '../../context/AIContext';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

export default function EditPortfolio() {
    const { user } = useAuth();
    const { profiles, updateProfile } = useData();
    const { analyzeProfile } = useAI();
    const navigate = useNavigate();

    const existingProfile = profiles.find(p => p.userId === user?.id);

    const [formData, setFormData] = useState({
        name: '',
        role: '',
        bio: '',
        location: '',
        skills: '',
        experience: '',
        socialLinks: { imdb: '', youtube: '', instagram: '' },
    });

    const [aiSuggestions, setAiSuggestions] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (existingProfile) {
            setFormData({
                name: existingProfile.name || '',
                role: existingProfile.role || existingProfile.department || '',
                bio: existingProfile.bio || '',
                location: existingProfile.location || '',
                skills: existingProfile.skills?.join(', ') || '',
                experience: existingProfile.experience || '',
                socialLinks: existingProfile.socialLinks || { imdb: '', youtube: '', instagram: '' },
            });
        } else {
            navigate('/portfolio/create');
        }
    }, [existingProfile, navigate]);

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleAnalyze = () => {
        const analysis = analyzeProfile({
            ...formData,
            skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
        });
        setAiSuggestions(analysis);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            const profileData = {
                ...formData,
                skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
                userId: user.id,
                id: existingProfile.id,
            };

            updateProfile(existingProfile.id, profileData);
            setLoading(false);
            navigate('/dashboard');
        }, 1000);
    };

    if (!existingProfile) return null;

    return (
        <DashboardLayout>
            <TopHeader title="Edit Portfolio" />
            <main className="flex-1 overflow-auto p-8">
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
                <div className="max-w-6xl mx-auto">\
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Form */}
                        <div className="lg:col-span-2">
                            <Card>
                                <CardContent className="p-8">
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label>Full Name</Label>
                                                <Input
                                                    value={formData.name}
                                                    onChange={(e) => handleChange('name', e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Role/Department</Label>
                                                <Input
                                                    value={formData.role}
                                                    onChange={(e) => handleChange('role', e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Location</Label>
                                            <Input
                                                value={formData.location}
                                                onChange={(e) => handleChange('location', e.target.value)}
                                                placeholder="Mumbai, India"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Bio</Label>
                                            <textarea
                                                className="w-full h-32 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#3C3C3C] focus:outline-none focus:ring-2 focus:ring-[#FF7A5A]"
                                                value={formData.bio}
                                                onChange={(e) => handleChange('bio', e.target.value)}
                                                placeholder="Tell us about yourself..."
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Skills (comma-separated)</Label>
                                            <Input
                                                value={formData.skills}
                                                onChange={(e) => handleChange('skills', e.target.value)}
                                                placeholder="Acting, Directing, Editing"
                                            />
                                        </div>

                                        <div className="flex gap-4 pt-6">
                                            <Button type="button" variant="outline" onClick={handleAnalyze} className="flex-1">
                                                🤖 Get AI Suggestions
                                            </Button>
                                            <Button type="submit" disabled={loading} className="flex-1">
                                                {loading ? 'Saving...' : 'Update Portfolio'}
                                            </Button>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>

                        {/* AI Suggestions */}
                        <div className="space-y-6">
                            {aiSuggestions ? (
                                <>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg">Profile Completeness</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-[#FF7A5A] to-[#FFC107] transition-all"
                                                    style={{ width: `${aiSuggestions.completeness}%` }}
                                                />
                                            </div>
                                            <p className="text-sm text-[#6B6B6B] mt-2">{aiSuggestions.completeness}% complete</p>
                                        </CardContent>
                                    </Card>

                                    {aiSuggestions.hashtags?.length > 0 && (
                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="text-lg">#️⃣ Suggested Hashtags</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="flex flex-wrap gap-2">
                                                    {aiSuggestions.hashtags.map((tag, i) => (
                                                        <Badge key={i} variant="secondary">{tag}</Badge>
                                                    ))}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )}
                                </>
                            ) : (
                                <Card>
                                    <CardContent className="p-8 text-center">
                                        <div className="text-5xl mb-4">🤖</div>
                                        <p className="text-[#6B6B6B]">Click "Get AI Suggestions" for personalized recommendations!</p>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </DashboardLayout>
    );
}
