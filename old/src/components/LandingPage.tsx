import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Sparkles, Users, Video, Zap, Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface LandingPageProps {
  onSignUpClick: () => void;
  onLoginClick: () => void;
  onExploreClick: () => void;
}

export default function LandingPage({ onSignUpClick, onLoginClick, onExploreClick }: LandingPageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const newsSlides = [
    {
      image: 'https://images.unsplash.com/photo-1741887864007-271499b10d53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxtJTIwaW5kdXN0cnklMjBhd2FyZHN8ZW58MXx8fHwxNzU5MzE1MDQ0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Awards Season 2025',
      description: 'Indie films dominate nominations',
    },
    {
      image: 'https://images.unsplash.com/photo-1751823886813-0cfc86cb9478?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHByZW1pZXJlJTIwZXZlbnR8ZW58MXx8fHwxNzU5MzE1MDQ1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Major Studio Premiere',
      description: 'Hollywood celebrates new releases',
    },
    {
      image: 'https://images.unsplash.com/photo-1750905076354-35495759b004?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjBkaXJlY3RvciUyMHNldHxlbnwxfHx8fDE3NTkzMTUwNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'On-Set Innovation',
      description: 'New tech transforms filmmaking',
    },
    {
      image: 'https://images.unsplash.com/photo-1651764915167-6736b20968e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxtJTIwZmVzdGl2YWwlMjBzY3JlZW5pbmd8ZW58MXx8fHwxNzU5MzE1MDQ1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Festival Circuit Heats Up',
      description: 'Emerging voices shine at Sundance',
    },
  ];

  const features = [
    {
      icon: Sparkles,
      title: 'AI Casting',
      description: 'Smart matching powered by AI to find the perfect talent for your project',
    },
    {
      icon: Users,
      title: 'Smart Portfolios',
      description: 'Showcase your work with AI-enhanced profiles that get noticed',
    },
    {
      icon: Video,
      title: 'Short Films Hub',
      description: 'Share and discover incredible short films from creators worldwide',
    },
    {
      icon: Zap,
      title: 'Instant Connections',
      description: 'Connect with industry professionals in real-time',
    },
    {
      icon: Star,
      title: 'Verified Credentials',
      description: 'Build trust with verified experience and credentials',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % newsSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [newsSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % newsSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + newsSlides.length) % newsSlides.length);
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[rgba(0,0,0,0.08)]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF7A5A] to-[#FFC107] flex items-center justify-center">
              <Video className="w-6 h-6 text-white" />
            </div>
            <span className="text-[#3C3C3C] text-xl" style={{ fontWeight: 700 }}>CastUp</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={onLoginClick}
              className="px-6 py-2.5 text-[#3C3C3C] hover:text-[#FF7A5A] transition-colors"
              style={{ fontWeight: 500 }}
            >
              Log In
            </button>
            <Button 
              onClick={onSignUpClick}
              className="px-6 py-2.5 bg-[#FF7A5A] hover:bg-[#FF6A4A] text-white rounded-xl shadow-lg shadow-[#FF7A5A]/20"
            >
              Join for Free
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
                <Sparkles className="w-4 h-4 text-[#FFC107]" />
                <span className="text-sm text-[#6B6B6B]">AI-Powered Film Networking</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl text-[#3C3C3C]" style={{ fontWeight: 700, lineHeight: 1.1 }}>
                CastUp: Where Cinema Connects
              </h1>
              
              <p className="text-xl text-[#6B6B6B]">
                Your AI-powered network for film opportunities. Connect with talent, discover projects, and bring your creative vision to life.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Button 
                  onClick={onSignUpClick}
                  className="px-8 py-6 bg-[#FF7A5A] hover:bg-[#FF6A4A] text-white rounded-xl shadow-xl shadow-[#FF7A5A]/30 text-lg"
                >
                  Join for Free
                </Button>
                <Button 
                  onClick={onExploreClick}
                  className="px-8 py-6 bg-[#FF7A5A] hover:bg-[#FF6A4A] text-white rounded-xl shadow-xl shadow-[#FF7A5A]/30 text-lg"
                >
                  Explore Talent
                </Button>
              </div>
              
              <div className="flex items-center gap-8 pt-6">
                <div>
                  <div className="text-3xl text-[#3C3C3C]" style={{ fontWeight: 700 }}>10K+</div>
                  <div className="text-sm text-[#6B6B6B]">Active Members</div>
                </div>
                <div>
                  <div className="text-3xl text-[#3C3C3C]" style={{ fontWeight: 700 }}>500+</div>
                  <div className="text-sm text-[#6B6B6B]">Projects Posted</div>
                </div>
                <div>
                  <div className="text-3xl text-[#3C3C3C]" style={{ fontWeight: 700 }}>98%</div>
                  <div className="text-sm text-[#6B6B6B]">Match Success</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative group">
                {newsSlides.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img 
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                      <div className="inline-block px-3 py-1 bg-[#FF7A5A] rounded-full text-white text-xs mb-2" style={{ fontWeight: 600 }}>
                        Industry News
                      </div>
                      <h3 className="text-xl text-white mb-1" style={{ fontWeight: 700 }}>
                        {slide.title}
                      </h3>
                      <p className="text-white/90 text-sm">
                        {slide.description}
                      </p>
                    </div>
                  </div>
                ))}
                
                {/* Navigation Buttons */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>

                {/* Dots Indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {newsSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentSlide ? 'bg-white w-6' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-gradient-to-br from-[#FF7A5A] to-[#FFC107] rounded-2xl opacity-20 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-[#3C3C3C] mb-4" style={{ fontWeight: 700 }}>
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-[#6B6B6B]">
              Powerful tools designed for filmmakers, by filmmakers
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="p-8 bg-[#FFF8F0] rounded-2xl hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#FF7A5A] to-[#FFC107] flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl text-[#3C3C3C] mb-2" style={{ fontWeight: 600 }}>
                  {feature.title}
                </h3>
                <p className="text-[#6B6B6B]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 bg-gradient-to-br from-[#FF7A5A] to-[#FFC107] rounded-3xl shadow-2xl">
            <h2 className="text-4xl text-white mb-4" style={{ fontWeight: 700 }}>
              Ready to Connect?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of filmmakers building their careers on CastUp
            </p>
            <Button 
              onClick={onSignUpClick}
              className="px-8 py-6 bg-white hover:bg-gray-50 text-[#FF7A5A] rounded-xl shadow-xl text-lg"
              style={{ fontWeight: 600 }}
            >
              Get Started Today
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-white border-t border-[rgba(0,0,0,0.08)]">
        <div className="max-w-7xl mx-auto text-center text-[#6B6B6B]">
          <p>&copy; 2025 CastUp. Where Cinema Connects.</p>
        </div>
      </footer>
    </div>
  );
}
