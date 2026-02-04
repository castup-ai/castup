import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import TopHeader from '../../components/TopHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Bot, Send, HelpCircle, Lightbulb, TrendingUp, BookOpen } from 'lucide-react';

export default function AIAssistant() {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: 'Hello! I\'m your AI Assistant for all things entertainment industry. I can help with career advice, profile optimization, industry trends, and general questions. How can I assist you today?'
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

        if (lowerQuery.includes('profile') || lowerQuery.includes('optimize')) {
            return 'Great question! To optimize your profile:\n\n✨ Add high-quality headshots and demo reels\n📝 Write a compelling bio highlighting your unique skills\n🎯 List specific experience and achievements\n🏷️ Use relevant hashtags and keywords\n⭐ Keep your portfolio updated regularly\n\nWould you like specific tips for any of these areas?';
        }

        if (lowerQuery.includes('career') || lowerQuery.includes('advice')) {
            return 'I\'d love to help with career guidance! Here are some key tips for entertainment professionals:\n\n1. Network actively - build genuine connections\n2. Keep learning - take workshops and classes\n3. Be professional - respond promptly and reliably\n4. Stay persistent - success takes time\n5. Diversify - explore different roles and projects\n\nWhat specific aspect of your career would you like to discuss?';
        }

        if (lowerQuery.includes('trend') || lowerQuery.includes('industry')) {
            return 'Current industry trends include:\n\n📱 Rise of digital content creation\n🎬 Increased demand for diverse talent\n🌐 Remote auditions becoming standard\n📊 Data-driven casting decisions\n💡 Personal branding importance\n\nWould you like me to explain any of these in detail?';
        }

        return 'I\'m here to help! I can provide advice on:\n\n• Profile optimization\n• Career development\n• Industry trends\n• Best practices\n• Networking strategies\n\nWhat would you like to explore?';
    };

    const quickActions = [
        { icon: Lightbulb, label: 'Profile Tips', action: () => setInput('How can I optimize my profile?') },
        { icon: TrendingUp, label: 'Career Advice', action: () => setInput('Give me career advice') },
        { icon: BookOpen, label: 'Industry Trends', action: () => setInput('What are the current industry trends?') },
    ];

    return (
        <DashboardLayout>
            <TopHeader />
            <main className="p-6 max-w-7xl mx-auto">
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                            <HelpCircle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-[#3C3C3C]">AI Assistant</h1>
                            <p className="text-[#6B6B6B]">Your personal career companion</p>
                        </div>
                        <Badge variant="secondary" className="ml-auto bg-blue-100 text-blue-700">BETA</Badge>
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
                                                ? 'bg-gradient-to-br from-blue-500 to-cyan-500'
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
                                        placeholder="Ask me anything about your entertainment career..."
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
                                <CardTitle className="text-sm">I Can Help With</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-[#6B6B6B] space-y-2">
                                <p>• Profile optimization</p>
                                <p>• Career planning</p>
                                <p>• Industry insights</p>
                                <p>• Best practices</p>
                                <p>• Networking tips</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </DashboardLayout>
    );
}
