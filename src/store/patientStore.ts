import { create } from 'zustand';
import { Patient } from '@/types';

interface PatientState {
    patients: Patient[];
    setPatients: (patients: Patient[]) => void;
    activePatientId: string | null;
    setActivePatientId: (id: string | null) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export const usePatientStore = create<PatientState>((set) => ({
    patients: [],
    setPatients: (patients) => set({ patients }),
    activePatientId: null,
    setActivePatientId: (id) => set({ activePatientId: id }),
    searchQuery: '',
    setSearchQuery: (searchQuery) => set({ searchQuery }),
}));
