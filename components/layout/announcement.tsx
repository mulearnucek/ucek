"use client";
import React, { use, useEffect, useState } from "react";
import { ExpandableCard } from "../ui/expandable-card";
import { getAnnouncements, getImgLink } from "@/lib/data";
import { BellOff, BellPlus, BookUser, CalendarDays, ScrollText, TreePalm, TriangleAlert } from "lucide-react";
import Loading from "@/app/loading";
import { Skeleton } from "../ui/skeleton";
import Popup from "./popup";


type Card = {
  date: string;
  title: string;
  icon: string;
  content: string;
  important: boolean;
  image: string | null;
};


const Announcement = () => {

  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState<string | null>(null);

  useEffect(() => {
    getAnnouncements().then((data) => {
      const temp: Card[] = []
      data.map((item) => {
        temp.push({
          date: item[0],
          title: item[3],
          icon: item[2],
          content: item[4],
          important: item[5]=="Yes" ? true : false,
          image: item[6]!= "" ? getImgLink(item[6]) : null,
        })

      if (item[7] == "Yes" && item[6] != "") {
        setPopup(getImgLink(item[6]));
      }


      });
      setLoading(false);
      setCards(temp);
    });
  },[])


  return (<>
    {popup && <Popup image={popup}/>}
    <div className="flex flex-col md:flex-row bg-white w-full h-auto md:h-[65vh] justify-center items-center gap-8 md:gap-40 p-8 md:p-20 space-y-8 md:space-y-0">
      <div className=" flex-col items-center justify-center">
        <h2 className="text-[2rem] font-bold flex items-center mb-6">
          <span className="w-2 h-6 bg-blue-500 mr-2"></span> Announcements
        </h2>
        {loading ? <Skeleton className="w-full h-24 rounded-lg bg-[#e7e7e7dc]" /> :
        cards.length == 0? <div className="flex justify-center items-center flex-col gap-2"> <BellOff size={44}/> No Announcements so far.</div> : <ExpandableCard cards={cards} />}
      </div>

      <div className="w-full md:w-2/3 mt-4 md:mt-10 rounded  md:p-24">
        <p className="text-justify text-sm md:text-base lg:text-lg">
          The college was established in the year 2000 and is functioning in the
          Golden Jubilee Complex of the Kerala University in the Kariavattom
          campus. The institution is fast acquiring a reputation for high
          quality education and fabulous faculty - student rapport. The college
          has already benefited greatly from its location, being adjacent to the
          Technopark, the IT hub of the state. Facilities in the Technopark are
          open to students for learning and University-Industry interaction
          takes place regularly.
        </p>
        <p className="mt-2 text-justify text-sm md:text-base lg:text-lg">
          With the students displaying great aptitude for academic, technical,
          sporting and cultural endeavors along with the active support of the
          University, the College is on the right track to soon becoming one of
          the finest technical institutions in the country.
        </p>
      </div>
    </div>
    </>
  );
};

export default Announcement;
