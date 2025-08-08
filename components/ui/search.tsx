"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Search, X, ExternalLink } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { searchSiteContent, type SiteContent } from '@/lib/search-index';

interface SearchResult {
    title: string;
    url: string;
    snippet: string;
    category: string;
}

const SearchComponent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    // Search function using comprehensive site index
    const performSearch = async (searchQuery: string) => {
        if (!searchQuery.trim()) {
            setResults([]);
            return;
        }

        setIsLoading(true);
        
        // Use the comprehensive site search
        const siteResults = searchSiteContent(searchQuery);
        
        // Convert to SearchResult format
        const searchResults: SearchResult[] = siteResults.map(result => ({
            title: result.title,
            url: result.url,
            category: result.category,
            snippet: result.content.slice(0, 2).join('. ') + '.' // First 2 content items as snippet
        }));

        setResults(searchResults);
        setIsLoading(false);
    };

    // Handle search input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        performSearch(value);
    };

    // Handle result click
    const handleResultClick = (url: string) => {
        setIsOpen(false);
        setQuery('');
        setResults([]);
        router.push(url);
    };

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            setIsOpen(false);
            setQuery('');
            setResults([]);
        } else if (e.key === 'Enter' && results.length > 0) {
            handleResultClick(results[0].url);
        }
    };

    // Close search when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Focus input when opened
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    return (
        <div className="relative" ref={searchRef}>
            {/* Search Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Search"
            >
                <Search size={18} />
                <span className="hidden md:inline">Search</span>
            </button>

            {/* Search Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-start justify-center pt-20">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-96 overflow-hidden">
                        {/* Search Input */}
                        <div className="flex items-center border-b border-gray-200 px-4 py-3">
                            <Search size={20} className="text-gray-400 mr-3" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                placeholder="Search entire website - try 'cse', 'placement', 'library'..."
                                className="flex-1 outline-none text-lg"
                            />
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    setQuery('');
                                    setResults([]);
                                }}
                                className="ml-3 text-gray-400 hover:text-gray-600"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Search Results */}
                        <div className="max-h-80 overflow-y-auto">
                            {isLoading ? (
                                <div className="px-4 py-8 text-center text-gray-500">
                                    Searching...
                                </div>
                            ) : results.length > 0 ? (
                                <div className="py-2">
                                    {results.map((result, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleResultClick(result.url)}
                                            className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 group"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h3 className="font-medium text-gray-900 group-hover:text-blue-600">
                                                            {result.title}
                                                        </h3>
                                                        <ExternalLink className="h-3 w-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </div>
                                                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                                        {result.snippet}
                                                    </p>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                                            {result.category}
                                                        </span>
                                                        <span className="text-xs text-gray-400">
                                                            {result.url}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            ) : query.trim() ? (
                                <div className="px-4 py-8 text-center text-gray-500">
                                    <p>No results found for &quot;{query}&quot;</p>
                                    <p className="text-sm mt-2">Try searching for specific topics like:</p>
                                    <div className="flex flex-wrap justify-center gap-2 mt-3">
                                        {['admissions', 'departments', 'facilities', 'clubs', 'faculty'].map(suggestion => (
                                            <button
                                                key={suggestion}
                                                onClick={() => {
                                                    setQuery(suggestion);
                                                    performSearch(suggestion);
                                                }}
                                                className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded transition-colors"
                                            >
                                                {suggestion}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="px-4 py-8 text-center text-gray-500">
                                    <p>Start typing to search the entire website...</p>
                                    <p className="text-sm mt-2">Search for admissions, departments, facilities, clubs, faculty, and more</p>
                                    <div className="flex flex-wrap justify-center gap-2 mt-3">
                                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">Try: &quot;cse&quot;</span>
                                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">Try: &quot;placement&quot;</span>
                                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">Try: &quot;library&quot;</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchComponent;
