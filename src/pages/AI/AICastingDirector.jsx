import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import TopHeader from '../../components/TopHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Bot, Send, Sparkles, Users, Film, Target } from 'lucide-react';

export default function AICastingDirector() {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: 'Hi! I\'m your AI Casting Director. I can help you find perfect talent for your projects, suggest ideal roles for actors, and provide casting insights. What can I help you with today?'
        }
    ]);
    const [input, setInput] = useState('');
    const navigate = useNavigate();

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages([...messages, userMessage]);

        // Simulate AI response
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

        if (lowerQuery.includes('find') || lowerQuery.includes('actor')) {
            return 'Based on your requirements, I can help you find actors with specific skills. Could you tell me more about the role? For example:\n\n• Character age range\n• Required skills (e.g., action, comedy, drama)\n• Experience level\n• Location preferences';
        }

        if (lowerQuery.includes('role') || lowerQuery.includes('recommend')) {
            return 'I\'d be happy to recommend suitable roles! To give you the best matches, I\'ll analyze:\n\n• Current casting calls\n• Your profile skills and experience\n• Industry trends\n• Match percentage based on requirements';
        }

        return 'I understand! As your AI Casting Director, I can help with talent search, role recommendations, audition scheduling, and casting analytics. What specific aspect of casting would you like assistance with?';
    };

    const quickActions = [
        { icon: Users, label: 'Find Talent', action: () => setInput('Help me find actors for my project') },
        { icon: Film, label: 'Match Roles', action: () => setInput('Recommend roles that match my profile') },
        { icon: Target, label: 'Casting Tips', action: () => setInput('Give me tips for successful casting') },
    ];

    return (
        <DashboardLayout>
            <TopHeader />
            <main className="p-6 max-w-7xl mx-auto">
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-[#3C3C3C]">AI Casting Director</h1>
                            <p className="text-[#6B6B6B]">Your intelligent casting assistant</p>
                        </div>
                        <Badge variant="secondary" className="ml-auto bg-purple-100 text-purple-700">BETA</Badge>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Chat Area */}
                    <div className="lg:col-span-3">
                        <Card className="h-[calc(100vh-250px)] flex flex-col">
                            {/* Messages */}
                            <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
                                {messages.map((msg, idx) => (
                                    <div
                                        key={idx}
                                        className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                                    >
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'assistant'
                                                ? 'bg-gradient-to-br from-purple-500 to-pink-500'
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

                            {/* Input Area */}
                            <div className="border-t p-4">
                                <div className="flex gap-2">
                                    <Input
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                        placeholder="Ask about casting, talent search, or role matching..."
                                        className="flex-1"
                                    />
                                    <Button onClick={handleSend}>
                                        <Send className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Quick Actions */}
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
                                <CardTitle className="text-sm">Features</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-[#6B6B6B] space-y-2">
                                <p>• Smart talent matching</p>
                                <p>• Role recommendations</p>
                                <p>• Casting analytics</p>
                                <p>• Audition scheduling</p>
                                <p>• Industry insights</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </DashboardLayout>
    );
}
