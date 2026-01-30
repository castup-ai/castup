import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import TopHeader from '../../components/TopHeader';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { MapPin, Calendar, Users } from 'lucide-react';

export default function ViewCastingCall() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { castingCalls, applyCastingCall } = useData();
    const { user } = useAuth();
    const [call, setCall] = useState(null);
    const [applying, setApplying] = useState(false);

    useEffect(() => {
        const foundCall = castingCalls?.find(c => c.id === id);
        setCall(foundCall);
    }, [id, castingCalls]);

    const handleApply = () => {
        setApplying(true);
        setTimeout(() => {
            applyCastingCall(id, user.id);
            setApplying(false);
            alert('Application submitted successfully!');
        }, 1000);
    };

    if (!call) {
        return (
            <DashboardLayout>
                <TopHeader title="Casting Call" />
                <main className="flex-1 overflow-auto p-8">
                    <Card>
                        <CardContent className="p-12 text-center">
                            <p className="text-[#6B6B6B]">Casting call not found</p>
                        </CardContent>
                    </Card>
                </main>
            </DashboardLayout>
        );
    }

    const isOpen = new Date(call.deadline) > new Date();
    const hasApplied = call.applications?.includes(user?.id);

    return (
        <DashboardLayout>
            <TopHeader title="Casting Call Details" />
            <main className="flex-1 overflow-auto p-8">
                <div className="max-w-4xl mx-auto space-y-6">
                    {/* Header */}
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <Badge variant={isOpen ? 'default' : 'secondary'} className="mb-3">
                                        {isOpen ? 'Open for Applications' : 'Closed'}
                                    </Badge>
                                    <CardTitle className="text-3xl">{call.title}</CardTitle>
                                    <p className="text-lg text-[#6B6B6B] mt-2">{call.project}</p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-6 text-sm text-[#6B6B6B]">
                                {call.location && (
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4" />
                                        <span>{call.location}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>Deadline: {new Date(call.deadline).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4" />
                                    <span>{call.applications?.length || 0} Applications</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Description */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">Description</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-[#6B6B6B] whitespace-pre-wrap">{call.description}</p>
                        </CardContent>
                    </Card>

                    {/* Requirements */}
                    {call.requirements && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Requirements</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-[#6B6B6B] whitespace-pre-wrap">{call.requirements}</p>
                            </CardContent>
                        </Card>
                    )}

                    {/* Actions */}
                    <Card>
                        <CardContent className="p-6">
                            {hasApplied ? (
                                <div className="text-center py-4">
                                    <p className="text-green-600 font-semibold">✓ You have already applied to this casting call</p>
                                </div>
                            ) : isOpen ? (
                                <Button onClick={handleApply} disabled={applying} className="w-full" size="lg">
                                    {applying ? 'Submitting Application...' : 'Apply Now'}
                                </Button>
                            ) : (
                                <div className="text-center py-4">
                                    <p className="text-red-600 font-semibold">This casting call is closed</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </main>
        </DashboardLayout>
    );
}
