import AppSidebar from "./AppSidebar.tsx";
import {SidebarProvider, useSidebar} from "../../context/SidebarContext.tsx";
import {Outlet} from "react-router";
import Backdrop from "./Backdrop.tsx";
import AppHeader from "./AppHeader.tsx";
import {Helmet} from "react-helmet-async";

const LayoutContent: React.FC = () => {
    const { isExpanded, isHovered, isMobileOpen } = useSidebar();

    console.log("App rendered");

    return (
        <div className="min-h-screen xl:flex">
            <div>
                <AppSidebar />
                <Backdrop />
            </div>
            <div
                className={`flex-1 transition-all duration-300 ease-in-out ${
                    isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
                } ${isMobileOpen ? "ml-0" : ""}`}
            >
                <AppHeader />
                <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

const AdminLayout: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Адмін панель</title>
            </Helmet>
        <SidebarProvider>
            <LayoutContent />
        </SidebarProvider>
        </>
    );
};

export default AdminLayout;