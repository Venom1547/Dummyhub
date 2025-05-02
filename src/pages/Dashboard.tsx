import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import DataDisplay from '../components/DataDisplay';
import { Server, Users, ShoppingBag } from 'lucide-react';

interface DataState {
  loading: boolean;
  error: string | null;
  data: any[] | null;
}

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'users' | 'posts'>('products');
  const [dataState, setDataState] = useState<DataState>({
    loading: false,
    error: null,
    data: [],
  });

  const fetchData = async (endpoint: 'products' | 'users' | 'posts') => {
    setDataState({
      loading: true,
      error: null,
      data: [],
    });

    try {
      const response = await axios.get(`https://dummyjson.com/${endpoint}`);
      console.log(`📦 Fetched response for ${endpoint}:`, response.data);

      let result: any[] = [];

      switch (endpoint) {
        case 'products':
          result = Array.isArray(response.data.products) ? response.data.products : [];
          break;
        case 'users':
          result = Array.isArray(response.data.users) ? response.data.users : [];
          break;
        case 'posts':
          result = Array.isArray(response.data.posts) ? response.data.posts : [];
          break;
      }

      console.log(`✅ Extracted ${endpoint} result:`, result);

      setDataState({
        loading: false,
        error: null,
        data: result,
      });
    } catch (error) {
      console.error(`❌ Error fetching ${endpoint}:`, error);
      setDataState({
        loading: false,
        error: 'Failed to fetch data. Please try again.',
        data: [],
      });
    }
  };

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab]);

  const handleTabChange = (tab: 'products' | 'users' | 'posts') => {
    setActiveTab(tab);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          View your data from the DummyJSON API
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button
            className={`flex items-center px-6 py-4 text-sm font-medium transition-colors duration-200 ${
              activeTab === 'products'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
            onClick={() => handleTabChange('products')}
          >
            <ShoppingBag className="h-5 w-5 mr-2" />
            Products
          </button>

          <button
            className={`flex items-center px-6 py-4 text-sm font-medium transition-colors duration-200 ${
              activeTab === 'users'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
            onClick={() => handleTabChange('users')}
          >
            <Users className="h-5 w-5 mr-2" />
            Users
          </button>

          <button
            className={`flex items-center px-6 py-4 text-sm font-medium transition-colors duration-200 ${
              activeTab === 'posts'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
            onClick={() => handleTabChange('posts')}
          >
            <Server className="h-5 w-5 mr-2" />
            Posts
          </button>
        </div>

        <div className="p-6">
          {dataState.loading ? (
            <div className="py-12">
              <Spinner />
            </div>
          ) : dataState.error ? (
            <div className="py-12 text-center">
              <div className="text-red-500 mb-4">{dataState.error}</div>
              <button
                onClick={() => fetchData(activeTab)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          ) : (
            <DataDisplay data={dataState.data} type={activeTab} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
