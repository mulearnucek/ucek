"use client";

import { useEffect, useState, useMemo } from "react";
import { Folder, FolderOpen, FileText, Plus, Trash2, Save, Loader2, RefreshCw, Eye, Code, FolderPlus, FilePlus } from "lucide-react";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("./editor"), { ssr: false });

const parseFrontmatter = (content: string) => {
  const match = content.match(/^---\n([\s\S]*?)\n---(?:\n|$)([\s\S]*)$/);
  if (match) {
    const yaml = match[1];
    const body = match[2];
    const titleMatch = yaml.match(/title:\s*"?([^"\n]*)"?/);
    const descMatch = yaml.match(/description:\s*"?([^"\n]*)"?/);
    return {
      title: titleMatch ? titleMatch[1].trim() : "",
      description: descMatch ? descMatch[1].trim() : "",
      yaml: yaml,
      body: body
    };
  }
  return { title: "", description: "", yaml: "", body: content };
};

const stringifyFrontmatter = (title: string, description: string, body: string, existingYaml: string) => {
  let yaml = existingYaml;
  if (!yaml) {
    yaml = `title: ${title}\ndescription: ${description}`;
  } else {
    if (yaml.match(/title:\s*.*/)) yaml = yaml.replace(/title:\s*.*/, `title: ${title}`);
    else yaml += `\ntitle: ${title}`;
    
    if (yaml.match(/description:\s*.*/)) yaml = yaml.replace(/description:\s*.*/, `description: ${description}`);
    else yaml += `\ndescription: ${description}`;
  }
  return `---\n${yaml.trim()}\n---\n${body}`;
};

type GitFile = {
  path: string;
  sha: string | null;
  size: number;
};

type TreeNode = {
  name: string;
  path: string;
  type: "file" | "dir";
  children?: Record<string, TreeNode>;
  file?: GitFile;
  isDeleted?: boolean;
  isNew?: boolean;
};

type FileState = {
  original: string;
  current: string;
  isNew?: boolean;
  isDeleted?: boolean;
  sha: string | null;
};

