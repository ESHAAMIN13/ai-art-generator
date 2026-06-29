import React from 'react';
import { Square, RectangleHorizontal, RectangleVertical } from 'lucide-react';

const SIZES = [
    { id: '1:1', name: 'Square (1:1)', icon: Square, desc: 'Best for Instagram' },
    { id: '16:9', name: 'Landscape (16:9)', icon: RectangleHorizontal, desc: 'Best for Wallpapers' },
    { id: '9:16', name: 'Portrait (9:16)', icon: RectangleVertical, desc: 'Best for Stories/TikTok' },
];

export default function SizeSelector({ selectedSize, setSelectedSize }) {
    return (
        <div className="space-y-3">
            <label className="text-sm font-medium text-zinc-300">Aspect Ratio</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SIZES.map((size) => {
                    const Icon = size.icon;
                    return (
                        <button
                            key={size.id}
                            type="button"
                            onClick={() => setSelectedSize(size.id)}
                            className={`flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all duration-200 ${selectedSize === size.id
                                    ? 'border-purple-500 bg-purple-500/5 text-purple-400'
                                    : 'border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200'
                                }`}
                        >
                            <Icon className="w-5 h-5 shrink-0" />
                            <div>
                                <p className="text-xs font-semibold text-white">{size.name}</p>
                                <p className="text-[10px] text-zinc-500">{size.desc}</p>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}