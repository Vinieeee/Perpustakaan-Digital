import { Outlet } from "react-router-dom";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

function UserLayout() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950">
            <Navbar />

            <Outlet />

            <Footer />
        </div>
    );
}

export default UserLayout;