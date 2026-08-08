import { create } from 'zustand';

interface AnalyticsState {
    dateRange: { from?: Date; to?: Date } | undefined;
    setDateRange: (range: { from?: Date; to?: Date } | undefined) => void;
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export const useAnalyticsStore = create<AnalyticsState>((set) => ({
    dateRange: undefined,
    setDateRange: (dateRange) => set({ dateRange }),
    activeTab: 'overview',
    setActiveTab: (activeTab) => set({ activeTab }),
}));
