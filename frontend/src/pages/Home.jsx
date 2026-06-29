import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center text-center py-20 px-4 max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 text-purple-400 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5" /> Next-Gen AI Art Generator
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
                Turn Words Into <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">Breathtaking Art</span>
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl max-w-2xl">
                Generate high-quality, unique images instantly using advanced AI models. Perfect for designers, creators, and dreamers.
            </p>
            <div className="flex gap-4">
                <Link to="/dashboard" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-4 rounded-xl transition shadow-lg shadow-purple-500/20">
                    Start Generating Free
                </Link>
            </div>
        </div>
    );
}