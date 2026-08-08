'use client';

import * as React from 'react';
import Link from 'next/link';
import { PageLayout } from '@/components/layout/PageLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { buttonVariants } from '@/components/ui/button';
import { useReportStore } from '@/store/reportStore';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const mockReports = [
    { id: '1', name: 'Comprehensive Metabolic Panel', patientName: 'John Doe', date: 'Oct 24, 2026', type: 'Lab Report', status: 'Completed', flagCount: 2 },
    { id: '2', name: 'Echocardiogram Summary', patientName: 'Jane Smith', date: 'Oct 23, 2026', type: 'Diagnostic', status: 'Reviewed', flagCount: 0 },
    { id: '3', name: 'Lipid Panel', patientName: 'Michael Brown', date: 'Oct 23, 2026', type: 'Lab Report', status: 'Processing', flagCount: 0 },
    { id: '4', name: 'Post-Op Notes', patientName: 'Sarah Davis', date: 'Oct 22, 2026', type: 'Other', status: 'Failed', flagCount: 0 },
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
            stiffness: 100
        }
    }
};

export default function ReportsPage() {
    const { reports, filters, setFilters } = useReportStore();

    const displayReports = React.useMemo(() => {
        const fromStore = reports.map((r) => ({
            id: r.id,
            name: r.name,
            patientName: r.patientName ?? 'Unassigned',
            date: r.dateUploaded,
            type: r.type,
            status: r.status,
            flagCount: r.abnormalFlagCount,
        }));
        return fromStore.length > 0 ? fromStore : mockReports;
    }, [reports]);

    return (
        <PageLayout>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="space-y-8"
            >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <motion.h1 
                            variants={itemVariants}
                            className="text-4xl font-headline font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70"
                        >
                            Clinical Reports
                        </motion.h1>
                        <motion.p 
                            variants={itemVariants}
                            className="text-muted-foreground mt-2 font-body text-lg"
                        >
                            Manage and audit high-precision diagnostic insights.
                        </motion.p>
                    </div>
                    <motion.div variants={itemVariants} className="flex gap-3">
                        <Button className="bg-primary hover:bg-primary/90 text-white px-6 h-11 rounded-full font-bold shadow-lg shadow-primary/20 transition-all active:scale-95 flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg">download</span>
                            Export Dataset
                        </Button>
                    </motion.div>
                </div>

                <motion.div 
                    variants={itemVariants}
                    className="glass-panel border-white/5 bg-slate-900/40 rounded-2xl overflow-hidden flex flex-col shadow-2xl"
                >
                {/* Filter Bar */}
                <div className="p-6 border-b border-white/5 flex flex-col lg:flex-row gap-6 items-center justify-between bg-white/[0.02]">
                    <div className="relative w-full lg:w-96 group">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-indigo-300/40 group-focus-within:text-primary transition-colors">search</span>
                        <Input
                            placeholder="Query reports, patient IDs, or findings..."
                            className="pl-12 bg-white/5 border-white/10 h-12 rounded-xl focus:ring-primary/40 text-white placeholder:text-indigo-300/20"
                            value={filters.searchQuery}
                            onChange={(e) => setFilters({ searchQuery: e.target.value })}
                        />
                    </div>
                    <div className="flex items-center gap-3 w-full lg:w-auto">
                        <Select>
                            <SelectTrigger className="bg-white/5 border-white/10 h-12 rounded-xl text-indigo-200/80 w-full sm:w-[160px]">
                                <SelectValue placeholder="All Categories" />
                            </SelectTrigger>
                            <SelectContent className="glass-panel border-white/10 bg-slate-900 text-white">
                                <SelectItem value="all">All Categories</SelectItem>
                                <SelectItem value="lab">Hematology</SelectItem>
                                <SelectItem value="diagnostic">Radiology</SelectItem>
                                <SelectItem value="prescription">Pathology</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select>
                            <SelectTrigger className="bg-white/5 border-white/10 h-12 rounded-xl text-indigo-200/80 w-full sm:w-[160px]">
                                <SelectValue placeholder="System Status" />
                            </SelectTrigger>
                            <SelectContent className="glass-panel border-white/10 bg-slate-900 text-white">
                                <SelectItem value="all">All States</SelectItem>
                                <SelectItem value="completed">Analyzed</SelectItem>
                                <SelectItem value="processing">In Parallel</SelectItem>
                                <SelectItem value="reviewed">Verified</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-indigo-300/60" title="Advanced Search">
                            <span className="material-symbols-outlined">tune</span>
                        </Button>
                    </div>
                </div>

                {/* Data Table */}
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-white/5 hover:bg-transparent bg-white/[0.03]">
                                <TableHead className="font-label text-[10px] font-bold uppercase tracking-widest text-indigo-300/40 py-5 pl-8">Report Catalog</TableHead>
                                <TableHead className="font-label text-[10px] font-bold uppercase tracking-widest text-indigo-300/40">Patient Subject</TableHead>
                                <TableHead className="font-label text-[10px] font-bold uppercase tracking-widest text-indigo-300/40">Timestamp</TableHead>
                                <TableHead className="font-label text-[10px] font-bold uppercase tracking-widest text-indigo-300/40">Clinical Type</TableHead>
                                <TableHead className="font-label text-[10px] font-bold uppercase tracking-widest text-indigo-300/40">Analysis Status</TableHead>
                                <TableHead className="font-label text-[10px] font-bold uppercase tracking-widest text-indigo-300/40 text-right">Detection</TableHead>
                                <TableHead className="w-[80px] pr-8"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {displayReports.map((report) => (
                                <TableRow key={report.id} className="border-white/5 hover:bg-white/[0.04] transition-all cursor-pointer group">
                                    <TableCell className="py-5 pl-8">
                                        <Link href={`/reports/${report.id}`} className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
                                                <span className="material-symbols-outlined text-xl">description</span>
                                            </div>
                                            <span className="font-bold text-white font-headline text-sm tracking-tight">{report.name}</span>
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link href={`/patients/${report.id}`} className="hover:text-primary text-indigo-200/60 font-medium transition-colors">
                                            {report.patientName}
                                        </Link>
                                    </TableCell>
                                    <TableCell className="text-indigo-300/40 font-medium text-xs">{report.date}</TableCell>
                                    <TableCell>
                                        <span className="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-tighter uppercase bg-white/5 border border-white/5 text-indigo-300/60">
                                            {report.type}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1.5">
                                            <div className={cn(
                                                "w-1.5 h-1.5 rounded-full",
                                                report.status === 'Completed' ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" :
                                                report.status === 'Reviewed' ? "bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]" :
                                                report.status === 'Processing' ? "bg-orange-400 animate-pulse" : "bg-rose-400"
                                            )} />
                                            <span className={cn(
                                                "text-[10px] font-bold uppercase tracking-tight",
                                                report.status === 'Completed' ? "text-emerald-400" :
                                                report.status === 'Reviewed' ? "text-indigo-300" :
                                                report.status === 'Processing' ? "text-orange-400" : "text-rose-400"
                                            )}>{report.status}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {report.flagCount > 0 ? (
                                            <span className="inline-flex items-center justify-center bg-rose-500/20 text-rose-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-rose-500/20">
                                                {report.flagCount} Anomalies
                                            </span>
                                        ) : (
                                            <span className="text-indigo-300/20 text-[10px] font-bold uppercase tracking-widest">Normal</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="pr-8 text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon", className: "h-9 w-9 border border-white/5 bg-white/5 hover:bg-white/10 text-indigo-300/40 hover:text-white rounded-lg focus-visible:ring-0" }))}>
                                                <span className="material-symbols-outlined text-lg">more_vert</span>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="glass-panel border-white/10 bg-slate-900/95 text-white p-2 min-w-[180px]">
                                                <DropdownMenuItem className="rounded-lg py-2 cursor-pointer focus:bg-primary/20 focus:text-white">
                                                    <span className="material-symbols-outlined text-lg mr-3">visibility</span>
                                                    <span className="text-xs font-bold font-label uppercase">View Analysis</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="rounded-lg py-2 cursor-pointer focus:bg-primary/20 focus:text-white">
                                                    <span className="material-symbols-outlined text-lg mr-3">download</span>
                                                    <span className="text-xs font-bold font-label uppercase">Export PDF</span>
                                                </DropdownMenuItem>
                                                <div className="h-px bg-white/5 my-1" />
                                                <DropdownMenuItem className="rounded-lg py-2 cursor-pointer focus:bg-rose-500/20 text-rose-400 focus:text-rose-300">
                                                    <span className="material-symbols-outlined text-lg mr-3">delete</span>
                                                    <span className="text-xs font-bold font-label uppercase">Archive File</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                
                </motion.div>
            </motion.div>
        </PageLayout>
    );
}
