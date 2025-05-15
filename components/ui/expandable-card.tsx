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
    case "Admissions":
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
          <div className="fixed inset-0 flex items-center justify-center z-[100] bg-black/20 overflow-y-auto">
            <div
              ref={ref}
              className="flex items-center justify-center px-2 py-6 md:py-12 w-full h-full fixed inset-0"
            >
              <motion.div
                layoutId={`card-${active.title}-${id}`}
                className="bg-gray-50 rounded-xl shadow-lg w-full max-w-lg md:max-w-2xl flex flex-col overflow-hidden relative"
              >
                {/* Close button inside the card */}
                <motion.button
                  key={`button-${active.title}-${id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.05 } }}
                  className="flex z-50 absolute top-3 right-3 shadow-md shadow-slate-300 items-center justify-center bg-white rounded-full h-8 w-8"
                  onClick={() => setActive(null)}
                  aria-label="Close"
                >
                  <CloseIcon />
                </motion.button>
                <div className="w-full flex justify-center items-center border-b pb-4 pt-4">
                  {getAnnouncementIcon(active.icon, active.image ? 40 : 64)} <span className="text-lg md:text-xl font-bold ml-3 text-gray-700"> {active.icon}</span>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2 p-4 md:p-8 overflow-y-auto max-h-[70vh]">
                  <h3 className="font-bold text-neutral-700 text-lg md:text-2xl">
                    {active.title}
                  </h3>
                  <p className="text-neutral-600 text-xs md:text-sm">
                    Posted on {getDateTime(active.date).toLocaleDateString()}
                  </p>
                  <div className="text-neutral-700 text-sm md:text-base prose max-w-none pt-2">
                    <Markdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                      className={"prose"}
                    >
                      {active.content}
                    </Markdown>
                  </div>
                  {/* Image below content if exists */}
                  {active.image && (
                    <div className="w-full flex justify-center items-center mt-6">
                      <Image
                        src={active.image}
                        alt={active.title}
                        className="object-contain rounded"
                        priority
                        width={600}
                        height={600}
                        sizes="(max-width: 768px) 100vw, 600px"
                        style={{ maxHeight: "50vh", width: "auto", height: "auto" }}
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-2xl mx-auto w-full gap-4">
        {cards.map((card: any) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col md:flex-row justify-between items-center border hover:bg-neutral-50 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-row items-center">
                <motion.div layoutId={`image-${card.title}-${id}`} className={`text-2xl md:h-14 md:w-14 flex justify-center items-center ${card.important ? '' : ''}`}>
                  {/* Shows new badge if published within 1 month */}
                  {(() => {
                  const publishedDate = getDateTime(card.date);
                  const now = new Date();
                  const oneMonthAgo = new Date();
                  oneMonthAgo.setMonth(now.getMonth() - 1);
                  return publishedDate > oneMonthAgo ? (
                    <span className="ml-2 px-2 py-0.5 rounded-full bg-green-500 text-white text-xs font-semibold animate-bounce">
                    New
                    </span>
                  ) : getAnnouncementIcon(card.icon);
                  })()}
                </motion.div>
              <div className="">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className={`font-medium text-neutral-800  text-center md:text-left ${card.important ? 'text-red-500 animate-' : ''}`} 
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`date-${card.title}-${id}`}
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
