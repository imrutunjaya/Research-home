import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGlobe, faShoppingCart, faBlog, faBuilding, faUser, faGraduationCap,
  faCode, faCamera, faMusic, faGamepad, faHeart, faStar, faHome, faEnvelope,
  faPhone, faMapMarkerAlt, faCalendar, faClock, faSearch, faDownload,
  faUpload, faShare, faBookmark, faTag, faFolder, faFile, faImage,
  faVideo, faHeadphones, faMicrophone, faPrint, faCog, faTools,
  faWrench, faHammer, faPalette, faBrush, faPencilAlt, faEdit,
  faTrash, faPlus, faMinus, faCheck, faTimes, faArrowUp, faArrowDown,
  faArrowLeft, faArrowRight, faChevronUp, faChevronDown, faChevronLeft,
  faChevronRight, faAngleUp, faAngleDown, faAngleLeft, faAngleRight
} from '@fortawesome/free-solid-svg-icons';

const iconOptions = [
  { icon: faGlobe, name: 'Globe' },
  { icon: faShoppingCart, name: 'Shopping Cart' },
  { icon: faBlog, name: 'Blog' },
  { icon: faBuilding, name: 'Building' },
  { icon: faUser, name: 'User' },
  { icon: faGraduationCap, name: 'Education' },
  { icon: faCode, name: 'Code' },
  { icon: faCamera, name: 'Camera' },
  { icon: faMusic, name: 'Music' },
  { icon: faGamepad, name: 'Gaming' },
  { icon: faHeart, name: 'Heart' },
  { icon: faStar, name: 'Star' },
  { icon: faHome, name: 'Home' },
  { icon: faEnvelope, name: 'Email' },
  { icon: faPhone, name: 'Phone' },
  { icon: faMapMarkerAlt, name: 'Location' },
  { icon: faCalendar, name: 'Calendar' },
  { icon: faClock, name: 'Clock' },
  { icon: faSearch, name: 'Search' },
  { icon: faDownload, name: 'Download' },
  { icon: faUpload, name: 'Upload' },
  { icon: faShare, name: 'Share' },
  { icon: faBookmark, name: 'Bookmark' },
  { icon: faTag, name: 'Tag' },
  { icon: faFolder, name: 'Folder' },
  { icon: faFile, name: 'File' },
  { icon: faImage, name: 'Image' },
  { icon: faVideo, name: 'Video' },
  { icon: faHeadphones, name: 'Headphones' },
  { icon: faMicrophone, name: 'Microphone' },
  { icon: faPrint, name: 'Print' },
  { icon: faCog, name: 'Settings' },
  { icon: faTools, name: 'Tools' },
  { icon: faWrench, name: 'Wrench' },
  { icon: faHammer, name: 'Hammer' },
  { icon: faPalette, name: 'Palette' },
  { icon: faBrush, name: 'Brush' },
  { icon: faPencilAlt, name: 'Pencil' },
  { icon: faEdit, name: 'Edit' },
  { icon: faTrash, name: 'Trash' },
  { icon: faPlus, name: 'Plus' },
  { icon: faMinus, name: 'Minus' },
  { icon: faCheck, name: 'Check' },
  { icon: faTimes, name: 'Times' }
];

interface IconSelectorProps {
  selectedIcon: string;
  onIconSelect: (iconName: string) => void;
  isDarkTheme: boolean;
  isThinText: boolean;
}

export const IconSelector: React.FC<IconSelectorProps> = ({
  selectedIcon,
  onIconSelect,
  isDarkTheme,
  isThinText
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredIcons = iconOptions.filter(option =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getIconByName = (iconName: string) => {
    const iconOption = iconOptions.find(option => option.name === iconName);
    return iconOption ? iconOption.icon : faGlobe;
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center gap-3 px-4 py-3 border rounded-lg transition-all duration-200 ${
          isDarkTheme 
            ? 'bg-black border-gray-700 text-white hover:border-gray-600' 
            : 'bg-white border-gray-200 text-gray-900 hover:border-gray-300'
        }`}
      >
        <FontAwesomeIcon 
          icon={getIconByName(selectedIcon)} 
          className={`w-5 h-5 ${isDarkTheme ? 'text-blue-400' : 'text-blue-600'}`}
        />
        <span className={`flex-1 text-left ${isThinText ? 'font-light' : ''}`}>
          {selectedIcon || 'Select Icon'}
        </span>
        <FontAwesomeIcon 
          icon={faChevronDown} 
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          } ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}
        />
      </button>

      {isOpen && (
        <div className={`absolute top-full left-0 right-0 mt-2 rounded-lg border shadow-lg z-50 ${
          isDarkTheme ? 'bg-black border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="p-3 border-b border-gray-200 dark:border-gray-700">
            <input
              type="text"
              placeholder="Search icons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full px-3 py-2 text-sm border rounded-lg transition-colors ${
                isDarkTheme 
                  ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
              } ${isThinText ? 'font-light' : ''}`}
            />
          </div>
          
          <div className="max-h-64 overflow-y-auto p-2">
            <div className="grid grid-cols-6 gap-2">
              {filteredIcons.map((option) => (
                <button
                  key={option.name}
                  type="button"
                  onClick={() => {
                    onIconSelect(option.name);
                    setIsOpen(false);
                    setSearchTerm('');
                  }}
                  className={`p-3 rounded-lg transition-all duration-200 hover:scale-105 ${
                    selectedIcon === option.name
                      ? isDarkTheme
                        ? 'bg-blue-900/30 border border-blue-500'
                        : 'bg-blue-50 border border-blue-500'
                      : isDarkTheme
                        ? 'hover:bg-gray-800'
                        : 'hover:bg-gray-50'
                  }`}
                  title={option.name}
                >
                  <FontAwesomeIcon 
                    icon={option.icon} 
                    className={`w-5 h-5 ${
                      selectedIcon === option.name
                        ? isDarkTheme ? 'text-blue-400' : 'text-blue-600'
                        : isDarkTheme ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { iconOptions };