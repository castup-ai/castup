import { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import TopHeader from '../../components/TopHeader';
import { useData } from '../../context/DataContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Film, Plus, Search } from 'lucide-react';

export default function CastingDashboard() {
    const { castingCalls } = useData();
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('all'); // all, open, closed

    const filteredCalls = castingCalls
        ?.filter(call => {
            const matchesSearch = call.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                call.description?.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesFilter = filter === 'all' ||
                (filter === 'open' && new Date(call.deadline) > new Date()) ||
                (filter === 'closed' && new Date(call.deadline) <= new Date());
            return matchesSearch && matchesFilter;
        }) || [];

    return (
        <DashboardLayout>
            <TopHeader title="Casting Calls" />
            <main className="flex-1 overflow-auto p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header Actions */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                        <div className="flex-1 max-w-md">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6B6B]" />
                                <Input
                                    placeholder="Search casting calls..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-11"
                                />
                            </div>
                        </div>
                        <Link to="/casting/create">
                            <Button className="gap-2">
                                <Plus className="w-4 h-4" />
                                Create Casting Call
                            </Button>
                        </Link>
                    </div>

                    {/* Filter Pills */}
                    <div className="flex gap-2 mb-6">
                        {['all', 'open', 'closed'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${filter === f
                                        ? 'bg-[#FF7A5A] text-white'
                                        : 'bg-white text-[#6B6B6B] hover:bg-[#FFF8F0]'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    {/* Casting Calls Grid */}
                    {filteredCalls.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredCalls.map((call) => (
                                <Link key={call.id} to={`/casting/${call.id}`}>
                                    <Card className="hover:shadow-xl transition-shadow h-full">
                                        <CardHeader>
                                            <div className="flex justify-between items-start mb-2">
                                                <Badge variant={new Date(call.deadline) > new Date() ? 'default' : 'secondary'}>
                                                    {new Date(call.deadline) > new Date() ? 'Open' : 'Closed'}
                                                </Badge>
                                            </div>
                                            <CardTitle className="text-lg">{call.title}</CardTitle>
                                            <CardDescription className="line-clamp-2">
                                                {call.description}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-2 text-sm text-[#6B6B6B]">
                                                <div className="flex items-center gap-2">
                                                    <Film className="w-4 h-4" />
                                                    <span>{call.project || 'Film Project'}</span>
                                                </div>
                                                <div>
                                                    Deadline: {new Date(call.deadline).toLocaleDateString()}
                                                </div>
                                                <div>
                                                    {call.applications?.length || 0} Applications
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <Card>
                            <CardContent className="p-12 text-center">
                                <div className="text-6xl mb-4">🎬</div>
                                <h3 className="text-xl font-bold text-[#3C3C3C] mb-2">No Casting Calls Found</h3>
                                <p className="text-[#6B6B6B] mb-6">Start by creating your first casting call</p>
                                <Link to="/casting/create">
                                    <Button>Create Casting Call</Button>
                                </Link>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </main>
        </DashboardLayout>
    );
}
