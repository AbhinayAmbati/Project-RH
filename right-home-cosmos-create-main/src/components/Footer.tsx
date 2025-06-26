
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-space-light border-t border-white/10">
      <div className="container-max section-padding">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gold-gradient rounded-lg flex items-center justify-center">
                <span className="text-space-dark font-bold text-xl">RH</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gradient">Right Home</h3>
                <p className="text-sm text-gray-400">ICONIC Infinity Group</p>
              </div>
            </div>
            
            <p className="text-gray-400 mb-6 max-w-md">
              One-stop destination for space creation — from concept to completion. 
              Transforming visions into reality with over two decades of excellence.
            </p>

            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-blue-gradient rounded-lg flex items-center justify-center cursor-pointer hover-lift">
                📘
              </div>
              <div className="w-10 h-10 bg-blue-gradient rounded-lg flex items-center justify-center cursor-pointer hover-lift">
                📷
              </div>
              <div className="w-10 h-10 bg-blue-gradient rounded-lg flex items-center justify-center cursor-pointer hover-lift">
                🐦
              </div>
              <div className="w-10 h-10 bg-blue-gradient rounded-lg flex items-center justify-center cursor-pointer hover-lift">
                💼
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Our Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-gold transition-colors cursor-pointer">Architecture & Planning</li>
              <li className="hover:text-gold transition-colors cursor-pointer">Interior Design</li>
              <li className="hover:text-gold transition-colors cursor-pointer">Smart Automation</li>
              <li className="hover:text-gold transition-colors cursor-pointer">Project Management</li>
              <li className="hover:text-gold transition-colors cursor-pointer">YATRA Lifts</li>
              <li className="hover:text-gold transition-colors cursor-pointer">AVANI Tiles</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Info</h4>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center space-x-2">
                <span>📍</span>
                <span className="text-sm">Mumbai, Maharashtra</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>📞</span>
                <span className="text-sm">+91 99999 88888</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>✉️</span>
                <span className="text-sm">hello@righthome.in</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>🕒</span>
                <span className="text-sm">Mon-Sat: 9AM-8PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Right Home - ICONIC Infinity Group. All rights reserved.
          </p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="text-gray-400 hover:text-gold transition-colors cursor-pointer text-sm">Privacy Policy</span>
            <span className="text-gray-400 hover:text-gold transition-colors cursor-pointer text-sm">Terms of Service</span>
            <span className="text-gray-400 hover:text-gold transition-colors cursor-pointer text-sm">Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
