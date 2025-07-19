import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Home</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">Welcome to the Room Reservation System</p>
          <p className="text-gray-600 mt-2">This is where mahasiswa and dosen users can browse and reserve university rooms and facilities.</p>
        </div>
      </div>
    </div>
  );
};

export default Home; 