import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import {generateCertificateData} from '../data/mockData'

interface StatCardProps {
  title: string;
  value: number;
  change: number;
  type: string;
}

const StatCard = ({ title, value, change, type }: StatCardProps) => (
  <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300">
    <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
    <div className="mt-2 flex items-baseline">
      <p className="text-2xl font-semibold text-[#000]">{value}</p>
    </div>
  </div>
);

export default function DashboardStats() {

  const data = generateCertificateData('All')
  console.log(data)
  let total = 0;
  let pending = 0;
  let approved = 0;
  let time = 0;

  for(let i=0; i<data.length; i++){
    total += data[i].count
    pending += data[i].pending
    approved += data[i].approved
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-[#000000] mb-6">Daily Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Certificates" value={total} change={12} type="total" />
        <StatCard title="Pending Review" value={pending} change={-5} type="pending" />
        <StatCard title="Approved Today" value={approved} change={8} type="approved" />
        <StatCard title="Processing Time" value={24} change={-15} type="time" />
      </div>
    </div>
  );
}
