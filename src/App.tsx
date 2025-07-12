import React, { useState, useEffect } from 'react';
import { QrCode } from 'lucide-react';
import { LinkCard } from './components/LinkCard';
import { LinkForm } from './components/LinkForm';
import { ToolsBar } from './components/ToolsBar';
import { SettingsModal } from './components/SettingsModal';
import { InfoModal } from './components/InfoModal';
import { QRCodeModal } from './components/QRCodeModal';
import { ConnectionNotification } from './components/ConnectionNotification';
import { SkeletonLoader } from './components/SkeletonLoader';
import { SiteLink } from './types';

function App() {
  const [links, setLinks] = useState<SiteLink[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [showConnection, setShowConnection] = useState(false);
  const [connectionUrl, setConnectionUrl] = useState('');
  const [selectedLink, setSelectedLink] = useState<SiteLink | undefined>();
  const [editingLink, setEditingLink] = useState<SiteLink | undefined>();
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isThinText, setIsThinText] = useState(false);
  const [showCardBorders, setShowCardBorders] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'card' | 'single'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  
  // New customization settings
  const [showTags, setShowTags] = useState(false);
  const [showEditButton, setShowEditButton] = useState(true);
  const [showDeleteButton, setShowDeleteButton] = useState(true);
  const [showInfoButton, setShowInfoButton] = useState(true);
  const [showCheckButton, setShowCheckButton] = useState(true);
  const [showResponseTime, setShowResponseTime] = useState(true);
  const [showCategory, setShowCategory] = useState(true);
  const [showDescription, setShowDescription] = useState(false);
  const [cardHeight, setCardHeight] = useState('normal'); // 'compact', 'normal', 'large'
  const [showActiveStatus, setShowActiveStatus] = useState(false);
  const [showCreatedDate, setShowCreatedDate] = useState(false);
  const [showLastChecked, setShowLastChecked] = useState(false);
  
  // Category management settings
  const [enableCategoryFolders, setEnableCategoryFolders] = useState(false);
  const [customCategories, setCustomCategories] = useState<string[]>([]);
  const [categoryFromTags, setCategoryFromTags] = useState(false);
  
  // Gap settings
  const [cardGap, setCardGap] = useState<'tight' | 'normal' | 'loose'>('normal');
  const [listGap, setListGap] = useState<'tight' | 'normal' | 'loose'>('normal');
  const [isLoading, setIsLoading] = useState(true);
  
  // Icon settings
  const [showIcons, setShowIcons] = useState(true);
  const [iconColor, setIconColor] = useState('blue'); // blue, green, purple, red, orange, gray

  // Load data from localStorage on component mount
  useEffect(() => {
    const loadStoredData = () => {
      try {
        // Load links
        const storedLinks = localStorage.getItem('siteLinks');
        if (storedLinks) {
          const parsedLinks = JSON.parse(storedLinks).map((link: any) => ({
            ...link,
            createdAt: new Date(link.createdAt),
            lastChecked: link.lastChecked ? new Date(link.lastChecked) : undefined
          }));
          setLinks(parsedLinks);
          setIsLoading(false);
          return;
        }

        // Load settings
        const storedSettings = localStorage.getItem('appSettings');
        if (storedSettings) {
          const settings = JSON.parse(storedSettings);
          setIsDarkTheme(settings.isDarkTheme ?? false);
          setIsThinText(settings.isThinText ?? false);
          setShowCardBorders(settings.showCardBorders ?? false);
          setViewMode(settings.viewMode ?? 'list');
          setShowTags(settings.showTags ?? false);
          setShowEditButton(settings.showEditButton ?? true);
          setShowDeleteButton(settings.showDeleteButton ?? true);
          setShowInfoButton(settings.showInfoButton ?? true);
          setShowCheckButton(settings.showCheckButton ?? true);
          setShowResponseTime(settings.showResponseTime ?? true);
          setShowCategory(settings.showCategory ?? true);
          setShowDescription(settings.showDescription ?? false);
          setCardHeight(settings.cardHeight ?? 'normal');
          setShowActiveStatus(settings.showActiveStatus ?? false);
          setShowCreatedDate(settings.showCreatedDate ?? false);
          setShowLastChecked(settings.showLastChecked ?? false);
          setEnableCategoryFolders(settings.enableCategoryFolders ?? false);
          setCustomCategories(settings.customCategories ?? []);
          setCategoryFromTags(settings.categoryFromTags ?? false);
          setCardGap(settings.cardGap ?? 'normal');
          setListGap(settings.listGap ?? 'normal');
          setShowIcons(settings.showIcons ?? true);
          setIconColor(settings.iconColor ?? 'blue');
        }
      } catch (error) {
        console.error('Error loading stored data:', error);
      }
    };

    loadStoredData();

    // If no stored links, load sample data
    const storedLinks = localStorage.getItem('siteLinks');
    if (!storedLinks) {
      // Simulate loading delay for first time users
      setTimeout(() => {
        const sampleLinks: SiteLink[] = [
          {
            id: '1',
            title: 'Portfolio Website',
            url: 'https://example.com/portfolio',
            description: 'My personal portfolio showcasing web development projects and skills.',
            category: 'Portfolio',
            tags: ['React', 'TypeScript', 'Design'],
            icon: 'Globe',
            createdAt: new Date('2024-01-15'),
            isActive: true,
            status: 'online',
            lastChecked: new Date(),
            responseTime: 245
          },
          {
            id: '2',
            title: 'E-commerce Store',
            url: 'https://example.com/store',
            description: 'Modern e-commerce platform with advanced features.',
            category: 'E-commerce',
            tags: ['Next.js', 'Stripe', 'Commerce'],
            icon: 'Shopping Cart',
            createdAt: new Date('2024-01-10'),
            isActive: true,
            status: 'maintenance',
            lastChecked: new Date(),
            responseTime: 1200
          },
          {
            id: '3',
            title: 'Tech Blog',
            url: 'https://example.com/blog',
            description: 'Writing about web development trends and tutorials.',
            category: 'Blog',
            tags: ['Content', 'Tech', 'Writing'],
            icon: 'Blog',
            createdAt: new Date('2024-01-05'),
            isActive: false,
            status: 'offline',
            lastChecked: new Date(),
            responseTime: undefined
          },
          {
            id: '4',
            title: 'Business Website',
            url: 'https://example.com/business',
            description: 'Professional business website with modern design.',
            category: 'Business',
            tags: ['Business', 'Professional', 'Corporate'],
            icon: 'Building',
            createdAt: new Date('2024-01-01'),
            isActive: true,
            status: 'online',
            lastChecked: new Date(),
            responseTime: 180
          }
        ];
        
        setLinks(sampleLinks);
        setIsLoading(false);
        // Save sample links to localStorage
        localStorage.setItem('siteLinks', JSON.stringify(sampleLinks));
      }, 1500);
    }
  }, []);

  // Save links to localStorage whenever links change
  useEffect(() => {
    if (links.length > 0) {
      localStorage.setItem('siteLinks', JSON.stringify(links));
    }
  }, [links]);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    const settings = {
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
      enableCategoryFolders,
      customCategories,
      categoryFromTags,
      cardGap,
      listGap,
      showIcons,
      iconColor
    };
    localStorage.setItem('appSettings', JSON.stringify(settings));
  }, [
    isDarkTheme, isThinText, showCardBorders, viewMode, showTags, showEditButton,
    showDeleteButton, showInfoButton, showCheckButton, showResponseTime, showCategory,
    showDescription, cardHeight, showActiveStatus, showCreatedDate, showLastChecked,
    enableCategoryFolders, customCategories, categoryFromTags, cardGap, listGap,
    showIcons, iconColor
  ]);

  const handleAddLink = (linkData: Omit<SiteLink, 'id' | 'createdAt'>) => {
    const newLink: SiteLink = {
      ...linkData,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setLinks(prev => [newLink, ...prev]);
    setShowForm(false);
  };

  const handleEditLink = (linkData: Omit<SiteLink, 'id' | 'createdAt'>) => {
    if (editingLink) {
      setLinks(prev => prev.map(link =>
        link.id === editingLink.id
          ? { ...linkData, id: editingLink.id, createdAt: editingLink.createdAt }
          : link
      ));
      setEditingLink(undefined);
      setShowForm(false);
    }
  };

  const handleDeleteLink = (id: string) => {
    setLinks(prev => prev.filter(link => link.id !== id));
  };

  const handleToggleActive = (id: string) => {
    setLinks(prev => prev.map(link =>
      link.id === id ? { ...link, isActive: !link.isActive } : link
    ));
  };

  const handleCheckStatus = (id: string) => {
    const statuses: ('online' | 'offline' | 'maintenance')[] = ['online', 'offline', 'maintenance'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const randomResponseTime = randomStatus === 'online' ? Math.floor(Math.random() * 2000) + 100 : undefined;
    
    setLinks(prev => prev.map(link =>
      link.id === id 
        ? { 
            ...link, 
            status: randomStatus, 
            lastChecked: new Date(),
            responseTime: randomResponseTime
          } 
        : link
    ));
  };

  const handleCheckAll = () => {
    links.forEach(link => handleCheckStatus(link.id));
  };

  const handleQrCode = () => {
    setShowQRCode(true);
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const openEditForm = (link: SiteLink) => {
    setEditingLink(link);
    setShowForm(true);
  };

  const openAddForm = () => {
    setEditingLink(undefined);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingLink(undefined);
  };

  const openSettings = () => {
    setShowSettings(true);
  };

  const closeSettings = () => {
    setShowSettings(false);
  };

  const openInfo = (link: SiteLink) => {
    setSelectedLink(link);
    setShowInfo(true);
  };

  const closeInfo = () => {
    setShowInfo(false);
    setSelectedLink(undefined);
  };

  const closeQRCode = () => {
    setShowQRCode(false);
  };

  const handleLinkClick = (url: string, e: React.MouseEvent) => {
    e.preventDefault();
    setConnectionUrl(url);
    setShowConnection(true);
  };

  const handleConnectionComplete = () => {
    setShowConnection(false);
    setConnectionUrl('');
  };

  const handleImportLinks = (importedLinks: SiteLink[]) => {
    setLinks(prev => [...importedLinks, ...prev]);
    setShowQRCode(false);
    // Save imported links to localStorage
    const updatedLinks = [...importedLinks, ...links];
    localStorage.setItem('siteLinks', JSON.stringify(updatedLinks));
  };

  // Filter links based on search and filters
  const filteredLinks = links.filter(link => {
    const matchesSearch = link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         link.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         link.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = !filterCategory || link.category === filterCategory;
    const matchesStatus = !filterStatus || link.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = [...new Set(links.map(link => link.category))];
  
  // Generate categories from tags if enabled
  const allTags = [...new Set(links.flatMap(link => link.tags))];
  const availableCategories = categoryFromTags 
    ? [...new Set([...categories, ...customCategories, ...allTags])]
    : [...new Set([...categories, ...customCategories])];

  // Group links by category if folder view is enabled
  const groupedLinks = enableCategoryFolders 
    ? availableCategories.reduce((acc, category) => {
        const categoryLinks = filteredLinks.filter(link => 
          link.category === category || 
          (categoryFromTags && link.tags.includes(category))
        );
        if (categoryLinks.length > 0) {
          acc[category] = categoryLinks;
        }
        return acc;
      }, {} as Record<string, SiteLink[]>)
    : { 'All Sites': filteredLinks };

  const handleAddCustomCategory = (category: string) => {
    if (category.trim() && !customCategories.includes(category.trim())) {
      setCustomCategories(prev => [...prev, category.trim()]);
    }
  };

  const handleRemoveCustomCategory = (category: string) => {
    setCustomCategories(prev => prev.filter(cat => cat !== category));
  };

  const getGapClass = (gapType: 'tight' | 'normal' | 'loose', isCard: boolean = false) => {
    if (isCard) {
      switch (gapType) {
        case 'tight': return 'gap-1';
        case 'loose': return 'gap-6';
        default: return 'gap-3';
      }
    } else {
      switch (gapType) {
        case 'tight': return 'space-y-1';
        case 'loose': return 'space-y-4';
        default: return 'space-y-2';
      }
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ease-in-out ${isDarkTheme ? 'bg-black' : 'bg-gray-50'}`}>
      <div className="w-full px-2 lg:px-4 py-3">
        <ToolsBar
          onAddNew={openAddForm}
          onCheckAll={handleCheckAll}
          onSettings={openSettings}
          onQrCode={handleQrCode}
          onToggleTheme={toggleTheme}
          isDarkTheme={isDarkTheme}
          isThinText={isThinText}
        />

        {isLoading ? (
          <div className="animate-fade-in">
            <SkeletonLoader isDarkTheme={isDarkTheme} count={6} />
          </div>
        ) : filteredLinks.length === 0 ? (
          <div className="text-center py-12">
            <div className={`w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4 animate-bounce ${isDarkTheme ? 'bg-gray-900' : 'bg-blue-100'}`}>
              <QrCode className={`${isDarkTheme ? 'text-blue-400' : 'text-blue-600'}`} size={24} />
            </div>
            <h3 className={`text-xl mb-2 ${isDarkTheme ? 'text-white' : 'text-gray-900'} ${isThinText ? 'font-light' : 'font-medium'}`}>
              {searchTerm || filterCategory || filterStatus ? 'No matching sites found' : 'No sites added yet'}
            </h3>
            <p className={`mb-6 ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'} ${isThinText ? 'font-light' : ''}`}>
              {searchTerm || filterCategory || filterStatus ? 'Try adjusting your filters in settings' : 'Get started by adding your first website'}
            </p>
            {!searchTerm && !filterCategory && !filterStatus && (
              <button
                onClick={openAddForm}
                className={`px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${isDarkTheme ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'} ${isThinText ? 'font-light' : ''}`}
              >
                Add Your First Site
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            {Object.entries(groupedLinks).map(([categoryName, categoryLinks]) => (
              <div key={categoryName} className="animate-slide-up">
                {enableCategoryFolders && (
                  <div className={`flex items-center gap-2 mb-3 animate-fade-in ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
                    <h2 className={`text-lg ${isThinText ? 'font-light' : 'font-medium'}`}>
                      {categoryName}
                    </h2>
                    <span className={`px-2 py-1 rounded text-xs animate-pulse ${
                      isDarkTheme ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {categoryLinks.length}
                    </span>
                  </div>
                )}
                <div className={`${viewMode === 'card' ? `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${getGapClass(cardGap, true)}` : getGapClass(listGap, false)}`}>
                  {categoryLinks.slice(0, viewMode === 'single' ? 1 : undefined).map((link, index) => (
                    <LinkCard
                      key={link.id}
                      link={link}
                      index={index}
                      onEdit={openEditForm}
                      onDelete={handleDeleteLink}
                      onToggleActive={handleToggleActive}
                      onCheckStatus={handleCheckStatus}
                      onInfo={openInfo}
                      onLinkClick={handleLinkClick}
                      isDarkTheme={isDarkTheme}
                      isThinText={isThinText}
                      showCardBorders={showCardBorders}
                      viewMode={viewMode}
                      showTags={showTags}
                      showEditButton={showEditButton}
                      showDeleteButton={showDeleteButton}
                      showInfoButton={showInfoButton}
                      showCheckButton={showCheckButton}
                      showResponseTime={showResponseTime}
                      showCategory={showCategory}
                      showDescription={showDescription}
                      cardHeight={cardHeight}
                      showActiveStatus={showActiveStatus}
                      showCreatedDate={showCreatedDate}
                      showLastChecked={showLastChecked}
                      showIcons={showIcons}
                      iconColor={iconColor}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <LinkForm
          link={editingLink}
          onSubmit={editingLink ? handleEditLink : handleAddLink}
          onCancel={closeForm}
          isOpen={showForm}
          isDarkTheme={isDarkTheme}
          isThinText={isThinText}
        />

        <SettingsModal
          isOpen={showSettings}
          onClose={closeSettings}
          isDarkTheme={isDarkTheme}
          isThinText={isThinText}
          onToggleThinText={() => setIsThinText(!isThinText)}
          showCardBorders={showCardBorders}
          onToggleCardBorders={() => setShowCardBorders(!showCardBorders)}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterCategory={filterCategory}
          onCategoryChange={setFilterCategory}
          filterStatus={filterStatus}
          onStatusChange={setFilterStatus}
          categories={categories}
          totalSites={links.length}
          showTags={showTags}
          onToggleShowTags={() => setShowTags(!showTags)}
          showEditButton={showEditButton}
          onToggleShowEditButton={() => setShowEditButton(!showEditButton)}
          showDeleteButton={showDeleteButton}
          onToggleShowDeleteButton={() => setShowDeleteButton(!showDeleteButton)}
          showInfoButton={showInfoButton}
          onToggleShowInfoButton={() => setShowInfoButton(!showInfoButton)}
          showCheckButton={showCheckButton}
          onToggleShowCheckButton={() => setShowCheckButton(!showCheckButton)}
          showResponseTime={showResponseTime}
          onToggleShowResponseTime={() => setShowResponseTime(!showResponseTime)}
          showCategory={showCategory}
          onToggleShowCategory={() => setShowCategory(!showCategory)}
          showDescription={showDescription}
          onToggleShowDescription={() => setShowDescription(!showDescription)}
          cardHeight={cardHeight}
          onCardHeightChange={setCardHeight}
          showActiveStatus={showActiveStatus}
          onToggleShowActiveStatus={() => setShowActiveStatus(!showActiveStatus)}
          showCreatedDate={showCreatedDate}
          onToggleShowCreatedDate={() => setShowCreatedDate(!showCreatedDate)}
          showLastChecked={showLastChecked}
          onToggleShowLastChecked={() => setShowLastChecked(!showLastChecked)}
          enableCategoryFolders={enableCategoryFolders}
          onToggleEnableCategoryFolders={() => setEnableCategoryFolders(!enableCategoryFolders)}
          customCategories={customCategories}
          onAddCustomCategory={handleAddCustomCategory}
          onRemoveCustomCategory={handleRemoveCustomCategory}
          categoryFromTags={categoryFromTags}
          onToggleCategoryFromTags={() => setCategoryFromTags(!categoryFromTags)}
          allTags={allTags}
          cardGap={cardGap}
          onCardGapChange={setCardGap}
          listGap={listGap}
          onListGapChange={setListGap}
          showIcons={showIcons}
          onToggleShowIcons={() => setShowIcons(!showIcons)}
          iconColor={iconColor}
          onIconColorChange={setIconColor}
        />

        <InfoModal
          isOpen={showInfo}
          onClose={closeInfo}
          link={selectedLink}
          isDarkTheme={isDarkTheme}
          isThinText={isThinText}
        />

        <QRCodeModal
          isOpen={showQRCode}
          onClose={closeQRCode}
          isDarkTheme={isDarkTheme}
          isThinText={isThinText}
          links={links}
          onImportLinks={handleImportLinks}
        />

        <ConnectionNotification
          isVisible={showConnection}
          url={connectionUrl}
          onComplete={handleConnectionComplete}
          isDarkTheme={isDarkTheme}
          isThinText={isThinText}
        />
      </div>
    </div>
  );
}

export default App;