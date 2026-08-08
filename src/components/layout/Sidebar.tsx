'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useUIStore } from '@/store/uiStore';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
    { href: '/dashboard', label: 'Overview', icon: 'dashboard' },
    { href: '/patients', label: 'Patients', icon: 'group' },
    { href: '/reports', label: 'Documents', icon: 'description' },
    { href: '/analytics', label: 'Analytics', icon: 'analytics' },
    { href: '/settings', label: 'Settings', icon: 'settings' },
];

export function Sidebar() {
    const pathname = usePathname();
    const { sidebarCollapsed, toggleSidebar } = useUIStore();

    return (
        <motion.aside
            layout
            initial={false}
            animate={{ width: sidebarCollapsed ? 80 : 256 }}
            className="h-screen sticky top-0 left-0 glass-panel rounded-r-2xl shadow-2xl flex flex-col py-8 gap-4 z-50 overflow-hidden bg-slate-900/60"
        >
            {/* Logo Area */}
            <div className="px-6 mb-8 flex items-center justify-between">
                <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center shadow-lg shadow-primary/20 shrink-0">
                        <span className="material-symbols-outlined text-primary-foreground text-2xl">medical_services</span>
                    </div>
                    {!sidebarCollapsed && (
                        <div className="overflow-hidden">
                            <h1 className="text-white font-bold font-headline tracking-tighter whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">Clinical Suite</h1>
                            <p className="text-[10px] text-indigo-300/60 uppercase tracking-widest font-label font-bold">v2.4.0-Alpha</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 px-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'flex items-center px-4 py-3 gap-4 rounded-xl font-headline text-sm font-bold transition-all duration-300 group relative overflow-hidden',
                                isActive 
                                    ? 'bg-primary/20 text-white shadow-[inset_0_0_20px_rgba(59,130,246,0.1)] border border-primary/20' 
                                    : 'text-indigo-300/40 hover:bg-white/5 hover:text-white'
                            )}
                        >
                            {isActive && (
                                <motion.div 
                                    layoutId="active-pill"
                                    className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"
                                />
                            )}
                            <span className={cn("material-symbols-outlined shrink-0 transition-colors", isActive ? "text-primary" : "group-hover:text-primary")}>{item.icon}</span>
                            {!sidebarCollapsed && <span className="whitespace-nowrap">{item.label}</span>}
                        </Link>
                    );
                })}
            </nav>

            {/* Action Area */}
            <div className="px-4 mt-auto">
                <Button 
                    variant="default"
                    className={cn(
                        "w-full bg-gradient-to-br from-primary to-primary/60 text-primary-foreground font-headline font-bold rounded-lg flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-lg shadow-primary/10",
                        sidebarCollapsed ? "p-0 h-12 w-12 mx-auto" : "py-6"
                    )}
                    onClick={() => {}}
                >
                    <span className="material-symbols-outlined">add_circle</span>
                    {!sidebarCollapsed && <span>New Consultation</span>}
                </Button>
            </div>
            
            {/* Collapse Toggle */}
            <button 
                onClick={toggleSidebar}
                className="mx-auto mt-4 text-slate-400 hover:text-white transition-colors"
            >
                <span className="material-symbols-outlined">
                    {sidebarCollapsed ? 'last_page' : 'first_page'}
                </span>
            </button>
        </motion.aside>
    );
}
