import React from 'react';

interface SkeletonLoaderProps {
  isDarkTheme: boolean;
  count?: number;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ isDarkTheme, count = 4 }) => {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`animate-pulse rounded-lg border p-2 ${
            isDarkTheme ? 'bg-black border-gray-800' : 'bg-white border-gray-200'
          }`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 flex-1">
              {/* Icon skeleton */}
              <div className={`w-8 h-8 rounded ${
                isDarkTheme ? 'bg-gray-800' : 'bg-gray-200'
              }`}></div>
              
              <div className="flex-1 min-w-0">
                {/* Title skeleton */}
                <div className={`h-5 rounded mb-1 ${
                  isDarkTheme ? 'bg-gray-800' : 'bg-gray-200'
                }`} style={{ width: `${60 + Math.random() * 30}%` }}></div>
                
                {/* URL skeleton */}
                <div className={`h-4 rounded mb-2 ${
                  isDarkTheme ? 'bg-gray-800' : 'bg-gray-200'
                }`} style={{ width: `${40 + Math.random() * 40}%` }}></div>
                
                {/* Tags skeleton */}
                <div className="flex gap-1">
                  {Array.from({ length: Math.floor(Math.random() * 3) + 1 }).map((_, tagIndex) => (
                    <div
                      key={tagIndex}
                      className={`h-6 rounded ${
                        isDarkTheme ? 'bg-gray-800' : 'bg-gray-200'
                      }`}
                      style={{ width: `${40 + Math.random() * 30}px` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Status and buttons skeleton */}
            <div className="flex items-center gap-1">
              <div className={`w-16 h-6 rounded ${
                isDarkTheme ? 'bg-gray-800' : 'bg-gray-200'
              }`}></div>
              <div className={`w-8 h-8 rounded ${
                isDarkTheme ? 'bg-gray-800' : 'bg-gray-200'
              }`}></div>
              <div className={`w-8 h-8 rounded ${
                isDarkTheme ? 'bg-gray-800' : 'bg-gray-200'
              }`}></div>
              <div className={`w-8 h-8 rounded ${
                isDarkTheme ? 'bg-gray-800' : 'bg-gray-200'
              }`}></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};