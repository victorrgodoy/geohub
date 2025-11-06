import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function MainLayout() {
    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
            <Sidebar />

            <main className="flex-1 flex flex-col overflow-auto ml-64">
                <div className="max-w-7xl mx-auto w-full px-8">
                    <Header />
                    <Outlet />
                </div>
            </main>
        </div>
    );
}