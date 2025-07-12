import React, { useState, useEffect, useRef } from 'react';
import { X, QrCode, Share2, Download, Copy, Camera, Upload, Wifi, WifiOff, Loader } from 'lucide-react';
import QRCodeLib from 'qrcode';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { SiteLink } from '../types';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkTheme: boolean;
  isThinText: boolean;
  links: SiteLink[];
  onImportLinks: (links: SiteLink[]) => void;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({
  isOpen,
  onClose,
  isDarkTheme,
  isThinText,
  links,
  onImportLinks
}) => {
  const [activeTab, setActiveTab] = useState<'generate' | 'scan'>('generate');
  const [selectedLinks, setSelectedLinks] = useState<string[]>([]);
  const [qrCodeDataURL, setQrCodeDataURL] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [scanResult, setScanResult] = useState<string>('');
  const [isScanning, setIsScanning] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const scannerElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && activeTab === 'scan' && isScanning && scannerElementRef.current) {
      scannerRef.current = new Html5QrcodeScanner(
        "qr-reader",
        { 
          fps: 10, 
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0
        },
        false
      );

      scannerRef.current.render(
        (decodedText) => {
          try {
            const importedData = JSON.parse(decodedText);
            if (importedData.type === 'site-links' && Array.isArray(importedData.links)) {
              onImportLinks(importedData.links);
              setScanResult(`Successfully imported ${importedData.links.length} links!`);
              setIsScanning(false);
              scannerRef.current?.clear();
            } else {
              setScanResult('Invalid QR code format. Please scan a valid site links QR code.');
            }
          } catch (error) {
            setScanResult('Failed to parse QR code data. Please try again.');
          }
        },
        (error) => {
          console.log('QR scan error:', error);
        }
      );
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear();
      }
    };
  }, [isOpen, activeTab, isScanning, onImportLinks]);

  const generateQRCode = async () => {
    if (selectedLinks.length === 0) return;

    setIsGenerating(true);
    try {
      const selectedSites = links.filter(link => selectedLinks.includes(link.id));
      const exportData = {
        type: 'site-links',
        timestamp: new Date().toISOString(),
        links: selectedSites.map(link => ({
          ...link,
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9) // Generate new IDs to avoid conflicts
        }))
      };

      const qrCodeData = await QRCodeLib.toDataURL(JSON.stringify(exportData), {
        width: 400,
        margin: 2,
        color: {
          dark: isDarkTheme ? '#ffffff' : '#000000',
          light: isDarkTheme ? '#000000' : '#ffffff'
        }
      });

      setQrCodeDataURL(qrCodeData);
    } catch (error) {
      console.error('Error generating QR code:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQRCode = () => {
    if (!qrCodeDataURL) return;

    const link = document.createElement('a');
    link.download = `site-links-qr-${new Date().toISOString().split('T')[0]}.png`;
    link.href = qrCodeDataURL;
    link.click();
  };

  const copyQRData = async () => {
    if (selectedLinks.length === 0) return;

    try {
      const selectedSites = links.filter(link => selectedLinks.includes(link.id));
      const exportData = {
        type: 'site-links',
        timestamp: new Date().toISOString(),
        links: selectedSites
      };

      await navigator.clipboard.writeText(JSON.stringify(exportData, null, 2));
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error('Failed to copy data:', error);
    }
  };

  const toggleLinkSelection = (linkId: string) => {
    setSelectedLinks(prev => 
      prev.includes(linkId) 
        ? prev.filter(id => id !== linkId)
        : [...prev, linkId]
    );
  };

  const selectAllLinks = () => {
    setSelectedLinks(links.map(link => link.id));
  };

  const clearSelection = () => {
    setSelectedLinks([]);
  };

  const startScanning = () => {
    setIsScanning(true);
    setScanResult('');
  };

  const stopScanning = () => {
    setIsScanning(false);
    if (scannerRef.current) {
      scannerRef.current.clear();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className={`rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transition-colors duration-300 ${
        isDarkTheme ? 'bg-black' : 'bg-white'
      }`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl ${isDarkTheme ? 'text-white' : 'text-gray-900'} ${isThinText ? 'font-light' : 'font-bold'}`}>
              QR Code Generator & Scanner
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

          {/* Tabs */}
          <div className="flex mb-6">
            <button
              onClick={() => setActiveTab('generate')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-l-lg border transition-colors ${
                activeTab === 'generate'
                  ? isDarkTheme
                    ? 'bg-blue-900/30 border-blue-500 text-blue-400'
                    : 'bg-blue-50 border-blue-500 text-blue-600'
                  : isDarkTheme
                    ? 'border-gray-700 text-gray-400 hover:bg-gray-900'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Share2 size={16} />
              <span className={isThinText ? 'font-light' : ''}>Generate & Share</span>
            </button>
            <button
              onClick={() => setActiveTab('scan')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-r-lg border-t border-r border-b transition-colors ${
                activeTab === 'scan'
                  ? isDarkTheme
                    ? 'bg-blue-900/30 border-blue-500 text-blue-400'
                    : 'bg-blue-50 border-blue-500 text-blue-600'
                  : isDarkTheme
                    ? 'border-gray-700 text-gray-400 hover:bg-gray-900'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Camera size={16} />
              <span className={isThinText ? 'font-light' : ''}>Scan & Import</span>
            </button>
          </div>

          {/* Generate Tab */}
          {activeTab === 'generate' && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-lg ${isDarkTheme ? 'text-white' : 'text-gray-900'} ${isThinText ? 'font-light' : 'font-medium'}`}>
                    Select Sites to Share
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={selectAllLinks}
                      className={`px-3 py-1 text-sm rounded transition-colors ${
                        isDarkTheme
                          ? 'text-blue-400 hover:bg-gray-900'
                          : 'text-blue-600 hover:bg-blue-50'
                      } ${isThinText ? 'font-light' : ''}`}
                    >
                      Select All
                    </button>
                    <button
                      onClick={clearSelection}
                      className={`px-3 py-1 text-sm rounded transition-colors ${
                        isDarkTheme
                          ? 'text-gray-400 hover:bg-gray-900'
                          : 'text-gray-600 hover:bg-gray-50'
                      } ${isThinText ? 'font-light' : ''}`}
                    >
                      Clear
                    </button>
                  </div>
                </div>

                <div className={`max-h-48 overflow-y-auto rounded-lg border ${
                  isDarkTheme ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  {links.map((link) => (
                    <label
                      key={link.id}
                      className={`flex items-center gap-3 p-3 cursor-pointer transition-colors ${
                        isDarkTheme ? 'hover:bg-gray-900' : 'hover:bg-gray-50'
                      } ${selectedLinks.includes(link.id) ? 
                        isDarkTheme ? 'bg-blue-900/20' : 'bg-blue-50' : ''
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedLinks.includes(link.id)}
                        onChange={() => toggleLinkSelection(link.id)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <div className="flex-1 min-w-0">
                        <div className={`font-medium truncate ${isDarkTheme ? 'text-white' : 'text-gray-900'} ${isThinText ? 'font-light' : ''}`}>
                          {link.title}
                        </div>
                        <div className={`text-sm truncate ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'} ${isThinText ? 'font-light' : ''}`}>
                          {link.url}
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs ${
                        isDarkTheme 
                          ? 'bg-blue-900/30 text-blue-400' 
                          : 'bg-blue-50 text-blue-700'
                      } ${isThinText ? 'font-light' : ''}`}>
                        {link.category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {selectedLinks.length > 0 && (
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <button
                      onClick={generateQRCode}
                      disabled={isGenerating}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 ${isThinText ? 'font-light' : ''}`}
                    >
                      {isGenerating ? <Loader className="animate-spin" size={16} /> : <QrCode size={16} />}
                      {isGenerating ? 'Generating...' : 'Generate QR Code'}
                    </button>
                    <button
                      onClick={copyQRData}
                      className={`flex items-center justify-center gap-2 py-3 px-4 border rounded-lg transition-colors ${
                        isDarkTheme
                          ? 'border-gray-700 text-gray-300 hover:bg-gray-900'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      } ${isThinText ? 'font-light' : ''}`}
                    >
                      <Copy size={16} />
                      {copySuccess ? 'Copied!' : 'Copy Data'}
                    </button>
                  </div>

                  {qrCodeDataURL && (
                    <div className="text-center space-y-4">
                      <div className={`inline-block p-4 rounded-lg ${isDarkTheme ? 'bg-white' : 'bg-gray-100'}`}>
                        <img src={qrCodeDataURL} alt="QR Code" className="w-64 h-64" />
                      </div>
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={downloadQRCode}
                          className={`flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors ${isThinText ? 'font-light' : ''}`}
                        >
                          <Download size={16} />
                          Download QR Code
                        </button>
                      </div>
                      <p className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'} ${isThinText ? 'font-light' : ''}`}>
                        Share this QR code to transfer {selectedLinks.length} selected site{selectedLinks.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Scan Tab */}
          {activeTab === 'scan' && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className={`text-lg mb-2 ${isDarkTheme ? 'text-white' : 'text-gray-900'} ${isThinText ? 'font-light' : 'font-medium'}`}>
                  Scan QR Code to Import Sites
                </h3>
                <p className={`text-sm mb-4 ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'} ${isThinText ? 'font-light' : ''}`}>
                  Scan a QR code generated by this app to import site links
                </p>

                {!isScanning ? (
                  <button
                    onClick={startScanning}
                    className={`flex items-center justify-center gap-2 mx-auto py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${isThinText ? 'font-light' : ''}`}
                  >
                    <Camera size={16} />
                    Start Camera Scanner
                  </button>
                ) : (
                  <div className="space-y-4">
                    <div 
                      id="qr-reader" 
                      ref={scannerElementRef}
                      className="mx-auto max-w-sm"
                    ></div>
                    <button
                      onClick={stopScanning}
                      className={`flex items-center justify-center gap-2 mx-auto py-2 px-4 border rounded-lg transition-colors ${
                        isDarkTheme
                          ? 'border-gray-700 text-gray-300 hover:bg-gray-900'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      } ${isThinText ? 'font-light' : ''}`}
                    >
                      Stop Scanner
                    </button>
                  </div>
                )}

                {scanResult && (
                  <div className={`mt-4 p-4 rounded-lg ${
                    scanResult.includes('Successfully') 
                      ? isDarkTheme ? 'bg-green-900/30 text-green-400' : 'bg-green-50 text-green-700'
                      : isDarkTheme ? 'bg-red-900/30 text-red-400' : 'bg-red-50 text-red-700'
                  }`}>
                    <p className={isThinText ? 'font-light' : ''}>{scanResult}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-end pt-6">
            <button
              onClick={onClose}
              className={`px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors ${isThinText ? 'font-light' : ''}`}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};