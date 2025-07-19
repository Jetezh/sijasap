import React from 'react';

const SuperAdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Super Admin Dashboard</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">Welcome to the Super Admin Dashboard</p>
          <p className="text-gray-600 mt-2">This is where super admin users can manage all aspects of the system including users, admins, and system settings.</p>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard; 