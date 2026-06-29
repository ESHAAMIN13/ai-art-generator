import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { signUp } = useAuth();
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await signUp(email, password);
            toast.success('Registration successful! Please check your email for verification.');
            navigate('/login');
        } catch (error) {
            toast.error(error.message || 'Failed to register');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-16 bg-zinc-900/30 border border-zinc-800 p-8 rounded-2xl backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Create Account</h2>
            <form onSubmit={handleRegister} className="space-y-4">
                <div>
                    <label className="text-xs text-zinc-400 block mb-1.5">Email Address</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                    />
                </div>
                <div>
                    <label className="text-xs text-zinc-400 block mb-1.5">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 text-white font-semibold py-2.5 rounded-lg transition mt-2"
                >
                    {loading ? 'Creating Account...' : 'Sign Up'}
                </button>
            </form>
            <p className="text-xs text-zinc-500 text-center mt-4">
                Already have an account? <Link to="/login" className="text-purple-400 hover:underline">Sign In</Link>
            </p>
        </div>
    );
}