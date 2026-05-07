"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";

const TiptapEditor = dynamic(() => import('./tiptap-editor'), { ssr: false });

export default function Editor({ markdown, onChange, isRaw }: { markdown: string, onChange: (md: string) => void, isRaw: boolean }) {
  if (isRaw) {
    return (
      <textarea
        value={markdown}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-full p-6 bg-white resize-none focus:outline-none font-mono text-sm leading-relaxed text-gray-800"
        spellCheck="false"
      />
    );
  }

  return (
    <div className="h-full w-full bg-white relative flex flex-col">
      <TiptapEditor markdown={markdown} onChange={onChange} />
    </div>
  );
}
