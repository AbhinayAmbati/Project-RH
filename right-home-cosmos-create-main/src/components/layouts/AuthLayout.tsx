import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-space-dark relative overflow-hidden">
      {/* Navigation */}
      <nav className="p-4 relative z-10">
        <div className="container-max">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gold-gradient rounded-lg flex items-center justify-center">
              <span className="text-lg font-bold text-space-dark">RH</span>
            </div>
            <span className="text-2xl font-bold text-white">Right Home Cosmos</span>
          </Link>
        </div>
      </nav>

      {/* Auth Content */}
      <div className="container-max px-4 py-8 relative z-10">
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