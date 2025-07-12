import React, { useState, useEffect } from 'react';
import { X, Plus, Tag, Globe, FileText, Activity } from 'lucide-react';
import { SiteLink } from '../types';
import { IconSelector } from './IconSelector';

interface LinkFormProps {
  link?: SiteLink;
  onSubmit: (link: Omit<SiteLink, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
  isOpen: boolean;
  isDarkTheme: boolean;
  isThinText: boolean;
}

export const LinkForm: React.FC<LinkFormProps> = ({ 
  link, 
  onSubmit, 
  onCancel, 
  isOpen,
  isDarkTheme,
  isThinText
}) => {
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    description: '',
    category: '',
    tags: [] as string[],
    isActive: true,
    status: 'online' as 'online' | 'offline' | 'maintenance',
    responseTime: undefined as number | undefined,
    icon: 'Globe'
  });
  
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (link) {
      setFormData({
        title: link.title,
        url: link.url,
        description: link.description,
        category: link.category,
        tags: link.tags,
        isActive: link.isActive,
        status: link.status,
        responseTime: link.responseTime,
        icon: link.icon
      });
    } else {
      setFormData({
        title: '',
        url: '',
        description: '',
        category: '',
        tags: [],
        isActive: true,
        status: 'online',
        responseTime: undefined,
        icon: 'Globe'
      });
    }
  }, [link]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      lastChecked: new Date()
    });
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className={`rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transition-colors duration-300 ${
        isDarkTheme ? 'bg-black' : 'bg-white'
      }`}>
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl ${isDarkTheme ? 'text-white' : 'text-gray-900'} ${isThinText ? 'font-light' : 'font-bold'}`}>
              {link ? 'Edit Site' : 'Add New Site'}
            </h2>
            <button
              onClick={onCancel}
              className={`p-2 rounded-lg transition-colors ${
                isDarkTheme 
                  ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-900' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <X size={24} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className={`flex items-center gap-2 text-sm mb-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'} ${isThinText ? 'font-light' : 'font-medium'}`}>
                  <FileText size={16} />
                  Site Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    isDarkTheme 
                      ? 'bg-black border-gray-700 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                  } ${isThinText ? 'font-light' : ''}`}
                  placeholder="Enter site title"
                  required
                />
              </div>
              
              <div>
                <label className={`flex items-center gap-2 text-sm mb-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'} ${isThinText ? 'font-light' : 'font-medium'}`}>
                  <Globe size={16} />
                  URL
                </label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    isDarkTheme 
                      ? 'bg-black border-gray-700 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                  } ${isThinText ? 'font-light' : ''}`}
                  placeholder="https://example.com"
                  required
                />
              </div>
              
              <div>
                <label className={`flex items-center gap-2 text-sm mb-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'} ${isThinText ? 'font-light' : 'font-medium'}`}>
                  <Globe size={16} />
                  Icon
                </label>
                <IconSelector
                  selectedIcon={formData.icon}
                  onIconSelect={(icon) => setFormData(prev => ({ ...prev, icon }))}
                  isDarkTheme={isDarkTheme}
                  isThinText={isThinText}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`flex items-center gap-2 text-sm mb-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'} ${isThinText ? 'font-light' : 'font-medium'}`}>
                    <Tag size={16} />
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      isDarkTheme 
                        ? 'bg-black border-gray-700 text-white' 
                        : 'bg-white border-gray-200 text-gray-900'
                    } ${isThinText ? 'font-light' : ''}`}
                    required
                  >
                    <option value="">Select category</option>
                    <option value="Portfolio">Portfolio</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Blog">Blog</option>
                    <option value="Business">Business</option>
                    <option value="Personal">Personal</option>
                    <option value="Educational">Educational</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className={`flex items-center gap-2 text-sm mb-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'} ${isThinText ? 'font-light' : 'font-medium'}`}>
                    <Activity size={16} />
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'online' | 'offline' | 'maintenance' }))}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      isDarkTheme 
                        ? 'bg-black border-gray-700 text-white' 
                        : 'bg-white border-gray-200 text-gray-900'
                    } ${isThinText ? 'font-light' : ''}`}
                  >
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                    <option value="maintenance">Under Maintenance</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className={`flex items-center gap-2 text-sm mb-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'} ${isThinText ? 'font-light' : 'font-medium'}`}>
                  <Tag size={16} />
                  Tags
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      isDarkTheme 
                        ? 'bg-black border-gray-700 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                    } ${isThinText ? 'font-light' : ''}`}
                    placeholder="Add tags"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${
                        isDarkTheme 
                          ? 'bg-gray-900 text-gray-300' 
                          : 'bg-gray-100 text-gray-700'
                      } ${isThinText ? 'font-light' : ''}`}
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className={`transition-colors duration-200 ${
                          isDarkTheme 
                            ? 'text-gray-400 hover:text-red-400' 
                            : 'text-gray-500 hover:text-red-500'
                        }`}
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className={`flex items-center justify-between pt-6 border-t ${isDarkTheme ? 'border-gray-800' : 'border-gray-200'}`}>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'} ${isThinText ? 'font-light' : ''}`}>Active</span>
              </label>
              
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onCancel}
                  className={`px-6 py-3 border rounded-lg transition-colors duration-200 ${
                    isDarkTheme 
                      ? 'text-gray-300 border-gray-700 hover:bg-gray-900' 
                      : 'text-gray-700 border-gray-300 hover:bg-gray-50'
                  } ${isThinText ? 'font-light' : ''}`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 ${isThinText ? 'font-light' : ''}`}
                >
                  {link ? 'Update' : 'Create'} Site
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};