import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import SignUpScreen from './components/SignUpScreen';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';

export type UserRole = 'Actor' | 'Director' | 'Producer' | 'Cinematographer' | 'Writer' | 'Crew';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  bio?: string;
  skills?: string[];
  experience?: any[];
  profilePicture?: string;
  coverPhoto?: string;
  verified?: boolean;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'landing' | 'signup' | 'login' | 'dashboard'>('landing');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('castup_user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setCurrentScreen('dashboard');
    }
  }, []);

  const handleSignUp = (userData: Omit<User, 'id'>) => {
    const newUser: User = {
      ...userData,
      id: `user_${Date.now()}`,
    };
    setCurrentUser(newUser);
    localStorage.setItem('castup_user', JSON.stringify(newUser));
    setCurrentScreen('dashboard');
  };

  const handleLogin = (email: string, password: string) => {
    // Mock login - in real app would validate credentials
    const mockUser: User = {
      id: `user_${Date.now()}`,
      name: 'Demo User',
      email: email,
      role: 'Actor',
    };
    setCurrentUser(mockUser);
    localStorage.setItem('castup_user', JSON.stringify(mockUser));
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('castup_user');
    setCurrentScreen('landing');
  };

  return (
    <div className="size-full bg-[#FFF8F0]">
      {currentScreen === 'landing' && (
        <LandingPage 
          onSignUpClick={() => setCurrentScreen('signup')}
          onLoginClick={() => setCurrentScreen('login')}
          onExploreClick={() => {
            // Create a demo user for explore mode
            const demoUser: User = {
              id: `user_demo_${Date.now()}`,
              name: 'Guest User',
              email: 'guest@castup.com',
              role: 'Actor',
            };
            setCurrentUser(demoUser);
            setCurrentScreen('dashboard');
          }}
        />
      )}
      
      {currentScreen === 'signup' && (
        <SignUpScreen 
          onSignUp={handleSignUp}
          onLoginClick={() => setCurrentScreen('login')}
        />
      )}
      
      {currentScreen === 'login' && (
        <LoginScreen 
          onLogin={handleLogin}
          onSignUpClick={() => setCurrentScreen('signup')}
        />
      )}
      
      {currentScreen === 'dashboard' && currentUser && (
        <Dashboard 
          user={currentUser}
          onUpdateUser={setCurrentUser}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}
