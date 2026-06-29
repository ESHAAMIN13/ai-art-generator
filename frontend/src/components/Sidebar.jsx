import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Image as ImageIcon, History, Settings, CreditCard } from 'lucide-react';

export default function Sidebar() {
    const menuItems = [
        { name: 'Generate', path: '/dashboard', icon: LayoutDashboard },
        { name: 'My Gallery', path: '/gallery', icon: ImageIcon },
    ];

    return (
        <aside className="w-64 bg-[#09090b] border-r border-zinc-800 hidden md:flex flex-col justify-between p-4 h-[calc(100vh-4rem)] sticky top-16">
            <div className="space-y-6">
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                        Workspace
                    </h2>
                    <div className="space-y-1">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                                            ? 'bg-purple-600/10 text-purple-400 border-l-4 border-purple-500'
                                            : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                                        }`
                                    }
                                >
                                    <Icon className="w-5 h-5" />
                                    {item.name}
                                </NavLink>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* User Credits Info */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-zinc-400">Remaining Credits</span>
                    <span className="text-xs font-bold text-purple-400">15 / 20</span>
                </div>
                <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-purple-500 h-full w-[75%] rounded-full"></div>
                </div>
            </div>
        </aside>
    );
}