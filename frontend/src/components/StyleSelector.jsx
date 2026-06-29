import React from 'react';

const STYLES = [
    { id: 'anime', name: 'Anime', img: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=150&auto=format&fit=crop&q=60' },
    { id: 'cyberpunk', name: 'Cyberpunk', img: 'https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?w=150&auto=format&fit=crop&q=60' },
    { id: 'realistic', name: 'Realistic 3D', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=60' },
    { id: 'fantasy', name: 'Fantasy', img: 'https://images.unsplash.com/photo-1519074002996-a69e7ac46a42?w=150&auto=format&fit=crop&q=60' },
    { id: 'oil-painting', name: 'Oil Painting', img: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=150&auto=format&fit=crop&q=60' },
];

export default function StyleSelector({ selectedStyle, setSelectedStyle }) {
    return (
        <div className="space-y-3">
            <label className="text-sm font-medium text-zinc-300">Choose Art Style</label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {STYLES.map((style) => (
                    <button
                        key={style.id}
                        type="button"
                        onClick={() => setSelectedStyle(style.id)}
                        className={`relative group overflow-hidden rounded-xl aspect-square border-2 transition-all duration-200 ${selectedStyle === style.id
                                ? 'border-purple-500 scale-[0.98] ring-2 ring-purple-500/20'
                                : 'border-zinc-800 hover:border-zinc-700'
                            }`}
                    >
                        <img
                            src={style.img}
                            alt={style.name}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 brightness-75"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-2.5">
                            <span className="text-xs font-semibold text-white">{style.name}</span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}