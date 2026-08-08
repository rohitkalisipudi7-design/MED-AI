'use client';

import * as React from 'react';
import Link from 'next/link';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button, buttonVariants } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Clock, FileText, Phone, Mail, Activity, ArrowUpRight } from 'lucide-react';

export default function PatientProfilePage({ params }: { params: { id: string } }) {
    // Mock usage of params to prevent unused error
    const idStr = String(params.id);

    return (
        <PageLayout>
            <div className="mb-6">
                <Link href="/patients" className={buttonVariants({ variant: "ghost", className: "-ml-4 text-muted-foreground mb-4" })}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Patients
                </Link>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16 border-2 border-background shadow-md">
                            <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">JD</AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">John Doe</h1>
                            <p className="text-muted-foreground mt-1 text-sm flex items-center gap-4">
                                <span>ID: PT-{idStr.padStart(5, '0')}</span>
                                <span>DOB: May 12, 1980 (46 yrs)</span>
                                <span>Dr. Sarah</span>
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline"><Phone className="mr-2 h-4 w-4" /> Call</Button>
                        <Button variant="outline"><Mail className="mr-2 h-4 w-4" /> Message</Button>
                        <Button><FileText className="mr-2 h-4 w-4" /> Upload Report</Button>
                    </div>
                </div>
            </div>

            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="mb-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="reports">Reports (12)</TabsTrigger>
                    <TabsTrigger value="trends">Labs Trends</TabsTrigger>
                    <TabsTrigger value="notes">Clinical Notes</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Latest Report</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-xl font-bold">Oct 24, 2026</div>
                                <p className="text-xs text-muted-foreground mt-1">Metabolic Panel</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Total Abnormal</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-xl font-bold text-destructive">2 Flags</div>
                                <p className="text-xs text-muted-foreground mt-1">Needs review</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Blood Pressure</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-xl font-bold">120/80</div>
                                <p className="text-xs text-muted-foreground mt-1">Normal</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Heart Rate</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-xl font-bold">72 bpm</div>
                                <p className="text-xs text-muted-foreground mt-1">Resting</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Activity className="h-5 w-5 text-primary" />
                                    Recent Findings
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center border-b border-border pb-4">
                                        <div>
                                            <p className="font-medium text-sm">Elevated Potassium</p>
                                            <p className="text-xs text-muted-foreground">5.8 mEq/L (Normal: 3.5-5.1)</p>
                                        </div>
                                        <span className="bg-destructive/10 text-destructive text-xs px-2 py-1 rounded font-semibold border border-destructive/20">High</span>
                                    </div>
                                    <div className="flex justify-between items-center pb-2">
                                        <div>
                                            <p className="font-medium text-sm">Elevated Glucose</p>
                                            <p className="text-xs text-muted-foreground">110 mg/dL (Normal: 70-99)</p>
                                        </div>
                                        <span className="bg-warning/10 text-warning text-xs px-2 py-1 rounded font-semibold border border-warning/20">Elevated</span>
                                    </div>
                                </div>
                                <Button variant="link" className="px-0 mt-2 h-auto text-primary">View all findings <ArrowUpRight className="ml-1 h-3 w-3" /></Button>
                            </CardContent>
                        </Card>

                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-primary" />
                                    Timeline
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="relative border-l border-border ml-3 space-y-6 pb-4">
                                    <div className="relative pl-6">
                                        <span className="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-primary ring-4 ring-background"></span>
                                        <h3 className="font-medium text-sm leading-none">Metabolic Panel Uploaded</h3>
                                        <p className="text-xs text-muted-foreground mt-1">Oct 24, 2026 • Processed by AI</p>
                                    </div>
                                    <div className="relative pl-6">
                                        <span className="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-muted-foreground ring-4 ring-background"></span>
                                        <h3 className="font-medium text-sm leading-none">Clinic Visit Notes</h3>
                                        <p className="text-xs text-muted-foreground mt-1">Sep 12, 2026 • Authored by Dr. Sarah</p>
                                    </div>
                                    <div className="relative pl-6">
                                        <span className="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-muted-foreground ring-4 ring-background"></span>
                                        <h3 className="font-medium text-sm leading-none">Lipid Panel</h3>
                                        <p className="text-xs text-muted-foreground mt-1">Jun 05, 2026 • 1 Abnormal Flag</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
                <TabsContent value="reports" className="p-8 text-center text-muted-foreground bg-card border border-border rounded-xl">
                    Report list rendering goes here...
                </TabsContent>
                <TabsContent value="trends" className="p-8 text-center text-muted-foreground bg-card border border-border rounded-xl">
                    Lab trends charts render here...
                </TabsContent>
                <TabsContent value="notes" className="p-8 text-center text-muted-foreground bg-card border border-border rounded-xl">
                    Clinical notes timeline goes here...
                </TabsContent>
            </Tabs>
        </PageLayout>
    );
}
