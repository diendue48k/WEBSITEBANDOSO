
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Site, Person, ViewMode } from '../types';
import { SearchIcon, LocationMarkerIcon, UsersIcon } from './Icons';

interface GlobalSearchProps {
  allSites: Site[];
  allPersons: Person[];
  viewMode: ViewMode;
  onSelect: (item: Site | Person) => void;
}

export const ViewModeToggle: React.FC<{ viewMode: ViewMode; onSetViewMode: (mode: ViewMode) => void; }> = ({ viewMode, onSetViewMode }) => (
    <div className="flex bg-slate-700/50 rounded-lg p-1">
        <button 
            onClick={() => onSetViewMode('sites')}
            className={`w-1/2 py-2 px-3 text-sm font-semibold rounded-md flex items-center justify-center transition-colors duration-300 ${viewMode === 'sites' ? 'bg-sky-500 text-white shadow' : 'text-slate-300 hover:bg-slate-600/70'}`}
        >
            <LocationMarkerIcon className="h-5 w-5 mr-2" />
            Địa điểm
        </button>
        <button 
            onClick={() => onSetViewMode('persons')}
            className={`w-1/2 py-2 px-3 text-sm font-semibold rounded-md flex items-center justify-center transition-colors duration-300 ${viewMode === 'persons' ? 'bg-sky-500 text-white shadow' : 'text-slate-300 hover:bg-slate-600/70'}`}
        >
            <UsersIcon className="h-5 w-5 mr-2" />
            Nhân vật
        </button>
    </div>
);


export const GlobalSearch: React.FC<GlobalSearchProps> = ({ allSites, allPersons, viewMode, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const searchResults = useMemo(() => {
    if (!searchTerm) return [];

    const lowercasedTerm = searchTerm.toLowerCase();
    
    const sites = allSites
      .filter(site => site.site_name.toLowerCase().includes(lowercasedTerm))
      .slice(0, 5);
      
    const persons = allPersons
      .filter(person => person.full_name.toLowerCase().includes(lowercasedTerm))
      .slice(0, 3);
      
    // Prioritize results based on current view mode
    return viewMode === 'sites' ? [...sites, ...persons] : [...persons, ...sites];

  }, [searchTerm, allSites, allPersons, viewMode]);
  
  const handleSelect = (item: Site | Person) => {
    onSelect(item);
    setSearchTerm('');
    setIsFocused(false);
  };

  // Handle clicks outside the search component to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex-grow" ref={searchContainerRef}>
      <div className="relative">
        <input
          type="text"
          placeholder="Tìm kiếm nhanh..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className="w-full bg-slate-700/50 border border-slate-600 rounded-lg py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition placeholder-slate-400"
        />
        <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-slate-400" />
        </div>
      </div>

      {isFocused && searchResults.length > 0 && (
        <div className="absolute top-full mt-1.5 w-full bg-slate-800 border border-slate-700 rounded-lg shadow-xl max-h-80 overflow-y-auto z-50">
          <ul className="p-1">
            {searchResults.map(item => {
              const isSite = 'site_id' in item;
              return (
                <li
                  key={isSite ? `s-${item.site_id}` : `p-${item.person_id}`}
                  onClick={() => handleSelect(item)}
                  className="flex items-center p-2 rounded-md hover:bg-slate-700/70 cursor-pointer"
                >
                  {isSite ? (
                    <LocationMarkerIcon className="h-5 w-5 mr-3 text-sky-400 flex-shrink-0" />
                  ) : (
                    <UsersIcon className="h-5 w-5 mr-3 text-sky-400 flex-shrink-0" />
                  )}
                  <div className="overflow-hidden">
                    <p className="text-sm font-semibold text-slate-100 truncate">
                      {isSite ? (item as Site).site_name : (item as Person).full_name}
                    </p>
                    <p className="text-xs text-slate-400 capitalize truncate">
                      {isSite ? (item as Site).site_type : 'Nhân vật'}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
