import React from 'react';
import { ExternalLink, Edit, Trash2, RefreshCw, Info, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { iconOptions } from './IconSelector';
import { SiteLink } from '../types';

interface LinkCardProps {
  link: SiteLink;
  onEdit: (link: SiteLink) => void;
  onDelete: (id: string) => void;
  onToggleActive: (id: string) => void;
  onCheckStatus: (id: string) => void;
  onInfo: (link: SiteLink) => void;
  onLinkClick: (url: string, e: React.MouseEvent) => void;
  isDarkTheme: boolean;
  isThinText: boolean;
  showCardBorders: boolean;
  viewMode: 'list' | 'card' | 'single';
  showTags: boolean;
  showEditButton: boolean;
  showDeleteButton: boolean;
  showInfoButton: boolean;
  showCheckButton: boolean;
  showResponseTime: boolean;
  showCategory: boolean;
  showDescription: boolean;
  cardHeight: 'compact' | 'normal' | 'large';
  showActiveStatus: boolean;
  showCreatedDate: boolean;
  showLastChecked: boolean;
  index?: number;
  showIcons: boolean;
  iconColor: string;
}

export const LinkCard: React.FC<LinkCardProps> = ({ 
  link, 
  onEdit, 
  onDelete, 
  onToggleActive,
  onCheckStatus,
  onInfo,
  onLinkClick,
  isDarkTheme,
  isThinText,
  showCardBorders,
  viewMode,
  showTags,
  showEditButton,
  showDeleteButton,
  showInfoButton,
  showCheckButton,
  showResponseTime,
  showCategory,
  showDescription,
  cardHeight,
  showActiveStatus,
  showCreatedDate,
  showLastChecked,
 index = 0,
  showIcons,
  iconColor
}) => {
  const getStatusColor = (status: string) => {
    if (isDarkTheme) {
      switch (status) {
        case 'online': return 'text-green-400 bg-green-900/30';
        case 'offline': return 'text-red-400 bg-red-900/30';
        case 'maintenance': return 'text-yellow-400 bg-yellow-900/30';
        default: return 'text-gray-400 bg-gray-900';
      }
    } else {
      switch (status) {
        case 'online': return 'text-green-600 bg-green-50';
        case 'offline': return 'text-red-600 bg-red-50';
        case 'maintenance': return 'text-yellow-600 bg-yellow-50';
        default: return 'text-gray-600 bg-gray-50';
      }
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <CheckCircle size={12} />;
      case 'offline': return <XCircle size={12} />;
      case 'maintenance': return <AlertCircle size={12} />;
      default: return null;
    }
  };

  const getBorderClass = () => {
    if (!showCardBorders) return '';
    return isDarkTheme ? 'border border-gray-400' : 'border border-gray-600';
  };

  const getCardPadding = () => {
    switch (cardHeight) {
      case 'compact': return 'p-1';
      case 'large': return 'p-4';
      default: return 'p-2';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getIconByName = (iconName: string) => {
    const iconOption = iconOptions.find(option => option.name === iconName);
    return iconOption ? iconOption.icon : iconOptions[0].icon;
  };

  const getIconColorClass = (color: string) => {
    switch (color) {
      case 'green': return isDarkTheme ? 'text-green-400' : 'text-green-600';
      case 'purple': return isDarkTheme ? 'text-purple-400' : 'text-purple-600';
      case 'red': return isDarkTheme ? 'text-red-400' : 'text-red-600';
      case 'orange': return isDarkTheme ? 'text-orange-400' : 'text-orange-600';
      case 'gray': return isDarkTheme ? 'text-gray-400' : 'text-gray-600';
      default: return isDarkTheme ? 'text-blue-400' : 'text-blue-600';
    }
  };

  return (
    <div className={`rounded-lg border transition-all duration-500 hover-lift animate-slide-up ${getCardPadding()} ${
      isDarkTheme 
        ? 'bg-black border-gray-800' 
        : 'bg-white border-gray-200'
    } ${!link.isActive && showActiveStatus ? 'opacity-50' : ''} ${viewMode === 'single' ? 'border-2' : ''} ${getBorderClass()}`}
    style={{ animationDelay: `${index * 100}ms` }}>
      <div className="flex items-start justify-between gap-3">
        {showIcons && (
          <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover-scale ${
            isDarkTheme ? 'bg-gray-900' : 'bg-gray-100'
          }`}>
            <FontAwesomeIcon 
              icon={getIconByName(link.icon)} 
              className={`w-5 h-5 ${getIconColorClass(iconColor)}`}
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className={`flex items-center gap-2 ${cardHeight === 'compact' ? 'mb-0.5' : 'mb-1'}`}>
            <h3 className={`text-lg truncate ${isDarkTheme ? 'text-white' : 'text-gray-900'} ${isThinText ? 'font-light' : 'font-medium'}`}>
              {link.title}
            </h3>
            {showCategory && (
              <span className={`px-2 py-1 rounded text-xs ${
                isDarkTheme 
                  ? 'bg-blue-900/30 text-blue-400' 
                  : 'bg-blue-50 text-blue-700'
              } ${isThinText ? 'font-light' : 'font-medium'}`}>
                {link.category}
              </span>
            )}
            <span className={`px-2 py-1 rounded text-xs flex items-center gap-1 ${getStatusColor(link.status)} ${isThinText ? 'font-light' : 'font-medium'}`}>
              {getStatusIcon(link.status)}
              {link.status}
              {showResponseTime && link.responseTime && (
                <span className="ml-1 opacity-75">
                  {link.responseTime}ms
                </span>
              )}
            </span>
          </div>
          
          <a 
            href={link.url} 
            onClick={(e) => onLinkClick(link.url, e)}
            className={`inline-flex items-center gap-1 text-sm transition-colors ${
              isDarkTheme 
                ? 'text-blue-400 hover:text-blue-300' 
                : 'text-blue-600 hover:text-blue-700'
            } ${isThinText ? 'font-light' : ''}`}
          >
            <ExternalLink size={14} />
            <span className="truncate">{link.url}</span>
          </a>
          
          {showDescription && link.description && (
            <p className={`text-sm mt-1 ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'} ${isThinText ? 'font-light' : ''}`}>
              {link.description}
            </p>
          )}
          
          {showTags && link.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
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
          )}
          
          {(showActiveStatus || showCreatedDate || showLastChecked) && (
            <div className={`flex items-center gap-4 mt-2 text-xs ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'} ${isThinText ? 'font-light' : ''}`}>
              {showActiveStatus && (
                <span className={link.isActive ? 'text-green-500' : 'text-red-500'}>
                  {link.isActive ? 'Active' : 'Inactive'}
                </span>
              )}
              {showCreatedDate && (
                <span>Created: {formatDate(link.createdAt)}</span>
              )}
              {showLastChecked && link.lastChecked && (
                <span>Checked: {formatDate(link.lastChecked)}</span>
              )}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-1">
          {showCheckButton && (
            <button
              onClick={() => onCheckStatus(link.id)}
              className={`p-2 rounded transition-all duration-200 hover-scale ${
                isDarkTheme 
                  ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-900' 
                  : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'
              }`}
              title="Check status"
            >
              <RefreshCw size={16} />
            </button>
          )}
          {showInfoButton && (
            <button
              onClick={() => onInfo(link)}
              className={`p-2 rounded transition-all duration-200 hover-scale ${
                isDarkTheme 
                  ? 'text-gray-400 hover:text-green-400 hover:bg-gray-900' 
                  : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
              }`}
              title="Site info"
            >
              <Info size={16} />
            </button>
          )}
          {showEditButton && (
            <button
              onClick={() => onEdit(link)}
              className={`p-2 rounded transition-all duration-200 hover-scale ${
                isDarkTheme 
                  ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-900' 
                  : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'
              }`}
              title="Edit"
            >
              <Edit size={16} />
            </button>
          )}
          {showDeleteButton && (
            <button
              onClick={() => onDelete(link.id)}
              className={`p-2 rounded transition-all duration-200 hover-scale ${
                isDarkTheme 
                  ? 'text-gray-400 hover:text-red-400 hover:bg-gray-900' 
                  : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
              }`}
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};