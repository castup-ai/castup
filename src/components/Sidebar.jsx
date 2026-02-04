import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import {
    Home,
    Users,
    Briefcase,
    Film,
    FolderLock,
    LogOut,
    Video,
    Bot,
    Sparkles,
    MapPin,
    UserSearch
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export default function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { profiles } = useData();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleViewProfile = () => {
        navigate('/profile');
    };

    const navItems = [
        { path: '/dashboard', icon: Home, label: 'Home' },
        { path: '/explore', icon: Users, label: 'Explore' },
        { path: '/casting', icon: Film, label: 'Casting Calls' },
        { path: '/files', icon: FolderLock, label: 'Script Locker' },
    ];

    const aiToolsItems = [
        { path: '/ai/casting-director', icon: Sparkles, label: 'AI Casting Director' },
        { path: '/ai/assistant', icon: Bot, label: 'AI Assistant' },
        { path: '/ai/location-scout', icon: MapPin, label: 'AI Location Scout' },
        { path: '/ai/profile-explain', icon: UserSearch, label: 'Profile Explanatory' },
    ];

    const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

    return (
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
            {/* Logo */}
            <div className="p-6 border-b border-gray-200">
                <Link to="/dashboard" className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF7A5A] to-[#FFC107] flex items-center justify-center">
                        <Video className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-[#3C3C3C] text-xl font-bold">CastUp</span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${active
                                ? 'bg-[#FFF8F0] text-[#FF7A5A]'
                                : 'text-[#6B6B6B] hover:bg-[#FFF8F0] hover:text-[#3C3C3C]'
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    );
                })}

                {/* AI Tools Section */}
                <div className="pt-4 mt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2 px-4 py-2 mb-2">
                        <span className="text-xs font-bold text-[#6B6B6B] uppercase tracking-wider">AI Tools</span>
                        <div className="w-10 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                            <span className="text-[10px] font-bold text-white">BETA</span>
                        </div>
                    </div>
                    {aiToolsItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.path);

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${active
                                    ? 'bg-gradient-to-r from-purple-50 to-pink-50 text-purple-600'
                                    : 'text-[#6B6B6B] hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-600'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-medium text-sm">{item.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </nav>

            {/* User Menu */}
            <div className="p-4 border-t border-gray-200">
                <button
                    onClick={handleViewProfile}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#FFF8F0] mb-2 hover:bg-[#FFE5DD] transition-colors cursor-pointer"
                >
                    <Avatar>
                        <AvatarImage src={user?.profilePicture} />
                        <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0 text-left">
                        <div className="text-[#3C3C3C] font-semibold truncate">{user?.name}</div>
                        <div className="text-sm text-[#6B6B6B]">{user?.department || user?.role}</div>
                    </div>
                </button>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
}
