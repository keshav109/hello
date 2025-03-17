import React, { useState, useEffect, useCallback } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  FileText, 
  Users, 
  BarChart2, 
  AlertCircle, 
  RefreshCcw, 
  CheckCircle2 
} from 'lucide-react';

class SmartLoadBalancer {
  constructor() {
    this.officials = [
      { 
        id: 1,
        name: 'Rahul Singh', 
        primary: 'income_certificate', 
        pendingApplications: [], 
        capacity: 10,
        expertise: ['income_certificate', 'residence_certificate']
      },
      { 
        id: 2,
        name: 'Priya Patel', 
        primary: 'caste_certificate', 
        pendingApplications: [], 
        capacity: 8,
        expertise: ['caste_certificate', 'birth_certificate']
      },
      { 
        id: 3,
        name: 'Amit Kumar', 
        primary: 'birth_certificate', 
        pendingApplications: [], 
        capacity: 12,
        expertise: ['birth_certificate', 'income_certificate']
      },
      { 
        id: 4,
        name: 'Sneha Sharma', 
        primary: 'residence_certificate', 
        pendingApplications: [], 
        capacity: 9,
        expertise: ['residence_certificate', 'caste_certificate']
      }
    ];

    this.applicationQueue = {
      'income_certificate': [],
      'caste_certificate': [],
      'birth_certificate': [],
      'residence_certificate': []
    };
  }

  generateRandomApplications() {
    const certificateTypes = Object.keys(this.applicationQueue);
    certificateTypes.forEach(type => {
      const newApplications = Array.from({ length: Math.floor(Math.random() * 10) }, (_, i) => ({
        id: `${type}_${Date.now()}_${i}`,
        type: type,
        submissionTime: new Date()
      }));
      this.applicationQueue[type] = [
        ...this.applicationQueue[type],
        ...newApplications
      ];
    });
  }

  autoAllocateResources() {
    const allocatedApplications = [];

    // Iterate through each certificate type
    Object.keys(this.applicationQueue).forEach(type => {
      const typeApplications = this.applicationQueue[type];
      
      while (typeApplications.length > 0) {
        // Find the most suitable official
        const suitableOfficial = this.officials
          .filter(official => 
            official.expertise.includes(type) && 
            official.pendingApplications.length < official.capacity
          )
          .sort((a, b) => a.pendingApplications.length - b.pendingApplications.length)[0];

        if (!suitableOfficial) break;

        // Allocate the application
        const application = typeApplications.shift();
        suitableOfficial.pendingApplications.push(application);
        allocatedApplications.push({
          officialName: suitableOfficial.name,
          application
        });
      }
    });

    return allocatedApplications;
  }

  getApplicationStats() {
    return {
      totalPending: Object.values(this.applicationQueue)
        .reduce((total, apps) => total + apps.length, 0),
      pendingByType: Object.fromEntries(
        Object.entries(this.applicationQueue).map(([type, apps]) => [type, apps.length])
      ),
      officialWorkload: this.officials.map(official => ({
        name: official.name,
        pendingCount: official.pendingApplications.length,
        capacity: official.capacity
      })),
      expertiseInfo: this.officials.map(official => ({
        name: official.name,
        expertise: official.expertise.join(', ')
      }))
    };
  }
}

const CertificateDashboard = () => {
  const [loadBalancer] = useState(new SmartLoadBalancer());
  const [applicationStats, setApplicationStats] = useState({
    totalPending: 0,
    pendingByType: {},
    officialWorkload: [],
    expertiseInfo: []
  });
  const [allocatedApplications, setAllocatedApplications] = useState([]);

  const updateDashboard = useCallback(() => {
    loadBalancer.generateRandomApplications();
    setApplicationStats(loadBalancer.getApplicationStats());
  }, [loadBalancer]);

  useEffect(() => {
    updateDashboard();
    const intervalId = setInterval(updateDashboard, 10000);
    return () => clearInterval(intervalId);
  }, [updateDashboard]);

  const handleAutoAllocate = () => {
    const newAllocations = loadBalancer.autoAllocateResources();
    setAllocatedApplications(newAllocations);
    setApplicationStats(loadBalancer.getApplicationStats());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Certificate Processing Center
          </h1>
          <button 
            onClick={handleAutoAllocate}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform flex items-center"
          >
            <RefreshCcw className="mr-2" /> Auto Allocate
          </button>
        </div>

        {/* Allocation Notifications */}
        {allocatedApplications.length > 0 && (
          <div className="bg-white shadow-md rounded-lg p-6 mb-6 border-l-4 border-green-500">
            <h2 className="text-xl font-semibold mb-4 text-green-600">
              Recent Allocations
            </h2>
            {allocatedApplications.map((allocation, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between bg-green-50 p-3 rounded-md mb-2"
              >
                <div className="flex items-center">
                  <CheckCircle2 className="text-green-500 mr-3" />
                  <span>
                    Application <strong>{allocation.application.id}</strong> assigned to <strong>{allocation.officialName}</strong>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 transform transition-all hover:scale-105">
            <FileText className="text-blue-500 mb-4" size={40} />
            <h3 className="text-gray-500 mb-2">Total Pending</h3>
            <p className="text-3xl font-bold text-blue-600">{applicationStats.totalPending}</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 transform transition-all hover:scale-105">
            <BarChart2 className="text-green-500 mb-4" size={40} />
            <h3 className="text-gray-500 mb-2">Pending Types</h3>
            {Object.entries(applicationStats.pendingByType).map(([type, count]) => (
              <div key={type} className="flex justify-between">
                <span className="capitalize">{type.replace('_', ' ')}</span>
                <span className="font-bold">{count}</span>
              </div>
            ))}
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 transform transition-all hover:scale-105">
            <Users className="text-purple-500 mb-4" size={40} />
            <h3 className="text-gray-500 mb-2">Official Workload</h3>
            {applicationStats.officialWorkload.map(official => (
              <div key={official.name} className="flex justify-between">
                <span>{official.name}</span>
                <span className="font-bold">{official.pendingCount}/{official.capacity}</span>
              </div>
            ))}
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 transform transition-all hover:scale-105">
            <AlertCircle className="text-red-500 mb-4" size={40} />
            <h3 className="text-gray-500 mb-2">High Load Alerts</h3>
            <p className="text-3xl font-bold text-red-600">
              {applicationStats.officialWorkload.filter(o => o.pendingCount >= o.capacity).length}
            </p>
          </div>
        </div>

        {/* Expertise Info */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">Officials and Expertise</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {applicationStats.expertiseInfo.map((official, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">{official.name}</h3>
                <p className="text-gray-600">
                  Expertise: <span className="font-medium text-gray-900">{official.expertise}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateDashboard;