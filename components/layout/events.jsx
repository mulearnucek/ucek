"use client";
import { getImgLink, getUpcomingEvents, getRecentEvents } from "@/lib/data";
import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import moment from "moment";
import { CalendarDays, Clock, SquareArrowOutUpRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { resolveClubIcon } from "@/lib/utils";

const NewsEvents = () => {
  const [upcomingData, setUpcomingData] = useState([]);
  const [recentData, setRecentData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const upcoming = await getUpcomingEvents();
        setUpcomingData(Array.isArray(upcoming) ? upcoming : []);

        // Only fetch recent events if there are no upcoming events
        if (upcoming.length === 0) {
          const recent = await getRecentEvents();
          setRecentData(Array.isArray(recent) ? recent : []);
        }

        setLoading(false);
      } catch (error) {
        console.error("An error occurred:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Determine which data to display
  const displayData = upcomingData.length > 0 ? upcomingData : recentData;
  const isRecentEvents = upcomingData.length === 0 && recentData.length > 0;

  const marqParams = {
    autoFill: displayData.length >= 3,
    pauseOnHover: true,
    speed: 80,
    play: displayData.length >= 3,
  };

  if (!loading && displayData.length === 0) {
    return null;
  }

  return (
    <div className="py-8 bg-white">
      {/* Show heading only when not loading and there's data */}
      {!loading && displayData.length > 0 && (
        <h2 className="text-xl md:text-2xl ml-4 md:ml-16 font-bold mb-4 flex items-center">
          <span className="w-2 h-5 bg-blue-500 mr-2"></span>
          {isRecentEvents ? "Past Events" : "Upcoming Events"}
        </h2>
      )}

      {loading ? (
        <div className={`overflow-hidden py-8 gap-4 ${displayData.length < 3 ? "hidden" : "md:flex"}`}>
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="w-[300px] h-[14rem] rounded-lg bg-[#e7e7e7dc]" />
          ))}
        </div>
      ) : (
        <>
          {/* Mobile View - Compact */}
          <div className={`p-2 flex justify-center items-center flex-col gap-4 ${displayData.length < 3 ? "flex md:hidden" : "hidden"}`}>
            {displayData.map((item, index) => (
              <div
                key={index}
                className="w-[280px] bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
              >
                {/* Header */}
                <div className="flex justify-between items-center p-3 border-b border-gray-100">
                  <div className="flex items-center gap-1">
                    <Image
                      src={resolveClubIcon(item[6])}
                      width={28}
                      height={28}
                      alt="Club Icon"
                      className="rounded-full"
                    />
                    <span className="text-xs font-medium text-gray-600">{item[6]}</span>
                  </div>
                  <a
                    href={`https://eventsatucek.vercel.app/e/${item[1]}`}
                    className="text-blue-500 hover:text-blue-700 transition-colors"
                    aria-label="Event details"
                  >
                    <SquareArrowOutUpRight size={16} />
                  </a>
                </div>

                {/* Image */}
                <div className="relative h-36 w-full">
                  <Image
                    src={getImgLink(item[5])}
                    alt="Event Poster"
                    fill
                    className="object-cover"
                    priority={index < 3} // Only prioritize first few images
                    loading={index > 2 ? "lazy" : "eager"}
                    quality={75} // Reduce image quality slightly
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,..." // Add a small base64 placeholder
                  />
                </div>

                {/* Content */}
                <div className="p-3">
                  <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-2">
                    {item[3]}
                  </h3>
                  {item[4] && (
                    <p className="text-gray-600 text-xs mb-2 line-clamp-3">
                      {item[4]}
                    </p>
                  )}
                  <div className="flex flex-col gap-1 mt-2">
                    <div className="flex items-center text-gray-700 text-xs">
                      <CalendarDays size={14} className="mr-1.5 text-gray-500" />
                      <span>{moment(item[7], "DD/MM/YYYY HH:mm:ss")?.format("MMM Do YYYY")}</span>
                    </div>
                    <div className="flex items-center text-gray-700 text-xs">
                      <Clock size={14} className="mr-1.5 text-gray-500" />
                      <span>{moment(item[7], "DD/MM/YYYY HH:mm:ss")?.format("h:mm A")}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View - Compact */}
          <div className={`relative overflow-hidden py-1 ${displayData.length < 3 ? "md:flex hidden" : "md:flex"}`}>
            <Marquee {...marqParams} className="w-full">
              {displayData.map((item, index) => (
                <div
                  key={index}
                  className="w-[300px] min-w-[300px] h-[330px] mb-2 mx-4 bg-white rounded-lg shadow-xl overflow-hidden border border-gray-250 hover:shadow-2xl transition-all duration-300"
                >
                  {/* Image Header */}
                  <div className="relative h-40 w-full">
                    <Image
                      src={getImgLink(item[5])}
                      alt="Event Poster"
                      fill
                      className="object-cover"
                      priority={index < 3} // Only prioritize first few images
                      loading={index > 2 ? "lazy" : "eager"}
                      quality={75} // Reduce image quality slightly
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,..." // Add a small base64 placeholder
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                      <div className="flex justify-between items-center">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${item[8]?.toLowerCase() === 'online'
                          ? 'bg-blue-500 text-white'
                          : 'bg-green-500 text-white'
                          }`}>
                          {item[8] || 'Event'}
                        </span>
                        <Image
                          src={resolveClubIcon(item[6])}
                          width={28}
                          height={28}
                          alt="Club Icon"
                          className={`rounded-full border-2 border-white ${item[6] === 'IEEE - UCEK' || item[6] === 'Legacy IEDC - UCEK' ? 'bg-white border-gray': 'bg-none'}`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-3">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-md font-bold text-gray-800 line-clamp-2 pr-2">
                        {item[3]}
                      </h3>
                      <a
                        href={`https://eventsatucek.vercel.app/e/${item[1]}`}
                        className="text-blue-500 hover:text-blue-700 transition-colors flex-shrink-0"
                        aria-label="Event details"
                      >
                        <SquareArrowOutUpRight size={16} />
                      </a>
                    </div>
                    {item[4] && (
                      <p className="text-gray-600 text-xs mb-2 line-clamp-2">
                        {item[4]}
                      </p>
                    )}
                    <div className="flex flex-col gap-1 pt-2 border-t border-gray-100">
                      <div className="flex items-center text-gray-700 text-xs">
                        <CalendarDays size={14} className="mr-1.5 text-gray-500" />
                        <span>{moment(item[7], "DD/MM/YYYY HH:mm:ss")?.format("MMM Do")}</span>
                      </div>
                      <div className="flex items-center text-gray-700 text-xs">
                        <Clock size={14} className="mr-1.5 text-gray-500" />
                        <span>{moment(item[7], "DD/MM/YYYY HH:mm:ss")?.format("h:mm A")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Marquee>
          </div>
        </>
      )}
    </div>
  );
};

export default NewsEvents;