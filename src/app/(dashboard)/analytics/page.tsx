'use client';

import * as React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const volumeData = [
    { name: 'Mon', lab: 40, rx: 24, other: 10 },
    { name: 'Tue', lab: 30, rx: 13, other: 22 },
    { name: 'Wed', lab: 20, rx: 58, other: 5 },
    { name: 'Thu', lab: 27, rx: 39, other: 15 },
    { name: 'Fri', lab: 18, rx: 48, other: 12 },
    { name: 'Sat', lab: 23, rx: 38, other: 8 },
    { name: 'Sun', lab: 34, rx: 43, other: 10 },
];

const abnormalData = [
    { date: '10/18', flags: 12 },
    { date: '10/19', flags: 8 },
    { date: '10/20', flags: 15 },
    { date: '10/21', flags: 22 },
    { date: '10/22', flags: 14 },
    { date: '10/23', flags: 9 },
    { date: '10/24', flags: 28 },
];

const pieData = [
    { name: 'Lab Reports', value: 400 },
    { name: 'Diagnostic', value: 300 },
    { name: 'Prescription', value: 300 },
    { name: 'Other', value: 100 },
];
const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

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

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="glass-panel p-3 border-none shadow-2xl backdrop-blur-xl">
                <p className="font-bold text-foreground mb-1">{label}</p>
                {payload.map((entry: any, index: number) => (
                    <p key={index} className="text-xs flex items-center gap-2" style={{ color: entry.color || entry.fill }}>
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color || entry.fill }} />
                        {entry.name}: <span className="font-bold">{entry.value}</span>
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

export default function AnalyticsPage() {
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
                            Analytics Dashboard
                        </motion.h1>
                        <motion.p 
                            variants={itemVariants}
                            className="text-muted-foreground mt-2 font-body text-lg"
                        >
                            Visualize system utilization, report patterns, and abnormal trends.
                        </motion.p>
                    </div>
                    <motion.div variants={itemVariants} className="flex gap-3">
                        <Button variant="outline" className="rounded-full px-6 glass-panel border-none h-11 transition-all hover:scale-105 active:scale-95">
                            <span className="material-symbols-rounded mr-2">download</span>
                            Export Report
                        </Button>
                    </motion.div>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <motion.div variants={itemVariants} className="col-span-1 lg:col-span-2">
                        <Card className="glass-panel border-none h-full hover:shadow-2xl transition-all">
                            <CardHeader>
                                <CardTitle className="font-headline text-2xl">Reports Volume Trend</CardTitle>
                                <CardDescription className="text-base">Documents processed by type over the last 7 days.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[350px] w-full mt-4">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={volumeData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border)/0.3)" />
                                            <XAxis 
                                                dataKey="name" 
                                                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
                                                axisLine={false} 
                                                tickLine={false} 
                                                dy={10}
                                            />
                                            <YAxis 
                                                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
                                                axisLine={false} 
                                                tickLine={false} 
                                                dx={-10}
                                            />
                                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--primary)/0.05)' }} />
                                            <Bar dataKey="lab" stackId="a" fill="hsl(var(--chart-1))" maxBarSize={40} />
                                            <Bar dataKey="rx" stackId="a" fill="hsl(var(--chart-2))" maxBarSize={40} />
                                            <Bar dataKey="other" stackId="a" fill="hsl(var(--chart-3))" radius={6} maxBarSize={40} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Card className="glass-panel border-none h-full hover:shadow-2xl transition-all">
                            <CardHeader>
                                <CardTitle className="font-headline text-2xl">Report Distribution</CardTitle>
                                <CardDescription className="text-base">Breakdown by category</CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center justify-center">
                                <div className="h-[280px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={pieData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={70}
                                                outerRadius={95}
                                                paddingAngle={8}
                                                dataKey="value"
                                                stroke="none"
                                            >
                                                {pieData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip content={<CustomTooltip />} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="grid grid-cols-2 gap-x-6 gap-y-3 w-full mt-6">
                                    {pieData.map((item, i) => (
                                        <div key={item.name} className="flex items-center text-xs font-semibold text-muted-foreground">
                                            <div className="w-3 h-3 rounded-full mr-3 shadow-lg" style={{ backgroundColor: COLORS[i] }} />
                                            {item.name}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div variants={itemVariants} className="col-span-1 lg:col-span-3">
                        <Card className="glass-panel border-none hover:shadow-2xl transition-all">
                            <CardHeader>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="material-symbols-rounded text-destructive">monitoring</span>
                                    <CardTitle className="font-headline text-2xl">Abnormal Flags Detection</CardTitle>
                                </div>
                                <CardDescription className="text-base">Number of flags extracted by AI from recent documents</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[350px] w-full mt-4">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={abnormalData} margin={{ top: 20, right: 30, left: 10, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border)/0.3)" />
                                            <XAxis 
                                                dataKey="date" 
                                                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
                                                axisLine={false} 
                                                tickLine={false}
                                                dy={10}
                                            />
                                            <YAxis 
                                                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
                                                axisLine={false} 
                                                tickLine={false}
                                                dx={-10}
                                            />
                                            <Tooltip content={<CustomTooltip />} />
                                            <Line 
                                                type="monotone" 
                                                dataKey="flags" 
                                                stroke="hsl(var(--destructive))" 
                                                strokeWidth={4} 
                                                dot={{ r: 6, fill: 'hsl(var(--background))', stroke: 'hsl(var(--destructive))', strokeWidth: 3 }} 
                                                activeDot={{ r: 8, strokeWidth: 0 }} 
                                                animationDuration={1500}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </motion.div>
        </PageLayout>
    );
}
