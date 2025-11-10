
import React from 'react';
import { Site, Person, ViewMode } from '../types';
import { SearchIcon, FilterIcon, LocationMarkerIcon, UsersIcon, XIcon } from './Icons';
import { ViewModeToggle } from './GlobalSearch';

interface SidebarProps {
  items: (Site | Person)[];
  viewMode: ViewMode;
  onSetViewMode: (mode: ViewMode) => void;
  listTitle: string;
  onSearch: (term: string) => void;
  onFilter: (type: string) => void;
  siteTypes: string[];
  selectedType: string;
  isLoading: boolean;
  onSiteSelect: (site: Site) => void;
  onPersonSelect: (person: Person) => void;
  selectedItem: Site | Person | null;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ items, viewMode, onSetViewMode, listTitle, onSearch, onFilter, siteTypes, selectedType, isLoading, onSiteSelect, onPersonSelect, selectedItem, isOpen, onClose }) => {

  const isItemSelected = (item: Site | Person) => {
      if (!selectedItem) return false;
      if ('site_id' in item && 'site_id' in selectedItem) {
          return item.site_id === selectedItem.site_id;
      }
      if ('person_id' in item && 'person_id' in selectedItem) {
          return item.person_id === selectedItem.person_id;
      }
      return false;
  }
  
  return (
    <aside className={`
        bg-slate-800/80 backdrop-blur-lg text-slate-200 p-4 flex flex-col border-r border-slate-700/80 
        transform transition-transform duration-300 ease-in-out 
        fixed inset-y-0 left-0 z-40 w-full max-w-xs h-screen overflow-y-auto
        md:relative md:w-1/3 lg:w-1/4 md:h-full md:translate-x-0 md:max-w-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      <header className="mb-6 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-sky-400">BẢN ĐỒ SỐ</h1>
          <h2 className="text-xl font-semibold text-slate-200">Đà Nẵng</h2>
        </div>
        <button 
          onClick={onClose} 
          className="p-1 -mr-2 text-slate-400 hover:text-white md:hidden"
          aria-label="Đóng menu"
        >
          <XIcon className="h-6 w-6" />
        </button>
      </header>
      
      {/* Search and ViewMode toggle are moved to global header on mobile */}
      <div className="hidden md:block mb-4">
        <div className="relative mb-4">
          <input
            type="text"
            placeholder={viewMode === 'sites' ? "Tìm kiếm địa điểm..." : "Tìm kiếm nhân vật..."}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition placeholder-slate-400"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-slate-400" />
          </div>
        </div>
        <ViewModeToggle viewMode={viewMode} onSetViewMode={onSetViewMode} />
      </div>


      {viewMode === 'sites' && (
        <div className="mb-6">
            <label htmlFor="site-type-filter" className="flex items-center text-sm font-medium text-slate-300 mb-2">
                <FilterIcon className="h-5 w-5 mr-2" />
                Loại địa điểm
            </label>
            <select
            id="site-type-filter"
            value={selectedType}
            onChange={(e) => onFilter(e.target.value)}
            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
            >
            {siteTypes.map(type => (
                <option key={type} value={type} className="capitalize">{type === 'all' ? 'Tất cả' : type}</option>
            ))}
            </select>
        </div>
      )}

      <div className="flex-grow overflow-y-auto -mr-4 pr-4">
        <h3 className="text-lg font-semibold mb-3 text-sky-400">{listTitle}</h3>
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-slate-700 h-10 w-10"></div>
                    <div className="flex-1 space-y-3 py-1">
                        <div className="h-2 bg-slate-700 rounded"></div>
                        <div className="h-2 bg-slate-700 rounded w-5/6"></div>
                    </div>
                </div>
            ))}
          </div>
        ) : (
          items.length > 0 ? (
            <ul className="space-y-1">
              {items.map(item => {
                const isSelected = isItemSelected(item);
                const isSite = 'site_id' in item;
                const key = isSite ? `site-${item.site_id}` : `person-${item.person_id}`;
                const name = isSite ? (item as Site).site_name : (item as Person).full_name;
                const description = isSite 
                    ? (item as Site).site_type 
                    : `${(item as Person).birth_year || '?'} - ${(item as Person).death_year || '?'}`;
                
                return (
                  <li key={key} 
                      onClick={() => {
                          if (isSite) {
                              onSiteSelect(item as Site)
                          } else {
                              onPersonSelect(item as Person)
                          }
                          onClose(); // Close sidebar on selection
                      }}
                      className={`relative flex items-center p-2 rounded-lg hover:bg-slate-700/50 transition-colors duration-200 cursor-pointer group ${isSelected ? 'bg-sky-500/20' : ''}`}>
                    {isSelected && <div className="absolute left-0 top-0 h-full w-1 bg-sky-400 rounded-r-full"></div>}
                    
                    {isSite ? <LocationMarkerIcon className="h-6 w-6 text-sky-500 group-hover:text-sky-400 mr-3 flex-shrink-0" /> : <UsersIcon className="h-6 w-6 text-sky-500 group-hover:text-sky-400 mr-3 flex-shrink-0" />}

                    <div>
                      <p className={`font-semibold ${isSelected ? 'text-sky-300' : 'text-slate-100'} group-hover:text-sky-400`}>{name}</p>
                      <p className="text-sm text-slate-400 capitalize">{description}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-slate-400 italic">Không tìm thấy kết quả nào.</p>
          )
        )}
      </div>
      <footer className="text-center text-xs text-slate-500 mt-4 pt-4 border-t border-slate-700 flex-shrink-0">
        <p>&copy; {new Date().getFullYear()} Da Nang Map</p>
      </footer>
    </aside>
  );
};
