import { Sidebar } from '@/components/layout/Sidebar';
import { Topbar } from '@/components/layout/Topbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-background text-foreground bg-mesh">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
                <Topbar />
                <main className="flex-1 pt-28 px-12 pb-12 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
