import { create } from 'zustand';
import { UploadedFile } from '@/types';

interface UploadState {
    files: UploadedFile[];
    addFiles: (newFiles: File[]) => void;
    removeFile: (id: string) => void;
    clearFiles: () => void;
    updateProgress: (id: string, progress: number) => void;
    setFileStatus: (id: string, status: UploadedFile['status']) => void;
    selectedPatientId: string | null;
    setSelectedPatientId: (id: string | null) => void;
    overallStatus: 'idle' | 'uploading' | 'completed';
    setOverallStatus: (status: 'idle' | 'uploading' | 'completed') => void;
}

export const useUploadStore = create<UploadState>((set) => ({
    files: [],
    addFiles: (newFiles) =>
        set((state) => ({
            files: [
                ...state.files,
                ...newFiles.map((file) => ({
                    id: Math.random().toString(36).substring(7),
                    file,
                    progress: 0,
                    status: 'pending' as const,
                })),
            ],
        })),
    removeFile: (id) => set((state) => ({ files: state.files.filter((f) => f.id !== id) })),
    clearFiles: () => set({ files: [] }),
    updateProgress: (id, progress) =>
        set((state) => ({
            files: state.files.map((f) => (f.id === id ? { ...f, progress } : f)),
        })),
    setFileStatus: (id, status) =>
        set((state) => ({
            files: state.files.map((f) => (f.id === id ? { ...f, status } : f)),
        })),
    selectedPatientId: null,
    setSelectedPatientId: (id) => set({ selectedPatientId: id }),
    overallStatus: 'idle',
    setOverallStatus: (overallStatus) => set({ overallStatus }),
}));
