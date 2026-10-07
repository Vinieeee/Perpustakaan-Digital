import {
    useState
} from "react";

import {
    Link,
    useLocation,
    useNavigate
} from "react-router-dom";

import {
    useUser
} from "../../context/UserContext";

function UserLogin() {
    const [nama, setNama] = useState("");
    const [email, setEmail] = useState("");

    const {
        login
    } = useUser();

    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = (event) => {
        event.preventDefault();

        const result = login(
            nama,
            email
        );

        if (!result.success) {
            alert(result.message);
            return;
        }

        const redirectTo =
            location.state?.from ||
            "/galeri";

        navigate(
            redirectTo,
            { replace: true }
        );
    };

    return (
        <main className="min-h-screen bg-slate-50 px-6 py-12 dark:bg-slate-950">

            <div className="mx-auto flex min-h-[70vh] max-w-md items-center justify-center">

                <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900">

                    <div className="text-center">

                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-cyan-50 text-4xl dark:bg-cyan-950/40">
                            📚
                        </div>

                        <h1 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">
                            Login Pengguna
                        </h1>

                        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                            Masuk terlebih dahulu untuk
                            melakukan peminjaman buku.
                        </p>

                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="mt-8 space-y-5"
                    >

                        <div>

                            <label
                                htmlFor="nama"
                                className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
                            >
                                Nama Lengkap
                            </label>

                            <input
                                id="nama"
                                type="text"
                                value={nama}
                                onChange={(event) =>
                                    setNama(
                                        event.target.value
                                    )
                                }
                                placeholder="Masukkan nama lengkap"
                                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                            />

                        </div>

                        <div>

                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
                            >
                                Email
                            </label>

                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(
                                        event.target.value
                                    )
                                }
                                placeholder="contoh@email.com"
                                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                            />

                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-xl bg-cyan-600 px-5 py-3 font-semibold text-white transition hover:bg-cyan-700"
                        >
                            Masuk & Lanjutkan
                        </button>

                    </form>

                    <div className="mt-6 text-center">

                        <Link
                            to="/galeri"
                            className="text-sm font-medium text-slate-500 transition hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-400"
                        >
                            ← Kembali ke Galeri
                        </Link>

                    </div>

                </div>

            </div>

        </main>
    );
}

export default UserLogin;