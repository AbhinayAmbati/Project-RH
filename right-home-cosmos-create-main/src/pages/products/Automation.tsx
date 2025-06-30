import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import Navigation from '@/components/Navigation';

const Automation = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navigation />
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-white mb-8 mt-8 flex items-center gap-3">
          <span className="text-3xl">🤖</span>
          Home Automation Services
        </h1>
        
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="bg-[#111] border-gray-800">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">Our Automation Expertise</h2>
              <p className="text-gray-400 mb-4">
                Embrace the future with our cutting-edge home automation solutions. We integrate smart 
                technology to make your living space more comfortable, efficient, and secure.
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>Smart Home Integration</li>
                <li>Lighting Automation</li>
                <li>Climate Control Systems</li>
                <li>Security & Surveillance</li>
                <li>Voice Control Solutions</li>
                <li>Energy Management</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-[#111] border-gray-800">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">Why Choose Our Automation Services</h2>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start">
                  <span className="mr-2">⚡</span>
                  <span>Enhanced energy efficiency and cost savings</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🔒</span>
                  <span>Advanced security and monitoring</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">📱</span>
                  <span>Seamless mobile control and integration</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🎯</span>
                  <span>Customized automation scenarios</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">💪</span>
                  <span>Reliable performance and support</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 bg-[#111] border-gray-800">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Our Implementation Process</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-4">
                <div className="text-3xl mb-2">📋</div>
                <h3 className="text-white font-semibold mb-2">Assessment</h3>
                <p className="text-gray-400 text-sm">Evaluating your automation needs and requirements</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">💡</div>
                <h3 className="text-white font-semibold mb-2">System Design</h3>
                <p className="text-gray-400 text-sm">Planning the perfect automation setup</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">🔧</div>
                <h3 className="text-white font-semibold mb-2">Installation</h3>
                <p className="text-gray-400 text-sm">Professional setup of hardware and software</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">📱</div>
                <h3 className="text-white font-semibold mb-2">Configuration</h3>
                <p className="text-gray-400 text-sm">Programming and testing your smart system</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Automation; 