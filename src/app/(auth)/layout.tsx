export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-mesh p-6">
            <div className="w-full max-w-md relative z-10">
                {children}
            </div>
        </div>
    );
}
