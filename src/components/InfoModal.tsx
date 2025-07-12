import React from 'react';
import { X, Globe, Calendar, Clock, Activity, Tag, ExternalLink, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { SiteLink } from '../types';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  link?: SiteLink;
  isDarkTheme: boolean;
  isThinText: boolean;
}

export const InfoModal: React.FC<InfoModalProps> = ({
  isOpen,
  onClose,
  link,
  isDarkTheme,
  isThinText
}) => {
  if (!isOpen || !link) return null;

  const getStatusColor = (status: string) => {
    if (isDarkTheme) {
      switch (status) {
        case 'online': return 'text-green-400';
        case 'offline': return 'text-red-400';
        case 'maintenance': return 'text-yellow-400';
        default: return 'text-gray-400';
      }
    } else {
      switch (status) {
        case 'online': return 'text-green-600';
        case 'offline': return 'text-red-600';
        case 'maintenance': return 'text-yellow-600';
        default: return 'text-gray-600';
      }
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <CheckCircle size={16} />;
      case 'offline': return <XCircle size={16} />;
      case 'maintenance': return <AlertCircle size={16} />;
      default: return null;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className={`rounded-2xl w-full max-w-md transition-colors duration-300 ${
        isDarkTheme ? 'bg-black' : 'bg-white'
      }`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl ${isDarkTheme ? 'text-white' : 'text-gray-900'} ${isThinText ? 'font-light' : 'font-bold'}`}>
              Site Information
            </h2>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                isDarkTheme 
                  ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-900' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="space-y-4">
            {/* Title */}
            <div>
              <h3 className={`text-lg mb-1 ${isDarkTheme ? 'text-white' : 'text-gray-900'} ${isThinText ? 'font-light' : 'font-medium'}`}>
                {link.title}
              </h3>
              <span className={`px-2 py-1 rounded text-xs ${
                isDarkTheme 
                  ? 'bg-blue-900/30 text-blue-400' 
                  : 'bg-blue-50 text-blue-700'
              } ${isThinText ? 'font-light' : 'font-medium'}`}>
                {link.category}
              </span>
            </div>

            {/* URL */}
            <div className="flex items-start gap-3">
              <Globe className={`mt-1 ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`} size={16} />
              <div className="flex-1">
                <p className={`text-sm mb-1 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'} ${isThinText ? 'font-light' : 'font-medium'}`}>
                  URL
                </p>
                <a 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1 text-sm transition-colors ${
                    isDarkTheme 
                      ? 'text-blue-400 hover:text-blue-300' 
                      : 'text-blue-600 hover:text-blue-700'
                  } ${isThinText ? 'font-light' : ''}`}
                >
                  <ExternalLink size={12} />
                  <span className="break-all">{link.url}</span>
                </a>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-start gap-3">
              <Activity className={`mt-1 ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`} size={16} />
              <div className="flex-1">
                <p className={`text-sm mb-1 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'} ${isThinText ? 'font-light' : 'font-medium'}`}>
                  Status
                </p>
                <div className="flex items-center gap-2">
                  <div className={`flex items-center gap-1 text-sm capitalize ${getStatusColor(link.status)} ${isThinText ? 'font-light' : 'font-medium'}`}>
                    {getStatusIcon(link.status)}
                    {link.status}
                  </div>
                  {link.responseTime && (
                    <span className={`text-xs px-2 py-1 rounded ${
                      isDarkTheme ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-600'
                    } ${isThinText ? 'font-light' : ''}`}>
                      {link.responseTime}ms
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Created Date */}
            <div className="flex items-start gap-3">
              <Calendar className={`mt-1 ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`} size={16} />
              <div className="flex-1">
                <p className={`text-sm mb-1 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'} ${isThinText ? 'font-light' : 'font-medium'}`}>
                  Created
                </p>
                <p className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'} ${isThinText ? 'font-light' : ''}`}>
                  {formatDate(link.createdAt)}
                </p>
              </div>
            </div>

            {/* Last Checked */}
            {link.lastChecked && (
              <div className="flex items-start gap-3">
                <Clock className={`mt-1 ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`} size={16} />
                <div className="flex-1">
                  <p className={`text-sm mb-1 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'} ${isThinText ? 'font-light' : 'font-medium'}`}>
                    Last Checked
                  </p>
                  <p className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'} ${isThinText ? 'font-light' : ''}`}>
                    {formatDate(link.lastChecked)}
                  </p>
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="flex items-start gap-3">
              <Tag className={`mt-1 ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`} size={16} />
              <div className="flex-1">
                <p className={`text-sm mb-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'} ${isThinText ? 'font-light' : 'font-medium'}`}>
                  Tags
                </p>
                <div className="flex flex-wrap gap-1">
                  {link.tags.map((tag, index) => (
                    <span key={index} className={`px-2 py-1 rounded text-xs ${
                      isDarkTheme 
                        ? 'bg-gray-900 text-gray-300' 
                        : 'bg-gray-100 text-gray-700'
                    } ${isThinText ? 'font-light' : ''}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Active Status */}
            <div className={`p-3 rounded-lg ${isDarkTheme ? 'bg-gray-900' : 'bg-gray-50'}`}>
              <div className="flex items-center justify-between">
                <span className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'} ${isThinText ? 'font-light' : 'font-medium'}`}>
                  Active Status
                </span>
                <span className={`text-sm ${
                  link.isActive 
                    ? isDarkTheme ? 'text-green-400' : 'text-green-600'
                    : isDarkTheme ? 'text-red-400' : 'text-red-600'
                } ${isThinText ? 'font-light' : 'font-medium'}`}>
                  {link.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end pt-6">
            <button
              onClick={onClose}
              className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 ${isThinText ? 'font-light' : ''}`}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};