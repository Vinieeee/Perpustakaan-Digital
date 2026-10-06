import { useState } from "react";
import { Link } from "react-router-dom";

function BookSlider({ books }) {
    const [currentIndex, setCurrentIndex] =
        useState(0);

    if (!books || books.length === 0) {
        return null;
    }

    const visibleBooks = Array.from(
        {
            length: Math.min(
                3,
                books.length
            )
        },
        (_, offset) =>
            books[
                (currentIndex + offset) %
                    books.length
            ]
    );

    const nextSlide = () => {
        setCurrentIndex(
            (currentIndex + 1) %
                books.length
        );
    };

    const previousSlide = () => {
        setCurrentIndex(
            (currentIndex - 1 + books.length) %
                books.length
        );
    };

    return (
        <section className="bg-slate-50 py-20 dark:bg-slate-900">

            <div className="mx-auto max-w-7xl px-6">

                {/* Header */}
                <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                    <div>
                        <span className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
                            Koleksi
                        </span>

                        <h2 className="mt-2 text-3xl font-black text-slate-900 dark:text-white md:text-4xl">
                            Buku Pilihan
                        </h2>

                        <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
                            Temukan beberapa koleksi
                            buku yang tersedia di
                            perpustakaan digital.
                        </p>
                    </div>

                    <Link
                        to="/galeri"
                        className="font-semibold text-cyan-600 transition hover:text-cyan-500 dark:text-cyan-400"
                    >
                        Lihat Semua →
                    </Link>

                </div>

                {/* Slider */}
                <div className="relative">

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

                        {visibleBooks.map(
                            (book) => (
                                <Link
                                    key={book.id}
                                    to={`/galeri/buku/${book.id}`}
                                    className="group"
                                >
                                    <article className="h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-slate-800 dark:bg-slate-950">

                                        {/* Cover */}
                                        <div className="aspect-[3/4] overflow-hidden bg-slate-100 dark:bg-slate-800">

                                            {book.cover ? (
                                                <img
                                                    src={book.cover}
                                                    alt={book.judul}
                                                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                                                />
                                            ) : (
                                                <div className="flex h-full items-center justify-center p-6 text-center">

                                                    <div>
                                                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-100 text-2xl dark:bg-cyan-950/50">
                                                            📚
                                                        </div>

                                                        <p className="text-sm font-medium text-slate-400">
                                                            Tidak ada cover
                                                        </p>
                                                    </div>

                                                </div>
                                            )}

                                        </div>

                                        {/* Info */}
                                        <div className="p-6">

                                            <div className="mb-3 flex items-center justify-between gap-3">

                                                <span className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">
                                                    {book.tahun ||
                                                        "-"}
                                                </span>

                                                <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-400">
                                                    {book.kategori ||
                                                        "Umum"}
                                                </span>

                                            </div>

                                            <h3 className="line-clamp-2 text-xl font-bold text-slate-900 dark:text-white">
                                                {book.judul}
                                            </h3>

                                            <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                                {book.penulis ||
                                                    "-"}
                                            </p>

                                            <div className="mt-5 border-t border-slate-100 pt-4 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-500">
                                                {book.penerbit ||
                                                    "-"}
                                            </div>

                                        </div>

                                    </article>
                                </Link>
                            )
                        )}

                    </div>

                    {/* Navigation */}
                    {books.length > 1 && (
                        <div className="mt-8 flex justify-center gap-3">

                            <button
                                type="button"
                                onClick={previousSlide}
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-lg text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-300 hover:text-cyan-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-cyan-500 dark:hover:text-cyan-400"
                                aria-label="Buku sebelumnya"
                            >
                                ←
                            </button>

                            <button
                                type="button"
                                onClick={nextSlide}
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-lg text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-300 hover:text-cyan-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-cyan-500 dark:hover:text-cyan-400"
                                aria-label="Buku berikutnya"
                            >
                                →
                            </button>

                        </div>
                    )}

                </div>

            </div>

        </section>
    );
}

export default BookSlider;