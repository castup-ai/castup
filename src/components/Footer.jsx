import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="glass-card border-t border-white/10 mt-20">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-gold-500 to-gold-600 rounded-lg flex items-center justify-center">
                                <span className="text-lg font-bold text-dark-950">C</span>
                            </div>
                            <span className="text-xl font-display font-bold text-gradient">CastUp</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            AI-Powered Intelligent Cinema Networking Platform connecting film industry professionals.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/explore" className="text-gray-400 hover:text-gold-400 transition-colors">Explore Talent</Link></li>
                            <li><Link to="/casting" className="text-gray-400 hover:text-gold-400 transition-colors">Casting Calls</Link></li>
                            <li><Link to="/files" className="text-gray-400 hover:text-gold-400 transition-colors">Script Locker</Link></li>
                        </ul>
                    </div>

                    {/* For Professionals */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">For Professionals</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/signup" className="text-gray-400 hover:text-gold-400 transition-colors">Create Portfolio</Link></li>
                            <li><Link to="/dashboard" className="text-gray-400 hover:text-gold-400 transition-colors">Dashboard</Link></li>
                            <li><Link to="/notifications" className="text-gray-400 hover:text-gold-400 transition-colors">Notifications</Link></li>
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Connect</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 glass-card hover:bg-white/10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                                <span className="text-xl">📘</span>
                            </a>
                            <a href="#" className="w-10 h-10 glass-card hover:bg-white/10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                                <span className="text-xl">🐦</span>
                            </a>
                            <a href="#" className="w-10 h-10 glass-card hover:bg-white/10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                                <span className="text-xl">📸</span>
                            </a>
                            <a href="#" className="w-10 h-10 glass-card hover:bg-white/10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                                <span className="text-xl">▶️</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} CastUp. All rights reserved. Made with ❤️ for the film industry.</p>
                </div>
            </div>
        </footer>
    )
}
