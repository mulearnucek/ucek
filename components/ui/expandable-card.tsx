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
      return <CalendarDays size={size} />;
    case "Results":
      return <ScrollText size={size} />;
    case "News":
      return <BellPlus size={size} />;
    case "Admission":
      return <BellPlus size={size} />;
    default:
      return <BellPlus size={size} />;
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
        {active && typeof active === "object" && (
          <div className="fixed inset-0 grid place-items-center z-[100] bg-black/20">
            <motion.div
              layoutId={`card-${active.title}`}
              ref={ref}
              className="relative max-w-2xl w-[90vw] bg-white rounded-3xl shadow-lg overflow-hidden ring-1 ring-gray-200"
            >
              {/* 1️⃣ Move the close button inside this div */}
              <motion.button
                onClick={() => setActive(null)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 bg-white rounded-full shadow hover:bg-gray-50 transition"
                aria-label="Close"
              >
                <CloseIcon />
              </motion.button>

              {/* Icon Header */}
              <div className="bg-blue-50 p-6 flex justify-center">
                <div className="bg-white rounded-full p-4 shadow">
                  {getAnnouncementIcon(active.icon, 48)}
                </div>
              </div>

              {/* Title & Date */}
              <div className="px-8 pt-6 pb-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  {active.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Posted on {getDateTime(active.date).toLocaleDateString()}
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200" />

              {/* Content */}
              <div className="prose prose-sm px-8 py-6 max-h-[60vh] overflow-auto text-gray-700">
                <Markdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={{ img: () => null }}
                >
                  {active.content}
                </Markdown>
              </div>
            </motion.div>
          </div>
        )}
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
