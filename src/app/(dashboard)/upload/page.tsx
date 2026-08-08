'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FileUp, X, CheckCircle2, FileJson, FileImage, FileText as FileTextIcon } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useUploadStore } from '@/store/uploadStore';
import { useReportStore } from '@/store/reportStore';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { analyzeMedicalReport } from '@/lib/med-ai-client';
import type { Report, ReportType } from '@/types';

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

export default function UploadPage() {
    const router = useRouter();
    const [isDragging, setIsDragging] = React.useState(false);
    const [selectedPatient, setSelectedPatient] = React.useState<string>('');
    const [reportCategory, setReportCategory] = React.useState<ReportType>('Lab Report');
    const { files, addFiles, removeFile, clearFiles, overallStatus, setOverallStatus, updateProgress, setFileStatus } = useUploadStore();
    const { reports, setReports } = useReportStore();

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => setIsDragging(false);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const validFiles = Array.from(e.dataTransfer.files).filter(
                (f) => f.name.endsWith('.pdf') || f.name.endsWith('.jpg') || f.name.endsWith('.jpeg') || f.name.endsWith('.png')
            );
            if (validFiles.length > 0) addFiles(validFiles);
            else toast.error('Please upload PDF, JPG, or PNG files only.');
        }
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const validFiles = Array.from(e.target.files).filter(
                (f) => f.name.endsWith('.pdf') || f.name.endsWith('.jpg') || f.name.endsWith('.jpeg') || f.name.endsWith('.png')
            );
            if (validFiles.length > 0) addFiles(validFiles);
            else toast.error('Please upload PDF, JPG, or PNG files only.');
        }
    };

    const handleUpload = async () => {
        setOverallStatus('uploading');

        const newReports: Report[] = [];
        let hasError = false;

        for (let i = 0; i < files.length; i++) {
            const fileItem = files[i];
            setFileStatus(fileItem.id, 'uploading');
            updateProgress(fileItem.id, 10);

            try {
                const result = await analyzeMedicalReport(fileItem.file, (p) => updateProgress(fileItem.id, p));
                setFileStatus(fileItem.id, 'completed');
                updateProgress(fileItem.id, 100);

                const report: Report = {
                    id: `report-${Date.now()}-${i}`,
                    name: fileItem.file.name.replace(/\.(pdf|jpg|jpeg|png)$/i, ''),
                    patientId: selectedPatient || 'unassigned',
                    patientName: selectedPatient === 'john' ? 'John Doe' : selectedPatient === 'jane' ? 'Jane Smith' : undefined,
                    dateUploaded: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                    type: reportCategory,
                    status: 'Completed',
                    abnormalFlagCount: 0,
                    analysis: result.report.analysis,
                    originalDocument: result.report.originalDocument,
                };
                newReports.push(report);
            } catch (err) {
                setFileStatus(fileItem.id, 'error');
                hasError = true;
                toast.error(err instanceof Error ? err.message : 'Failed to process ' + fileItem.file.name);
            }
        }

        if (newReports.length > 0) {
            setReports([...newReports, ...reports]);
        }

        setOverallStatus('completed');
        if (newReports.length > 0) {
            toast.success(`Successfully processed ${newReports.length} report(s).`);
        }
        if (hasError) {
            toast.error('Some files failed to process.');
        }
    };

    const getFileIcon = (name: string) => {
        if (name.endsWith('.pdf')) return <span className="material-symbols-outlined text-red-400">picture_as_pdf</span>;
        if (name.endsWith('.jpg') || name.endsWith('.png')) return <span className="material-symbols-outlined text-blue-400">image</span>;
        return <span className="material-symbols-outlined text-indigo-300/40">description</span>;
    };

    return (
        <PageLayout>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="max-w-4xl mx-auto space-y-8"
            >
                <div className="flex flex-col gap-2">
                    <motion.h1 
                        variants={itemVariants}
                        className="text-4xl font-headline font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70"
                    >
                        Ingest Medical Data
                    </motion.h1>
                    <motion.p 
                        variants={itemVariants}
                        className="text-muted-foreground font-body text-lg"
                    >
                        Upload lab results, prescriptions, and summaries for high-precision extraction.
                    </motion.p>
                </div>

                {overallStatus === 'completed' ? (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        className="flex flex-col items-center justify-center py-20 glass-panel border-white/5 bg-slate-900/40 rounded-3xl shadow-2xl text-center px-10"
                    >
                        <div className="h-24 w-24 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(52,211,153,0.2)]">
                            <span className="material-symbols-outlined text-5xl">task_alt</span>
                        </div>
                        <h2 className="text-3xl font-bold mb-3 font-headline text-white tracking-tight">Ingestion Complete</h2>
                        <p className="text-indigo-300/60 mb-10 font-body text-lg max-w-md">Your clinical documentation has been analyzed and synchronized with the patient record.</p>
                        <div className="flex gap-4">
                            <Button variant="ghost" className="rounded-xl px-8 h-12 border border-white/10 bg-white/5 text-white hover:bg-white/10" onClick={() => { clearFiles(); setOverallStatus('idle'); }}>Upload More</Button>
                            <Button className="rounded-xl px-8 h-12 bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/20" onClick={() => router.push('/reports')}>View Reports</Button>
                        </div>
                    </motion.div>
                ) : (
                    <div className="grid gap-8 md:grid-cols-[1fr_320px]">
                        <div className="space-y-8">
                            <motion.div variants={itemVariants}>
                                <div 
                                    className={cn(
                                        "relative group cursor-pointer transition-all duration-500 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center py-20 px-10 text-center glass-panel overflow-hidden",
                                        isDragging ? "border-primary bg-primary/10 scale-102" : "border-white/10 hover:border-white/20 bg-white/[0.02]"
                                    )}
                                    onDragOver={handleDragOver} 
                                    onDragLeave={handleDragLeave} 
                                    onDrop={handleDrop}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    
                                    <div className="bg-primary/10 h-20 w-20 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-primary/5 group-hover:scale-110 transition-transform duration-500">
                                        <span className="material-symbols-outlined text-4xl text-primary">cloud_upload</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 font-headline text-white tracking-tight">Drop clinical files here</h3>
                                    <p className="text-sm text-indigo-300/40 mb-8 font-label uppercase tracking-widest font-bold">Supports PDF, JPG, PNG up to 25MB</p>

                                    <input type="file" id="file-upload" className="hidden" multiple accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileInput} />
                                    <label htmlFor="file-upload" className={cn(buttonVariants({ variant: "outline", className: "cursor-pointer rounded-xl h-12 px-8 border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold transition-all hover:scale-105 active:scale-95" }))}>Select Documents</label>
                                </div>
                            </motion.div>

                            <AnimatePresence>
                                {files.length > 0 && (
                                    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="space-y-4">
                                        <div className="flex items-center justify-between px-2">
                                            <h4 className="font-bold text-xs uppercase tracking-widest text-indigo-300/40 font-label">Queued for analysis ({files.length})</h4>
                                            <Button variant="ghost" size="sm" onClick={clearFiles} className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 h-8 px-3 rounded-lg text-[10px] font-bold uppercase tracking-wider">Flush Queue</Button>
                                        </div>

                                        <div className="space-y-3">
                                            {files.map(f => (
                                                <motion.div 
                                                    key={f.id} 
                                                    layout 
                                                    initial={{ opacity: 0, x: -10 }} 
                                                    animate={{ opacity: 1, x: 0 }} 
                                                    exit={{ opacity: 0, scale: 0.98 }} 
                                                    className="glass-panel border-white/5 bg-white/[0.03] rounded-2xl p-4 flex items-center gap-4 group"
                                                >
                                                    <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                                                        {getFileIcon(f.file.name)}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-bold text-white font-headline truncate tracking-tight">{f.file.name}</p>
                                                        <div className="flex items-center gap-3 mt-1.5">
                                                            <span className="text-[10px] font-bold text-indigo-300/20 uppercase tracking-wider">{(f.file.size / 1024 / 1024).toFixed(2)} MB</span>
                                                            {f.status !== 'pending' && (
                                                                <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                                                                    <motion.div 
                                                                        initial={{ width: 0 }} 
                                                                        animate={{ width: `${f.progress}%` }} 
                                                                        className="h-full bg-primary shadow-[0_0_8px_rgba(59,130,246,0.5)]" 
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {f.status === 'pending' && (
                                                        <Button variant="ghost" size="icon" className="h-9 w-9 text-indigo-300/20 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl" onClick={() => removeFile(f.id)}>
                                                            <span className="material-symbols-outlined text-lg">close</span>
                                                        </Button>
                                                    )}
                                                    {f.status === 'completed' && <span className="material-symbols-outlined text-emerald-400">check_circle</span>}
                                                    {f.status === 'uploading' && <span className="material-symbols-outlined text-primary animate-spin">sync</span>}
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <motion.div variants={itemVariants} className="space-y-6">
                            <Card className="glass-panel border-white/5 bg-slate-900/40 rounded-3xl overflow-hidden shadow-2xl">
                                <CardContent className="p-6 space-y-6">
                                    <div className="space-y-3">
                                        <Label className="text-xs font-bold uppercase tracking-widest text-indigo-300/40 font-label ml-1">Patient Subject</Label>
                                        <Select {...({ value: selectedPatient, onValueChange: setSelectedPatient } as any)}>
                                            <SelectTrigger className="glass-panel bg-white/5 border-white/5 h-12 rounded-xl text-white">
                                                <SelectValue placeholder="Associate record..." />
                                            </SelectTrigger>
                                            <SelectContent className="glass-panel bg-slate-900 border-white/10 text-white rounded-xl">
                                                <SelectItem value="john" className="focus:bg-primary/20">John Doe (HL7-12345)</SelectItem>
                                                <SelectItem value="jane" className="focus:bg-primary/20">Jane Smith (HL7-67890)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-3">
                                        <Label className="text-xs font-bold uppercase tracking-widest text-indigo-300/40 font-label ml-1">Analysis Protocol</Label>
                                        <Select {...({ value: reportCategory, onValueChange: (v: string) => setReportCategory(v as ReportType) } as any)}>
                                            <SelectTrigger className="glass-panel bg-white/5 border-white/5 h-12 rounded-xl text-white">
                                                <SelectValue placeholder="Select diagnostic type" />
                                            </SelectTrigger>
                                            <SelectContent className="glass-panel bg-slate-900 border-white/10 text-white rounded-xl">
                                                <SelectItem value="Lab Report" className="focus:bg-primary/20">Biochemical Lab</SelectItem>
                                                <SelectItem value="Diagnostic Summary" className="focus:bg-primary/20">Radiology Synthesis</SelectItem>
                                                <SelectItem value="Prescription" className="focus:bg-primary/20">Pharmacological Rx</SelectItem>
                                                <SelectItem value="Other" className="focus:bg-primary/20">Miscellaneous</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-3">
                                        <Label className="text-xs font-bold uppercase tracking-widest text-indigo-300/40 font-label ml-1">Clinical Context</Label>
                                        <Textarea placeholder="Append relevant clinical notes..." className="glass-panel bg-white/5 border-white/5 h-32 rounded-xl text-white resize-none p-4 placeholder:text-indigo-300/10 focus:ring-primary/40 ring-offset-0" />
                                    </div>
                                </CardContent>
                            </Card>

                            <Button
                                className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-xl shadow-primary/20 transition-all hover:scale-102 active:scale-98 disabled:opacity-40"
                                size="lg"
                                disabled={files.length === 0 || overallStatus !== 'idle'}
                                onClick={handleUpload}
                            >
                                {overallStatus === 'uploading' ? (
                                    <>
                                        <span className="material-symbols-outlined mr-2 animate-spin">sync</span>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined mr-2">analytics</span>
                                        Run Clinical Analysis
                                    </>
                                )}
                            </Button>
                        </motion.div>
                    </div>
                )}
            </motion.div>
        </PageLayout>
    );
}
