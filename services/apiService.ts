
import { MOCK_SITES, MOCK_SITE_DETAILS, MOCK_PERSONS, MOCK_PERSON_DETAILS } from '../data/mockData';
import { Site, SiteDetail, Person, PersonDetail } from '../types';

// Simulate network delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const fetchSites = async (): Promise<Site[]> => {
  console.log("Fetching all sites...");
  await delay(500); // Simulate API call latency
  return MOCK_SITES;
};

export const fetchSiteDetail = async (siteId: number): Promise<SiteDetail | null> => {
  console.log(`Fetching details for site ID: ${siteId}`);
  await delay(300); // Simulate API call latency
  const detail = MOCK_SITE_DETAILS.find(d => d.site_id === siteId);
  return detail || null;
};

export const fetchPersons = async (): Promise<Person[]> => {
  console.log("Fetching all persons...");
  await delay(500);
  return MOCK_PERSONS;
}

export const fetchPersonDetail = async (personId: number): Promise<PersonDetail | null> => {
  console.log(`Fetching details for person ID: ${personId}`);
  await delay(300);
  const detail = MOCK_PERSON_DETAILS.find(p => p.person_id === personId);
  return detail || null;
}
