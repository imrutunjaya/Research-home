import React, { useEffect, useState } from 'react';
import { Wifi, WifiOff, Loader, CheckCircle, XCircle } from 'lucide-react';

interface ConnectionNotificationProps {
  isVisible: boolean;
  url: string;
  onComplete: () => void;
  isDarkTheme: boolean;
  isThinText: boolean;
}

export const ConnectionNotification: React.FC<ConnectionNotificationProps> = ({
  isVisible,
  url,
  onComplete,
  isDarkTheme,
  isThinText
}) => {
  const [status, setStatus] = useState<'connecting' | 'success' | 'error'>('connecting');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setStatus('connecting');
      setProgress(0);
      return;
    }

    // Simulate connection process
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Randomly simulate success or error for demo
          const isSuccess = Math.random() > 0.1; // 90% success rate
          setStatus(isSuccess ? 'success' : 'error');
          
          setTimeout(() => {
            onComplete();
            if (isSuccess) {
              window.open(url, '_blank', 'noopener,noreferrer');
            }
          }, 1000);
          
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isVisible, url, onComplete]);

  if (!isVisible) return null;

  const getStatusIcon = () => {
    switch (status) {
      case 'connecting':
        return <Loader className="animate-spin" size={20} />;
      case 'success':
        return <CheckCircle size={20} className="text-green-500" />;
      case 'error':
        return <XCircle size={20} className="text-red-500" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'connecting':
        return 'Establishing connection...';
      case 'success':
        return 'Connected successfully!';
      case 'error':
        return 'Connection failed';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'connecting':
        return isDarkTheme ? 'text-blue-400' : 'text-blue-600';
      case 'success':
        return 'text-green-500';
      case 'error':
        return 'text-red-500';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className={`rounded-2xl p-8 max-w-md w-full transition-colors duration-300 ${
        isDarkTheme ? 'bg-black border border-gray-800' : 'bg-white border border-gray-200'
      }`}>
        <div className="text-center space-y-6">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${
            status === 'connecting' 
              ? isDarkTheme ? 'bg-blue-900/30' : 'bg-blue-100'
              : status === 'success'
                ? 'bg-green-100'
                : 'bg-red-100'
          }`}>
            {getStatusIcon()}
          </div>

          <div className="space-y-2">
            <h3 className={`text-lg ${isDarkTheme ? 'text-white' : 'text-gray-900'} ${isThinText ? 'font-light' : 'font-medium'}`}>
              {getStatusText()}
            </h3>
            <p className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'} ${isThinText ? 'font-light' : ''} break-all`}>
              {url}
            </p>
          </div>

          {status === 'connecting' && (
            <div className="space-y-2">
              <div className={`w-full h-2 rounded-full ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-200'}`}>
                <div 
                  className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className={`text-xs ${isDarkTheme ? 'text-gray-500' : 'text-gray-400'} ${isThinText ? 'font-light' : ''}`}>
                {Math.round(progress)}% complete
              </p>
            </div>
          )}

          {status === 'success' && (
            <p className={`text-sm text-green-600 ${isThinText ? 'font-light' : ''}`}>
              Opening in new tab...
            </p>
          )}

          {status === 'error' && (
            <div className="space-y-3">
              <p className={`text-sm text-red-600 ${isThinText ? 'font-light' : ''}`}>
                Unable to establish connection. The site might be down or unreachable.
              </p>
              <button
                onClick={onComplete}
                className={`px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors ${isThinText ? 'font-light' : ''}`}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};