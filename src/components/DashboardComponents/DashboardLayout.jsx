import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
    return (
        <div className="flex min-h-screen w-full flex-col bg-background">
            <div className="flex flex-1">
                <main className="flex-1">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
