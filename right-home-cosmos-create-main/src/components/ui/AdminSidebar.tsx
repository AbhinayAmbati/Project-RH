import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Settings,
  Image,
} from 'lucide-react';

const AdminSidebar: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />,
      path: '/admin/dashboard',
    },
    {
      title: 'Project Images',
      icon: <Image className="h-5 w-5" />,
      path: '/admin/project-images',
    },
    {
      title: 'Consultations',
      icon: <MessageSquare className="h-5 w-5" />,
      path: '/admin/consultations',
    },
    {
      title: 'User Management',
      icon: <Users className="h-5 w-5" />,
      path: '/admin/users',
    },
    {
      title: 'Settings',
      icon: <Settings className="h-5 w-5" />,
      path: '/admin/settings',
    },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-[#111] border-r border-gray-800 pt-20">
      <div className="flex flex-col space-y-2 p-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
              location.pathname === item.path
                ? "bg-gold text-black"
                : "text-gray-400 hover:bg-gray-800/50"
            )}
          >
            {item.icon}
            <span>{item.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar; 