import React from 'react';

export default function Loader() {
    return (
        <div className="w-full aspect-square bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden relative flex flex-col items-center justify-center p-6">
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-800/20 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]"></div>

            <div className="space-y-4 text-center z-10">
                <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto"></div>
                <div>
                    <h3 className="text-sm font-semibold text-zinc-300">AI is painting your thoughts</h3>
                    <p className="text-xs text-zinc-500 mt-1">Usually takes 5-10 seconds...</p>
                </div>
            </div>
        </div>
    );
}