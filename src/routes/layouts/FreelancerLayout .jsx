import React, { useState, useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { routeNameMap } from '../../constants/routeNameMap'
import { Sidebar } from '../../components/DashboardComponents/Sidebar';
import { TopNav } from '../../components/DashboardComponents/TopNav';
import { Button } from '../../components/SiteComponents/ui/button';

const FreelancerLayout  = () => {
    const [showSidebar, setShowSidebar] = useState(true);
    const location = useLocation();

    const toggleSidebar = () => {
        setShowSidebar(prev => !prev);
    };

    const currentRouteName = useMemo(() => {
        const path = location.pathname;
        const sortedRoutes = Object.keys(routeNameMap).sort((a, b) => b.length - a.length);
        for (const route of sortedRoutes) {
            if (path.startsWith(route)) return routeNameMap[route];
        }
        return '';
    }, [location.pathname]);

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            {showSidebar && (
                <div className="w-64 bg-gray-100 border-r">
                    <Sidebar />
                </div>
            )}

            {/* Main Content */}
            <div className="flex-1">
                {/* Toggle Button and current page name */}
                <div className="flex items-center justify-between p-2 border-b">
                    <div className="flex items-center gap-10">
                        <Button onClick={toggleSidebar} variant="outline">
                            <Menu className="h-5 w-5 mr-2" />
                            {showSidebar ? 'Hide Sidebar' : 'Show Sidebar'}
                        </Button>
                        <span className="font-semibold text-lg">{currentRouteName}</span>
                    </div>

                    <TopNav />
                </div>

                {/* Page Content */}
                <div className="p-10 bg-[#F0EFEC]">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default FreelancerLayout ;
