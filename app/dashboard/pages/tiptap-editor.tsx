"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { TextAlign } from '@tiptap/extension-text-align';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { Link } from '@tiptap/extension-link';
import { Image as TiptapImage } from '@tiptap/extension-image';
import { TaskItem } from '@tiptap/extension-task-item';
import { TaskList } from '@tiptap/extension-task-list';
import { Markdown } from 'tiptap-markdown';
import { 
  Bold, Italic, Strikethrough, Code, List, ListOrdered, 
  Quote, Undo, Redo, AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Table as TableIcon, Link as LinkIcon, Heading1, Heading2, Heading3, ImageIcon,
  CheckSquare
} from 'lucide-react';
import { useRef } from 'react';

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-50 border-b border-gray-200 sticky top-0 z-10 shadow-sm">
      <button onClick={() => editor.chain().focus().toggleBold().run()} disabled={!editor.can().chain().focus().toggleBold().run()} className={`p-1.5 rounded ${editor.isActive('bold') ? 'bg-gray-200' : 'hover:bg-gray-200 text-gray-700'}`}><Bold size={16} /></button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()} disabled={!editor.can().chain().focus().toggleItalic().run()} className={`p-1.5 rounded ${editor.isActive('italic') ? 'bg-gray-200' : 'hover:bg-gray-200 text-gray-700'}`}><Italic size={16} /></button>
      <button onClick={() => editor.chain().focus().toggleStrike().run()} disabled={!editor.can().chain().focus().toggleStrike().run()} className={`p-1.5 rounded ${editor.isActive('strike') ? 'bg-gray-200' : 'hover:bg-gray-200 text-gray-700'}`}><Strikethrough size={16} /></button>
      <button onClick={() => editor.chain().focus().toggleCode().run()} disabled={!editor.can().chain().focus().toggleCode().run()} className={`p-1.5 rounded ${editor.isActive('code') ? 'bg-gray-200' : 'hover:bg-gray-200 text-gray-700'}`}><Code size={16} /></button>
      
      <div className="w-px h-6 bg-gray-300 mx-1"></div>
      
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`p-1.5 rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : 'hover:bg-gray-200 text-gray-700'}`}><Heading1 size={16} /></button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`p-1.5 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : 'hover:bg-gray-200 text-gray-700'}`}><Heading2 size={16} /></button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={`p-1.5 rounded ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-200' : 'hover:bg-gray-200 text-gray-700'}`}><Heading3 size={16} /></button>
      
      <div className="w-px h-6 bg-gray-300 mx-1"></div>

      <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={`p-1.5 rounded ${editor.isActive('bulletList') ? 'bg-gray-200' : 'hover:bg-gray-200 text-gray-700'}`}><List size={16} /></button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`p-1.5 rounded ${editor.isActive('orderedList') ? 'bg-gray-200' : 'hover:bg-gray-200 text-gray-700'}`}><ListOrdered size={16} /></button>
      <button onClick={() => editor.chain().focus().toggleTaskList().run()} className={`p-1.5 rounded ${editor.isActive('taskList') ? 'bg-gray-200' : 'hover:bg-gray-200 text-gray-700'}`}><CheckSquare size={16} /></button>
      <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`p-1.5 rounded ${editor.isActive('blockquote') ? 'bg-gray-200' : 'hover:bg-gray-200 text-gray-700'}`}><Quote size={16} /></button>
      
      <div className="w-px h-6 bg-gray-300 mx-1"></div>

      <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={`p-1.5 rounded ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : 'hover:bg-gray-200 text-gray-700'}`}><AlignLeft size={16} /></button>
      <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={`p-1.5 rounded ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : 'hover:bg-gray-200 text-gray-700'}`}><AlignCenter size={16} /></button>
      <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={`p-1.5 rounded ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : 'hover:bg-gray-200 text-gray-700'}`}><AlignRight size={16} /></button>
      <button onClick={() => editor.chain().focus().setTextAlign('justify').run()} className={`p-1.5 rounded ${editor.isActive({ textAlign: 'justify' }) ? 'bg-gray-200' : 'hover:bg-gray-200 text-gray-700'}`}><AlignJustify size={16} /></button>
      
      <div className="w-px h-6 bg-gray-300 mx-1"></div>

      <button onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} className="p-1.5 rounded hover:bg-gray-200 text-gray-700"><TableIcon size={16} /></button>
      <button onClick={() => {
        const url = window.prompt('URL');
        if (url) editor.chain().focus().setLink({ href: url }).run();
      }} className={`p-1.5 rounded ${editor.isActive('link') ? 'bg-gray-200' : 'hover:bg-gray-200 text-gray-700'}`}><LinkIcon size={16} /></button>
      <button onClick={() => {
        const url = window.prompt('Image URL');
        if (url) editor.chain().focus().setImage({ src: url }).run();
      }} className="p-1.5 rounded hover:bg-gray-200 text-gray-700"><ImageIcon size={16} /></button>

      <div className="w-px h-6 bg-gray-300 mx-1"></div>

      <button onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} className="p-1.5 rounded hover:bg-gray-200 text-gray-700 disabled:opacity-50"><Undo size={16} /></button>
      <button onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} className="p-1.5 rounded hover:bg-gray-200 text-gray-700 disabled:opacity-50"><Redo size={16} /></button>
    </div>
  );
};

export default function TiptapEditor({ markdown, onChange }: { markdown: string, onChange: (md: string) => void }) {
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Link.configure({
        openOnClick: false,
      }),
      TiptapImage,
      Markdown.configure({
        html: true,
        transformPastedText: true,
        transformCopiedText: true,
      }),
    ],
    content: markdown,
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none min-h-[500px] p-6 selection:bg-[#2D3E50] selection:text-white',
      },
    },
    onUpdate: ({ editor }) => {
      onChangeRef.current((editor.storage as any).markdown.getMarkdown());
    },
  });

  return (
    <div className="flex flex-col h-full w-full bg-white relative">
      <MenuBar editor={editor} />
      <style>{`
        /* TipTap Table Styles */
        .ProseMirror table {
          border-collapse: collapse;
          table-layout: fixed;
          width: 100%;
          margin: 0;
          overflow: hidden;
        }
        .ProseMirror table td, .ProseMirror table th {
          min-width: 1em;
          border: 2px solid #ced4da;
          padding: 3px 5px;
          vertical-align: top;
          box-sizing: border-box;
          position: relative;
        }
        .ProseMirror table th {
          font-weight: bold;
          text-align: left;
          background-color: #f1f3f5;
        }
      `}</style>
      <div className="flex-1 overflow-y-auto">
        <EditorContent editor={editor} className="h-full" />
      </div>
    </div>
  );
}
