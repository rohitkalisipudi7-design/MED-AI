'use client';

import { Bell, Settings, Search } from 'lucide-react';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { SearchCommand } from '@/components/common/SearchCommand';
import { Button, buttonVariants } from '@/components/ui/button';
import { useUIStore } from '@/store/uiStore';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export function Topbar() {
    const { unreadNotifications } = useUIStore();

    return (
        <header className="h-24 glass-panel backdrop-blur-3xl sticky top-0 z-40 flex justify-between items-center px-10 bg-slate-900/60 border-b border-white/5">
            <div className="flex flex-col">
                <h2 className="text-2xl font-bold tracking-tighter text-white font-headline bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">Dashboard overview</h2>
                <p className="text-[10px] text-indigo-300/40 font-label tracking-widest uppercase font-bold">Institutional Health Surveillance</p>
            </div>

            <div className="flex items-center gap-8">
                <div className="flex gap-3">
                    <Button variant="ghost" className="bg-white/5 hover:bg-white/10 text-indigo-200/80 border border-white/10 rounded-xl h-12 px-6 transition-all hover:scale-105 active:scale-95">
                        <span className="material-symbols-outlined mr-2">person_search</span>
                        Find Patient
                    </Button>
                    <Button className="bg-primary hover:bg-primary/90 text-white font-bold rounded-xl h-12 px-6 shadow-lg shadow-primary/20 transition-all hover:translate-y-[-2px] active:translate-y-0">
                        <span className="material-symbols-outlined mr-2">upload_file</span>
                        Upload New
                    </Button>
                </div>
                
                <div className="h-10 w-[1px] bg-white/5 hidden sm:block"></div>

                <div className="flex items-center gap-5">
                    <button className="text-indigo-300/40 hover:text-white transition-all hover:scale-110 active:scale-90 relative h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10">
                        <span className="material-symbols-outlined">notifications</span>
                        {unreadNotifications > 0 && (
                            <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
                            </span>
                        )}
                    </button>
                    
                    <button className="text-indigo-300/40 hover:text-white transition-all hover:scale-110 active:scale-90 h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10">
                        <span className="material-symbols-outlined">settings</span>
                    </button>

                    <DropdownMenu>
                        <DropdownMenuTrigger className="outline-none flex flex-shrink-0 items-center justify-center p-0 cursor-pointer rounded-xl h-12 w-12 border border-white/10 relative hover:scale-105 transition-transform overflow-hidden group">
                            <Avatar className="h-full w-full">
                                <AvatarImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzA4h1OdEJUus9KlAaJSf70Htn0cn9qgncWqWnzebp43AffjfetQWhl4gjx3wdMUTzQ5GRTpI_YOknrr6lXi5WN7VERrBFHrloq92SnvknSmdASK29iylyybfoX0bHJ3AmMRZ35OmeZOPs31Ck3PPYXjMENg3Oa0p2WXNw2jOiWPSqKHiph0gbtvrBSGCNHWqdSQVbAh5j_TDzVLul-rfp5MJtNSOa7EU5zsVrYWuhj2dYD9dUKjQxD9qCAYnFb9PsSbBqGZrWsck" />
                                <AvatarFallback className="bg-slate-800 text-white font-bold">DS</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-64 glass-panel bg-slate-900/95 border-white/10 mt-2 p-2 rounded-2xl shadow-2xl">
                            <DropdownMenuLabel className="px-4 py-3">
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-white font-headline">Dr. Sarah</span>
                                    <span className="text-[10px] text-indigo-300/40 font-label uppercase tracking-widest">Chief Medical Officer</span>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-white/5" />
                            <DropdownMenuItem className="rounded-xl py-3 focus:bg-primary/10 focus:text-white cursor-pointer px-4">
                                <span className="material-symbols-outlined text-lg mr-3">person</span>
                                <span className="text-xs font-bold uppercase font-label">Profile Configuration</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="rounded-xl py-3 focus:bg-primary/10 focus:text-white cursor-pointer px-4">
                                <span className="material-symbols-outlined text-lg mr-3">shield</span>
                                <span className="text-xs font-bold uppercase font-label">Security Settings</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-white/5" />
                            <DropdownMenuItem className="rounded-xl py-3 focus:bg-rose-500/10 text-rose-400 focus:text-rose-300 cursor-pointer px-4">
                                <span className="material-symbols-outlined text-lg mr-3">logout</span>
                                <span className="text-xs font-bold uppercase font-label">Terminate Session</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    
                    <div className="hidden lg:block">
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </header>
    );
}
