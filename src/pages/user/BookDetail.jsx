import { Link, useParams } from "react-router-dom";
import useBooks from "../../hooks/useBooks";

function BookDetail() {
    const { id } = useParams();

    const {
        getBookById,
        loading,
        error
    } = useBooks();

    const book = getBookById(id);

    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
                <div className="text-center">

                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-cyan-500 dark:border-slate-700 dark:border-t-cyan-400" />

                    <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                        Memuat detail buku...
                    </p>

                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen bg-slate-50 px-6 py-20 dark:bg-slate-950">
                <div className="mx-auto max-w-3xl rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900/50 dark:bg-red-950/20">

                    <h1 className="text-xl font-bold text-red-700 dark:text-red-400">
                        Gagal Memuat Buku
                    </h1>

                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        {error}
                    </p>

                </div>
            </main>
        );
    }

    if (!book) {
        return (
            <main className="min-h-screen bg-slate-50 px-6 py-20 dark:bg-slate-950">

                <div className="mx-auto max-w-2xl text-center">

                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-white text-5xl shadow-sm dark:bg-slate-900">
                        📚
                    </div>

                    <h1 className="mt-8 text-3xl font-black text-slate-900 dark:text-white">
                        Buku Tidak Ditemukan
                    </h1>

                    <p className="mt-3 text-slate-500 dark:text-slate-400">
                        Buku yang kamu cari tidak tersedia
                        atau mungkin sudah dihapus.
                    </p>

                    <Link
                        to="/galeri"
                        className="mt-7 inline-flex rounded-xl bg-cyan-500 px-6 py-3 font-bold text-white transition hover:-translate-y-1 hover:bg-cyan-400"
                    >
                        ← Kembali ke Galeri
                    </Link>

                </div>

            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950">

            {/* Breadcrumb */}
            <div className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">

                <div className="mx-auto max-w-7xl px-6 py-5">

                    <div className="flex flex-wrap items-center gap-2 text-sm">

                        <Link
                            to="/"
                            className="text-slate-500 transition hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-400"
                        >
                            Home
                        </Link>

                        <span className="text-slate-300 dark:text-slate-700">
                            /
                        </span>

                        <Link
                            to="/galeri"
                            className="text-slate-500 transition hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-400"
                        >
                            Galeri
                        </Link>

                        <span className="text-slate-300 dark:text-slate-700">
                            /
                        </span>

                        <span className="max-w-[250px] truncate font-medium text-slate-900 dark:text-white">
                            {book.judul}
                        </span>

                    </div>

                </div>

            </div>

            {/* Detail */}
            <section className="mx-auto max-w-7xl px-6 py-12 md:py-16">

                <div className="grid gap-10 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-16">

                    {/* Cover */}
                    <div>

                        <div className="sticky top-28 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">

                            <div className="aspect-[3/4] overflow-hidden bg-slate-100 dark:bg-slate-800">

                                {book.cover ? (
                                    <img
                                        src={book.cover}
                                        alt={book.judul}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full flex-col items-center justify-center">

                                        <div className="flex h-28 w-28 items-center justify-center rounded-[2rem] bg-white text-6xl shadow-sm dark:bg-slate-700">
                                            📚
                                        </div>

                                        <p className="mt-6 text-sm text-slate-400">
                                            Tidak ada cover
                                        </p>

                                    </div>
                                )}

                            </div>

                        </div>

                    </div>

                    {/* Information */}
                    <div>

                        <div className="flex flex-wrap items-center gap-3">

                            <span className="rounded-full bg-cyan-50 px-4 py-2 text-xs font-bold uppercase tracking-wide text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-400">
                                {book.kategori ||
                                    "Umum"}
                            </span>

                            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                                ID: {book.id}
                            </span>

                        </div>

                        <h1 className="mt-5 text-3xl font-black leading-tight tracking-tight text-slate-900 dark:text-white md:text-5xl">
                            {book.judul}
                        </h1>

                        {book.subjudul && (
                            <p className="mt-4 text-lg italic text-slate-500 dark:text-slate-400">
                                {book.subjudul}
                            </p>
                        )}

                        {/* Author */}
                        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">

                            <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
                                Penulis
                            </p>

                            <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                                {book.penulis ||
                                    "-"}
                            </p>

                        </div>

                        {/* Metadata */}
                        <div className="mt-4 grid gap-4 sm:grid-cols-2">

                            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">

                                <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
                                    Penerbit
                                </p>

                                <p className="mt-2 font-semibold text-slate-900 dark:text-white">
                                    {book.penerbit ||
                                        "-"}
                                </p>

                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">

                                <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
                                    Tahun Terbit
                                </p>

                                <p className="mt-2 font-semibold text-slate-900 dark:text-white">
                                    {book.tahun ||
                                        "-"}
                                </p>

                            </div>

                        </div>

                        {/* Abstract */}
                        {book.abstrak && (
                            <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">

                                <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
                                    Deskripsi
                                </p>

                                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                    {book.abstrak}
                                </p>

                            </div>
                        )}

                        {/* Actions */}
                        <div className="mt-8 flex flex-wrap gap-3">

                            <Link
                                to="/galeri"
                                className="rounded-xl border border-slate-200 bg-white px-6 py-3 font-bold text-slate-700 transition hover:-translate-y-1 hover:border-cyan-300 hover:text-cyan-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-cyan-500 dark:hover:text-cyan-400"
                            >
                                ← Kembali ke Galeri
                            </Link>

                            <Link
                                to="/contact"
                                className="rounded-xl bg-cyan-500 px-6 py-3 font-bold text-white transition hover:-translate-y-1 hover:bg-cyan-400"
                            >
                                Hubungi Perpustakaan
                            </Link>

                        </div>

                    </div>

                </div>

            </section>

        </main>
    );
}

export default BookDetail;