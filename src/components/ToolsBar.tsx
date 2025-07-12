import React from 'react';
import { Plus, RefreshCw, Settings, QrCode } from 'lucide-react';

interface ToolsBarProps {
  onAddNew: () => void;
  onCheckAll: () => void;
  onSettings: () => void;
  onQrCode: () => void;
  onToggleTheme: () => void;
  isDarkTheme: boolean;
  isThinText: boolean;
}

export const ToolsBar: React.FC<ToolsBarProps> = ({
  onAddNew,
  onCheckAll,
  onSettings,
  onQrCode,
  onToggleTheme,
  isDarkTheme,
  isThinText
}) => {
  return (
    <div className={`rounded-lg border p-2 mb-2 transition-colors duration-300 ${isDarkTheme ? 'bg-black border-gray-800' : 'bg-white border-gray-200'}`}>
      <div className="flex items-center justify-between">
        <button
          onClick={onToggleTheme}
          className={`text-lg transition-colors duration-300 hover:opacity-80 ${isDarkTheme ? 'text-white' : 'text-gray-900'} ${isThinText ? 'font-light' : 'font-light'}`}
        >
          Link Manager
        </button>
        
        <div className="flex items-center gap-2">
          <button
            onClick={onCheckAll}
            className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
              isDarkTheme 
                ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-900' 
                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
            }`}
            title="Check all"
          >
            <RefreshCw size={16} />
            <span className={`text-sm ${isThinText ? 'font-light' : ''}`}>Check All</span>
          </button>
          
          <button
            onClick={onSettings}
            className={`p-2 rounded-md transition-colors ${
              isDarkTheme 
                ? 'text-gray-300 hover:text-gray-100 hover:bg-gray-900' 
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
            }`}
            title="Settings"
          >
            <Settings size={16} />
          </button>
          
          <button
            onClick={onQrCode}
            className={`p-2 rounded-md transition-colors ${
              isDarkTheme 
                ? 'text-gray-300 hover:text-purple-400 hover:bg-gray-900' 
                : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
            }`}
            title="QR Code"
          >
            <QrCode size={16} />
          </button>
          
          <button
            onClick={onAddNew}
            className={`p-2 rounded-md transition-colors ${
              isDarkTheme 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
            title="Add Site"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};