import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import TopHeader from '../../components/TopHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Bot, Send, MapPin, Search, DollarSign, FileText } from 'lucide-react';

export default function AILocationScout() {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: 'Welcome! I\'m your AI Location Scout. I can help you find perfect filming locations, provide permit information, estimate costs, and give logistics advice. What type of location are you looking for?'
        }
    ]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages([...messages, userMessage]);

        setTimeout(() => {
            const aiResponse = {
                role: 'assistant',
                content: generateResponse(input)
            };
            setMessages(prev => [...prev, aiResponse]);
        }, 1000);

        setInput('');
    };

    const generateResponse = (query) => {
        const lowerQuery = query.toLowerCase();

        if (lowerQuery.includes('location') || lowerQuery.includes('find') || lowerQuery.includes('search')) {
            return 'I\'ll help you find the perfect location! To give you the best recommendations, please tell me:\n\n📍 Location Type (urban, rural, indoor, outdoor)\n🎬 Scene Requirements (modern, vintage, dramatic)\n💰 Budget Range\n📅 Shooting Duration\n🌍 Preferred Area/City\n\nThe more details you provide, the better I can help!';
        }

        if (lowerQuery.includes('permit') || lowerQuery.includes('legal')) {
            return 'Great question about permits! Here\'s what you typically need:\n\n📋 Film Permit Applications\n🚓 Police/Security Coordination (for public spaces)\n🏛️ Property Owner Permissions\n🚗 Parking Permits (if needed)\n📢 Noise Permits (for outdoor shoots)\n\nRequirements vary by location. Would you like specific information for a particular city or venue type?';
        }

        if (lowerQuery.includes('cost') || lowerQuery.includes('budget') || lowerQuery.includes('price')) {
            return 'Location costs can vary significantly:\n\n💵 Public Spaces: $200-500/day (permits)\n🏢 Commercial Buildings: $500-2000/day\n🏡 Private Residences: $300-1500/day\n🌳 Parks/Natural Areas: $100-400/day\n🏰 Historic Venues: $1000-5000/day\n\nFactors affecting price:\n• Duration of shoot\n• Crew size\n• Required modifications\n• Insurance requirements\n\nWhat\'s your budget range?';
        }

        return 'I can help you with:\n\n🗺️ Location search and recommendations\n📄 Permit and legal requirements\n💰 Cost estimates\n📊 Logistics planning\n📸 Location scouting reports\n\nWhat would you like to know more about?';
    };

    const quickActions = [
        { icon: Search, label: 'Find Location', action: () => setInput('Help me find a filming location') },
        { icon: FileText, label: 'Permit Info', action: () => setInput('What permits do I need?') },
        { icon: DollarSign, label: 'Cost Estimate', action: () => setInput('What are typical location costs?') },
    ];

    return (
        <DashboardLayout>
            <TopHeader />
            <main className="p-6 max-w-7xl mx-auto">
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                            <MapPin className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-[#3C3C3C]">AI Location Scout</h1>
                            <p className="text-[#6B6B6B]">Find the perfect filming locations</p>
                        </div>
                        <Badge variant="secondary" className="ml-auto bg-green-100 text-green-700">BETA</Badge>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-3">
                        <Card className="h-[calc(100vh-250px)] flex flex-col">
                            <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
                                {messages.map((msg, idx) => (
                                    <div
                                        key={idx}
                                        className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                                    >
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'assistant'
                                                ? 'bg-gradient-to-br from-green-500 to-emerald-500'
                                                : 'bg-[#FF7A5A]'
                                            }`}>
                                            {msg.role === 'assistant' ? (
                                                <Bot className="w-5 h-5 text-white" />
                                            ) : (
                                                <span className="text-white text-sm font-bold">U</span>
                                            )}
                                        </div>
                                        <div
                                            className={`max-w-2xl rounded-2xl px-4 py-3 ${msg.role === 'assistant'
                                                    ? 'bg-gray-100 text-[#3C3C3C]'
                                                    : 'bg-[#FF7A5A] text-white'
                                                }`}
                                        >
                                            <p className="whitespace-pre-line">{msg.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>

                            <div className="border-t p-4">
                                <div className="flex gap-2">
                                    <Input
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                        placeholder="Describe your location needs..."
                                        className="flex-1"
                                    />
                                    <Button onClick={handleSend}>
                                        <Send className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </div>

                    <div className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm">Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {quickActions.map((action, idx) => {
                                    const Icon = action.icon;
                                    return (
                                        <Button
                                            key={idx}
                                            variant="outline"
                                            className="w-full justify-start"
                                            onClick={action.action}
                                        >
                                            <Icon className="w-4 h-4 mr-2" />
                                            {action.label}
                                        </Button>
                                    );
                                })}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm">Services</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-[#6B6B6B] space-y-2">
                                <p>• Location search</p>
                                <p>• Permit guidance</p>
                                <p>• Cost estimates</p>
                                <p>• Logistics planning</p>
                                <p>• Property negotiations</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </DashboardLayout>
    );
}
