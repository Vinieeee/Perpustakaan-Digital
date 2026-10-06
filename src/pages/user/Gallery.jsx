import { useMemo, useState } from "react";

import BookGrid from "../../components/books/BookGrid";
import useBooks from "../../hooks/useBooks";

function Gallery() {
    const {
        books,
        loading,
        error
    } = useBooks();

    const [search, setSearch] =
        useState("");

    const [category, setCategory] =
        useState("");

    const [year, setYear] =
        useState("");

    const categories = useMemo(() => {
        return [
            ...new Set(
                books
                    .map(
                        (book) =>
                            book.kategori
                    )
                    .filter(Boolean)
            )
        ].sort();
    }, [books]);

    const years = useMemo(() => {
        return [
            ...new Set(
                books
                    .map(
                        (book) =>
                            book.tahun
                    )
                    .filter(Boolean)
            )
        ].sort(
            (a, b) =>
                Number(b) -
                Number(a)
        );
    }, [books]);

    const filteredBooks = useMemo(() => {
        const keyword =
            search
                .toLowerCase()
                .trim();

        return books.filter((book) => {

            const matchesSearch =
                !keyword ||
                book.judul
                    ?.toLowerCase()
                    .includes(keyword) ||
                book.penulis
                    ?.toLowerCase()
                    .includes(keyword) ||
                book.penerbit
                    ?.toLowerCase()
                    .includes(keyword);

            const matchesCategory =
                !category ||
                book.kategori ===
                    category;

            const matchesYear =
                !year ||
                String(book.tahun) ===
                    String(year);

            return (
                matchesSearch &&
                matchesCategory &&
                matchesYear
            );
        });
    }, [
        books,
        search,
        category,
        year
    ]);

    const resetFilter = () => {
        setSearch("");
        setCategory("");
        setYear("");
    };

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950">

            {/* Header */}
            <section className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">

                <div className="mx-auto max-w-7xl px-6 py-14">

                    <span className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
                        Koleksi
                    </span>

                    <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-900 dark:text-white md:text-5xl">
                        Galeri Buku
                    </h1>

                    <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
                        Jelajahi koleksi buku
                        perpustakaan dan temukan
                        buku yang sesuai dengan
                        kebutuhanmu.
                    </p>

                </div>

            </section>

            {/* Content */}
            <section className="mx-auto max-w-7xl px-6 py-10">

                {/* Search & Filter */}
                <div className="mb-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

                    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px_180px_auto]">

                        {/* Search */}
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
                                placeholder="Cari judul, penulis, atau penerbit..."
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500"
                            />

                        </div>

                        {/* Category */}
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

                        {/* Year */}
                        <select
                            value={year}
                            onChange={(event) =>
                                setYear(
                                    event.target.value
                                )
                            }
                            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"
                        >
                            <option value="">
                                Semua Tahun
                            </option>

                            {years.map(
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

                        {/* Reset */}
                        <button
                            type="button"
                            onClick={resetFilter}
                            className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-cyan-300 hover:text-cyan-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-cyan-500 dark:hover:text-cyan-400"
                        >
                            Reset
                        </button>

                    </div>

                    {/* Result Info */}
                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">

                        <p className="text-sm text-slate-500 dark:text-slate-400">

                            Menampilkan{" "}

                            <span className="font-bold text-slate-900 dark:text-white">
                                {filteredBooks.length}
                            </span>

                            {" "}dari{" "}

                            <span className="font-bold text-slate-900 dark:text-white">
                                {books.length}
                            </span>

                            {" "}buku

                        </p>

                        {(search ||
                            category ||
                            year) && (
                            <button
                                type="button"
                                onClick={resetFilter}
                                className="text-sm font-semibold text-cyan-600 hover:text-cyan-500 dark:text-cyan-400"
                            >
                                Hapus semua filter
                            </button>
                        )}

                    </div>

                </div>

                {/* Loading */}
                {loading && (
                    <div className="flex min-h-[300px] flex-col items-center justify-center">

                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-cyan-500 dark:border-slate-700 dark:border-t-cyan-400" />

                        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                            Memuat koleksi buku...
                        </p>

                    </div>
                )}

                {/* Error */}
                {error && !loading && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900/50 dark:bg-red-950/20">

                        <h2 className="font-bold text-red-700 dark:text-red-400">
                            Gagal Memuat Data
                        </h2>

                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            {error}
                        </p>

                    </div>
                )}

                {/* Books */}
                {!loading &&
                    !error && (
                        <BookGrid
                            books={
                                filteredBooks
                            }
                        />
                    )}

            </section>

        </main>
    );
}

export default Gallery;