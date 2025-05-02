import React from 'react';
import { Link } from 'react-router-dom';
import { Database, Shield, Server } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8 text-center">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
            <span className="block text-blue-600">DummyHub Dashboard</span>
            
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            A simple, powerful dashboard for viewing data with secure authentication.
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <Shield className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">Secure Authentication</h3>
              <p className="mt-2 text-base text-gray-500">
                Industry-standard JWT authentication keeps your data secure and your session persistent.
              </p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <Database className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">Data Visualization</h3>
              <p className="mt-2 text-base text-gray-500">
                Beautiful, responsive layouts for displaying your data from multiple API endpoints.
              </p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <Server className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">Full-Stack Solution</h3>
              <p className="mt-2 text-base text-gray-500">
                Complete MERN stack implementation with MongoDB, Express, React, and Node.js.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <Link
            to="/signup"
            className="inline-block px-6 py-3 text-base font-medium rounded-md shadow text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;