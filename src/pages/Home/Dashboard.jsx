import DashboardLayout from '../../components/DashboardLayout';
import TopHeader from '../../components/TopHeader';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Users, Sparkles, Film, FolderLock } from 'lucide-react';

export default function Dashboard() {
    const { user } = useAuth();

    const quickActions = [
        {
            icon: Users,
            title: 'Explore Talent',
            description: 'Discover talented professionals for your next project',
            link: '/explore',
            color: 'from-[#FF7A5A] to-[#FF6A4A]'
        },
        {
            icon: Sparkles,
            title: 'My Portfolio',
            description: 'Update your profile and showcase your work',
            link: '/portfolio/edit',
            color: 'from-[#FFC107] to-[#FFB300]'
        },
        {
            icon: Film,
            title: 'Casting Calls',
            description: 'Browse casting opportunities or post new ones',
            link: '/casting',
            color: 'from-[#FF7A5A] to-[#FFC107]'
        },
        {
            icon: FolderLock,
            title: 'Script Locker',
            description: 'Manage your files and share securely',
            link: '/files',
            color: 'from-[#FF7A5A] to-[#FF6A4A]'
        },
    ];

    return (
        <DashboardLayout>
            <TopHeader title="CastUp Dashboard" />
            <main className="flex-1 overflow-auto p-8">
                <div className="max-w-6xl mx-auto space-y-8">
                    {/* Welcome Banner */}
                    <div className="bg-gradient-to-br from-[#FF7A5A] to-[#FFC107] rounded-2xl p-8 text-white">
                        <h2 className="text-3xl font-bold mb-2">Welcome back, {user?.name}! 👋</h2>
                        <p className="text-lg opacity-90">Ready to make some magic today?</p>
                    </div>

                    {/* Quick Actions */}
                    <div>
                        <h3 className="text-xl font-bold text-[#3C3C3C] mb-4">Quick Actions</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {quickActions.map((action, index) => (
                                <Link key={index} to={action.link}>
                                    <Card className="hover:shadow-xl transition-shadow cursor-pointer h-full">
                                        <CardHeader>
                                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-3`}>
                                                <action.icon className="w-6 h-6 text-white" />
                                            </div>
                                            <CardTitle className="text-lg">{action.title}</CardTitle>
                                            <CardDescription>{action.description}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <Button variant="ghost" className="w-full text-[#FF7A5A]">
                                                Get Started →
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Stats */}
                    <div>
                        <h3 className="text-xl font-bold text-[#3C3C3C] mb-4">Your Activity</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardDescription>Profile Views</CardDescription>
                                    <CardTitle className="text-3xl">124</CardTitle>
                                </CardHeader>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardDescription>Connections</CardDescription>
                                    <CardTitle className="text-3xl">45</CardTitle>
                                </CardHeader>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardDescription>Applications Sent</CardDescription>
                                    <CardTitle className="text-3xl">8</CardTitle>
                                </CardHeader>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        </DashboardLayout>
    );
}
