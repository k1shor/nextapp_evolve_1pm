import Sidebar from "../components/admin/Sidebar";

export const metadata = {
    title: "Dashboard",
    description: "Dashboard",
};

export default function RootLayout({ children }) {
    return (
        <>
            <div className="grid grid-cols-5">
                <div className="md:col-span-1">
                    <Sidebar/>
                </div>
                <div className="md:col-span-4 w-full p-20">
                    {children}
                </div>

            </div>
        </>
    );
}