export default function PagesManager() {
  const [files, setFiles] = useState<GitFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [fileStates, setFileStates] = useState<Record<string, FileState>>({});
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  
  const [contentLoading, setContentLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [expandedDirs, setExpandedDirs] = useState<Set<string>>(new Set(["contents"]));
  const [isRawMode, setIsRawMode] = useState(false);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/cms/pages");
      if (!res.ok) throw new Error("Failed to fetch pages");
      const data = await res.json();
      setFiles(data.files || []);
      setFileStates({});
      setSelectedPath(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  // Prevent back navigation if there are unsaved changes
  const hasUnsavedChanges = useMemo(() => {
    return Object.values(fileStates).some(state => 
      state.isDeleted || state.isNew || state.current !== state.original
    );
  }, [fileStates]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const tree = useMemo(() => {
    const root: TreeNode = { name: "root", path: "", type: "dir", children: {} };
    
    // Process remote files
    files.forEach(file => {
      // Ignore metadata.json
      if (file.path === "contents/metadata.json") return;

      const state = fileStates[file.path];
      if (state?.isDeleted) return; // Hide deleted files
      
      const parts = file.path.split("/");
      let current = root;
      
      parts.forEach((part, index) => {
        if (!current.children) current.children = {};
        
        const isFile = index === parts.length - 1;
        const currentPath = parts.slice(0, index + 1).join("/");
        
        if (!current.children[part]) {
          current.children[part] = {
            name: isFile ? part.replace(/\.md$/, "") : part,
            path: currentPath,
            type: isFile ? "file" : "dir",
            ...(isFile ? { file } : { children: {} })
          };
        }
        current = current.children[part];
      });
    });

    // Process local new files
    Object.entries(fileStates).forEach(([path, state]) => {
      if (!state.isNew || state.isDeleted) return;
      if (path === "contents/metadata.json") return;

      const parts = path.split("/");
      let current = root;
      
      parts.forEach((part, index) => {
        if (!current.children) current.children = {};
        
        const isFile = index === parts.length - 1;
        const currentPath = parts.slice(0, index + 1).join("/");
        
        if (!current.children[part]) {
          current.children[part] = {
            name: isFile ? part.replace(/\.md$/, "") : part,
            path: currentPath,
            type: isFile ? "file" : "dir",
            ...(isFile ? { file: { path, sha: null, size: 0 }, isNew: true } : { children: {} })
          };
        }
        current = current.children[part];
      });
    });
    
    return root.children?.["contents"]?.children || {};
  }, [files, fileStates]);

  const toggleDir = (path: string) => {
    const newExpanded = new Set(expandedDirs);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedDirs(newExpanded);
  };

  const selectFile = async (path: string, sha: string | null) => {
    if (selectedPath === path) return;
    setSelectedPath(path);
    
    if (!fileStates[path] && sha) {
      setContentLoading(true);
      try {
        const res = await fetch(`/api/cms/pages?path=${encodeURIComponent(path)}`);
        if (!res.ok) throw new Error("Failed to load content");
        const data = await res.json();
        
        setFileStates(prev => ({
          ...prev,
          [path]: {
            original: data.content,
            current: data.content,
            sha: data.sha
          }
        }));
      } catch (err: any) {
        alert("Error loading file: " + err.message);
        setSelectedPath(null);
      } finally {
        setContentLoading(false);
      }
    }
  };

  const updateFileContent = (path: string, newContent: string) => {
    setFileStates(prev => ({
      ...prev,
      [path]: {
        ...prev[path],
        current: newContent
      }
    }));
  };

  const handleDelete = (path: string) => {
    if (!confirm(`Are you sure you want to delete ${path}? This will be permanently removed upon saving.`)) return;
    
    setFileStates(prev => ({
      ...prev,
      [path]: {
        ...prev[path],
        isDeleted: true
      }
    }));
    
    if (selectedPath === path) {
      setSelectedPath(null);
    }
  };

  const handleCreateFile = (dirPath: string) => {
    const name = prompt("Enter new file name (e.g. 'new-page'):");
    if (!name) return;
    
    let sanitizedName = name.trim().replace(/\.md$/, "");
    const newPath = `${dirPath}/${sanitizedName}.md`;

    if (files.some(f => f.path === newPath) || fileStates[newPath]) {
      alert("A file with this name already exists.");
      return;
    }

    setFileStates(prev => ({
      ...prev,
      [newPath]: {
        original: "",
        current: "---\ntitle: " + sanitizedName + "\n---\n\n# " + sanitizedName,
        isNew: true,
        sha: null
      }
    }));

    if (!expandedDirs.has(dirPath)) {
      toggleDir(dirPath);
    }
    
    setSelectedPath(newPath);
  };

  const handleCreateDir = (dirPath: string) => {
    const name = prompt("Enter new folder name:");
    if (!name) return;
    
    const sanitizedName = name.trim();
    // In Git/GitHub, empty directories can't be created unless they have a file.
    // We'll create a placeholder .gitkeep or index.md so the folder appears.
    const newPath = `${dirPath}/${sanitizedName}/index.md`;

    setFileStates(prev => ({
      ...prev,
      [newPath]: {
        original: "",
        current: "---\ntitle: " + sanitizedName + "\n---\n\n# " + sanitizedName,
        isNew: true,
        sha: null
      }
    }));

    if (!expandedDirs.has(dirPath)) toggleDir(dirPath);
    if (!expandedDirs.has(`${dirPath}/${sanitizedName}`)) toggleDir(`${dirPath}/${sanitizedName}`);
    
    setSelectedPath(newPath);
  };

  const handleBatchSave = async () => {
    if (!hasUnsavedChanges) return;
    setSaving(true);
    
    const updates: Record<string, string> = {};
    const deletes: string[] = [];

    Object.entries(fileStates).forEach(([path, state]) => {
      if (state.isDeleted) {
        if (!state.isNew) deletes.push(path); // Only tell remote to delete if it wasn't just created locally
      } else if (state.isNew || state.current !== state.original) {
        updates[path] = state.current;
      }
    });

    try {
      const res = await fetch("/api/cms/pages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          updates,
          deletes,
          message: "Batch update via CMS Dashboard"
        })
      });
      
      if (!res.ok) {
         const data = await res.json();
         throw new Error(data.error || "Save failed");
      }
      
      alert("Successfully saved all changes to GitHub!");
      await fetchFiles();
    } catch (err: any) {
      alert("Error saving: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const renderTree = (nodes: Record<string, TreeNode>, level = 0) => {
    return Object.values(nodes).sort((a, b) => {
      if (a.type !== b.type) return a.type === "dir" ? -1 : 1;
      return a.name.localeCompare(b.name);
    }).map(node => {
      if (node.type === "dir") {
        const isExpanded = expandedDirs.has(node.path);
        return (
          <div key={node.path} className="select-none">
            <div 
              className="group flex items-center justify-between py-1.5 pr-2 hover:bg-gray-100 rounded cursor-pointer text-gray-700"
              style={{ paddingLeft: `${level * 16 + 8}px` }}
              onClick={() => toggleDir(node.path)}
            >
              <div className="flex items-center">
                {isExpanded ? <FolderOpen className="w-4 h-4 mr-2" /> : <Folder className="w-4 h-4 mr-2" />}
                <span className="font-medium text-sm truncate">{node.name}</span>
              </div>
              <div className="opacity-0 group-hover:opacity-100 flex items-center space-x-1">
                <button 
                  onClick={(e) => { e.stopPropagation(); handleCreateFile(node.path); }}
                  className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded"
                  title="New File"
                >
                  <FilePlus className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); handleCreateDir(node.path); }}
                  className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded"
                  title="New Folder"
                >
                  <FolderPlus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            {isExpanded && node.children && (
              <div>{renderTree(node.children, level + 1)}</div>
            )}
          </div>
        );
      } else {
        const isSelected = selectedPath === node.path;
        const state = fileStates[node.path];
        const isModified = state && (state.isNew || state.current !== state.original);

        return (
          <div 
            key={node.path} 
            className={`group flex items-center justify-between py-1.5 pr-2 rounded cursor-pointer ${isSelected ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100 text-gray-600'}`}
            style={{ paddingLeft: `${level * 16 + 8}px` }}
            onClick={() => selectFile(node.path, node.file?.sha || null)}
          >
            <div className="flex items-center overflow-hidden">
              <FileText className={`w-4 h-4 mr-2 flex-shrink-0 ${isSelected ? 'text-blue-600' : 'text-gray-400'}`} />
              <span className={`text-sm truncate ${isModified ? 'font-semibold text-amber-600' : ''}`}>{node.name}</span>
              {isModified && <span className="ml-1 text-amber-500 text-xs text-opacity-70">*</span>}
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); handleDelete(node.path); }}
              className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-all"
              title="Delete File"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      }
    });
  };

  const selectedState = selectedPath ? fileStates[selectedPath] : null;

  return (
    <div className="absolute inset-0 flex flex-col bg-gray-50 z-10">
      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-gray-800">Content Pages</h2>
          <button onClick={fetchFiles} className="text-gray-500 hover:text-blue-600" disabled={loading || saving} title="Refresh (discards unsaved changes)">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
        <button 
          onClick={handleBatchSave}
          disabled={!hasUnsavedChanges || saving}
          className={`px-4 py-1.5 rounded-md text-sm font-medium flex items-center transition-colors shadow-sm ${
            hasUnsavedChanges && !saving
              ? "bg-[#2D3E50] hover:bg-[#1a252f] text-white"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          {hasUnsavedChanges ? "Save Changes" : "No Changes"}
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - File Tree */}
        <div className="w-64 md:w-80 border-r border-gray-200 bg-white overflow-y-auto flex-shrink-0">
          <div className="p-2 border-b border-gray-100 flex items-center justify-between text-xs text-gray-500 bg-gray-50 uppercase font-semibold tracking-wider">
            <span>Root</span>
            <div className="flex space-x-1">
              <button onClick={() => handleCreateFile('contents')} className="p-1 hover:bg-gray-200 rounded text-gray-600" title="New File in Root"><FilePlus className="w-3.5 h-3.5" /></button>
              <button onClick={() => handleCreateDir('contents')} className="p-1 hover:bg-gray-200 rounded text-gray-600" title="New Folder in Root"><FolderPlus className="w-3.5 h-3.5" /></button>
            </div>
          </div>

          {loading ? (
             <div className="flex justify-center p-8"><Loader2 className="w-6 h-6 animate-spin text-gray-400" /></div>
          ) : error ? (
             <div className="p-4 text-sm text-red-600">{error}</div>
          ) : (
             <div className="p-2">
               {renderTree(tree)}
             </div>
          )}
        </div>

        {/* Right Content - Editor */}
        <div className="flex-1 bg-gray-50 flex flex-col relative overflow-hidden">
          {selectedPath && selectedState ? (
            <>
              {contentLoading && (
                <div className="absolute inset-0 z-10 bg-white/50 backdrop-blur-sm flex items-center justify-center">
                  <Loader2 className="w-8 h-8 animate-spin text-[#2D3E50]" />
                </div>
              )}
              <div className="bg-white border-b border-gray-200 px-6 py-2 flex items-center justify-between">
                <div className="flex items-center text-sm font-medium text-gray-600">
                  <span className="bg-gray-100 px-2 py-1 rounded text-gray-800 font-mono text-xs border border-gray-200">{selectedPath}</span>
                </div>
                <div className="flex bg-gray-100 p-0.5 rounded-lg border border-gray-200">
                  <button
                    onClick={() => setIsRawMode(false)}
                    className={`flex items-center px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${!isRawMode ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    <Eye className="w-3.5 h-3.5 mr-1.5" /> Visual
                  </button>
                  <button
                    onClick={() => setIsRawMode(true)}
                    className={`flex items-center px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${isRawMode ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    <Code className="w-3.5 h-3.5 mr-1.5" /> Raw
                  </button>
                </div>
              </div>
              <div className="flex-1 relative bg-white overflow-hidden flex flex-col">
                {isRawMode ? (
                  <Editor 
                    key={selectedPath + "-raw"}
                    markdown={selectedState.current} 
                    onChange={(md) => updateFileContent(selectedPath, md)}
                    isRaw={true}
                  />
                ) : (() => {
                   const { title, description, yaml, body } = parseFrontmatter(selectedState.current);
                   return (
                     <>
                       <div className="p-6 border-b border-gray-100 bg-gray-50/50 space-y-4 shrink-0 overflow-y-auto max-h-64">
                         <div>
                           <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Page Title</label>
                           <input 
                             type="text" 
                             value={title}
                             onChange={(e) => updateFileContent(selectedPath, stringifyFrontmatter(e.target.value, description, body, yaml))}
                             className="w-full text-lg font-bold bg-white border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:font-normal"
                             placeholder="Enter page title..."
                           />
                         </div>
                         <div>
                           <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Description <span className="text-gray-400 normal-case font-normal">(Optional metadata)</span></label>
                           <textarea 
                             value={description}
                             onChange={(e) => updateFileContent(selectedPath, stringifyFrontmatter(title, e.target.value, body, yaml))}
                             className="w-full text-sm bg-white border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none min-h-[60px]"
                             placeholder="Brief description for SEO and previews..."
                           />
                         </div>
                       </div>
                       <div className="flex-1 relative overflow-hidden">
                         <Editor 
                           key={selectedPath + "-visual"}
                           markdown={body} 
                           onChange={(md) => updateFileContent(selectedPath, stringifyFrontmatter(title, description, md, yaml))}
                           isRaw={false}
                         />
                       </div>
                     </>
                   );
                })()}
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 bg-white">
              <FileText className="w-16 h-16 mb-4 text-gray-200" />
              <p className="text-lg font-medium text-gray-500">Select a file to edit</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
