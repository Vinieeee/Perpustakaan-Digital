import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import useBooks from "../../hooks/useBooks";

function AdminEditBook() {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        getBookById,
        updateBook,
        loading
    } = useBooks();

    const [form, setForm] = useState({
        judul: "",
        subjudul: "",
        penulis: "",
        penerbit: "",
        tahun: "",
        kategori: "",
        identifier: "",
        abstrak: "",
        cover: ""
    });

    const [error, setError] = useState("");
    const [initialized, setInitialized] = useState(false);

    const book = getBookById(id);

    useEffect(() => {
        if (!book || initialized) {
            return;
        }

        setForm({
            judul: book.judul || "",
            subjudul: book.subjudul || "",
            penulis: book.penulis || "",
            penerbit: book.penerbit || "",
            tahun: book.tahun || "",
            kategori: book.kategori || "",
            identifier: book.identifier || "",
            abstrak: book.abstrak || "",
            cover: book.cover || ""
        });

        setInitialized(true);
    }, [book, initialized]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((currentForm) => ({
            ...currentForm,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        setError("");

        if (!form.judul.trim()) {
            setError("Judul buku wajib diisi.");
            return;
        }

        if (!form.penulis.trim()) {
            setError("Penulis buku wajib diisi.");
            return;
        }

        if (!form.penerbit.trim()) {
            setError("Penerbit buku wajib diisi.");
            return;
        }

        if (!form.tahun.trim()) {
            setError("Tahun terbit wajib diisi.");
            return;
        }

        if (!form.kategori.trim()) {
            setError("Kategori buku wajib diisi.");
            return;
        }

        updateBook(id, {
            judul: form.judul.trim(),
            subjudul: form.subjudul.trim(),
            penulis: form.penulis.trim(),
            penerbit: form.penerbit.trim(),
            tahun: form.tahun.trim(),
            kategori: form.kategori.trim(),
            identifier: form.identifier.trim(),
            abstrak: form.abstrak.trim(),
            cover: form.cover.trim()
        });

        navigate("/admin/buku");
    };

    if (loading) {
        return (
            <div className="flex min-h-[500px] flex-col items-center justify-center px-5 py-8 sm:px-8">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-cyan-500 dark:border-slate-700 dark:border-t-cyan-400" />

                <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                    Memuat data buku...
                </p>
            </div>
        );
    }

    if (!book) {
        return (
            <div className="px-5 py-8 sm:px-8">
                <div className="flex min-h-[450px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 text-center dark:border-slate-700 dark:bg-slate-900">
                    <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-100 text-4xl dark:bg-slate-800">
                        🔎
                    </div>

                    <h1 className="mt-6 text-2xl font-black text-slate-900 dark:text-white">
                        Buku Tidak Ditemukan
                    </h1>

                    <p className="mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
                        Data buku yang ingin kamu
                        edit tidak ditemukan.
                    </p>

                    <Link
                        to="/admin/buku"
                        className="mt-6 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-cyan-400"
                    >
                        Kembali ke Kelola Buku
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="px-5 py-8 sm:px-8">
            {/* HEADER */}
            <div className="mb-8">
                <Link
                    to="/admin/buku"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-400"
                >
                    ← Kembali ke Kelola Buku
                </Link>

                <div className="mt-5">
                    <span className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
                        Manajemen Buku
                    </span>

                    <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                        Edit Buku
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                        Perbarui informasi buku
                        yang tersimpan di katalog
                        perpustakaan.
                    </p>
                </div>
            </div>

            {/* ERROR */}
            {error && (
                <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-5 dark:border-red-900/50 dark:bg-red-950/20">
                    <span className="text-xl">
                        ⚠️
                    </span>

                    <div>
                        <p className="font-bold text-red-700 dark:text-red-400">
                            Data belum lengkap
                        </p>

                        <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                            {error}
                        </p>
                    </div>
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >
                {/* INFORMASI UTAMA */}
                <section className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                            Informasi Utama
                        </h2>

                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Perbarui informasi dasar
                            buku.
                        </p>
                    </div>

                    <div className="grid gap-6 p-6 lg:grid-cols-2">
                        {/* JUDUL */}
                        <div className="lg:col-span-2">
                            <label
                                htmlFor="judul"
                                className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
                            >
                                Judul Buku
                                <span className="ml-1 text-red-500">
                                    *
                                </span>
                            </label>

                            <input
                                id="judul"
                                name="judul"
                                type="text"
                                value={form.judul}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                            />
                        </div>

                        {/* SUBJUDUL */}
                        <div className="lg:col-span-2">
                            <label
                                htmlFor="subjudul"
                                className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
                            >
                                Subjudul
                            </label>

                            <input
                                id="subjudul"
                                name="subjudul"
                                type="text"
                                value={form.subjudul}
                                onChange={handleChange}
                                placeholder="Subjudul buku jika ada"
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                            />
                        </div>

                        {/* PENULIS */}
                        <div>
                            <label
                                htmlFor="penulis"
                                className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
                            >
                                Penulis
                                <span className="ml-1 text-red-500">
                                    *
                                </span>
                            </label>

                            <input
                                id="penulis"
                                name="penulis"
                                type="text"
                                value={form.penulis}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                            />
                        </div>

                        {/* PENERBIT */}
                        <div>
                            <label
                                htmlFor="penerbit"
                                className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
                            >
                                Penerbit
                                <span className="ml-1 text-red-500">
                                    *
                                </span>
                            </label>

                            <input
                                id="penerbit"
                                name="penerbit"
                                type="text"
                                value={form.penerbit}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                            />
                        </div>

                        {/* TAHUN */}
                        <div>
                            <label
                                htmlFor="tahun"
                                className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
                            >
                                Tahun Terbit
                                <span className="ml-1 text-red-500">
                                    *
                                </span>
                            </label>

                            <input
                                id="tahun"
                                name="tahun"
                                type="number"
                                min="1000"
                                max="9999"
                                value={form.tahun}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                            />
                        </div>

                        {/* KATEGORI */}
                        <div>
                            <label
                                htmlFor="kategori"
                                className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
                            >
                                Kategori
                                <span className="ml-1 text-red-500">
                                    *
                                </span>
                            </label>

                            <input
                                id="kategori"
                                name="kategori"
                                type="text"
                                value={form.kategori}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                            />
                        </div>

                        {/* IDENTIFIER */}
                        <div className="lg:col-span-2">
                            <label
                                htmlFor="identifier"
                                className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
                            >
                                ID / Identifier
                            </label>

                            <input
                                id="identifier"
                                name="identifier"
                                type="text"
                                value={form.identifier}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                            />
                        </div>
                    </div>
                </section>

                {/* DETAIL */}
                <section className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                            Detail Buku
                        </h2>

                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Perbarui cover dan
                            deskripsi buku.
                        </p>
                    </div>

                    <div className="space-y-6 p-6">
                        {/* COVER */}
                        <div>
                            <label
                                htmlFor="cover"
                                className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
                            >
                                URL Cover Buku
                            </label>

                            <input
                                id="cover"
                                name="cover"
                                type="text"
                                value={form.cover}
                                onChange={handleChange}
                                placeholder="https://..."
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                            />

                            {form.cover && (
                                <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
                                    <img
                                        src={form.cover}
                                        alt="Preview cover"
                                        className="h-64 w-full object-contain bg-slate-100 dark:bg-slate-950"
                                        onError={(event) => {
                                            event.currentTarget.style.display =
                                                "none";
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        {/* ABSTRAK */}
                        <div>
                            <label
                                htmlFor="abstrak"
                                className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
                            >
                                Abstrak / Deskripsi
                            </label>

                            <textarea
                                id="abstrak"
                                name="abstrak"
                                rows="7"
                                value={form.abstrak}
                                onChange={handleChange}
                                placeholder="Tuliskan deskripsi atau abstrak buku..."
                                className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                            />
                        </div>
                    </div>
                </section>

                {/* ACTION */}
                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <Link
                        to="/admin/buku"
                        className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-center text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                        Batal
                    </Link>

                    <button
                        type="submit"
                        className="rounded-xl bg-cyan-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:bg-cyan-400"
                    >
                        Simpan Perubahan
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AdminEditBook;