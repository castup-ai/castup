import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Video, Sparkles, Users, Film, Zap, Star } from 'lucide-react';

export default function LandingPage() {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    const features = [
        {
            icon: Sparkles,
            title: 'AI Smart Matching',
            description: 'Smart matching powered by AI to find the perfect talent for your project',
        },
        {
            icon: Users,
            title: 'Smart Portfolios',
            description: 'Showcase your work with AI-enhanced profiles that get noticed',
        },
        {
            icon: Film,
            title: 'Casting Dashboard',
            description: 'Post casting calls, review applications, and manage projects',
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

    return (
        <div className="min-h-screen bg-[#FFF8F0]">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF7A5A] to-[#FFC107] flex items-center justify-center">
                            <Video className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-[#3C3C3C] text-xl font-bold">CastUp</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link to="/login" className="px-6 py-2.5 text-[#3C3C3C] hover:text-[#FF7A5A] transition-colors font-medium">
                            Log In
                        </Link>
                        <Link to="/signup">
                            <Button className="px-6 py-2.5">
                                Join for Free
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6 animate-fade-in">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
                                <Sparkles className="w-4 h-4 text-[#FFC107]" />
                                <span className="text-sm text-[#6B6B6B]">AI-Powered Film Networking</span>
                            </div>

                            <h1 className="text-5xl lg:text-6xl text-[#3C3C3C] font-bold leading-tight">
                                CastUp: Where Cinema Connects
                            </h1>

                            <p className="text-xl text-[#6B6B6B]">
                                Your AI-powered network for film opportunities. Connect with talent, discover projects, and bring your creative vision to life.
                            </p>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <Link to="/signup">
                                    <Button size="lg" className="text-lg px-8 py-6">
                                        Join for Free
                                    </Button>
                                </Link>
                                <Link to="/explore">
                                    <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                                        Explore Talent
                                    </Button>
                                </Link>
                            </div>

                            <div className="flex items-center gap-8 pt-6">
                                <div>
                                    <div className="text-3xl text-[#3C3C3C] font-bold">10K+</div>
                                    <div className="text-sm text-[#6B6B6B]">Active Members</div>
                                </div>
                                <div>
                                    <div className="text-3xl text-[#3C3C3C] font-bold">500+</div>
                                    <div className="text-sm text-[#6B6B6B]">Projects Posted</div>
                                </div>
                                <div>
                                    <div className="text-3xl text-[#3C3C3C] font-bold">98%</div>
                                    <div className="text-sm text-[#6B6B6B]">Match Success</div>
                                </div>
                            </div>
                        </div>

                        <div className="relative animate-slide-up">
                            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#FF7A5A]/20 to-[#FFC107]/20">
                                <img
                                    src="https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80"
                                    alt="Film Production"
                                    className="w-full h-full object-cover"
                                />
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
                        <h2 className="text-4xl text-[#3C3C3C] font-bold mb-4">
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
                                <h3 className="text-xl text-[#3C3C3C] font-semibold mb-2">
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
                        <h2 className="text-4xl text-white font-bold mb-4">
                            Ready to Connect?
                        </h2>
                        <p className="text-xl text-white/90 mb-8">
                            Join thousands of filmmakers building their careers on CastUp
                        </p>
                        <Link to="/signup">
                            <Button
                                size="lg"
                                variant="secondary"
                                className="bg-white text-[#FF7A5A] hover:bg-gray-50 px-8 py-6 text-lg font-semibold"
                            >
                                Get Started Today
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 bg-white border-t border-gray-200">
                <div className="max-w-7xl mx-auto text-center text-[#6B6B6B]">
                    <p>&copy; 2025 CastUp. Where Cinema Connects.</p>
                </div>
            </footer>
        </div>
    );
}
