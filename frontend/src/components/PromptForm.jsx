import React, { useState } from 'react';
import { Wand2, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import StyleSelector from './StyleSelector';
import SizeSelector from './SizeSelector';
import { getRandomPrompt } from '../utils/randomPrompts';

export default function PromptForm({ onGenerate, loading }) {
    const [prompt, setPrompt] = useState('');
    const [style, setSelectedStyle] = useState('anime');
    const [size, setSelectedSize] = useState('1:1');
    const [negativePrompt, setNegativePrompt] = useState('');
    const [showAdvanced, setShowAdvanced] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!prompt.trim()) return;
        onGenerate({ prompt, style, size, negativePrompt });
    };

    const handleSurpriseMe = () => {
        const random = getRandomPrompt(prompt);
        setPrompt(random);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-zinc-900/30 border border-zinc-800/80 p-6 rounded-2xl backdrop-blur-sm">
            {/* Prompt Input Header with Surprise Me */}
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-zinc-300">Describe your imagination</label>
                    <button
                        type="button"
                        onClick={handleSurpriseMe}
                        className="flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 transition bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 rounded-lg"
                    >
                        <Sparkles className="w-3 h-3" />
                        Surprise Me
                    </button>
                </div>
                <div className="relative">
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="A futuristic city with neon lights, flying cars, cyberpunk style, highly detailed..."
                        rows={3}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition resize-none"
                        required
                    />
                </div>
            </div>

            {/* Style Selector */}
            <StyleSelector selectedStyle={style} setSelectedStyle={setSelectedStyle} />

            {/* Size Selector */}
            <SizeSelector selectedSize={size} setSelectedSize={setSelectedSize} />

            {/* Collapsible Advanced Settings (Negative Prompt) */}
            <div className="border-t border-zinc-800/80 pt-4">
                <button
                    type="button"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white transition"
                >
                    {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    Advanced Settings (Negative Prompt)
                </button>

                {showAdvanced && (
                    <div className="mt-3 space-y-2 animate-fadeIn">
                        <label className="text-xs text-zinc-400">What to exclude from image (Negative Prompt)</label>
                        <input
                            type="text"
                            value={negativePrompt}
                            onChange={(e) => setNegativePrompt(e.target.value)}
                            placeholder="e.g. text, watermark, low quality, blurry, extra fingers"
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition"
                        />
                    </div>
                )}
            </div>

            {/* Generate Button */}
            <button
                type="submit"
                disabled={loading || !prompt.trim()}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:from-zinc-800 disabled:to-zinc-800 disabled:text-zinc-500 text-white font-semibold py-3.5 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 disabled:shadow-none"
            >
                <Wand2 className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'Generating Art...' : 'Generate Masterpiece'}
            </button>
        </form>
    );
}