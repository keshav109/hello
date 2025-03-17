import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ScrollText,
  LineChart,
  Table,
  Activity,
  TrendingUp,
  Database,
  Settings
} from 'lucide-react';

const menuItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/certificates', icon: ScrollText, label: 'Certificates' },
  
  { path: '/tables', icon: Table, label: 'Tables' },
  { path: '/kpi', icon: Activity, label: 'KPI' },
  
  { path: '/resources', icon: Database, label: 'Resources' },
  // { path: '/settings', icon: Settings, label: 'Settings' }
];

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-indigo-800 text-white p-4">
      <div className="flex items-center space-x-2 mb-8">
        <ScrollText className="w-8 h-8" />
        <h1 className="text-xl font-bold">CertifyHub</h1>
      </div>
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-indigo-700 text-white'
                  : 'text-indigo-100 hover:bg-indigo-700'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}