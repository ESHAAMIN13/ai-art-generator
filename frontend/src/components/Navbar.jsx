import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Navbar() {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut();
            toast.success('Logged out successfully');
            navigate('/');
        } catch (error) {
            toast.error('Failed to log out');
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 h-16 bg-[#09090b]/80 backdrop-blur-md border-b border-zinc-800 z-50 flex items-center justify-between px-6">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-wider text-white">
                <Sparkles className="w-6 h-6 text-purple-500 animate-pulse" />
                <span>IMAGI<span className="text-purple-500">NATE</span></span>
            </Link>

            <div className="flex items-center gap-4">
                {user ? (
                    <>
                        <Link to="/dashboard" className="text-sm text-zinc-400 hover:text-white transition">
                            Dashboard
                        </Link>
                        <Link to="/gallery" className="text-sm text-zinc-400 hover:text-white transition">
                            Gallery
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition border border-zinc-700"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="text-sm text-zinc-400 hover:text-white transition">
                            Sign In
                        </Link>
                        <Link
                            to="/register"
                            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-lg shadow-purple-500/20"
                        >
                            Get Started
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}