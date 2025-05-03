import { get } from "http";
import Papa from "papaparse";
import moment from "moment";

export const CONTENT_SHEET_ID = "1oTIT-gv8BENbkwrlaYaXg6dEjSndyT2vDWKZnAJO39g"
/*export const EVENT_SHEET_ID = "1JF8JCd01dGp1s3iFiriOUHZxlMro63vCAf5Qsm7RNEE"*/
export const EVENT_SHEET_ID = "1E5o-2t50wDfNNN-qwy6Pk2ZLcFzlF8fbQbVMFBkzAbw"
export const FACULTY_SHEET_ID = "1xz8r0PBP5Z3mdH2VC7oSuumJ5inh0ZIvGANrcPn5Z_E"


export function getData(url:string): Promise<string[][]> {
  return new Promise((resolve, reject) => {
  Papa.parse<string[]>(url, {
    download: true,
    skipEmptyLines: true,
    complete(results) {
      let d  = results.data;
      d.shift()
      resolve(d);
    },
    error(error) {
      reject(error);
    }
  });
});
}

export async function getUpcomingEvents(limit = 20): Promise<string[][]> {
  const url = `https://docs.google.com/spreadsheets/d/${EVENT_SHEET_ID}/export?format=csv`;
  
  try {
    const rawData = await getData(url);
    console.log("Raw sheet data:", rawData);

    return rawData.filter(row => {
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
    }).slice(0, limit);
  } catch (error) {
    console.error("Fetch failed:", error);
    return [];
  }
}

export async function getRecentEvents(limit = 20): Promise<string[][]> {
  const url = `https://docs.google.com/spreadsheets/d/${EVENT_SHEET_ID}/export?format=csv`;
  
  try {
    const rawData = await getData(url);
    console.log("Raw sheet data:", rawData);

    return rawData.filter(row => {
      try {
        const dateStr = row[7];
        const isPublished = row[11] === "No";
        
        if (!dateStr || !isPublished) return false;
        
        const date = moment(dateStr, [
          "DD/MM/YYYY HH:mm:ss",
          "MM/DD/YYYY HH:mm:ss"
        ]);
        
        // For recent events, we want events that have already happened
        const isValid = date.isValid() && date.isBefore(moment());
        if (!isValid) console.warn("Invalid date:", dateStr);
        
        return isValid;
      } catch (e) {
        console.warn("Error parsing row:", row, e);
        return false;
      }
    })
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

export function getCarouselImages(n="10"): Promise<string[][]> {
  const url = "https://docs.google.com/spreadsheets/d/"
              + CONTENT_SHEET_ID
              + "/gviz/tq?tqx=out:csv&sheet=carousel&tq=" 
              + encodeURIComponent("select B, C, D limit "+n);
  return getData(url)
}

export function getAnnouncements(): Promise<string[][]> {
  const url = "https://docs.google.com/spreadsheets/d/"
              + CONTENT_SHEET_ID
              + "/gviz/tq?tqx=out:csv&sheet=announcements&tq=" 
              + encodeURIComponent("select *");
  return getData(url)
}
