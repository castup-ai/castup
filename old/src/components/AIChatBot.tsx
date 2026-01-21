import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Sparkles, Send, X, Lightbulb, Users, Briefcase, TrendingUp } from 'lucide-react';

interface AIChatBotProps {
  onClose: () => void;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AIChatBot({ onClose }: AIChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hi! I\'m your CastUp AI Assistant. I can help you with:\n\n• Finding the right talent for your projects\n• Optimizing your portfolio\n• Answering questions about the platform\n• Suggesting connections and opportunities\n\nHow can I help you today?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateIntelligentResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Portfolio optimization
    if (input.includes('portfolio') || input.includes('profile') || input.includes('optimize')) {
      return '📊 Great question about portfolio optimization!\n\nHere are my recommendations:\n\n1. **Add High-Quality Photos**: Include professional headshots and action shots from your work\n2. **Showcase Your Range**: Display diverse roles or projects to demonstrate versatility\n3. **Keep It Updated**: Add your latest work and remove outdated content\n4. **Write a Compelling Bio**: Make it personal and highlight your unique strengths\n5. **Add Video Reels**: Short clips of your best performances get 3x more engagement\n\nWould you like specific advice for your role type?';
    }
    
    // Finding talent
    if (input.includes('find') && (input.includes('actor') || input.includes('director') || input.includes('talent') || input.includes('crew'))) {
      return '🎯 I can help you find the perfect talent!\n\nBased on your search, I recommend:\n\n• **Use AI Casting**: Our AI can match talent based on role requirements\n• **Check Crew Alerts**: Post your project needs and let talent come to you\n• **Explore by Category**: Browse actors, directors, cinematographers by genre and experience\n• **Filter by Location**: Find local talent to reduce production costs\n\nWhat specific role are you trying to fill?';
    }
    
    // Networking and connections
    if (input.includes('connect') || input.includes('network') || input.includes('collaborate')) {
      return '🤝 Building connections is key to success in the industry!\n\nHere\'s how to expand your network on CastUp:\n\n• **Engage with Short Films**: Comment and like others\' work\n• **Join Crew Alerts**: Apply to projects that interest you\n• **Message Feature**: Connect directly with professionals (coming soon)\n• **Attend Virtual Events**: Keep an eye on our events calendar\n\nWho would you like to connect with?';
    }
    
    // Project recommendations
    if (input.includes('project') || input.includes('opportunity') || input.includes('job')) {
      return '🎬 Looking for your next project? Excellent!\n\nHere are opportunities that might interest you:\n\n• **Crew Alerts**: 6 new alerts matching your profile\n• **Featured Projects**: 3 verified productions hiring now\n• **AI Recommendations**: Based on your experience, I suggest checking drama and indie film alerts\n\nTop Match: "Urban Stories" - Cinematographer needed in LA - Paid $500-800/day\n\nWant me to show you more details?';
    }
    
    // Pricing and budget
    if (input.includes('price') || input.includes('cost') || input.includes('budget') || input.includes('pay')) {
      return '💰 Industry rates vary by role and location:\n\n**Common Day Rates:**\n• Actors (Lead): $500-2000/day\n• Directors: $800-3000/day\n• Cinematographers: $500-1500/day\n• Production Assistants: $150-300/day\n\n**Tips:**\n• Union vs non-union rates differ significantly\n• Location matters (LA/NY typically higher)\n• Experience level affects compensation\n• Negotiate based on project budget\n\nNeed help setting your rates?';
    }
    
    // Platform features
    if (input.includes('how') || input.includes('use') || input.includes('feature')) {
      return '✨ Let me guide you through CastUp\'s features:\n\n**Main Features:**\n• **Explore**: Discover talent by role and location\n• **AI Casting**: Smart matching for your projects\n• **Portfolio**: Showcase your work and experience\n• **Script Locker**: Share and collaborate on scripts\n• **Short Films**: Watch and share your work\n• **Crew Alerts**: Find jobs or post opportunities\n\nWhat feature would you like to know more about?';
    }
    
    // Success tips
    if (input.includes('tips') || input.includes('advice') || input.includes('success') || input.includes('help me')) {
      return '🌟 Success Tips for Film Professionals:\n\n1. **Stay Active**: Log in regularly and engage with the community\n2. **Complete Your Profile**: Profiles with photos get 5x more views\n3. **Be Professional**: Respond to messages within 24 hours\n4. **Build Relationships**: Quality connections matter more than quantity\n5. **Keep Learning**: Industry trends change - stay updated\n6. **Deliver Quality**: Your reputation is everything\n\nWhat area would you like to focus on?';
    }
    
    // Default helpful response
    const defaultResponses = [
      'That\'s an interesting question! To give you the best answer, could you tell me more about what you\'re looking to achieve? Are you:\n\n• Looking for talent for a project?\n• Trying to improve your portfolio?\n• Seeking collaboration opportunities?\n• Learning about specific features?',
      
      'I\'d love to help! Based on your question, here are some resources:\n\n• **Explore Page**: Browse talented professionals\n• **AI Casting**: Get AI-powered matches\n• **Crew Alerts**: Find or post opportunities\n• **Short Films**: Discover inspiring work\n\nCould you be more specific about what you need?',
      
      'Great question! Let me help you navigate that.\n\nCastUp offers several ways to achieve your goals:\n\n1. Use our AI tools for smart recommendations\n2. Browse our talent database\n3. Post in Crew Alerts\n4. Connect directly with professionals\n\nWhat\'s your primary goal right now?'
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      setIsTyping(false);
      const response = generateIntelligentResponse(currentInput);

      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    }, 800);
  };

  const quickActions = [
    { text: 'Find talent for my project', icon: Users },
    { text: 'Improve my portfolio', icon: Briefcase },
    { text: 'Show trending opportunities', icon: TrendingUp },
    { text: 'Success tips', icon: Lightbulb },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[85vh] max-h-[800px] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-[rgba(0,0,0,0.08)] flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF7A5A] to-[#FFC107] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl text-[#3C3C3C]" style={{ fontWeight: 700 }}>
                  AI Assistant
                </h2>
                <p className="text-sm text-[#6B6B6B]">Always here to help you succeed</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-[#FFF8F0] transition-colors"
            >
              <X className="w-5 h-5 text-[#6B6B6B]" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-[#FF7A5A] to-[#FFC107] text-white'
                      : 'bg-[#FFF8F0] text-[#3C3C3C]'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <span
                    className={`text-xs mt-1 block ${
                      message.role === 'user' ? 'text-white/70' : 'text-[#6B6B6B]'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-[#FFF8F0] rounded-2xl px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-[#FF7A5A] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-[#FF7A5A] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-[#FF7A5A] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    <span className="text-sm text-[#6B6B6B]">AI is typing...</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-6 pb-4 flex-shrink-0">
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action, idx) => {
              const Icon = action.icon;
              return (
                <button
                  key={idx}
                  onClick={() => setInput(action.text)}
                  className="px-4 py-2 bg-[#FFF8F0] hover:bg-[#FFE5DD] text-[#FF7A5A] rounded-lg text-sm transition-colors flex items-center gap-2"
                  style={{ fontWeight: 500 }}
                >
                  <Icon className="w-4 h-4" />
                  {action.text}
                </button>
              );
            })}
          </div>
        </div>

        {/* Input */}
        <div className="p-6 border-t border-[rgba(0,0,0,0.08)] flex-shrink-0">
          <div className="flex gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything..."
              className="flex-1 h-12 rounded-xl bg-white"
              disabled={isTyping}
            />
            <Button
              onClick={handleSend}
              disabled={isTyping || !input.trim()}
              className="bg-gradient-to-r from-[#FF7A5A] to-[#FFC107] hover:opacity-90 text-white rounded-xl px-6 h-12 disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
