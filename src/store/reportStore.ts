import { create } from 'zustand';
import { Report } from '@/types';

interface ReportFilterState {
    searchQuery: string;
    dateRange: { from?: Date; to?: Date } | undefined;
    type?: string;
    status?: string;
}

interface ReportState {
    reports: Report[];
    setReports: (reports: Report[]) => void;
    activeReportId: string | null;
    setActiveReportId: (id: string | null) => void;
    filters: ReportFilterState;
    setFilters: (filters: Partial<ReportFilterState>) => void;
}

export const useReportStore = create<ReportState>((set) => ({
    reports: [],
    setReports: (reports) => set({ reports }),
    activeReportId: null,
    setActiveReportId: (id) => set({ activeReportId: id }),
    filters: { searchQuery: '', dateRange: undefined },
    setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters } })),
}));
