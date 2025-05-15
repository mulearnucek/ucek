import { get } from "http";
import Papa from "papaparse";
import moment from "moment";
import { Rye } from "next/font/google";

export const CONTENT_SHEET_ID = "1oTIT-gv8BENbkwrlaYaXg6dEjSndyT2vDWKZnAJO39g"
export const EVENT_SHEET_ID = "1JF8JCd01dGp1s3iFiriOUHZxlMro63vCAf5Qsm7RNEE"
// export const EVENT_SHEET_ID = "1E5o-2t50wDfNNN-qwy6Pk2ZLcFzlF8fbQbVMFBkzAbw"
export const FACULTY_SHEET_ID = "1xz8r0PBP5Z3mdH2VC7oSuumJ5inh0ZIvGANrcPn5Z_E"


export function getData(url: string, excludeArc: boolean = true): Promise<string[][]> {
  return new Promise((resolve, reject) => {
    Papa.parse<string[]>(url, {
      download: true,
      skipEmptyLines: true,
      complete(results) {
        let d = results.data;
        d.shift(); // Remove header row

        if (excludeArc) {
          d = d.filter(row => row[6]?.trim() !== "Arc"); // Column G = index 6
        }

        resolve(d);
      },
      error(error) {
        reject(error);
      }
    });
  });
}



// Get Upcoming Events
export function getUpcomingEvents(n = "20"): Promise<string[][]> {
  const url = "https://docs.google.com/spreadsheets/d/" +
    EVENT_SHEET_ID +
    "/gviz/tq?tqx=out:csv&sheet=s1&tq=" +
    encodeURIComponent("select * where H > now() and L = 'Yes' order by(H) limit " + n);
  
  return getData(url);
}

// Get Past Events
export function getRecentEvents(limit = 10): Promise<string[][]> {
  const url = `https://docs.google.com/spreadsheets/d/${EVENT_SHEET_ID}/gviz/tq?tqx=out:csv&sheet=s1&tq=` +
    encodeURIComponent(
      `SELECT * WHERE H < now() AND L = 'Yes' ORDER BY H DESC LIMIT ${limit}`
    );

  return getData(url).catch(error => {
    console.error("Fetch failed:", error);
    return [];
  });
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
    + encodeURIComponent("select * ORDER BY A DESC limit 6");
  return getData(url)
}
