import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import useBooks from "../../hooks/useBooks";

function AdminAddBook() {
    const navigate = useNavigate();

    const { addBook } = useBooks();

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

        addBook({
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
                        Tambah Buku
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                        Tambahkan koleksi buku baru
                        ke dalam katalog perpustakaan
                        digital.
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
                            Informasi dasar mengenai buku.
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
                                placeholder="Contoh: Marketing Management"
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
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
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
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
                                placeholder="Contoh: Philip Kotler"
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
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
                                placeholder="Contoh: Pearson"
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
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
                                placeholder="Contoh: 2024"
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
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
                                placeholder="Contoh: Marketing"
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
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
                                placeholder="Contoh: 8105"
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                            />

                            <p className="mt-2 text-xs text-slate-400">
                                ID ini bersifat opsional.
                            </p>
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
                            Informasi tambahan mengenai
                            koleksi buku.
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
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                            />

                            <p className="mt-2 text-xs text-slate-400">
                                Masukkan URL gambar cover
                                jika tersedia.
                            </p>
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

                {/* BUTTON */}
                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
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
                        Simpan Buku
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AdminAddBook;