import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useAuth } from "../context/AuthContext";
import useMessages from "../hooks/useMessages";

function AdminLayout() {
    const { logout } =
        useAuth();

    const {
        getUnreadCount
    } = useMessages();

    const navigate =
        useNavigate();

    const [sidebarOpen, setSidebarOpen] =
        useState(false);

    const unreadCount =
        getUnreadCount();

    const handleLogout = () => {
        logout();
        navigate(
            "/admin/login"
        );
    };

    const navItems = [
        {
            label: "Dashboard",
            path: "/admin",
            icon: "📊",
            end: true
        },
        {
            label: "Kelola Buku",
            path: "/admin/buku",
            icon: "📚"
        },
        {
            label: "Pesan",
            path: "/admin/pesan",
            icon: "✉️",
            badge: unreadCount
        }
    ];

    const getNavClass = ({
        isActive
    }) => {
        return `
            group flex items-center gap-3 rounded-xl
            px-4 py-3 text-sm font-semibold
            transition-all duration-200
            ${
                isActive
                    ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }
        `;
    };

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-950">

            {/* Mobile overlay */}
            {sidebarOpen && (
                <button
                    type="button"
                    aria-label="Tutup sidebar"
                    onClick={() =>
                        setSidebarOpen(false)
                    }
                    className="fixed inset-0 z-40 bg-slate-950/60 lg:hidden"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed inset-y-0 left-0 z-50
                    flex w-72 flex-col
                    border-r border-slate-800
                    bg-slate-950
                    transition-transform duration-300
                    ${
                        sidebarOpen
                            ? "translate-x-0"
                            : "-translate-x-full"
                    }
                    lg:translate-x-0
                `}
            >

                {/* Logo */}
                <div className="flex h-20 items-center border-b border-slate-800 px-6">

                    <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500 text-xl shadow-lg shadow-cyan-500/20">
                            📚
                        </div>

                        <div>
                            <p className="font-black text-white">
                                Perpustakaan
                            </p>

                            <p className="text-xs font-semibold text-cyan-400">
                                DIGITAL ADMIN
                            </p>
                        </div>

                    </div>

                    {/* Mobile close */}
                    <button
                        type="button"
                        onClick={() =>
                            setSidebarOpen(false)
                        }
                        className="ml-auto text-xl text-slate-500 hover:text-white lg:hidden"
                    >
                        ×
                    </button>

                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-2 overflow-y-auto p-4">

                    <p className="mb-3 px-4 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-600">
                        Menu Utama
                    </p>

                    {navItems.map(
                        (item) => (
                            <NavLink
                                key={
                                    item.path
                                }
                                to={
                                    item.path
                                }
                                end={
                                    item.end
                                }
                                onClick={() =>
                                    setSidebarOpen(
                                        false
                                    )
                                }
                                className={
                                    getNavClass
                                }
                            >

                                <span className="text-lg">
                                    {item.icon}
                                </span>

                                <span className="flex-1">
                                    {
                                        item.label
                                    }
                                </span>

                                {item.badge >
                                    0 && (
                                    <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-red-500 px-1.5 text-[11px] font-bold text-white">
                                        {
                                            item.badge
                                        }
                                    </span>
                                )}

                            </NavLink>
                        )
                    )}

                    <div className="my-5 border-t border-slate-800" />

                    <p className="mb-3 px-4 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-600">
                        Website
                    </p>

                    <NavLink
                        to="/"
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-400 transition hover:bg-slate-800 hover:text-white"
                    >
                        <span className="text-lg">
                            🌐
                        </span>

                        Lihat Website
                    </NavLink>

                </nav>

                {/* User / Logout */}
                <div className="border-t border-slate-800 p-4">

                    <div className="mb-3 flex items-center gap-3 rounded-xl bg-slate-900 p-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500 font-bold text-white">
                            A
                        </div>

                        <div className="min-w-0">
                            <p className="truncate text-sm font-bold text-white">
                                Administrator
                            </p>

                            <p className="text-xs text-slate-500">
                                admin
                            </p>
                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={
                            handleLogout
                        }
                        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-950/30 hover:text-red-300"
                    >
                        <span className="text-lg">
                            🚪
                        </span>

                        Keluar
                    </button>

                </div>

            </aside>

            {/* Main */}
            <div className="lg:pl-72">

                {/* Topbar */}
                <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90">

                    <div className="flex h-20 items-center justify-between px-5 sm:px-8">

                        <div className="flex items-center gap-4">

                            {/* Mobile menu */}
                            <button
                                type="button"
                                onClick={() =>
                                    setSidebarOpen(
                                        true
                                    )
                                }
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 lg:hidden"
                                aria-label="Buka menu"
                            >
                                ☰
                            </button>

                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                    Admin Panel
                                </p>

                                <p className="font-bold text-slate-900 dark:text-white">
                                    Perpustakaan Digital
                                </p>
                            </div>

                        </div>

                        <div className="flex items-center gap-3">

                            {unreadCount >
                                0 && (
                                <NavLink
                                    to="/admin/pesan"
                                    className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg dark:border-slate-700 dark:bg-slate-900"
                                    title="Pesan baru"
                                >
                                    ✉️

                                    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                                        {
                                            unreadCount
                                        }
                                    </span>
                                </NavLink>
                            )}

                        </div>

                    </div>

                </header>

                {/* Page */}
                <main className="min-h-[calc(100vh-5rem)]">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}

export default AdminLayout;