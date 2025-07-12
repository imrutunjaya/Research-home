import React from 'react';
import { X, Layout, List, Square, Eye, Type, Search, Filter, Grid, Settings2, ToggleLeft, ToggleRight, Sliders, Eye as EyeIcon, EyeOff, Edit, Trash2, Info, RefreshCw, Clock, Calendar, Activity, Tag, FileText, Zap, Folder, Plus, Minus } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkTheme: boolean;
  isThinText: boolean;
  onToggleThinText: () => void;
  showCardBorders: boolean;
  onToggleCardBorders: () => void;
  viewMode: 'list' | 'card' | 'single';
  onViewModeChange: (mode: 'list' | 'card' | 'single') => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filterCategory: string;
  onCategoryChange: (category: string) => void;
  filterStatus: string;
  onStatusChange: (status: string) => void;
  categories: string[];
  totalSites: number;
  showTags: boolean;
  onToggleShowTags: () => void;
  showEditButton: boolean;
  onToggleShowEditButton: () => void;
  showDeleteButton: boolean;
  onToggleShowDeleteButton: () => void;
  showInfoButton: boolean;
  onToggleShowInfoButton: () => void;
  showCheckButton: boolean;
  onToggleShowCheckButton: () => void;
  showResponseTime: boolean;
  onToggleShowResponseTime: () => void;
  showCategory: boolean;
  onToggleShowCategory: () => void;
  showDescription: boolean;
  onToggleShowDescription: () => void;
  cardHeight: 'compact' | 'normal' | 'large';
  onCardHeightChange: (height: 'compact' | 'normal' | 'large') => void;
  showActiveStatus: boolean;
  onToggleShowActiveStatus: () => void;
  showCreatedDate: boolean;
  onToggleShowCreatedDate: () => void;
  showLastChecked: boolean;
  onToggleShowLastChecked: () => void;
  enableCategoryFolders: boolean;
  onToggleEnableCategoryFolders: () => void;
  customCategories: string[];
  onAddCustomCategory: (category: string) => void;
  onRemoveCustomCategory: (category: string) => void;
  categoryFromTags: boolean;
  onToggleCategoryFromTags: () => void;
  allTags: string[];
  cardGap: 'tight' | 'normal' | 'loose';
  onCardGapChange: (gap: 'tight' | 'normal' | 'loose') => void;
  listGap: 'tight' | 'normal' | 'loose';
  onListGapChange: (gap: 'tight' | 'normal' | 'loose') => void;
  showIcons: boolean;
  onToggleShowIcons: () => void;
  iconColor: string;
  onIconColorChange: (color: string) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  isDarkTheme,
  isThinText,
  onToggleThinText,
  showCardBorders,
  onToggleCardBorders,
  viewMode,
  onViewModeChange,
  searchTerm,
  onSearchChange,
  filterCategory,
  onCategoryChange,
  filterStatus,
  onStatusChange,
  categories,
  totalSites,
  showTags,
  onToggleShowTags,
  showEditButton,
  onToggleShowEditButton,
  showDeleteButton,
  onToggleShowDeleteButton,
  showInfoButton,
  onToggleShowInfoButton,
  showCheckButton,
  onToggleShowCheckButton,
  showResponseTime,
  onToggleShowResponseTime,
  showCategory,
  onToggleShowCategory,
  showDescription,
  onToggleShowDescription,
  cardHeight,
  onCardHeightChange,
  showActiveStatus,
  onToggleShowActiveStatus,
  showCreatedDate,
  onToggleShowCreatedDate,
  showLastChecked,
  onToggleShowLastChecked,
  enableCategoryFolders,
  onToggleEnableCategoryFolders,
  customCategories,
  onAddCustomCategory,
  onRemoveCustomCategory,
  categoryFromTags,
  onToggleCategoryFromTags,
  allTags,
  cardGap,
  onCardGapChange,
  listGap,
 onListGapChange,
  showIcons,
  onToggleShowIcons,
  iconColor,
  onIconColorChange
}) => {
  const [newCategoryInput, setNewCategoryInput] = React.useState('');

  if (!isOpen) return null;

  const ToggleButton = ({ 
    enabled, 
    onToggle, 
    label, 
    icon: Icon 
  }: { 
    enabled: boolean; 
    onToggle: () => void; 
    label: string; 
    icon: React.ComponentType<{ size: number }>;
  }) => (
    <button
      onClick={onToggle}
      className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
        isDarkTheme 
          ? 'border-gray-700 hover:bg-gray-900' 
          : 'border-gray-200 hover:bg-gray-50'
      }`}
    >
      <div className="flex items-center gap-2">
        <Icon size={16} />
        <span className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-700'} ${isThinText ? 'font-light' : ''}`}>
          {label}
        </span>
      </div>
      <div className={`w-12 h-6 rounded-full transition-colors ${
        enabled 
          ? 'bg-blue-600' 
          : isDarkTheme 
            ? 'bg-gray-700' 
            : 'bg-gray-300'
      }`}>
        <div className={`w-5 h-5 bg-white rounded-full transform transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-0.5'
        } mt-0.5`}></div>
      </div>
    </button>
  );

  const SectionHeader = ({ title, icon: Icon }: { title: string; icon: React.ComponentType<{ size: number }> }) => (
    <div className={`flex items-center gap-2 text-sm mb-3 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'} ${isThinText ? 'font-light' : 'font-medium'}`}>
      <Icon size={16} />
      {title}
    </div>
  );

  const handleAddCustomCategory = () => {
    if (newCategoryInput.trim()) {
      onAddCustomCategory(newCategoryInput.trim());
      setNewCategoryInput('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className={`rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transition-colors duration-300 ${
        isDarkTheme ? 'bg-black' : 'bg-white'
      }`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl ${isDarkTheme ? 'text-white' : 'text-gray-900'} ${isThinText ? 'font-light' : 'font-bold'}`}>
              Settings & Customization
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
          
          <div className="space-y-8">
            {/* Search & Filters */}
            <div>
              <SectionHeader title="Search & Filters" icon={Search} />
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Search titles, URLs, tags..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                    isDarkTheme 
                      ? 'bg-black border-gray-700 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                  } ${isThinText ? 'font-light' : ''}`}
                />
                <div className="grid grid-cols-2 gap-3">
                  <select
                    value={filterCategory}
                    onChange={(e) => onCategoryChange(e.target.value)}
                    className={`px-3 py-2 rounded-lg border transition-colors ${
                      isDarkTheme 
                        ? 'bg-black border-gray-700 text-white' 
                        : 'bg-white border-gray-200 text-gray-900'
                    } ${isThinText ? 'font-light' : ''}`}
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  
                  <select
                    value={filterStatus}
                    onChange={(e) => onStatusChange(e.target.value)}
                    className={`px-3 py-2 rounded-lg border transition-colors ${
                      isDarkTheme 
                        ? 'bg-black border-gray-700 text-white' 
                        : 'bg-white border-gray-200 text-gray-900'
                    } ${isThinText ? 'font-light' : ''}`}
                  >
                    <option value="">All Status</option>
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>
              </div>
            </div>

            {/* View Mode */}
            <div>
              <SectionHeader title="View Mode" icon={Layout} />
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => onViewModeChange('list')}
                  className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-colors ${
                    viewMode === 'list'
                      ? isDarkTheme
                        ? 'bg-blue-900/30 border-blue-500 text-blue-400'
                        : 'bg-blue-50 border-blue-500 text-blue-600'
                      : isDarkTheme
                        ? 'border-gray-700 text-gray-400 hover:bg-gray-900'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <List size={20} />
                  <span className={`text-xs ${isThinText ? 'font-light' : ''}`}>List</span>
                </button>
                
                <button
                  onClick={() => onViewModeChange('card')}
                  className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-colors ${
                    viewMode === 'card'
                      ? isDarkTheme
                        ? 'bg-blue-900/30 border-blue-500 text-blue-400'
                        : 'bg-blue-50 border-blue-500 text-blue-600'
                      : isDarkTheme
                        ? 'border-gray-700 text-gray-400 hover:bg-gray-900'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Square size={20} />
                  <span className={`text-xs ${isThinText ? 'font-light' : ''}`}>Card</span>
                </button>
                
                <button
                  onClick={() => onViewModeChange('single')}
                  className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-colors ${
                    viewMode === 'single'
                      ? isDarkTheme
                        ? 'bg-blue-900/30 border-blue-500 text-blue-400'
                        : 'bg-blue-50 border-blue-500 text-blue-600'
                      : isDarkTheme
                        ? 'border-gray-700 text-gray-400 hover:bg-gray-900'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Eye size={20} />
                  <span className={`text-xs ${isThinText ? 'font-light' : ''}`}>Single</span>
                </button>
              </div>
            </div>

            {/* Card Height */}
            <div>
              <SectionHeader title="Card Height" icon={Sliders} />
              <div className="grid grid-cols-3 gap-2">
                {(['compact', 'normal', 'large'] as const).map((height) => (
                  <button
                    key={height}
                    onClick={() => onCardHeightChange(height)}
                    className={`p-3 rounded-lg border transition-colors capitalize ${
                      cardHeight === height
                        ? isDarkTheme
                          ? 'bg-blue-900/30 border-blue-500 text-blue-400'
                          : 'bg-blue-50 border-blue-500 text-blue-600'
                        : isDarkTheme
                          ? 'border-gray-700 text-gray-400 hover:bg-gray-900'
                          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    } ${isThinText ? 'font-light' : ''}`}
                  >
                    {height}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div>
              <SectionHeader title="Action Buttons" icon={Settings2} />
              <div className="grid grid-cols-1 gap-3">
                <ToggleButton
                  enabled={showEditButton}
                  onToggle={onToggleShowEditButton}
                  label="Show Edit Button"
                  icon={Edit}
                />
                <ToggleButton
                  enabled={showDeleteButton}
                  onToggle={onToggleShowDeleteButton}
                  label="Show Delete Button"
                  icon={Trash2}
                />
                <ToggleButton
                  enabled={showInfoButton}
                  onToggle={onToggleShowInfoButton}
                  label="Show Info Button"
                  icon={Info}
                />
                <ToggleButton
                  enabled={showCheckButton}
                  onToggle={onToggleShowCheckButton}
                  label="Show Check Status Button"
                  icon={RefreshCw}
                />
              </div>
            </div>

            {/* Information Display */}
            <div>
              <SectionHeader title="Information Display" icon={EyeIcon} />
              <div className="grid grid-cols-1 gap-3">
                <ToggleButton
                  enabled={showCategory}
                  onToggle={onToggleShowCategory}
                  label="Show Category"
                  icon={Tag}
                />
                <ToggleButton
                  enabled={showTags}
                  onToggle={onToggleShowTags}
                  label="Show Tags"
                  icon={Tag}
                />
                <ToggleButton
                  enabled={showDescription}
                  onToggle={onToggleShowDescription}
                  label="Show Description"
                  icon={FileText}
                />
                <ToggleButton
                  enabled={showResponseTime}
                  onToggle={onToggleShowResponseTime}
                  label="Show Response Time"
                  icon={Zap}
                />
                <ToggleButton
                  enabled={showActiveStatus}
                  onToggle={onToggleShowActiveStatus}
                  label="Show Active Status"
                  icon={Activity}
                />
                <ToggleButton
                  enabled={showCreatedDate}
                  onToggle={onToggleShowCreatedDate}
                  label="Show Created Date"
                  icon={Calendar}
                />
                <ToggleButton
                  enabled={showLastChecked}
                  onToggle={onToggleShowLastChecked}
                  label="Show Last Checked"
                  icon={Clock}
                />
              </div>
            </div>

            {/* Appearance */}
            <div>
              <SectionHeader title="Appearance" icon={Type} />
              <div className="grid grid-cols-1 gap-3">
                <ToggleButton
                  enabled={isThinText}
                  onToggle={onToggleThinText}
                  label="Thin Text Style"
                  icon={Type}
                />
                <ToggleButton
                  enabled={showCardBorders}
                  onToggle={onToggleCardBorders}
                  label="Show Card Borders"
                  icon={Grid}
                />
                <ToggleButton
                  enabled={showIcons}
                  onToggle={onToggleShowIcons}
                  label="Show Icons"
                  icon={EyeIcon}
                />
              </div>
              
              {/* Icon Color Selection */}
              {showIcons && (
                <div className="mt-4">
                  <label className={`block text-sm mb-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'} ${isThinText ? 'font-light' : 'font-medium'}`}>
                    Icon Color
                  </label>
                  <div className="grid grid-cols-6 gap-2">
                    {[
                      { name: 'blue', class: 'bg-blue-500' },
                      { name: 'green', class: 'bg-green-500' },
                      { name: 'purple', class: 'bg-purple-500' },
                      { name: 'red', class: 'bg-red-500' },
                      { name: 'orange', class: 'bg-orange-500' },
                      { name: 'gray', class: 'bg-gray-500' }
                    ].map((color) => (
                      <button
                        key={color.name}
                        onClick={() => onIconColorChange(color.name)}
                        className={`w-8 h-8 rounded-full transition-all duration-200 hover:scale-110 ${color.class} ${
                          iconColor === color.name 
                            ? 'ring-2 ring-offset-2 ring-blue-500' 
                            : ''
                        } ${isDarkTheme ? 'ring-offset-black' : 'ring-offset-white'}`}
                        title={`${color.name.charAt(0).toUpperCase() + color.name.slice(1)} icons`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Gap Settings */}
            <div>
              <SectionHeader title="Spacing & Layout" icon={Grid} />
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm mb-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'} ${isThinText ? 'font-light' : 'font-medium'}`}>
                    Card View Gap
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['tight', 'normal', 'loose'] as const).map((gap) => (
                      <button
                        key={gap}
                        onClick={() => onCardGapChange(gap)}
                        className={`p-3 rounded-lg border transition-colors capitalize ${
                          cardGap === gap
                            ? isDarkTheme
                              ? 'bg-blue-900/30 border-blue-500 text-blue-400'
                              : 'bg-blue-50 border-blue-500 text-blue-600'
                            : isDarkTheme
                              ? 'border-gray-700 text-gray-400 hover:bg-gray-900'
                              : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                        } ${isThinText ? 'font-light' : ''}`}
                      >
                        {gap}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className={`block text-sm mb-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'} ${isThinText ? 'font-light' : 'font-medium'}`}>
                    List View Gap
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['tight', 'normal', 'loose'] as const).map((gap) => (
                      <button
                        key={gap}
                        onClick={() => onListGapChange(gap)}
                        className={`p-3 rounded-lg border transition-colors capitalize ${
                          listGap === gap
                            ? isDarkTheme
                              ? 'bg-blue-900/30 border-blue-500 text-blue-400'
                              : 'bg-blue-50 border-blue-500 text-blue-600'
                            : isDarkTheme
                              ? 'border-gray-700 text-gray-400 hover:bg-gray-900'
                              : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                        } ${isThinText ? 'font-light' : ''}`}
                      >
                        {gap}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Category Management */}
            <div>
              <SectionHeader title="Category Management" icon={Folder} />
              <div className="space-y-4">
                <ToggleButton
                  enabled={enableCategoryFolders}
                  onToggle={onToggleEnableCategoryFolders}
                  label="Enable Category Folders"
                  icon={Folder}
                />
                
                <ToggleButton
                  enabled={categoryFromTags}
                  onToggle={onToggleCategoryFromTags}
                  label="Create Categories from Tags"
                  icon={Tag}
                />
                
                {/* Custom Categories */}
                <div className={`p-4 rounded-lg border ${isDarkTheme ? 'border-gray-700 bg-gray-900/50' : 'border-gray-200 bg-gray-50'}`}>
                  <div className={`flex items-center gap-2 mb-3 text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'} ${isThinText ? 'font-light' : 'font-medium'}`}>
                    <Tag size={14} />
                    Custom Categories
                  </div>
                  
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      placeholder="Add custom category"
                      value={newCategoryInput}
                      onChange={(e) => setNewCategoryInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddCustomCategory()}
                      className={`flex-1 px-3 py-2 text-sm rounded-lg border transition-colors ${
                        isDarkTheme 
                          ? 'bg-black border-gray-700 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                      } ${isThinText ? 'font-light' : ''}`}
                    />
                    <button
                      onClick={handleAddCustomCategory}
                      className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  
                  {customCategories.length > 0 && (
                    <div className="space-y-2">
                      <div className={`text-xs ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'} ${isThinText ? 'font-light' : ''}`}>
                        Custom Categories:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {customCategories.map((category) => (
                          <div
                            key={category}
                            className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${
                              isDarkTheme 
                                ? 'bg-gray-800 text-gray-300' 
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {category}
                            <button
                              onClick={() => onRemoveCustomCategory(category)}
                              className={`transition-colors ${
                                isDarkTheme 
                                  ? 'text-gray-400 hover:text-red-400' 
                                  : 'text-gray-500 hover:text-red-500'
                              }`}
                            >
                              <Minus size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {categoryFromTags && allTags.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <div className={`text-xs ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'} ${isThinText ? 'font-light' : ''}`}>
                        Available from Tags:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {allTags.map((tag) => (
                          <span
                            key={tag}
                            className={`px-2 py-1 rounded text-xs ${
                              isDarkTheme 
                                ? 'bg-blue-900/30 text-blue-400' 
                                : 'bg-blue-50 text-blue-700'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className={`p-4 rounded-lg ${isDarkTheme ? 'bg-gray-900' : 'bg-gray-50'}`}>
              <div className="flex items-center justify-between">
                <span className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'} ${isThinText ? 'font-light' : 'font-medium'}`}>
                  Total Sites
                </span>
                <span className={`text-lg ${isDarkTheme ? 'text-white' : 'text-gray-900'} ${isThinText ? 'font-light' : 'font-bold'}`}>
                  {totalSites}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end pt-6">
            <button
              onClick={onClose}
              className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 ${isThinText ? 'font-light' : ''}`}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};