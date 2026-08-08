'use client';

import * as React from 'react';
import Link from 'next/link';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, CheckCircle2, Download, Printer, Share2, AlignLeft, AlertCircle } from 'lucide-react';
import { useReportStore } from '@/store/reportStore';
import ReactMarkdown from 'react-markdown';

export default function ReportDetailPage({ params }: { params: { id: string } }) {
    const { reports } = useReportStore();
    const report = React.useMemo(() => reports.find((r) => r.id === params.id), [reports, params.id]);

    const isAbnormal = (val: number, min: number, max: number) => val < min || val > max;

    const mockFindings = [
        { test: 'Glucose', value: 110, range: '70-99', unit: 'mg/dL', min: 70, max: 99 },
        { test: 'Calcium', value: 9.2, range: '8.5-10.5', unit: 'mg/dL', min: 8.5, max: 10.5 },
        { test: 'Sodium', value: 135, range: '135-145', unit: 'mEq/L', min: 135, max: 145 },
        { test: 'Potassium', value: 5.8, range: '3.5-5.1', unit: 'mEq/L', min: 3.5, max: 5.1 },
        { test: 'Chloride', value: 100, range: '96-106', unit: 'mEq/L', min: 96, max: 106 },
    ];

    const displayName = report?.name ?? 'Comprehensive Metabolic Panel';
    const displayDate = report?.dateUploaded ?? 'Oct 24, 2026';
    const displayPatient = report?.patientName ?? 'John Doe';
    const hasAnalysis = report?.analysis != null;
    const analysisContent = report?.analysis ?? 'The metabolic panel indicates elevated levels of **Glucose** and **Potassium**. Other electrolytes remain within normal reference ranges. Patient is advised to monitor fasting blood sugar levels and reassess potassium dietary intake.';
    const originalDoc = report?.originalDocument ?? '';

    return (
        <PageLayout>
            <div className="mb-4">
                <Link href="/reports" className={buttonVariants({ variant: "ghost", className: "-ml-4 text-muted-foreground mb-2" })}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Reports
                </Link>
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-2xl font-bold tracking-tight">{displayName}</h1>
                            <span className="bg-warning/10 text-warning text-xs font-semibold px-2.5 py-0.5 rounded-full border border-warning/20">
                                {hasAnalysis ? 'AI Analyzed' : 'Processing Complete'}
                            </span>
                        </div>
                        <p className="text-muted-foreground">Uploaded on {displayDate} • Patient: <Link href="/patients/1" className="text-primary hover:underline">{displayPatient}</Link></p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm"><Share2 className="mr-2 h-4 w-4" /> Share</Button>
                        <Button variant="outline" size="sm"><Printer className="mr-2 h-4 w-4" /> Print</Button>
                        <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" /> PDF Summary</Button>
                        <Button size="sm"><CheckCircle2 className="mr-2 h-4 w-4" /> Mark Reviewed</Button>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2 h-[calc(100vh-220px)] min-h-[600px]">
                {/* Left Panel: Summary */}
                <div className="flex flex-col gap-6 overflow-y-auto pr-2 pb-6">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-semibold flex items-center text-muted-foreground">
                                <AlertCircle className="mr-1.5 h-4 w-4" />
                                AI Generated Summary
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm leading-relaxed prose prose-sm dark:prose-invert max-w-none">
                            {hasAnalysis ? (
                                <ReactMarkdown>{analysisContent}</ReactMarkdown>
                            ) : (
                                <>
                                    <p>The metabolic panel indicates elevated levels of <strong>Glucose</strong> and <strong>Potassium</strong>. Other electrolytes remain within normal reference ranges. Patient is advised to monitor fasting blood sugar levels and reassess potassium dietary intake.</p>
                                    <div className="mt-4 pt-4 border-t border-border">
                                        <h4 className="font-semibold text-sm mb-2 text-foreground">Recommended Actions:</h4>
                                        <ul className="space-y-2">
                                            <li className="flex items-start">
                                                <span className="bg-destructive/10 text-destructive text-[10px] font-bold px-1.5 py-0.5 rounded uppercase mr-2 mt-0.5 border border-destructive/20">High</span>
                                                <span className="text-sm">Schedule follow-up for hyperkalemia evaluation.</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="bg-warning/10 text-warning text-[10px] font-bold px-1.5 py-0.5 rounded uppercase mr-2 mt-0.5 border border-warning/20">Med</span>
                                                <span className="text-sm">Recommend fasting glucose test to rule out prediabetes.</span>
                                            </li>
                                        </ul>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="flex-1">
                        <CardHeader className="pb-3 flex flex-row items-center justify-between">
                            <CardTitle className="text-sm font-semibold flex items-center text-muted-foreground">
                                <AlignLeft className="mr-1.5 h-4 w-4" />
                                Extracted Findings
                            </CardTitle>
                            <span className="text-xs bg-muted px-2 py-0.5 rounded-full border border-border/50">2 Abnormal</span>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/30 hover:bg-muted/30">
                                        <TableHead>Test Name</TableHead>
                                        <TableHead>Value</TableHead>
                                        <TableHead>Reference Range</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mockFindings.map((f, i) => {
                                        const abnormal = isAbnormal(f.value, f.min, f.max);
                                        return (
                                            <TableRow key={i} className={abnormal ? 'bg-abnormal-high/5 hover:bg-abnormal-high/10' : ''}>
                                                <TableCell className="font-medium">{f.test}</TableCell>
                                                <TableCell>
                                                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-sm font-semibold ${abnormal ? 'text-abnormal-high bg-abnormal-high/10 border border-abnormal-high/20' : 'text-normal bg-normal/10 border border-normal/20'}`}>
                                                        {f.value} {f.unit}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-muted-foreground text-sm">{f.range} {f.unit}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Panel: Document Viewer */}
                <div className="bg-muted/30 border border-border rounded-xl flex flex-col overflow-hidden h-full shadow-inner">
                    <div className="h-12 border-b border-border bg-card flex items-center justify-between px-4">
                        <span className="text-sm font-medium">Original Document</span>
                        <div className="text-xs text-muted-foreground">Page 1 of 1</div>
                    </div>
                    <div className="flex-1 flex items-center justify-center p-8 bg-black/5 dark:bg-white/5 overflow-auto">
                        {/* Original document or placeholder */}
                        <div className="bg-white dark:bg-slate-900 w-full max-w-[500px] min-h-[400px] shadow-lg border border-border/50 p-8 flex flex-col text-slate-900 dark:text-slate-100 pointer-events-none overflow-auto">
                            <div className="border-b-2 border-slate-200 dark:border-slate-700 pb-4 mb-6">
                                <h2 className="text-xl font-bold uppercase tracking-wider">{displayName}</h2>
                                <p className="text-xs text-slate-500 mt-1">Extracted Document Content</p>
                            </div>
                            <div className="text-xs space-y-2 font-mono whitespace-pre-wrap break-words">
                                {originalDoc ? originalDoc : (
                                    <>
                                        <div className="flex justify-between"><span className="font-bold">GLUCOSE</span> <span>110 H</span></div>
                                        <div className="flex justify-between"><span className="font-bold">CALCIUM</span> <span>9.2</span></div>
                                        <div className="flex justify-between"><span className="font-bold">SODIUM</span> <span>135</span></div>
                                        <div className="flex justify-between"><span className="font-bold">POTASSIUM</span> <span>5.8 H</span></div>
                                        <div className="flex justify-between"><span className="font-bold">CHLORIDE</span> <span>100</span></div>
                                    </>
                                )}
                            </div>
                            <div className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-700 text-[8px] text-slate-400">
                                Confidential medical document.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
