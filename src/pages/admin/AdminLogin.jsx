import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

function AdminLogin() {
    const {
        isLoggedIn,
        login
    } = useAuth();

    const navigate = useNavigate();

    const [username, setUsername] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [error, setError] =
        useState("");

    const [showPassword, setShowPassword] =
        useState(false);

    if (isLoggedIn) {
        return (
            <Navigate
                to="/admin"
                replace
            />
        );
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        setError("");

        const result = login(
            username,
            password
        );

        if (result.success) {
            navigate("/admin");
            return;
        }

        setError(
            result.message ||
                "Login gagal."
        );
    };

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 py-12">

            {/* Background decoration */}
            <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-md">

                <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl shadow-black/30">

                    {/* Header */}
                    <div className="border-b border-slate-800 px-8 py-8 text-center">

                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500 text-3xl shadow-lg shadow-cyan-500/20">
                            📚
                        </div>

                        <h1 className="mt-6 text-2xl font-black text-white">
                            Admin Login
                        </h1>

                        <p className="mt-2 text-sm text-slate-400">
                            Masuk ke dashboard
                            Perpustakaan Digital
                        </p>

                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5 p-8"
                    >

                        {/* Error */}
                        {error && (
                            <div className="rounded-xl border border-red-900/50 bg-red-950/30 p-4">

                                <p className="text-sm font-medium text-red-400">
                                    {error}
                                </p>

                            </div>
                        )}

                        {/* Username */}
                        <div>

                            <label
                                htmlFor="username"
                                className="mb-2 block text-sm font-semibold text-slate-300"
                            >
                                Username
                            </label>

                            <div className="relative">

                                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
                                    👤
                                </span>

                                <input
                                    id="username"
                                    type="text"
                                    value={
                                        username
                                    }
                                    onChange={(
                                        event
                                    ) =>
                                        setUsername(
                                            event
                                                .target
                                                .value
                                        )
                                    }
                                    placeholder="Masukkan username"
                                    autoComplete="username"
                                    className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10"
                                />

                            </div>

                        </div>

                        {/* Password */}
                        <div>

                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-semibold text-slate-300"
                            >
                                Password
                            </label>

                            <div className="relative">

                                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
                                    🔒
                                </span>

                                <input
                                    id="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={
                                        password
                                    }
                                    onChange={(
                                        event
                                    ) =>
                                        setPassword(
                                            event
                                                .target
                                                .value
                                        )
                                    }
                                    placeholder="Masukkan password"
                                    autoComplete="current-password"
                                    className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-11 pr-12 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(
                                            (
                                                current
                                            ) =>
                                                !current
                                        )
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-slate-500 transition hover:text-slate-300"
                                    aria-label={
                                        showPassword
                                            ? "Sembunyikan password"
                                            : "Tampilkan password"
                                    }
                                >
                                    {showPassword
                                        ? "🙈"
                                        : "👁️"}
                                </button>

                            </div>

                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full rounded-xl bg-cyan-500 px-6 py-3.5 font-bold text-white shadow-lg shadow-cyan-500/10 transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-400"
                        >
                            Masuk ke Dashboard
                        </button>

                    </form>

                    {/* Footer */}
                    <div className="border-t border-slate-800 px-8 py-5 text-center">

                        <p className="text-xs text-slate-500">
                            Perpustakaan Digital
                            © 2026
                        </p>

                    </div>

                </div>

            </div>

        </main>
    );
}

export default AdminLogin;