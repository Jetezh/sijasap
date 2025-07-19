import React from 'react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">Welcome to the Admin Dashboard</p>
          <p className="text-gray-600 mt-2">This is where admin users can manage room reservations and facilities.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 