"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { BellPlus, BookUser, CalendarDays, Pointer, ScrollText } from "lucide-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

function getAnnouncementIcon(announcementType: string, size: number = 32) {
  switch (announcementType) {
    case "Events":
      return <CalendarDays size={size}/>;
    case "Results":
      return <ScrollText size={size} />;
    case "News":
      return <BellPlus size={size}/>;
    case "Admission":
      return <BellPlus  size={size}/>;
    default:
      return <BellPlus size={size}/>;
  }
}

function getDateTime(timestamp: string) {
  const [datePart, timePart] = timestamp.split(' ');
    const [month, day, year] = datePart.split('/').map(Number);
    const [hours, minutes, seconds] = timePart.split(':').map(Number);
    
    return new Date(year, month - 1, day, hours, minutes, seconds);
}

export function ExpandableCard({ cards }: any) {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 flex items-start justify-center z-[100] bg-black/20 overflow-y-auto">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex z-50 absolute top-2 right-4 shadow-md shadow-slate-300 items-center justify-center bg-white rounded-full h-8 w-8"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${id}`}
              ref={ref}
              className="fixed inset-0
              flex flex-col
              bg-gray-50
              overflow-auto"
            >
               <motion.div layoutId={`image-${id}`} className="w-full border rounded-lg md:m-4 p-20 flex justify-center items-center">
                  {getAnnouncementIcon(active.icon, 64)}
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${id}`}
                      className="font-bold text-neutral-700 "
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`date-${id}`}
                      className="text-neutral-600 text-sm"
                    >
                     Posted on {getDateTime(active.date).toLocaleDateString()}
                    </motion.p>
                  </div>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base  md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto   [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                   <Markdown  remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}  className={"prose"}>{active.content}</Markdown>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-2xl mx-auto w-full gap-4">
        {cards.map((card: any) => (
          <motion.div
            layoutId={`card-${id}`}
            key={`card-${id}`}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col md:flex-row justify-between items-center border hover:bg-neutral-50 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-row items-center">
              <motion.div layoutId={`image-${id}`} className={`text-2xl md:h-14 md:w-14 flex justify-center items-center ${card.important ? 'animate-pulse' : ''}`}>
                  {getAnnouncementIcon(card.icon)}
              </motion.div>
              <div className="">
                <motion.h3
                  layoutId={`title-${id}`}
                  className={`font-medium text-neutral-800  text-center md:text-left ${card.important ? 'text-red-500 animate-' : ''}`} 
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`date-${id}`}
                  className="text-neutral-600  text-sm text-center md:text-left"
                >
                  Posted on {getDateTime(card.date).toLocaleDateString()}
                </motion.p>
              </div>
            </div>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
