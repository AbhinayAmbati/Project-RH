import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Cookies from 'js-cookie';
import { useAuth } from '@/context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const token = Cookies.get('token');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Fixed Logo and Menu Toggle - Always Visible */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-6">
        {/* Logo - Always Visible */}
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gold-gradient rounded-lg flex items-center justify-center">
            <span className="text-space-dark font-bold text-lg">RH</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gradient">Right Home</h1>
            <p className="text-xs text-gray-400">ICONIC Infinity Group</p>
          </div>
        </Link>

        {/* User Info & Menu Toggle */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="hidden md:flex items-center space-x-4 mr-4">
              {user.role === 'admin' && (
                <Link
                  to="/admin"
                  className="flex items-center space-x-3 px-4 py-2 rounded-full bg-gold/10 backdrop-blur-md border border-gold/20 hover:bg-gold/20 transition-all duration-300"
                >
                  <span className="text-gold text-sm font-medium">Admin Dashboard</span>
                </Link>
              )}
              <Link to="/profile" className="flex items-center space-x-3 px-4 py-2 rounded-full bg-black/20 backdrop-blur-md border border-white/10 hover:bg-black/30 transition-all duration-300">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-gold text-black text-sm">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <span className="text-white text-sm font-medium">{user.name}</span>
              </Link>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="bg-black/20 backdrop-blur-md border-white/10 hover:bg-black/30 text-white"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-4 mr-4">
              <Link to="/login">
                <Button variant="outline" className="bg-black/20 backdrop-blur-md border-white/10 hover:bg-black/30 text-white">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-gold-gradient hover:bg-gold-gradient/90 text-space-dark font-medium">
                  Register
                </Button>
              </Link>
            </div>
          )}

          {/* Three Dots Menu Toggle - Always Visible */}
          <button 
            className="group relative w-12 h-12 flex flex-col justify-center items-center space-y-1 bg-black/20 backdrop-blur-md border border-white/10 rounded-full transition-all duration-300 hover:bg-black/30"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className={`block w-1.5 h-1.5 bg-white rounded-full transition-all duration-300 ${isMenuOpen ? 'transform scale-125' : ''}`}></span>
            <span className={`block w-1.5 h-1.5 bg-white rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-50' : ''}`}></span>
            <span className={`block w-1.5 h-1.5 bg-white rounded-full transition-all duration-300 ${isMenuOpen ? 'transform scale-125' : ''}`}></span>
          </button>
        </div>
      </div>

      {/* Transparent Header Overlay */}
      <div className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}>
        <div className="bg-space-dark/85 backdrop-blur-xl border-b border-white/10">
          <div className="container-max px-8 py-8 pt-20">
            {/* Navigation Links */}
            <nav className="flex flex-col md:flex-row items-start md:items-center justify-center space-y-6 md:space-y-0 md:space-x-12">
              {[
                { name: 'About', id: 'about', delay: '0.1s' },
                { name: 'Services', id: 'services', delay: '0.2s' },
                { name: 'Walkthrough', id: 'walkthrough', delay: '0.3s' },
                { name: 'Testimonials', id: 'testimonials', delay: '0.4s' },
                { name: 'Contact', id: 'contact', delay: '0.5s' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-2xl md:text-lg font-medium text-white hover:text-gold transition-all duration-300 ${
                    isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}
                  style={{ transitionDelay: item.delay }}
                >
                  {item.name}
                </button>
              ))}
              {/* Mobile User Info */}
              {user ? (
                <div className="md:hidden space-y-4 w-full">
                  {user.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-gold/10 backdrop-blur-md border border-gold/20 hover:bg-gold/20 transition-all duration-300 w-full"
                    >
                      <span className="text-gold font-medium">Admin Dashboard</span>
                    </Link>
                  )}
                  <Link
                    to="/profile"
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-black/20 backdrop-blur-md border border-white/10 hover:bg-black/30 transition-all duration-300 w-full"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gold text-black">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-white font-medium">{user.name}</span>
                      <span className="text-gray-400 text-sm">{user.email}</span>
                    </div>
                  </Link>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="w-full bg-black/20 backdrop-blur-md border-white/10 hover:bg-black/30 text-white"
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="md:hidden space-y-4 w-full">
                  <Link to="/login" className="w-full">
                    <Button variant="outline" className="w-full bg-black/20 backdrop-blur-md border-white/10 hover:bg-black/30 text-white">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/register" className="w-full">
                    <Button className="w-full bg-gold-gradient hover:bg-gold-gradient/90 text-space-dark font-medium">
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      </div>

      {/* Overlay Background */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 transition-opacity duration-500"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navigation;
