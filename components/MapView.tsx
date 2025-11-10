
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Site } from '../types';
import { SiteDetailContent } from './SiteDetailContent';

// --- Icon Creation & Fixes ---

// Fix for default marker icon issue when using bundlers like Vite/Webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const createMarkerIcon = (isSelected: boolean): L.DivIcon => {
  const markerHtml = `
    <div style="position: relative; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;">
      ${isSelected ? '<div class="marker-pulsate" style="position: absolute; width: 32px; height: 32px; background-color: #38bdf8; border-radius: 50%;"></div>' : ''}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0ea5e9" style="position: relative; z-index: 1; width: 32px; height: 32px; filter: drop-shadow(0 2px 3px rgba(0,0,0,0.5));">
        <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
      </svg>
    </div>
  `;
  return L.divIcon({
    html: markerHtml,
    className: '', // Important to have an empty class name
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};


// --- Child Components for Map Logic ---

/**
 * A component to control map's view (pan, zoom) based on application state.
 */
const MapController: React.FC<{ selectedSite: Site | null; isModalOpen: boolean; }> = ({ selectedSite, isModalOpen }) => {
  const map = useMap();

  // Effect to invalidate map size when the modal's visibility changes
  useEffect(() => {
    // A small delay allows the UI to transition before resizing the map
    const timer = setTimeout(() => map.invalidateSize(), 350);
    return () => clearTimeout(timer);
  }, [isModalOpen, map]);

  // Effect to fly to a selected site. The panning is now handled by the Popup's autoPan.
  useEffect(() => {
    if (selectedSite) {
        const targetLatLng: L.LatLngTuple = [selectedSite.latitude, selectedSite.longitude];
        map.flyTo(targetLatLng, 15, { animate: true, duration: 1.0 });
    }
  }, [selectedSite, map]);

  return null;
};

interface SiteMarkerProps {
    site: Site;
    isSelected: boolean;
    onSiteSelect: (site: Site | null) => void;
    onShowDetailModal: () => void;
    defaultIcon: L.DivIcon;
    selectedIcon: L.DivIcon;
    autoPanPadding: L.Point;
}

/**
 * A component for rendering a single site marker.
 */
const SiteMarker: React.FC<SiteMarkerProps> = ({ site, isSelected, onSiteSelect, onShowDetailModal, defaultIcon, selectedIcon, autoPanPadding }) => {
    const markerRef = useRef<L.Marker>(null);

    // Effect to programmatically open the popup when a site is selected
    useEffect(() => {
        if (isSelected && markerRef.current) {
            markerRef.current.openPopup();
        }
    }, [isSelected]);

    const eventHandlers = useMemo(() => ({
        click: () => {
            onSiteSelect(site);
        },
    }), [onSiteSelect, site]);
    
    const popupEventHandlers = useMemo(() => ({
        remove: () => {
            onSiteSelect(null);
        }
    }), [onSiteSelect]);

    return (
        <Marker
            ref={markerRef}
            position={[site.latitude, site.longitude]}
            icon={isSelected ? selectedIcon : defaultIcon}
            eventHandlers={eventHandlers}
        >
            <Popup
                className="custom-popup"
                minWidth={256}
                eventHandlers={popupEventHandlers}
                autoPanPadding={autoPanPadding}
            >
                <div className="w-64">
                  <SiteDetailContent 
                    siteId={site.site_id} 
                    isModal={false} 
                    onShowDetailModal={onShowDetailModal} 
                  />
                </div>
            </Popup>
        </Marker>
    );
};


// --- Main MapView Component ---

interface MapViewProps {
  sites: Site[];
  selectedSite: Site | null;
  onSiteSelect: (site: Site | null) => void;
  onShowDetailModal: () => void;
  isModalOpen: boolean;
}

export const MapView: React.FC<MapViewProps> = ({ sites, selectedSite, onSiteSelect, onShowDetailModal, isModalOpen }) => {
  const daNangCenter: [number, number] = [16.0544, 108.2022];
  const [autoPanPadding, setAutoPanPadding] = useState<L.Point>(L.point(0, 0));

  // Effect to calculate padding for autoPan, making it aware of the UI chrome (sidebar/header)
  useEffect(() => {
    const calculatePadding = () => {
        const isMobile = window.innerWidth < 768; // Tailwind 'md' breakpoint
        let top = 20; // Default vertical padding
        let left = 20; // Default horizontal padding

        if (isMobile) {
            const mobileHeader = document.querySelector<HTMLElement>('header.md\\:hidden');
            top = (mobileHeader?.offsetHeight || 0) + 20; // Add padding below header
        } else {
            const sidebar = document.querySelector<HTMLElement>('aside.md\\:relative');
            left = (sidebar?.offsetWidth || 0) + 20; // Add padding right of sidebar
        }
        
        setAutoPanPadding(L.point(left, top));
    };
    
    // A small delay to ensure UI elements are rendered
    const timer = setTimeout(calculatePadding, 100);
    window.addEventListener('resize', calculatePadding);
    
    return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', calculatePadding);
    };
  }, []);
  
  // Memoize icons so they are not recreated on every render
  const defaultIcon = useMemo(() => createMarkerIcon(false), []);
  const selectedIcon = useMemo(() => createMarkerIcon(true), []);

  return (
    <MapContainer center={daNangCenter} zoom={12} scrollWheelZoom={true} className="h-full w-full z-10">
      <MapController selectedSite={selectedSite} isModalOpen={isModalOpen} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      {sites.map(site => (
          <SiteMarker 
            key={site.site_id}
            site={site}
            isSelected={selectedSite?.site_id === site.site_id}
            onSiteSelect={onSiteSelect}
            onShowDetailModal={onShowDetailModal}
            defaultIcon={defaultIcon}
            selectedIcon={selectedIcon}
            autoPanPadding={autoPanPadding}
          />
      ))}
    </MapContainer>
  );
};
