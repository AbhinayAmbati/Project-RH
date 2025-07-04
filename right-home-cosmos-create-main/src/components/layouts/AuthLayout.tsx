import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-space-dark relative overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 p-4 bg-[#0A0A0A]/80 backdrop-blur-lg border-b border-gray-800/50 z-50">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-20 h-10 bg-gradient-to-br from-gold to-gold/80 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
                <img src="/images/logo1.png" alt="Right Home Logo" className="w-40 h-20 object-contain" />
              </div>
              <span className="text-2xl font-bold text-white group-hover:text-gold transition-colors">Right Home</span>
            </Link>

            <Link 
              to="/" 
              className="text-gray-400 hover:text-gold transition-colors flex items-center space-x-1 text-sm font-medium"
            >
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
                />
              </svg>
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content - Adjusted padding to account for fixed nav */}
      <div className="container-max px-4 pt-24 pb-8 relative z-10">
        <div className="max-w-md mx-auto">
          {/* Main Content */}
          <div className="relative animate-fade-in-up">
            {children}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 z-0">
        {/* Gradient Orbs */}
        <div className="absolute left-[80%] top-[20%] -z-10 transform-gpu blur-3xl">
          <div className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-gold/20 to-blue-accent/20 opacity-20" />
        </div>
        <div className="absolute left-[50%] top-[60%] -z-10 transform-gpu blur-3xl">
          <div className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-blue-accent/20 to-gold/20 opacity-20" />
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-16 h-16 bg-gold/10 rounded-lg animate-float"></div>
        <div className="absolute top-40 right-32 w-12 h-12 bg-blue-accent/10 rounded-lg animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-40 w-20 h-20 bg-gold/10 rounded-lg animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-20 w-14 h-14 bg-blue-accent/10 rounded-lg animate-float" style={{ animationDelay: '3s' }}></div>

        {/* Background Particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gold rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full py-4 text-center text-sm text-gray-400 z-10">
        <p>© {new Date().getFullYear()} Right Home Cosmos. All rights reserved.</p>
      </footer>
    </div>
  );
} 