import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

function Navbar() {
    const { user, isLoggedIn, logout } = useUser();
    const navigate = useNavigate();
    
    // State dan Ref untuk mengontrol pop-up menu profil
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Menutup dropdown jika user melakukan klik di luar area dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Class untuk link navigasi (Dark Mode)
    const getNavClass = ({ isActive }) => `
        rounded-lg px-3 py-2 text-sm font-medium
        transition-all duration-200
        ${
            isActive
                ? "bg-cyan-950/50 text-cyan-400"
                : "text-slate-300 hover:bg-slate-800 hover:text-cyan-400"
        }
    `;

    const handleLogout = () => {
        logout();
        setIsDropdownOpen(false);
        navigate("/login");
    };

    return (
        <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-4">
                
                {/* Logo */}
                <NavLink
                    to="/home"
                    className="text-xl font-extrabold tracking-tight text-white"
                >
                    Perpustakaan
                    <span className="text-cyan-500"> Digital</span>
                </NavLink>

                {/* Menu Navigasi */}
                <div className="flex flex-wrap items-center gap-2">
                    <NavLink
                        to="/home"
                        className={getNavClass}
                    >
                        Beranda
                    </NavLink>

                    <NavLink
                        to="/galeri"
                        className={getNavClass}
                    >
                        Galeri Buku
                    </NavLink>

                    {isLoggedIn && (
                        <NavLink
                            to="/riwayat-peminjaman"
                            className={getNavClass}
                        >
                            Riwayat
                        </NavLink>
                    )}

                    <NavLink
                        to="/contact"
                        className={getNavClass}
                    >
                        Contact
                    </NavLink>

                    {/* Bagian Akun / Login */}
                    {isLoggedIn ? (
                        <div className="relative ml-2" ref={dropdownRef}>
                            {/* Tombol Avatar Profil dengan warna lebih terang */}
                            <button
                                type="button"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500 text-lg text-white shadow-md transition hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-950"
                            >
                                👤
                            </button>

                            {/* Dropdown Menu (Pop-up Mini) */}
                            {isDropdownOpen && (
                                <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-slate-700 bg-slate-900 p-2 shadow-xl z-50">
                                    
                                    {/* Info User */}
                                    <div className="border-b border-slate-800 px-3 py-3">
                                        <p className="text-sm font-bold text-white truncate">
                                            {user?.nama || "Pengguna"}
                                        </p>
                                        <p className="text-xs text-slate-400 truncate mt-0.5">
                                            {user?.email || "email@tidaktersedia.com"}
                                        </p>
                                    </div>

                                    {/* Tombol Logout */}
                                    <div className="pt-2">
                                        <button
                                            type="button"
                                            onClick={handleLogout}
                                            className="w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-red-400 transition hover:bg-red-500/10"
                                        >
                                            Keluar
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <NavLink
                            to="/login"
                            className="ml-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-500"
                        >
                            Login
                        </NavLink>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
