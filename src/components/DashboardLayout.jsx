import Sidebar from './Sidebar';

export default function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#FFF8F0] flex">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                {children}
            </div>
        </div>
    );
}
