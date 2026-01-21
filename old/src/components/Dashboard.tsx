import { useState } from 'react';
import { Bell, Video, Home, Users, Briefcase, Film, MessageSquare, MapPin, LogOut, Sparkles, Megaphone, X } from 'lucide-react';
import type { User } from '../App';
import ExplorePage from './ExplorePage';
import PortfolioEdit from './PortfolioEdit';
import PortfolioView from './PortfolioView';
import AICastingAssistant from './AICastingAssistant';
import ShortFilms from './ShortFilms';
import CrewAlerts from './CrewAlerts';
import NotificationsPanel from './NotificationsPanel';
import AIChatBot from './AIChatBot';
import LocationScoutBot from './LocationScoutBot';

type DashboardView = 'home' | 'explore' | 'portfolio' | 'films' | 'crew-alerts' | 'profile-view';

interface DashboardProps {
  user: User;
  onUpdateUser: (user: User) => void;
  onLogout: () => void;
}

export default function Dashboard({ user, onUpdateUser, onLogout }: DashboardProps) {
  const [currentView, setCurrentView] = useState<DashboardView>('home');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [showLocationBot, setShowLocationBot] = useState(false);
  const [showAICasting, setShowAICasting] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState(3);

  const handleViewProfile = (profileId: string) => {
    setSelectedProfileId(profileId);
    setCurrentView('profile-view');
  };

  const handleBackToExplore = () => {
    setCurrentView('explore');
    setSelectedProfileId(null);
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-[rgba(0,0,0,0.08)] flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-[rgba(0,0,0,0.08)]">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF7A5A] to-[#FFC107] flex items-center justify-center">
              <Video className="w-6 h-6 text-white" />
            </div>
            <span className="text-[#3C3C3C] text-xl" style={{ fontWeight: 700 }}>CastUp</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          <button
            onClick={() => setCurrentView('home')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              currentView === 'home' ? 'bg-[#FFF8F0] text-[#FF7A5A]' : 'text-[#6B6B6B] hover:bg-[#FFF8F0]'
            }`}
          >
            <Home className="w-5 h-5" />
            <span style={{ fontWeight: 500 }}>Home</span>
          </button>

          <button
            onClick={() => setCurrentView('explore')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              currentView === 'explore' ? 'bg-[#FFF8F0] text-[#FF7A5A]' : 'text-[#6B6B6B] hover:bg-[#FFF8F0]'
            }`}
          >
            <Users className="w-5 h-5" />
            <span style={{ fontWeight: 500 }}>Explore</span>
          </button>

          <button
            onClick={() => setCurrentView('portfolio')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              currentView === 'portfolio' ? 'bg-[#FFF8F0] text-[#FF7A5A]' : 'text-[#6B6B6B] hover:bg-[#FFF8F0]'
            }`}
          >
            <Briefcase className="w-5 h-5" />
            <span style={{ fontWeight: 500 }}>My Portfolio</span>
          </button>

          <button
            onClick={() => setCurrentView('films')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              currentView === 'films' ? 'bg-[#FFF8F0] text-[#FF7A5A]' : 'text-[#6B6B6B] hover:bg-[#FFF8F0]'
            }`}
          >
            <Film className="w-5 h-5" />
            <span style={{ fontWeight: 500 }}>Short Films</span>
          </button>

          <button
            onClick={() => setCurrentView('crew-alerts')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              currentView === 'crew-alerts' ? 'bg-[#FFF8F0] text-[#FF7A5A]' : 'text-[#6B6B6B] hover:bg-[#FFF8F0]'
            }`}
          >
            <Megaphone className="w-5 h-5" />
            <span style={{ fontWeight: 500 }}>Crew Alerts</span>
          </button>

          <div className="pt-4 border-t border-[rgba(0,0,0,0.08)] mt-4">
            <p className="px-4 text-xs text-[#6B6B6B] mb-2" style={{ fontWeight: 600 }}>AI TOOLS</p>
            
            <button
              onClick={() => setShowAICasting(true)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#6B6B6B] hover:bg-[#FFF8F0] transition-colors"
            >
              <Sparkles className="w-5 h-5" />
              <span style={{ fontWeight: 500 }}>AI Casting</span>
            </button>

            <button
              onClick={() => setShowAIChat(true)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#6B6B6B] hover:bg-[#FFF8F0] transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
              <span style={{ fontWeight: 500 }}>AI Assistant</span>
            </button>

            <button
              onClick={() => setShowLocationBot(true)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#6B6B6B] hover:bg-[#FFF8F0] transition-colors"
            >
              <MapPin className="w-5 h-5" />
              <span style={{ fontWeight: 500 }}>Location Scout</span>
            </button>
          </div>
        </nav>

        {/* User Menu */}
        <div className="p-4 border-t border-[rgba(0,0,0,0.08)]">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#FFF8F0]">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF7A5A] to-[#FFC107] flex items-center justify-center text-white" style={{ fontWeight: 600 }}>
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[#3C3C3C] truncate" style={{ fontWeight: 600 }}>{user.name}</div>
              <div className="text-sm text-[#6B6B6B]">{user.role}</div>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full mt-2 flex items-center gap-3 px-4 py-3 rounded-xl text-[#DC3545] hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span style={{ fontWeight: 500 }}>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="h-20 bg-white border-b border-[rgba(0,0,0,0.08)] flex items-center justify-between px-8">
          <div className="flex items-center h-full pb-6">
            <h1 className="text-2xl text-[#3C3C3C] relative inline-block" style={{ fontWeight: 700 }}>
              {currentView === 'home' && 'CastUp'}
              {currentView === 'explore' && 'Explore Talent'}
              {currentView === 'portfolio' && 'My Portfolio'}
              {currentView === 'films' && 'Short Films'}
              {currentView === 'crew-alerts' && 'Crew Alerts'}
              {currentView === 'profile-view' && 'Profile'}
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-[#FF7A5A] rounded-full"></div>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl hover:bg-[#FFF8F0] transition-colors"
            >
              <Bell className="w-6 h-6 text-[#6B6B6B]" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF7A5A] rounded-full"></span>
              )}
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto">
          {currentView === 'home' && (
            <div className="p-8">
              <div className="max-w-6xl mx-auto">
                <div className="bg-gradient-to-br from-[#FF7A5A] to-[#FFC107] rounded-2xl p-8 text-white mb-8">
                  <h2 className="text-3xl mb-2" style={{ fontWeight: 700 }}>Welcome back, {user.name}! 👋</h2>
                  <p className="text-lg opacity-90">Ready to make some magic today?</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <Users className="w-8 h-8 text-[#FF7A5A] mb-3" />
                    <h3 className="text-xl text-[#3C3C3C] mb-2" style={{ fontWeight: 600 }}>Explore Talent</h3>
                    <p className="text-[#6B6B6B] mb-4">Discover talented professionals for your next project</p>
                    <button
                      onClick={() => setCurrentView('explore')}
                      className="text-[#FF7A5A] hover:text-[#FF6A4A]"
                      style={{ fontWeight: 600 }}
                    >
                      Start Exploring →
                    </button>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <Sparkles className="w-8 h-8 text-[#FFC107] mb-3" />
                    <h3 className="text-xl text-[#3C3C3C] mb-2" style={{ fontWeight: 600 }}>AI Casting</h3>
                    <p className="text-[#6B6B6B] mb-4">Let AI find the perfect match for your roles</p>
                    <button
                      onClick={() => setShowAICasting(true)}
                      className="text-[#FF7A5A] hover:text-[#FF6A4A]"
                      style={{ fontWeight: 600 }}
                    >
                      Try AI Casting →
                    </button>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <Film className="w-8 h-8 text-[#FF7A5A] mb-3" />
                    <h3 className="text-xl text-[#3C3C3C] mb-2" style={{ fontWeight: 600 }}>Short Films</h3>
                    <p className="text-[#6B6B6B] mb-4">Watch and share amazing short films</p>
                    <button
                      onClick={() => setCurrentView('films')}
                      className="text-[#FF7A5A] hover:text-[#FF6A4A]"
                      style={{ fontWeight: 600 }}
                    >
                      Browse Films →
                    </button>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#FFC107]">
                    <Megaphone className="w-8 h-8 text-[#FF7A5A] mb-3" />
                    <h3 className="text-xl text-[#3C3C3C] mb-2" style={{ fontWeight: 600 }}>Crew Alerts</h3>
                    <p className="text-[#6B6B6B] mb-4">Find crew opportunities or post casting calls</p>
                    <button
                      onClick={() => setCurrentView('crew-alerts')}
                      className="text-[#FF7A5A] hover:text-[#FF6A4A]"
                      style={{ fontWeight: 600 }}
                    >
                      View Alerts →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentView === 'explore' && (
            <ExplorePage onViewProfile={handleViewProfile} />
          )}

          {currentView === 'portfolio' && (
            <PortfolioEdit user={user} onUpdateUser={onUpdateUser} />
          )}

          {currentView === 'films' && (
            <ShortFilms />
          )}

          {currentView === 'crew-alerts' && (
            <CrewAlerts user={user} />
          )}

          {currentView === 'profile-view' && selectedProfileId && (
            <PortfolioView profileId={selectedProfileId} onBack={handleBackToExplore} />
          )}
        </main>
      </div>

      {/* Notifications Panel */}
      {showNotifications && (
        <NotificationsPanel
          onClose={() => setShowNotifications(false)}
          onClearUnread={() => setUnreadCount(0)}
        />
      )}

      {/* AI Casting Assistant */}
      {showAICasting && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] max-h-[900px] flex flex-col relative">
            <button
              onClick={() => setShowAICasting(false)}
              className="absolute top-6 right-6 z-10 p-2 rounded-lg hover:bg-[#FFF8F0] transition-colors bg-white shadow-lg"
            >
              <X className="w-5 h-5 text-[#6B6B6B]" />
            </button>
            <div className="flex-1 overflow-auto">
              <AICastingAssistant onViewProfile={handleViewProfile} />
            </div>
          </div>
        </div>
      )}

      {/* AI Chat Bot */}
      {showAIChat && (
        <AIChatBot onClose={() => setShowAIChat(false)} />
      )}

      {/* Location Scout Bot */}
      {showLocationBot && (
        <LocationScoutBot onClose={() => setShowLocationBot(false)} />
      )}
    </div>
  );
}
