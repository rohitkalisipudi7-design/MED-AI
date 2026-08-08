'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const stats = [
    { title: 'Total Reports', value: '1,284', change: '12%', trend: 'up', icon: 'description', info: '12% from last month' },
    { title: 'Reports Today', value: '42', change: '8', trend: 'neutral', icon: 'today', info: '8 pending review' },
    { title: 'Active Patients', value: '856', change: '84%', trend: 'neutral', icon: 'group', info: 'Current clinic capacity: 84%' },
    { title: 'Abnormal Flags', value: '14', change: 'immediate', trend: 'alert', icon: 'warning', info: 'Requires immediate review', alert: true },
];

const recentActivity = [
    { title: 'Hematology Scan', patient: 'Sarah Jenkins', time: '2m ago', icon: 'lab_profile', status: 'Processed', statusColor: 'emerald' },
    { title: 'Chest X-Ray Analysis', patient: 'Michael Chen', time: '15m ago', icon: 'radiology', status: 'Flagged', statusColor: 'orange' },
    { title: 'ECG Telemetry', patient: 'Emma Rodriguez', time: '42m ago', icon: 'ecg', status: 'Pending Review', statusColor: 'slate' },
    { title: 'Metabolic Panel', patient: 'Arthur Vance', time: '1h ago', icon: 'biometrics', status: 'Processed', statusColor: 'emerald' },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring" as const,
            stiffness: 100,
            damping: 15
        }
    }
};

