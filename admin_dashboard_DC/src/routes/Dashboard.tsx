import React from 'react';
import DashboardStats from '../components/DashboardStats';
import CertificateChart from '../components/CertificateChart';

export default function Dashboard() {
  return (
    <div className="shadow-sm space-y-8">
      <DashboardStats />
      <CertificateChart />
    </div>
  );
}