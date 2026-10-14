import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Swal from "sweetalert2"; // Tambahkan SweetAlert2
import { useUser } from "../context/UserContext";
import { useAuth } from "../context/AuthContext";

function Login() {
    const navigate = useNavigate();
    
    // Contexts
    const { login: userLogin, isLoggedIn: isUserLoggedIn } = useUser();
    const { login: adminLogin, isLoggedIn: isAdminLoggedIn } = useAuth();

    // States
    const [activeTab, setActiveTab] = useState("user"); 
    const [isRegister, setIsRegister] = useState(false); 
    
    // Form States
    const [nama, setNama] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    // --- TAMBAHAN: Cek apakah dia tamu ---
    const userRole = localStorage.getItem("userRole");
    const isGuest = userRole === "guest";

    // Jika sudah login (DAN BUKAN TAMU), langsung arahkan ke halaman masing-masing
    if (isAdminLoggedIn) return <Navigate to="/admin" replace />;
    if (isUserLoggedIn && !isGuest) return <Navigate to="/home" replace />;
    // -------------------------------------

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setError("");
        setNama("");
        setEmail("");
        setUsername("");
        setPassword("");
        setShowPassword(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setError("");

        if (activeTab === "admin") {
            const result = adminLogin(username, password);
            if (result.success) {
                navigate("/admin");
            } else {
                setError(result.message || "Username atau password admin salah.");
            }
        } else {
            if (isRegister) {
                if (password.length < 6) {
                    setError("Password minimal 6 karakter.");
                    return;
                }
                const newUser = { nama, email, password };
                localStorage.setItem("registeredUser", JSON.stringify(newUser));
                
                // Ganti alert bawaan dengan SweetAlert2
                Swal.fire({
                    icon: 'success',
                    title: 'Registrasi Berhasil!',
                    text: 'Silakan masuk dengan email dan password Anda.',
                    background: '#0f172a',
                    color: '#f8fafc',
                    confirmButtonColor: '#0891b2'
                });

                setIsRegister(false); 
                setPassword(""); 
            } else {
                const registered = JSON.parse(localStorage.getItem("registeredUser"));
                
                if (registered && registered.email === email && registered.password === password) {
                    // Set role sebagai user normal (member) agar tidak dianggap tamu lagi
                    localStorage.setItem("userRole", "member");
                    
                    const result = userLogin(registered.nama, email);
                    if (result.success) {
                        navigate("/home");
                    } else {
                        setError(result.message);
                    }
                } else {
                    setError("Email atau password salah, atau akun belum terdaftar.");
                }
            }
        }
    };

    const handleGuestLogin = () => {
        localStorage.setItem("userRole", "guest");
        userLogin("Tamu", "guest@perpusdigital.com");
        navigate("/home");
    };

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 py-12">
            
            <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

            <div className="relative z-10 w-full max-w-md">
                <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl shadow-black/30">
                    
                    <div className="border-b border-slate-800 px-8 pt-8">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-950 text-3xl shadow-lg shadow-cyan-900/20">
                            📚
                        </div>
                        <h1 className="mt-4 text-center text-2xl font-black text-white">
                            Perpustakaan Digital
                        </h1>
                        
                        <div className="mt-6 flex gap-2">
                            <button
                                type="button"
                                onClick={() => handleTabChange("user")}
                                className={`flex-1 border-b-2 py-3 text-sm font-bold transition ${
                                    activeTab === "user" ? "border-cyan-500 text-cyan-400" : "border-transparent text-slate-500 hover:text-slate-300"
                                }`}
                            >
                                Pengguna
                            </button>
                            <button
                                type="button"
                                onClick={() => handleTabChange("admin")}
                                className={`flex-1 border-b-2 py-3 text-sm font-bold transition ${
                                    activeTab === "admin" ? "border-cyan-500 text-cyan-400" : "border-transparent text-slate-500 hover:text-slate-300"
                                }`}
                            >
                                Admin
                            </button>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5 p-8">
                        
                        {error && (
                            <div className="rounded-xl border border-red-900/50 bg-red-950/30 p-3 text-center">
                                <p className="text-sm font-medium text-red-400">{error}</p>
                            </div>
                        )}

                        {activeTab === "user" ? (
                            <>
                                {isRegister && (
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-slate-300">Nama Lengkap</label>
                                        <input
                                            type="text"
                                            value={nama}
                                            onChange={(e) => setNama(e.target.value)}
                                            placeholder="Masukkan nama lengkap"
                                            required={isRegister}
                                            className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 px-4 text-sm text-white outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                                        />
                                    </div>
                                )}
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-300">Email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="contoh@email.com"
                                        required
                                        className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 px-4 text-sm text-white outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-300">Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Masukkan password"
                                            required
                                            className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-4 pr-12 text-sm text-white outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                                        >
                                            {showPassword ? "🙈" : "👁️"}
                                        </button>
                                    </div>
                                </div>

                                <button type="submit" className="mt-2 w-full rounded-xl bg-cyan-600 px-6 py-3.5 font-bold text-white transition hover:bg-cyan-500">
                                    {isRegister ? "Daftar Akun" : "Masuk"}
                                </button>
                                
                                <p className="text-center text-sm text-slate-400">
                                    {isRegister ? "Sudah punya akun? " : "Belum punya akun? "}
                                    <button 
                                        type="button" 
                                        onClick={() => {
                                            setIsRegister(!isRegister);
                                            setError("");
                                        }} 
                                        className="font-semibold text-cyan-400 hover:underline"
                                    >
                                        {isRegister ? "Masuk di sini" : "Daftar di sini"}
                                    </button>
                                </p>

                                {!isRegister && (
                                    <>
                                        <div className="my-6 flex items-center gap-3">
                                            <hr className="flex-1 border-slate-800" />
                                            <span className="text-xs font-semibold text-slate-500">ATAU</span>
                                            <hr className="flex-1 border-slate-800" />
                                        </div>

                                        <button 
                                            type="button"
                                            onClick={handleGuestLogin}
                                            className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 font-bold text-slate-400 transition hover:border-slate-600 hover:text-white"
                                        >
                                            Masuk sebagai Tamu
                                        </button>
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-300">Username</label>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Gunakan: admin"
                                        required
                                        className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 px-4 text-sm text-white outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-300">Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Gunakan: 123"
                                            required
                                            className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-4 pr-12 text-sm text-white outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                                        >
                                            {showPassword ? "🙈" : "👁️"}
                                        </button>
                                    </div>
                                </div>
                                <button type="submit" className="mt-2 w-full rounded-xl bg-cyan-600 px-6 py-3.5 font-bold text-white transition hover:bg-cyan-500">
                                    Masuk Dashboard
                                </button>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </main>
    );
}

export default Login;