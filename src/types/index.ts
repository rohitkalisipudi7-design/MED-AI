export type UserRole = 'Doctor' | 'Nurse' | 'Admin';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
}

export type ReportType = 'Lab Report' | 'Prescription' | 'Diagnostic Summary' | 'Other';
export type ReportStatus = 'Processing' | 'Completed' | 'Failed' | 'Reviewed';

export interface Report {
    id: string;
    name: string;
    patientId: string;
    patientName?: string;
    dateUploaded: string;
    type: ReportType;
    status: ReportStatus;
    abnormalFlagCount: number;
    /** AI-generated analysis from Med AI backend */
    analysis?: string;
    /** Extracted text from the original document */
    originalDocument?: string;
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    assignedDoctor: string;
    contactInfo?: string;
    avatar?: string;
    recentReportDate?: string;
    totalAbnormalCount?: number;
}

export interface UploadedFile {
    id: string;
    file: File;
    progress: number;
    status: 'pending' | 'uploading' | 'completed' | 'error';
}
