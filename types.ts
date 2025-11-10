
export type ViewMode = 'sites' | 'persons';

export interface Site {
  site_id: number;
  site_name: string;
  site_type: string;
  latitude: number;
  longitude: number;
  address?: string;
  established_year?: number;
  status?: string;
  description?: string;
  additional_info?: { [key: string]: string };
}

export interface Person {
  person_id: number;
  full_name: string;
  birth_year?: number;
  death_year?: number;
}

export interface Media {
  media_id: number;
  media_url: string;
  media_type: 'image' | 'video';
  caption: string;
  thumbnail_url?: string;
}

export interface Event {
  event_id: number;
  event_name: string;
  start_date?: string;
  end_date?: string;
  description: string;
  persons?: Person[];
  media?: Media[];
  related_site_id?: number;
  related_site_name?: string;
}

export interface SiteDetail extends Site {
  events: Event[];
}

export interface PersonDetail extends Person {
    biography: string;
    media: Media[];
    events: Event[];
    additional_info?: { [key: string]: string };
}