import React from 'react';
import { Download, Share2, Heart } from 'lucide-react';

export default function ImageCard({ image }) {
    return (
        <div className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/20 aspect-square">
            <img
                src={image.url}
                alt={image.prompt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <p className="text-xs text-zinc-300 line-clamp-2 mb-3 italic">"{image.prompt}"</p>

                <div className="flex items-center justify-between border-t border-zinc-800/80 pt-3">
                    <span className="text-[10px] bg-purple-500/20 text-purple-400 px-2 py-1 rounded-md font-medium capitalize">
                        {image.style}
                    </span>

                    <div className="flex items-center gap-2">
                        <button className="p-1.5 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-lg transition">
                            <Download className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-lg transition">
                            <Heart className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}