import React from 'react';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  thumbnail: string;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  image: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
}

interface DataDisplayProps {
  data: any[] | null;
  type: 'products' | 'users' | 'posts';
}

const DataDisplay: React.FC<DataDisplayProps> = ({ data, type }) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <div className="text-center py-8">No data available</div>;
  }

  if (type === 'products') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(data as Product[]).map((product) => (
          <div key={product.id} className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="h-48 overflow-hidden">
              <img 
                src={product.thumbnail} 
                alt={product.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 truncate">{product.title}</h3>
              <p className="text-gray-600 text-sm mt-1 h-12 overflow-hidden">{product.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-blue-600 font-bold">${product.price}</span>
                <div className="flex items-center">
                  <span className="px-2 py-1 bg-gray-100 text-xs text-gray-800 rounded-full">{product.category}</span>
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-500">Brand: {product.brand}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'users') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(data as User[]).map((user) => (
          <div key={user.id} className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col">
            <div className="p-4 flex items-center">
              <div className="flex-shrink-0">
                <img 
                  src={user.image} 
                  alt={`${user.firstName} ${user.lastName}`}
                  className="h-16 w-16 rounded-full object-cover" 
                />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {user.firstName} {user.lastName}
                </h3>
                <p className="text-gray-500 text-sm">@{user.username}</p>
              </div>
            </div>
            <div className="border-t border-gray-100 px-4 py-3">
              <div className="text-sm">
                <div className="flex items-center text-gray-600 mb-1">
                  <span className="font-medium mr-1">Email:</span> {user.email}
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="font-medium mr-1">Phone:</span> {user.phone}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'posts') {
    return (
      <div className="grid grid-cols-1 gap-6">
        {(data as Post[]).map((post) => (
          <div key={post.id} className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
              <p className="text-gray-600 mt-2">{post.body}</p>
              
              <div className="mt-4 flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
              {Array.isArray(post.tags) && post.tags.map((tag, idx) => (
              <span 
              key={idx}
              className="px-2 py-1 bg-gray-100 text-xs text-gray-800 rounded-full"
    >
              #{tag}
              </span>
               ))}
              </div>
              <div className="flex gap-4 text-gray-500 text-sm">
               <span>👍 {post.reactions?.likes ?? 0}</span>
               <span>👎 {post.reactions?.dislikes ?? 0}</span>
               </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default DataDisplay;
