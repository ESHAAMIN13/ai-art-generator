import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // <-- Auth import karein
import PromptForm from '../components/PromptForm';
import Loader from '../components/Loader';
import ImageCard from '../components/ImageCard';

export default function Dashboard() {
    const [loading, setLoading] = useState(false);
    const [generatedImage, setGeneratedImage] = useState(null);
    const { user } = useAuth(); // <-- User object hasil karein

    const handleGenerate = async (formData) => {
        setLoading(true);
        setGeneratedImage(null);

        try {
            // Real Backend API Call with negativePrompt
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

            const response = await axios.post(`${API_URL}/api/generate`, {
                prompt: formData.prompt,
                style: formData.style,
                size: formData.size,
                negativePrompt: formData.negativePrompt,
                userId: user?.id
            });

            if (response.data.success) {
                setGeneratedImage({
                    url: response.data.imageUrl,
                    prompt: response.data.prompt,
                    style: response.data.style,
                    size: response.data.size
                });
                toast.success('Art generated and saved to gallery!');
            }
        } catch (error) {
            console.error(error);
            const errorMsg = error.response?.data?.error || 'Something went wrong. Please try again.';
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    // ... baqi ka return code same rahega
    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white">Create Art</h1>
                <p className="text-zinc-400 text-sm mt-1">Turn your text prompts into stunning visual masterpieces.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Side: Form */}
                <div className="lg:col-span-7">
                    <PromptForm onGenerate={handleGenerate} loading={loading} />
                </div>

                {/* Right Side: Output Display */}
                <div className="lg:col-span-5">
                    <div className="sticky top-24">
                        <h2 className="text-sm font-medium text-zinc-400 mb-3">Output Preview</h2>

                        <AnimatePresence mode="wait">
                            {loading && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Loader />
                                </motion.div>
                            )}

                            {!loading && generatedImage && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ImageCard image={generatedImage} />
                                </motion.div>
                            )}

                            {!loading && !generatedImage && (
                                <div className="w-full aspect-square border-2 border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center p-6 text-center bg-zinc-900/10">
                                    <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center mb-3 border border-zinc-800">
                                        🎨
                                    </div>
                                    <p className="text-sm font-medium text-zinc-400">Your artwork will appear here</p>
                                    <p className="text-xs text-zinc-600 mt-1">Fill the form and hit generate!</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}