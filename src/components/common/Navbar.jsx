import { NavLink } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

function Navbar() {
    const {
        theme,
        toggleTheme
    } = useTheme();

    const getNavClass = ({ isActive }) => {
        return `
            rounded-lg px-3 py-2 text-sm font-medium
            transition-all duration-200
            ${
                isActive
                    ? "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/50 dark:text-cyan-400"
                    : "text-slate-600 hover:bg-slate-100 hover:text-cyan-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-cyan-400"
            }
        `;
    };

    return (
        <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90">

            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                <NavLink
                    to="/"
                    className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white"
                >
                    Perpustakaan
                    <span className="text-cyan-500">
                        Digital
                    </span>
                </NavLink>

                <div className="flex items-center gap-2">

                    <NavLink
                        to="/"
                        className={getNavClass}
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/galeri"
                        className={getNavClass}
                    >
                        Galeri Buku
                    </NavLink>

                    <NavLink
                        to="/contact"
                        className={getNavClass}
                    >
                        Contact
                    </NavLink>

                    <NavLink
                        to="/admin/login"
                        className={getNavClass}
                    >
                        Admin
                    </NavLink>

                    <button
                        className="ml-2 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-lg transition hover:-translate-y-0.5 hover:border-cyan-300 dark:border-slate-700 dark:bg-slate-800"
                        onClick={toggleTheme}
                        aria-label="Ganti tema"
                    >
                        {theme === "light"
                            ? "🌙"
                            : "☀️"}
                    </button>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;