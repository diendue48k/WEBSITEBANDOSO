
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Sidebar } from './components/Sidebar';
import { MapView } from './components/MapView';
import { SiteDetailModal } from './components/SiteDetailModal';
import { PersonDetailModal } from './components/PersonDetailModal';
import { Site, Person, ViewMode } from './types';
import { fetchSites, fetchPersons } from './services/apiService';
import { useDebounce } from './hooks/useDebounce';
import { MenuIcon } from './components/Icons';
import { GlobalSearch, ViewModeToggle } from './components/GlobalSearch';

const App: React.FC = () => {
  const [allSites, setAllSites] = useState<Site[]>([]);
  const [allPersons, setAllPersons] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const [viewMode, setViewMode] = useState<ViewMode>('sites');
  
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('all');
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const isTransitioningToModal = useRef(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [sites, persons] = await Promise.all([fetchSites(), fetchPersons()]);
        setAllSites(sites);
        setAllPersons(persons);
      } catch (error) {
        console.error("Failed to fetch initial data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);
  
  const siteTypes = useMemo(() => {
    const types = new Set(allSites.map(site => site.site_type));
    return ['all', ...Array.from(types).sort()];
  }, [allSites]);

  const filteredItems = useMemo(() => {
    const lowercasedSearch = debouncedSearchTerm.toLowerCase();

    if (viewMode === 'persons') {
        return lowercasedSearch
            ? allPersons.filter(p => p.full_name.toLowerCase().includes(lowercasedSearch))
            : allPersons;
    }

    // Default to sites
    let sites = allSites;
    if (selectedType !== 'all') {
      sites = sites.filter(site => site.site_type === selectedType);
    }
    if (lowercasedSearch) {
      sites = sites.filter(site =>
        site.site_name.toLowerCase().includes(lowercasedSearch)
      );
    }
    return sites;
  }, [allSites, allPersons, debouncedSearchTerm, selectedType, viewMode]);

  useEffect(() => {
    if (selectedSite && viewMode === 'sites' && !filteredItems.find(s => (s as Site).site_id === selectedSite.site_id)) {
        setSelectedSite(null);
    }
  }, [filteredItems, selectedSite, viewMode]);
  
  const handleShowDetailModal = useCallback(() => {
    if (selectedSite) {
        isTransitioningToModal.current = true;
        setIsModalOpen(true);
        setTimeout(() => {
            isTransitioningToModal.current = false;
        }, 100);
    }
  }, [selectedSite]);


  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => {
        setSelectedSite(null);
        setSelectedPerson(null);
    }, 300);
  }, []);
  
  const handlePersonSiteSelect = useCallback((site: Site) => {
    setSelectedPerson(null);
    setTimeout(() => {
        setSelectedSite(site);
        setIsModalOpen(true);
        setViewMode('sites');
    }, 300);
  }, []);

  const handleSiteSelectFromSidebar = useCallback((site: Site) => {
    setSelectedSite(site);
    setIsModalOpen(true);
    setIsSidebarOpen(false);
  }, []);

  const handleSiteSelectFromMap = useCallback((site: Site | null) => {
      if (isTransitioningToModal.current && site === null) {
          return; 
      }
      setSelectedSite(site);
      if(site) {
        setIsModalOpen(false);
      }
  }, []);
  
  const handlePersonSelect = useCallback((person: Person) => {
    setSelectedPerson(person);
    setIsModalOpen(true);
    setIsSidebarOpen(false);
  }, []);

  const handlePersonSelectFromSiteModal = useCallback((person: Person) => {
    setIsModalOpen(false);
    setSelectedSite(null);
    setTimeout(() => {
        setSelectedPerson(person);
        setIsModalOpen(true);
    }, 300);
  }, []);

  const handleSearchSelect = useCallback((item: Site | Person) => {
    if ('site_id' in item) {
        if(viewMode !== 'sites') setViewMode('sites');
        setSelectedSite(item);
        setIsModalOpen(false);
    } else {
        if(viewMode !== 'persons') setViewMode('persons');
        // A person doesn't have a location, so we open the modal directly
        setSelectedPerson(item);
        setIsModalOpen(true);
    }
  }, [viewMode]);

  const listTitle = useMemo(() => {
      const isFiltering = searchTerm !== '' || (viewMode === 'sites' && selectedType !== 'all');
      if (viewMode === 'sites') {
          return isFiltering ? "Kết quả tìm kiếm" : "Địa điểm nổi bật";
      }
      return isFiltering ? "Kết quả tìm kiếm" : "Nhân vật Lịch sử";
  }, [searchTerm, selectedType, viewMode]);


  return (
    <div className="h-screen w-screen flex flex-col md:flex-row relative overflow-hidden bg-slate-900">
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-30 bg-slate-800/80 backdrop-blur-lg p-2.5 space-y-2.5 shadow-lg border-b border-slate-700/80">
        <div className="flex items-center space-x-2">
            <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 text-white bg-slate-700/50 rounded-md shadow-sm transition-colors hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                aria-label="Mở menu"
            >
                <MenuIcon className="h-5 w-5" />
            </button>
            <GlobalSearch 
              allSites={allSites}
              allPersons={allPersons}
              viewMode={viewMode}
              onSelect={handleSearchSelect}
            />
        </div>
        <ViewModeToggle viewMode={viewMode} onSetViewMode={setViewMode} />
      </header>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)} 
          className="fixed inset-0 bg-black bg-opacity-60 z-30 md:hidden animate-fade-in-overlay"
          aria-hidden="true"
        />
      )}
      
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        items={filteredItems}
        viewMode={viewMode}
        onSetViewMode={setViewMode}
        listTitle={listTitle}
        onSearch={setSearchTerm}
        onFilter={setSelectedType}
        siteTypes={siteTypes}
        selectedType={selectedType}
        isLoading={isLoading}
        onSiteSelect={handleSiteSelectFromSidebar}
        onPersonSelect={handlePersonSelect}
        selectedItem={selectedSite || selectedPerson}
      />
      <main className="flex-grow h-full w-full relative pt-28 md:pt-0">
        <MapView 
            sites={allSites}
            selectedSite={selectedSite}
            onSiteSelect={handleSiteSelectFromMap}
            onShowDetailModal={handleShowDetailModal}
            isModalOpen={isModalOpen}
        />
      </main>

      {selectedSite && isModalOpen && (
        <SiteDetailModal 
            site={selectedSite}
            onClose={handleCloseModal}
            onPersonSelect={handlePersonSelectFromSiteModal}
        />
      )}
      
      {selectedPerson && isModalOpen && (
          <PersonDetailModal
            person={selectedPerson}
            onClose={handleCloseModal}
            onSiteSelect={handlePersonSiteSelect}
            sites={allSites}
          />
      )}
    </div>
  );
};

export default App;
