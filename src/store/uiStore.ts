import { create } from 'zustand';

interface UIState {
    sidebarCollapsed: boolean;
    toggleSidebar: () => void;
    openModals: string[];
    openModal: (id: string) => void;
    closeModal: (id: string) => void;
    unreadNotifications: number;
    setUnreadNotifications: (count: number) => void;
}

export const useUIStore = create<UIState>((set) => ({
    sidebarCollapsed: false,
    toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
    openModals: [],
    openModal: (id) => set((state) => ({ openModals: [...state.openModals, id] })),
    closeModal: (id) => set((state) => ({ openModals: state.openModals.filter((m) => m !== id) })),
    unreadNotifications: 3,
    setUnreadNotifications: (count) => set({ unreadNotifications: count }),
}));
