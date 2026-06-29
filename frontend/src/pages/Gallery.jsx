import React, { useEffect, useState } from 'react';
import { supabase } from '../config/supabase';
import { useAuth } from '../context/AuthContext';
import { Search, Trash2, Heart, Download, Filter } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Gallery() {
    const { user } = useAuth();
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStyle, setSelectedStyle] = useState('all');
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

    // 1. Fetch Images from Supabase
    const fetchImages = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('images')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setImages(data || []);
        } catch (error) {
            toast.error('Failed to load gallery');
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) fetchImages();
    }, [user]);

    // 2. Toggle Favorite Status
    const toggleFavorite = async (id, currentStatus) => {
        try {
            const { error } = await supabase
                .from('images')
                .update({ is_favorite: !currentStatus })
                .eq('id', id);

            if (error) throw error;

            setImages(images.map(img => img.id === id ? { ...img, is_favorite: !currentStatus } : img));
            toast.success(!currentStatus ? 'Added to favorites' : 'Removed from favorites');
        } catch (error) {
            toast.error('Failed to update favorite');
        }
    };

    // 3. Delete Image
    const deleteImage = async (id) => {
        if (!window.confirm('Are you sure you want to delete this masterpiece?')) return;

        try {
            const { error } = await supabase
                .from('images')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setImages(images.filter(img => img.id !== id));
            toast.success('Image deleted successfully');
        } catch (error) {
            toast.error('Failed to delete image');
        }
    };

    // 4. Download Image Helper
    const downloadImage = (url, filename) => {
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                const blobURL = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = blobURL;
                a.download = filename || 'ai-art.jpg';
                document.body.appendChild(a);
                a.click();
                a.remove();
            })
            .catch(() => toast.error('Failed to download image'));
    };

    // 5. Filter & Search Logic
    const filteredImages = images.filter((img) => {
        const matchesSearch = img.prompt.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStyle = selectedStyle === 'all' || img.style === selectedStyle;
        const matchesFavorite = !showFavoritesOnly || img.is_favorite;
        return matchesSearch && matchesStyle && matchesFavorite;
    });

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white">My Gallery</h1>
                <p className="text-zinc-400 text-sm mt-1">Manage, filter, and download your AI-generated creations.</p>
            </div>

            {/* Controls: Search, Filter, Favorites */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-zinc-900/30 border border-zinc-800/80 p-4 rounded-2xl backdrop-blur-sm">
                {/* Search Bar */}
                <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                        type="text"
                        placeholder="Search prompt..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                    />
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-3 w-full md:w-auto justify-end">
                    {/* Style Filter */}
                    <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2">
                        <Filter className="w-4 h-4 text-zinc-500" />
                        <select
                            value={selectedStyle}
                            onChange={(e) => setSelectedStyle(e.target.value)}
                            className="bg-transparent text-xs text-zinc-300 focus:outline-none cursor-pointer"
                        >
                            <option value="all">All Styles</option>
                            <option value="anime">Anime</option>
                            <option value="cyberpunk">Cyberpunk</option>
                            <option value="realistic">Realistic 3D</option>
                            <option value="fantasy">Fantasy</option>
                            <option value="oil-painting">Oil Painting</option>
                        </select>
                    </div>

                    {/* Favorites Toggle Button */}
                    <button
                        onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-medium transition ${showFavoritesOnly
                                ? 'bg-purple-600/10 border-purple-500/50 text-purple-400'
                                : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                            }`}
                    >
                        <Heart className={`w-4 h-4 ${showFavoritesOnly ? 'fill-purple-400' : ''}`} />
                        Favorites
                    </button>
                </div>
            </div>

            {/* Gallery Grid */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((n) => (
                        <div key={n} className="w-full aspect-square bg-zinc-900/50 border border-zinc-800 rounded-2xl animate-pulse" />
                    ))}
                </div>
            ) : filteredImages.length === 0 ? (
                <div className="text-center py-20 border-2 border-dashed border-zinc-800 rounded-2xl bg-zinc-900/10">
                    <p className="text-zinc-400 font-medium">No masterpieces found</p>
                    <p className="text-zinc-600 text-xs mt-1">Try changing your search or generate some new art!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredImages.map((img) => (
                        <div key={img.id} className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/20 aspect-square">
                            <img
                                src={img.image_url}
                                alt={img.prompt}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                loading="lazy"
                            />

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                <p className="text-xs text-zinc-300 line-clamp-2 mb-3 italic">"{img.prompt}"</p>

                                <div className="flex items-center justify-between border-t border-zinc-800/80 pt-3">
                                    <span className="text-[10px] bg-purple-500/20 text-purple-400 px-2 py-1 rounded-md font-medium capitalize">
                                        {img.style}
                                    </span>

                                    <div className="flex items-center gap-2">
                                        {/* Download */}
                                        <button
                                            onClick={() => downloadImage(img.image_url, `${img.style}-${img.id}.jpg`)}
                                            className="p-1.5 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-lg transition"
                                            title="Download"
                                        >
                                            <Download className="w-4 h-4" />
                                        </button>
                                        {/* Favorite */}
                                        <button
                                            onClick={() => toggleFavorite(img.id, img.is_favorite)}
                                            className={`p-1.5 bg-zinc-800/80 hover:bg-zinc-700 rounded-lg transition ${img.is_favorite ? 'text-red-500 hover:text-red-400' : 'text-zinc-300 hover:text-white'
                                                }`}
                                            title="Favorite"
                                        >
                                            <Heart className={`w-4 h-4 ${img.is_favorite ? 'fill-current' : ''}`} />
                                        </button>
                                        {/* Delete */}
                                        <button
                                            onClick={() => deleteImage(img.id)}
                                            className="p-1.5 bg-red-950/40 hover:bg-red-900/60 text-red-400 hover:text-red-300 rounded-lg transition border border-red-900/50"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}