'use client';

import * as React from 'react';
import Link from 'next/link';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import { usePatientStore } from '@/store/patientStore';

const mockPatients = [
    { id: '1', name: 'John Doe', age: 45, doctor: 'Dr. Sarah', recentReport: 'Oct 24, 2026', totalAlerts: 2, initials: 'JD' },
    { id: '2', name: 'Jane Smith', age: 32, doctor: 'Dr. Sarah', recentReport: 'Oct 23, 2026', totalAlerts: 0, initials: 'JS' },
    { id: '3', name: 'Michael Brown', age: 58, doctor: 'Dr. Adams', recentReport: 'Oct 21, 2026', totalAlerts: 1, initials: 'MB' },
    { id: '4', name: 'Sarah Davis', age: 29, doctor: 'Dr. Lee', recentReport: 'Oct 18, 2026', totalAlerts: 0, initials: 'SD' },
    { id: '5', name: 'Robert Wilson', age: 61, doctor: 'Dr. Sarah', recentReport: 'Oct 15, 2026', totalAlerts: 4, initials: 'RW' },
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

export default function PatientsPage() {
    const { searchQuery, setSearchQuery } = usePatientStore();

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
                            Patients
                        </motion.h1>
                        <motion.p 
                            variants={itemVariants}
                            className="text-muted-foreground mt-2 font-body text-lg"
                        >
                            Manage patient profiles and view their automated report histories.
                        </motion.p>
                    </div>
                    <motion.div variants={itemVariants}>
                        <Button className="rounded-full px-6 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                            <span className="material-symbols-rounded mr-2">person_add</span>
                            New Patient
                        </Button>
                    </motion.div>
                </div>

                <motion.div 
                    variants={itemVariants}
                    className="glass-panel p-2 flex flex-col sm:flex-row gap-4 items-center justify-between"
                >
                    <div className="relative w-full sm:w-96 group">
                        <span className="material-symbols-rounded absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">search</span>
                        <Input
                            placeholder="Search by name or ID..."
                            className="pl-12 bg-background/40 border-none h-12 rounded-xl focus-visible:ring-primary/30"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <Select>
                            <SelectTrigger className="w-[200px] h-12 bg-background/40 border-none rounded-xl focus:ring-primary/30">
                                <div className="flex items-center">
                                    <span className="material-symbols-rounded mr-2 text-primary text-xl">stethoscope</span>
                                    <SelectValue placeholder="Attending Doctor" />
                                </div>
                            </SelectTrigger>
                            <SelectContent className="glass-panel border-none shadow-2xl">
                                <SelectItem value="all">All Doctors</SelectItem>
                                <SelectItem value="sarah">Dr. Sarah (Me)</SelectItem>
                                <SelectItem value="adams">Dr. Adams</SelectItem>
                                <SelectItem value="lee">Dr. Lee</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl bg-background/40 border-none hover:bg-background/60" title="Filter by date or status">
                            <span className="material-symbols-rounded">filter_list</span>
                        </Button>
                    </div>
                </motion.div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {mockPatients.map((patient) => (
                        <motion.div key={patient.id} variants={itemVariants}>
                            <Link href={`/patients/${patient.id}`}>
                                <Card className="glass-panel hover:border-primary/40 transition-all cursor-pointer group h-full hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-3">
                                        {patient.totalAlerts > 0 && (
                                            <div className="flex items-center gap-1 bg-rose-500/10 text-rose-500 text-[10px] font-bold px-2 py-1 rounded-full border border-rose-500/20">
                                                <span className="material-symbols-rounded text-xs">warning</span>
                                                {patient.totalAlerts} Alerts
                                            </div>
                                        )}
                                    </div>
                                    <CardContent className="p-6 flex flex-col h-full">
                                        <div className="flex justify-between items-start mb-6">
                                            <Avatar className="h-16 w-16 border-2 border-background shadow-lg ring-2 ring-primary/5">
                                                <AvatarFallback className="bg-gradient-to-br from-primary/20 to-indigo-500/20 text-primary font-bold text-xl">{patient.initials}</AvatarFallback>
                                            </Avatar>
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="font-headline font-bold text-xl group-hover:text-primary transition-colors">{patient.name}</h3>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <span className="bg-background/50 px-2 py-0.5 rounded-md border border-border/40">PT-{patient.id.padStart(4, '0')}</span>
                                                <span>•</span>
                                                <span>{patient.age} yrs</span>
                                            </div>
                                        </div>
                                        
                                        <div className="mt-8 pt-6 border-t border-border/40 space-y-4">
                                            <div className="flex items-center justify-between text-sm">
                                                <div className="flex items-center text-muted-foreground">
                                                    <span className="material-symbols-rounded text-lg mr-2 opacity-60">medical_services</span>
                                                    <span>Doctor</span>
                                                </div>
                                                <span className="font-semibold text-foreground/80">{patient.doctor}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <div className="flex items-center text-muted-foreground">
                                                    <span className="material-symbols-rounded text-lg mr-2 opacity-60">calendar_today</span>
                                                    <span>Latest</span>
                                                </div>
                                                <span className="font-semibold text-foreground/80">{patient.recentReport}</span>
                                            </div>
                                        </div>

                                        <div className="mt-6 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="flex items-center text-xs font-bold text-primary gap-1">
                                                View Details
                                                <span className="material-symbols-rounded text-sm">arrow_forward</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </PageLayout>
    );
}