export default function DashboardPage() {
    return (
        <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="w-full space-y-12"
        >
            {/* Stat Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <motion.div 
                        key={stat.title} 
                        variants={itemVariants}
                        className={`relative overflow-hidden group rounded-2xl p-6 glass-panel border-white/5 transition-all hover:border-white/10 ${
                            stat.alert ? 'bg-rose-500/5 ring-1 ring-rose-500/20' : 'bg-slate-900/40'
                        }`}
                    >
                        <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-all duration-500 transform group-hover:scale-110 group-hover:-rotate-12 ${stat.alert ? 'text-rose-400 opacity-20' : 'text-indigo-300'}`}>
                            <span className="material-symbols-outlined text-6xl" style={stat.alert ? { fontVariationSettings: "'FILL' 1" } : {}}>
                                {stat.icon}
                            </span>
                        </div>
                        
                        <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 font-label ${
                            stat.alert ? 'text-rose-300/60' : 'text-indigo-300/40'
                        }`}>
                            {stat.title}
                        </p>
                        
                        <h3 className={`text-4xl font-headline font-bold mb-4 tracking-tight ${
                            stat.alert ? 'text-rose-400' : 'text-white'
                        }`}>
                            {stat.value}
                        </h3>
                        
                        <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider ${
                            stat.alert ? 'text-rose-300 animate-pulse' : 
                            stat.trend === 'up' ? 'text-emerald-400' : 'text-indigo-300/60'
                        }`}>
                            <span className="material-symbols-outlined text-sm">
                                {stat.alert ? 'emergency' : stat.trend === 'up' ? 'trending_up' : stat.icon === 'today' ? 'schedule' : 'info'}
                            </span>
                            <span>{stat.info}</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Main Dashboard Bento Grid */}
            <div className="grid grid-cols-12 gap-8">
                {/* Reports Volume Chart */}
                <motion.div 
                    variants={itemVariants}
                    className="col-span-12 lg:col-span-8 bg-slate-900/40 glass-panel border-white/5 rounded-3xl p-8 shadow-2xl"
                >
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h3 className="text-2xl font-bold font-headline text-white tracking-tight">System Utilization</h3>
                            <p className="text-sm text-indigo-300/40 font-body">Volume of diagnostic extractions per cycle</p>
                        </div>
                        <div className="flex gap-2 bg-white/5 p-1 rounded-xl border border-white/5">
                            <Button variant="ghost" className="h-8 px-4 rounded-lg text-[10px] font-bold uppercase tracking-widest text-indigo-300/40 hover:text-white">Day</Button>
                            <Button variant="ghost" className="h-8 px-4 rounded-lg bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20">Week</Button>
                        </div>
                    </div>
                    
                    {/* Faux Bar Chart Implementation */}
                    <div className="h-64 flex items-end justify-between gap-4 px-2">
                        {[40, 65, 55, 90, 45, 30, 70, 50, 85, 60, 95, 40, 25, 75].map((height, idx) => (
                            <div 
                                key={idx} 
                                className={`w-full rounded-t-xl transition-all relative group cursor-pointer ${
                                    idx === 3 || idx === 10 || idx === 13 ? 'bg-primary shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:scale-x-110' : 'bg-white/5 hover:bg-white/10'
                                }`}
                                style={{ height: `${height}%` }}
                            >
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 border border-white/10 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-2xl z-20">
                                    {Math.round(height * 0.5)} reports
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="flex justify-between mt-6 px-2 text-[10px] font-bold text-indigo-300/20 uppercase tracking-[0.2em]">
                        <span>Cycle Alpha (Oct 14)</span>
                        <span>Cycle Beta (Oct 21)</span>
                        <span className="text-primary/60">Live Forecast</span>
                    </div>
                </motion.div>

                {/* Recent Activity Panel */}
                <motion.div 
                    variants={itemVariants}
                    className="col-span-12 lg:col-span-4 bg-slate-900/40 glass-panel border-white/5 rounded-3xl p-8 flex flex-col shadow-2xl"
                >
                    <div className="mb-8 flex justify-between items-center">
                        <h3 className="text-2xl font-bold font-headline text-white tracking-tight">Audit Log</h3>
                        <Button variant="ghost" className="text-primary text-[10px] font-bold uppercase tracking-widest hover:bg-primary/10">Archive</Button>
                    </div>
                    
                    <div className="space-y-4 flex-1">
                        {recentActivity.map((activity, i) => (
                            <div 
                                key={i} 
                                className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 transition-all hover:bg-white/[0.05] hover:border-white/10 cursor-pointer group"
                            >
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500 group-hover:scale-110 ${
                                    activity.statusColor === 'orange' ? 'bg-rose-500/10' : 'bg-indigo-500/10'
                                }`}>
                                    <span className={`material-symbols-outlined text-2xl ${
                                        activity.statusColor === 'orange' ? 'text-rose-400' : 'text-indigo-400'
                                    }`}>
                                        {activity.icon}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-bold text-white truncate font-headline tracking-tight">{activity.title}</h4>
                                    <p className="text-[11px] text-indigo-300/40 mb-2 font-body font-medium">{activity.patient}</p>
                                    <span className={`inline-flex px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-widest border ${
                                        activity.statusColor === 'emerald' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/10' :
                                        activity.statusColor === 'orange' ? 'bg-rose-500/10 text-rose-400 border-rose-500/10' :
                                        'bg-white/5 text-indigo-300/40 border-white/5'
                                    }`}>
                                        {activity.status}
                                    </span>
                                </div>
                                <span className="text-[9px] font-bold text-indigo-300/20 whitespace-nowrap font-label uppercase tracking-tighter mt-1">{activity.time}</span>
                            </div>
                        ))}
                    </div>
                    
                    <Button variant="outline" className="mt-8 w-full h-12 rounded-xl border-white/5 bg-white/5 text-indigo-300/60 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all group gap-2">
                        View Complete Audit
                        <span className="material-symbols-outlined text-sm group-hover:translate-y-0.5 transition-transform">expand_more</span>
                    </Button>
                </motion.div>
            </div>
            
            {/* Footer Placeholder */}
            <footer className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-indigo-300/20 font-label">
                    © 2026 MedAI Clinical Systems • HIPAA Compliant Environment Alpha-9
                </p>
                <div className="flex gap-8">
                    {['Security Protocol', 'Terms of Service', 'Clinical Support'].map((link) => (
                        <a key={link} href="#" className="text-[10px] font-bold tracking-widest uppercase text-indigo-300/20 hover:text-primary transition-all duration-300">
                            {link}
                        </a>
                    ))}
                </div>
            </footer>
        </motion.div>
    );
}

