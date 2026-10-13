import { useState } from "react";
import { Link } from "react-router-dom";
import BookCard from "./BookCard"; // Import komponen BookCard agar seragam dengan galeri

function BookSlider({ books }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!books || books.length === 0) {
        return null;
    }

    // Menampilkan hingga 5 atau 6 buku sekaligus di layar desktop agar ukurannya kecil
    const visibleCount = 5;
    const visibleBooks = Array.from(
        {
            length: Math.min(visibleCount, books.length)
        },
        (_, offset) => books[(currentIndex + offset) % books.length]
    );

    const nextSlide = () => {
        setCurrentIndex((currentIndex + 1) % books.length);
    };

    const previousSlide = () => {
        setCurrentIndex((currentIndex - 1 + books.length) % books.length);
    };

    return (
        <section className="bg-slate-900 py-16">
            <div className="mx-auto max-w-7xl px-6">

                {/* Header */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
                            Koleksi
                        </span>

                        <h2 className="mt-1 text-2xl font-black text-white md:text-3xl">
                            Buku Pilihan
                        </h2>

                        <p className="mt-2 text-sm text-slate-400">
                            Temukan beberapa koleksi buku yang tersedia di perpustakaan digital.
                        </p>
                    </div>

                    <Link
                        to="/galeri"
                        className="text-sm font-semibold text-cyan-400 transition hover:text-cyan-300"
                    >
                        Lihat Semua →
                    </Link>
                </div>

                {/* Slider / Grid Buku */}
                <div className="relative">
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {visibleBooks.map((book) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>

                    {/* Navigation */}
                    {books.length > 1 && (
                        <div className="mt-8 flex justify-center gap-3">
                            <button
                                type="button"
                                onClick={previousSlide}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-950 text-slate-300 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-500 hover:text-cyan-400"
                                aria-label="Buku sebelumnya"
                            >
                                ←
                            </button>

                            <button
                                type="button"
                                onClick={nextSlide}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-950 text-slate-300 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-500 hover:text-cyan-400"
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