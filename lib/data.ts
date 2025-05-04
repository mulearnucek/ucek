import { get } from "http";
import Papa from "papaparse";
import moment from "moment";
import { Rye } from "next/font/google";

export const CONTENT_SHEET_ID = "1oTIT-gv8BENbkwrlaYaXg6dEjSndyT2vDWKZnAJO39g"
export const EVENT_SHEET_ID = "1JF8JCd01dGp1s3iFiriOUHZxlMro63vCAf5Qsm7RNEE"
// export const EVENT_SHEET_ID = "1E5o-2t50wDfNNN-qwy6Pk2ZLcFzlF8fbQbVMFBkzAbw"
export const FACULTY_SHEET_ID = "1xz8r0PBP5Z3mdH2VC7oSuumJ5inh0ZIvGANrcPn5Z_E"


export function getData(url: string): Promise<string[][]> {
  return new Promise((resolve, reject) => {
    Papa.parse<string[]>(url, {
      download: true,
      skipEmptyLines: true,
      complete(results) {
        let d = results.data;
        d.shift()
        resolve(d);
      },
      error(error) {
        reject(error);
      }
    });
  });
}

// Add caching
const eventCache = {
  data: null as string[][] | null,
  lastFetch: 0,
  cacheDuration: 15 * 60 * 1000 // 15 minutes
};

export async function getUpcomingEvents(limit = 20): Promise<string[][]> {
  // Return cached data if available
  if (eventCache.data && Date.now() - eventCache.lastFetch < eventCache.cacheDuration) {
    return eventCache.data;
  }

  const url = `https://docs.google.com/spreadsheets/d/${EVENT_SHEET_ID}/export?format=csv&cache=${Date.now()}`;

  try {
    const rawData = await getData(url);
    const filteredData = rawData.filter(row => {
      try {
        const dateStr = row[7];
        const isPublished = row[11] === "Yes";

        if (!dateStr || !isPublished) return false;

        const date = moment(dateStr, [
          "DD/MM/YYYY HH:mm:ss",
          "MM/DD/YYYY HH:mm:ss"
        ]);

        const isValid = date.isValid() && date.isAfter(moment());
        if (!isValid) console.warn("Invalid date:", dateStr);

        return isValid;
      } catch (e) {
        console.warn("Error parsing row:", row, e);
        return false;
      }
    });

    // Update cache
    eventCache.data = filteredData;
    eventCache.lastFetch = Date.now();

    return filteredData;
  } catch (error) {
    return [];
  }
}

const recentEventCache = {
  data: null as string[][] | null,
  lastFetch: 0,
  cacheDuration: 15 * 60 * 1000 // 15 minutes cache
};

export async function getRecentEvents(limit = 11): Promise<string[][]> {
  // Return cached data if available and fresh
  if (recentEventCache.data && Date.now() - recentEventCache.lastFetch < recentEventCache.cacheDuration) {
    return recentEventCache.data.slice(0, limit);
  }

  const url = `https://docs.google.com/spreadsheets/d/${EVENT_SHEET_ID}/export?format=csv&cache=${Date.now()}`;
  
  try {
    const rawData = await getData(url);
    
    // Process in chunks to prevent UI blocking
    const filteredData = await new Promise<string[][]>((resolve) => {
      setTimeout(() => {
        const lastRows = rawData.slice(-limit); // Get extra rows to account for filtered ones
        
        const result = lastRows.filter(row => {
          try {
            const dateStr = row[7];
            const isPublished = row[11] === "Yes";
            
            if (!dateStr || !isPublished) return false;
            
            const date = moment(dateStr, [
              "DD/MM/YYYY HH:mm:ss",
              "MM/DD/YYYY HH:mm:ss"
            ]);
            
            return date.isValid() && date.isBefore(moment());
          } catch (e) {
            console.warn("Error parsing row:", row, e);
            return false;
          }
        });
        
        resolve(result);
      }, 0);
    });

    // Update cache
    recentEventCache.data = filteredData;
    recentEventCache.lastFetch = Date.now();
    
    return filteredData;
  } catch (error) {
    console.error("Fetch failed:", error);
    return [];
  }
}

export function getImgLink(link: string) {
  return (
    "https://drive.google.com/uc?export=download&id=" +
    link.replace("https://drive.google.com/open?id=", "")
  );
}

export function getCarouselImages(n = "10"): Promise<string[][]> {
  const url = "https://docs.google.com/spreadsheets/d/"
    + CONTENT_SHEET_ID
    + "/gviz/tq?tqx=out:csv&sheet=carousel&tq="
    + encodeURIComponent("select B, C, D limit " + n);
  return getData(url)
}

export function getAnnouncements(): Promise<string[][]> {
  const url = "https://docs.google.com/spreadsheets/d/"
    + CONTENT_SHEET_ID
    + "/gviz/tq?tqx=out:csv&sheet=announcements&tq="
    + encodeURIComponent("select *");
  return getData(url)
}
