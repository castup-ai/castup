import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import DashboardLayout from '../../components/DashboardLayout';
import TopHeader from '../../components/TopHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { UserSearch, TrendingUp, Award, Target, BarChart3, Users } from 'lucide-react';

export default function ProfileExplanatory() {
    const { user } = useAuth();
    const { profiles } = useData();
    const navigate = useNavigate();

    const userProfile = profiles?.find(p => p.id === user?.id) || {};

    const strengths = [
        { label: 'Profile Completeness', score: 85, icon: Target, color: 'text-green-600' },
        { label: 'Network Size', score: 72, icon: Users, color: 'text-blue-600' },
        { label: 'Content Quality', score: 90, icon: Award, color: 'text-purple-600' },
        { label: 'Engagement Rate', score: 68, icon: TrendingUp, color: 'text-orange-600' },
    ];

    return (
        <DashboardLayout>
            <TopHeader />
            <main className="p-6 max-w-7xl mx-auto">
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                            <UserSearch className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-[#3C3C3C]">Profile Explanatory</h1>
                            <p className="text-[#6B6B6B]">AI-powered profile analysis and insights</p>
                        </div>
                        <Badge variant="secondary" className="ml-auto bg-orange-100 text-orange-700">BETA</Badge>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Profile Overview */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Profile Strength Analysis</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {strengths.map((strength, idx) => {
                                const Icon = strength.icon;
                                return (
                                    <div key={idx} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Icon className={`w-5 h-5 ${strength.color}`} />
                                                <span className="font-medium text-[#3C3C3C]">{strength.label}</span>
                                            </div>
                                            <span className={`font-bold ${strength.color}`}>{strength.score}%</span>
                                        </div>
                                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full ${strength.color.replace('text-', 'bg-')} transition-all duration-500`}
                                                style={{ width: `${strength.score}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </CardContent>
                    </Card>

                    {/* Quick Stats */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Stats</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                <span className="text-sm text-[#6B6B6B]">Profile Views</span>
                                <span className="font-bold text-blue-600">247</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                <span className="text-sm text-[#6B6B6B]">Connections</span>
                                <span className="font-bold text-green-600">42</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                                <span className="text-sm text-[#6B6B6B]">Applications</span>
                                <span className="font-bold text-purple-600">15</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                                <span className="text-sm text-[#6B6B6B]">Portfolio Items</span>
                                <span className="font-bold text-orange-600">{userProfile?.media?.photos?.length || 0}</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Strengths */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Award className="w-5 h-5 text-green-600" />
                                Your Strengths
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="p-3 bg-green-50 rounded-lg">
                                <p className="text-sm font-medium text-[#3C3C3C]">High-Quality Content</p>
                                <p className="text-xs text-[#6B6B6B] mt-1">Your portfolio showcases professional work</p>
                            </div>
                            <div className="p-3 bg-green-50 rounded-lg">
                                <p className="text-sm font-medium text-[#3C3C3C]">Complete Profile</p>
                                <p className="text-xs text-[#6B6B6B] mt-1">You've filled out most profile sections</p>
                            </div>
                            <div className="p-3 bg-green-50 rounded-lg">
                                <p className="text-sm font-medium text-[#3C3C3C]">Active Presence</p>
                                <p className="text-xs text-[#6B6B6B] mt-1">Regular updates and engagement</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Areas for Improvement */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-orange-600" />
                                Growth Opportunities
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="p-3 bg-orange-50 rounded-lg">
                                <p className="text-sm font-medium text-[#3C3C3C]">Expand Your Network</p>
                                <p className="text-xs text-[#6B6B6B] mt-1">Connect with more industry professionals</p>
                            </div>
                            <div className="p-3 bg-orange-50 rounded-lg">
                                <p className="text-sm font-medium text-[#3C3C3C]">Add More Media</p>
                                <p className="text-xs text-[#6B6B6B] mt-1">Upload additional photos and videos</p>
                            </div>
                            <div className="p-3 bg-orange-50 rounded-lg">
                                <p className="text-sm font-medium text-[#3C3C3C]">Apply More Often</p>
                                <p className="text-xs text-[#6B6B6B] mt-1">Increase applications to casting calls</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Competitive Analysis */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BarChart3 className="w-5 h-5 text-blue-600" />
                                Competitive Position
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="p-3 border rounded-lg">
                                <p className="text-sm font-medium text-[#3C3C3C]">Top 25% in your category</p>
                                <p className="text-xs text-[#6B6B6B] mt-1">You rank higher than 75% of similar profiles</p>
                            </div>
                            <div className="p-3 border rounded-lg">
                                <p className="text-sm font-medium text-[#3C3C3C]">High Visibility</p>
                                <p className="text-xs text-[#6B6B6B] mt-1">Your profile appears frequently in searches</p>
                            </div>
                            <div className="p-3 border rounded-lg">
                                <p className="text-sm font-medium text-[#3C3C3C]">Strong Engagement</p>
                                <p className="text-xs text-[#6B6B6B] mt-1">Above-average interaction rates</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex gap-4">
                    <Button onClick={() => navigate('/profile')}>
                        View Full Profile
                    </Button>
                    <Button variant="outline" onClick={() => navigate('/dashboard')}>
                        Back to Dashboard
                    </Button>
                </div>
            </main>
        </DashboardLayout>
    );
}
