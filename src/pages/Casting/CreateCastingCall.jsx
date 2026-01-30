import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import TopHeader from '../../components/TopHeader';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';

export default function CreateCastingCall() {
    const navigate = useNavigate();
    const { addCastingCall } = useData();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        project: '',
        description: '',
        requirements: '',
        deadline: '',
        location: '',
    });

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            const castingCall = {
                ...formData,
                id: Date.now().toString(),
                createdBy: user.id,
                createdAt: new Date().toISOString(),
                applications: [],
            };

            addCastingCall(castingCall);
            setLoading(false);
            navigate('/casting');
        }, 1000);
    };

    return (
        <DashboardLayout>
            <TopHeader title="Create Casting Call" />
            <main className="flex-1 overflow-auto p-8">
                <div className="max-w-3xl mx-auto">
                    <Card>
                        <CardContent className="p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label>Title *</Label>
                                    <Input
                                        value={formData.title}
                                        onChange={(e) => handleChange('title', e.target.value)}
                                        placeholder="Lead Actor for Feature Film"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Project Name *</Label>
                                    <Input
                                        value={formData.project}
                                        onChange={(e) => handleChange('project', e.target.value)}
                                        placeholder="The Next Big Thing"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Description *</Label>
                                    <textarea
                                        className="w-full h-32 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#3C3C3C] focus:outline-none focus:ring-2 focus:ring-[#FF7A5A]"
                                        value={formData.description}
                                        onChange={(e) => handleChange('description', e.target.value)}
                                        placeholder="Describe the role and project..."
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Requirements</Label>
                                    <textarea
                                        className="w-full h-24 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#3C3C3C] focus:outline-none focus:ring-2 focus:ring-[#FF7A5A]"
                                        value={formData.requirements}
                                        onChange={(e) => handleChange('requirements', e.target.value)}
                                        placeholder="Age range, experience, special skills..."
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label>Location</Label>
                                        <Input
                                            value={formData.location}
                                            onChange={(e) => handleChange('location', e.target.value)}
                                            placeholder="Mumbai, India"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Application Deadline *</Label>
                                        <Input
                                            type="date"
                                            value={formData.deadline}
                                            onChange={(e) => handleChange('deadline', e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-6">
                                    <Button type="button" variant="outline" onClick={() => navigate('/casting')} className="flex-1">
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={loading} className="flex-1">
                                        {loading ? 'Creating...' : 'Create Casting Call'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </DashboardLayout>
    );
}
