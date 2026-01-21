import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { MapPin, Send, X, Calendar, DollarSign, Image, Star, Building2, Home, Factory, Mountain } from 'lucide-react';

interface LocationScoutBotProps {
  onClose: () => void;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  locations?: LocationSuggestion[];
}

interface LocationSuggestion {
  name: string;
  address: string;
  price: string;
  image: string;
  availability: string;
  rating: number;
  type: string;
}

export default function LocationScoutBot({ onClose }: LocationScoutBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hi! I\'m your Location Scout Assistant 🎬\n\nI can help you find the perfect filming locations based on:\n\n📍 Location type and atmosphere\n💰 Budget requirements\n📅 Availability\n🏙️ Geographic preferences\n\nWhat kind of location are you looking for?',
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

  const generateLocationResponse = (userInput: string): { message: string; locations: LocationSuggestion[] } => {
    const input = userInput.toLowerCase();
    let message = '';
    let locations: LocationSuggestion[] = [];

    // Warehouse/Industrial
    if (input.includes('warehouse') || input.includes('industrial') || input.includes('factory')) {
      message = 'Perfect! I found some amazing industrial spaces that would be ideal for your shoot. These locations offer raw, authentic atmosphere with excellent natural light:';
      locations = [
        {
          name: 'Downtown Industrial Loft',
          address: 'Arts District, Los Angeles, CA',
          price: '$800/day',
          image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
          availability: 'Available Now',
          rating: 4.8,
          type: 'Industrial'
        },
        {
          name: 'Vintage Factory Space',
          address: 'Brooklyn, NY',
          price: '$950/day',
          image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800',
          availability: 'Available Soon',
          rating: 4.6,
          type: 'Industrial'
        },
        {
          name: 'Urban Warehouse Studio',
          address: 'Chicago, IL',
          price: '$700/day',
          image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
          availability: 'Available Now',
          rating: 4.9,
          type: 'Warehouse'
        }
      ];
    }
    // Office/Corporate
    else if (input.includes('office') || input.includes('corporate') || input.includes('business')) {
      message = 'Great choice! I found some excellent office spaces perfect for corporate scenes. These locations offer modern aesthetics and professional environments:';
      locations = [
        {
          name: 'Modern Tech Office',
          address: 'Silicon Valley, CA',
          price: '$1,200/day',
          image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
          availability: 'Available Now',
          rating: 4.7,
          type: 'Office'
        },
        {
          name: 'Executive Suite',
          address: 'Manhattan, NY',
          price: '$1,500/day',
          image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800',
          availability: 'Book in Advance',
          rating: 4.9,
          type: 'Corporate'
        }
      ];
    }
    // Outdoor/Nature
    else if (input.includes('outdoor') || input.includes('nature') || input.includes('forest') || input.includes('park')) {
      message = 'Beautiful! Here are some stunning outdoor locations with natural scenery and diverse filming options:';
      locations = [
        {
          name: 'Riverside Park',
          address: 'Portland, OR',
          price: '$400/day',
          image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
          availability: 'Available Now',
          rating: 4.8,
          type: 'Outdoor'
        },
        {
          name: 'Mountain Vista Point',
          address: 'Colorado Springs, CO',
          price: '$500/day',
          image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
          availability: 'Seasonal',
          rating: 4.9,
          type: 'Nature'
        },
        {
          name: 'Urban Garden Space',
          address: 'Seattle, WA',
          price: '$350/day',
          image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800',
          availability: 'Available Now',
          rating: 4.5,
          type: 'Garden'
        }
      ];
    }
    // Restaurant/Cafe
    else if (input.includes('restaurant') || input.includes('cafe') || input.includes('bar') || input.includes('diner')) {
      message = 'Excellent! I found some atmospheric dining locations perfect for intimate scenes or food-related content:';
      locations = [
        {
          name: 'Vintage Diner',
          address: 'Austin, TX',
          price: '$600/day',
          image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
          availability: 'Available Now',
          rating: 4.7,
          type: 'Restaurant'
        },
        {
          name: 'Modern Cafe Loft',
          address: 'San Francisco, CA',
          price: '$750/day',
          image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
          availability: 'Weekdays Only',
          rating: 4.6,
          type: 'Cafe'
        }
      ];
    }
    // Home/Residential
    else if (input.includes('home') || input.includes('house') || input.includes('apartment') || input.includes('residential')) {
      message = 'Perfect for intimate storytelling! Here are some residential locations with character and flexibility:';
      locations = [
        {
          name: 'Modern Family Home',
          address: 'Pasadena, CA',
          price: '$900/day',
          image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
          availability: 'Available Now',
          rating: 4.8,
          type: 'Residential'
        },
        {
          name: 'Downtown Loft Apartment',
          address: 'Miami, FL',
          price: '$850/day',
          image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
          availability: 'Available Soon',
          rating: 4.7,
          type: 'Apartment'
        },
        {
          name: 'Vintage Victorian House',
          address: 'Boston, MA',
          price: '$1,100/day',
          image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
          availability: 'Book in Advance',
          rating: 4.9,
          type: 'Historic'
        }
      ];
    }
    // Budget-friendly
    else if (input.includes('budget') || input.includes('cheap') || input.includes('affordable') || input.includes('low cost')) {
      message = 'Smart planning! Here are some excellent budget-friendly locations that don\'t compromise on quality:';
      locations = [
        {
          name: 'Community Center Hall',
          address: 'Phoenix, AZ',
          price: '$250/day',
          image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
          availability: 'Available Now',
          rating: 4.4,
          type: 'Indoor'
        },
        {
          name: 'Local Park Pavilion',
          address: 'Nashville, TN',
          price: '$200/day',
          image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800',
          availability: 'Available Now',
          rating: 4.3,
          type: 'Outdoor'
        },
        {
          name: 'Small Studio Space',
          address: 'Denver, CO',
          price: '$350/day',
          image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
          availability: 'Available Now',
          rating: 4.5,
          type: 'Studio'
        }
      ];
    }
    // City-specific searches
    else if (input.includes('los angeles') || input.includes('la')) {
      message = 'Los Angeles has incredible filming locations! Here are some top picks in the area:';
      locations = [
        {
          name: 'Hollywood Hills Vista',
          address: 'Hollywood Hills, Los Angeles, CA',
          price: '$1,200/day',
          image: 'https://images.unsplash.com/photo-1499402306555-f26f0ca4f7d3?w=800',
          availability: 'Available Now',
          rating: 4.9,
          type: 'Outdoor'
        },
        {
          name: 'Downtown LA Rooftop',
          address: 'Downtown, Los Angeles, CA',
          price: '$1,000/day',
          image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
          availability: 'Weekdays Only',
          rating: 4.8,
          type: 'Urban'
        }
      ];
    }
    else if (input.includes('new york') || input.includes('ny') || input.includes('nyc')) {
      message = 'The Big Apple offers endless possibilities! Check out these iconic NYC locations:';
      locations = [
        {
          name: 'Brooklyn Brownstone',
          address: 'Brooklyn Heights, NY',
          price: '$1,400/day',
          image: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=800',
          availability: 'Book in Advance',
          rating: 4.9,
          type: 'Residential'
        },
        {
          name: 'Manhattan Loft',
          address: 'SoHo, New York, NY',
          price: '$1,800/day',
          image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
          availability: 'Available Soon',
          rating: 4.8,
          type: 'Loft'
        }
      ];
    }
    // Default response
    else {
      message = 'I\'d be happy to help you find the perfect location! To give you the best recommendations, could you tell me:\n\n• What type of scene are you shooting? (interior/exterior, urban/rural, etc.)\n• What\'s your budget range per day?\n• Preferred city or region?\n• Any specific atmosphere or style? (modern, vintage, industrial, etc.)\n• Indoor or outdoor preference?\n\nOr try one of the quick searches below!';
    }

    return { message, locations };
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

    // Simulate AI processing
    setTimeout(() => {
      setIsTyping(false);
      const { message, locations } = generateLocationResponse(currentInput);

      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: message,
        timestamp: new Date(),
        locations: locations.length > 0 ? locations : undefined,
      };

      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const quickActions = [
    { text: 'Find a warehouse location', icon: Factory },
    { text: 'Show me office spaces', icon: Building2 },
    { text: 'Outdoor locations', icon: Mountain },
    { text: 'Budget-friendly studios', icon: DollarSign },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] max-h-[900px] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-[rgba(0,0,0,0.08)] flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF7A5A] to-[#FFC107] flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl text-[#3C3C3C]" style={{ fontWeight: 700 }}>
                  Location Scout Bot
                </h2>
                <p className="text-sm text-[#6B6B6B]">Find the perfect filming location</p>
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
              <div key={message.id}>
                <div
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

                {/* Location Cards */}
                {message.locations && message.locations.length > 0 && (
                  <div className="mt-4 space-y-3">
                    {message.locations.map((location, idx) => (
                      <div
                        key={idx}
                        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-[rgba(0,0,0,0.08)]"
                      >
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="w-full md:w-56 h-40 flex-shrink-0 bg-gradient-to-br from-[#FF7A5A]/10 to-[#FFC107]/10 relative">
                            <img
                              src={location.image}
                              alt={location.name}
                              className="w-full h-full object-cover"
                            />
                            <Badge className="absolute top-3 left-3 bg-white/90 text-[#3C3C3C] border-0">
                              {location.type}
                            </Badge>
                          </div>
                          <div className="flex-1 p-4">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="text-lg text-[#3C3C3C]" style={{ fontWeight: 600 }}>
                                {location.name}
                              </h3>
                              <div className="flex items-center gap-1 bg-[#FFC107]/10 px-2 py-1 rounded-lg">
                                <Star className="w-4 h-4 text-[#FFC107] fill-[#FFC107]" />
                                <span className="text-sm" style={{ fontWeight: 600 }}>{location.rating}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2 text-[#6B6B6B] text-sm mb-3">
                              <MapPin className="w-4 h-4" />
                              <span>{location.address}</span>
                            </div>
                            
                            <div className="flex items-center gap-4 mb-4">
                              <div className="flex items-center gap-2 text-sm">
                                <DollarSign className="w-4 h-4 text-[#FFC107]" />
                                <span className="text-[#3C3C3C]" style={{ fontWeight: 600 }}>
                                  {location.price}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Calendar className="w-4 h-4 text-[#28A745]" />
                                <span className="text-[#28A745]" style={{ fontWeight: 500 }}>
                                  {location.availability}
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2">
                              <Button className="bg-[#FF7A5A] hover:bg-[#FF6A4A] text-white rounded-lg text-sm h-9">
                                View Details
                              </Button>
                              <Button variant="outline" className="rounded-lg text-sm h-9">
                                <Image className="w-4 h-4 mr-2" />
                                Gallery
                              </Button>
                              <Button className="bg-[#28A745] hover:bg-[#228B3A] text-white rounded-lg text-sm h-9">
                                Book Tour
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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
                    <span className="text-sm text-[#6B6B6B]">Searching locations...</span>
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
              placeholder="Describe your ideal location..."
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
