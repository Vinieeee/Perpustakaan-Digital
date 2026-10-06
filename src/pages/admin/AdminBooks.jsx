import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

import useBooks from "../../hooks/useBooks";

function AdminBooks() {
    const {
        books,
        loading,
        error,
        deleteBook
    } = useBooks();

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");

    const categories = useMemo(() => {
        return [
            ...new Set(
                books
                    .map((book) => book.kategori)
                    .filter(Boolean)
            )
        ].sort();
    }, [books]);

    const filteredBooks = useMemo(() => {
        const keyword = search
            .toLowerCase()
            .trim();

        return books.filter((book) => {
            const searchableText = [
                book.judul,
                book.penulis,
                book.penerbit,
                book.tahun,
                book.identifier
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();

            const matchesSearch =
                !keyword ||
                searchableText.includes(keyword);

            const matchesCategory =
                !category ||
                book.kategori === category;

            return (
                matchesSearch &&
                matchesCategory
            );
        });
    }, [books, search, category]);

    const handleDelete = (book) => {
        const confirmed = window.confirm(
            `Yakin ingin menghapus buku "${book.judul}"?`
        );

        if (!confirmed) {
            return;
        }

        deleteBook(book.id);
    };

    const resetFilter = () => {
        setSearch("");
        setCategory("");
    };

    return (
        <div className="px-5 py-8 sm:px-8">
            {/* HEADER */}
            <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <span className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
                        Manajemen
                    </span>

                    <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                        Kelola Buku
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                        Kelola koleksi buku yang
                        tersedia pada katalog
                        perpustakaan digital.
                    </p>
                </div>

                <Link
                    to="/admin/buku/tambah"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:bg-cyan-400"
                >
                    <span className="text-lg">
                        +
                    </span>
                    Tambah Buku
                </Link>
            </div>

            {/* STATISTIC */}
            <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Total Buku
                            </p>

                            <p className="mt-2 text-3xl font-black text-slate-900 dark:text-white">
                                {books.length}
                            </p>
                        </div>

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-100 text-2xl dark:bg-cyan-950/50">
                            📚
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Hasil Pencarian
                            </p>

                            <p className="mt-2 text-3xl font-black text-slate-900 dark:text-white">
                                {filteredBooks.length}
                            </p>
                        </div>

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl dark:bg-blue-950/50">
                            🔎
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Kategori
                            </p>

                            <p className="mt-2 text-3xl font-black text-slate-900 dark:text-white">
                                {categories.length}
                            </p>
                        </div>

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-2xl dark:bg-purple-950/50">
                            🗂️
                        </div>
                    </div>
                </div>
            </div>

            {/* FILTER */}
            <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px_auto]">
                    <div className="relative">
                        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                            🔎
                        </span>

                        <input
                            type="text"
                            value={search}
                            onChange={(event) =>
                                setSearch(
                                    event.target.value
                                )
                            }
                            placeholder="Cari judul, penulis, penerbit, tahun..."
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500"
                        />
                    </div>

                    <select
                        value={category}
                        onChange={(event) =>
                            setCategory(
                                event.target.value
                            )
                        }
                        className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"
                    >
                        <option value="">
                            Semua Kategori
                        </option>

                        {categories.map(
                            (item) => (
                                <option
                                    key={item}
                                    value={item}
                                >
                                    {item}
                                </option>
                            )
                        )}
                    </select>

                    <button
                        type="button"
                        onClick={resetFilter}
                        className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-cyan-300 hover:text-cyan-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-cyan-500 dark:hover:text-cyan-400"
                    >
                        Reset Filter
                    </button>
                </div>

                <div className="mt-5 border-t border-slate-100 pt-4 dark:border-slate-800">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Menampilkan{" "}
                        <span className="font-bold text-slate-900 dark:text-white">
                            {filteredBooks.length}
                        </span>{" "}
                        dari{" "}
                        <span className="font-bold text-slate-900 dark:text-white">
                            {books.length}
                        </span>{" "}
                        buku
                    </p>
                </div>
            </div>

            {/* LOADING */}
            {loading && (
                <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-cyan-500 dark:border-slate-700 dark:border-t-cyan-400" />

                    <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                        Memuat data buku...
                    </p>
                </div>
            )}

            {/* ERROR */}
            {error && !loading && (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900/50 dark:bg-red-950/20">
                    <div className="text-4xl">
                        ⚠️
                    </div>

                    <h2 className="mt-4 font-bold text-red-700 dark:text-red-400">
                        Gagal Memuat Data
                    </h2>

                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        {error}
                    </p>
                </div>
            )}

            {/* EMPTY */}
            {!loading &&
                !error &&
                filteredBooks.length === 0 && (
                    <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 text-center dark:border-slate-700 dark:bg-slate-900">
                        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-100 text-4xl dark:bg-slate-800">
                            📚
                        </div>

                        <h2 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">
                            Buku Tidak Ditemukan
                        </h2>

                        <p className="mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
                            Tidak ada buku yang
                            sesuai dengan
                            pencarian atau filter
                            yang digunakan.
                        </p>

                        <button
                            type="button"
                            onClick={resetFilter}
                            className="mt-5 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-cyan-400"
                        >
                            Reset Filter
                        </button>
                    </div>
                )}

            {/* DESKTOP TABLE */}
            {!loading &&
                !error &&
                filteredBooks.length > 0 && (
                    <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 md:block">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[900px] text-left">
                                <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
                                    <tr>
                                        <th className="w-16 px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                            No
                                        </th>

                                        <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                            Buku
                                        </th>

                                        <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                            Penulis
                                        </th>

                                        <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                            Penerbit
                                        </th>

                                        <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                            Tahun
                                        </th>

                                        <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                            Kategori
                                        </th>

                                        <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {filteredBooks.map(
                                        (
                                            book,
                                            index
                                        ) => (
                                            <tr
                                                key={
                                                    book.id
                                                }
                                                className="transition hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                            >
                                                <td className="px-5 py-5 text-sm font-semibold text-slate-400">
                                                    {index +
                                                        1}
                                                </td>

                                                <td className="max-w-[280px] px-5 py-5">
                                                    <div className="flex items-center gap-4">
                                                        <div className="flex h-14 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100 text-xl dark:bg-slate-800">
                                                            {book.cover ? (
                                                                <img
                                                                    src={
                                                                        book.cover
                                                                    }
                                                                    alt={
                                                                        book.judul
                                                                    }
                                                                    className="h-full w-full object-cover"
                                                                />
                                                            ) : (
                                                                "📚"
                                                            )}
                                                        </div>

                                                        <div className="min-w-0">
                                                            <p className="line-clamp-2 font-bold text-slate-900 dark:text-white">
                                                                {
                                                                    book.judul
                                                                }
                                                            </p>

                                                            {book.identifier && (
                                                                <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">
                                                                    ID:{" "}
                                                                    {
                                                                        book.identifier
                                                                    }
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="max-w-[200px] px-5 py-5 text-sm text-slate-600 dark:text-slate-400">
                                                    <span className="line-clamp-2">
                                                        {
                                                            book.penulis ||
                                                            "-"
                                                        }
                                                    </span>
                                                </td>

                                                <td className="max-w-[180px] px-5 py-5 text-sm text-slate-600 dark:text-slate-400">
                                                    <span className="line-clamp-2">
                                                        {
                                                            book.penerbit ||
                                                            "-"
                                                        }
                                                    </span>
                                                </td>

                                                <td className="px-5 py-5 text-sm font-semibold text-slate-700 dark:text-slate-300">
                                                    {book.tahun ||
                                                        "-"}
                                                </td>

                                                <td className="px-5 py-5">
                                                    <span className="inline-flex rounded-full bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-400">
                                                        {book.kategori ||
                                                            "Umum"}
                                                    </span>
                                                </td>

                                                <td className="px-5 py-5">
                                                    <div className="flex justify-end gap-2">
                                                        <Link
                                                            to={`/admin/buku/edit/${book.id}`}
                                                            className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-bold text-blue-600 transition hover:bg-blue-100 dark:border-blue-900/50 dark:bg-blue-950/30 dark:text-blue-400 dark:hover:bg-blue-950/60"
                                                        >
                                                            Edit
                                                        </Link>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    book
                                                                )
                                                            }
                                                            className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-100 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-950/60"
                                                        >
                                                            Hapus
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

            {/* MOBILE CARDS */}
            {!loading &&
                !error &&
                filteredBooks.length > 0 && (
                    <div className="space-y-4 md:hidden">
                        {filteredBooks.map(
                            (book, index) => (
                                <article
                                    key={book.id}
                                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                                >
                                    <div className="flex gap-4">
                                        <div className="flex h-28 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-100 text-3xl dark:bg-slate-800">
                                            {book.cover ? (
                                                <img
                                                    src={
                                                        book.cover
                                                    }
                                                    alt={
                                                        book.judul
                                                    }
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                "📚"
                                            )}
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-start justify-between gap-3">
                                                <span className="text-xs font-bold text-slate-400">
                                                    #
                                                    {index +
                                                        1}
                                                </span>

                                                <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[10px] font-bold text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-400">
                                                    {book.kategori ||
                                                        "Umum"}
                                                </span>
                                            </div>

                                            <h3 className="mt-2 line-clamp-3 font-bold leading-5 text-slate-900 dark:text-white">
                                                {
                                                    book.judul
                                                }
                                            </h3>

                                            <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
                                                {
                                                    book.penulis ||
                                                    "-"
                                                }
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                Penerbit
                                            </p>

                                            <p className="mt-1 line-clamp-2 text-xs text-slate-600 dark:text-slate-400">
                                                {
                                                    book.penerbit ||
                                                    "-"
                                                }
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                Tahun
                                            </p>

                                            <p className="mt-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
                                                {
                                                    book.tahun ||
                                                    "-"
                                                }
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex gap-2">
                                        <Link
                                            to={`/admin/buku/edit/${book.id}`}
                                            className="flex-1 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-center text-xs font-bold text-blue-600 transition hover:bg-blue-100 dark:border-blue-900/50 dark:bg-blue-950/30 dark:text-blue-400"
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleDelete(
                                                    book
                                                )
                                            }
                                            className="flex-1 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-bold text-red-600 transition hover:bg-red-100 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </article>
                            )
                        )}
                    </div>
                )}
        </div>
    );
}

export default AdminBooks;