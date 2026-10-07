import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    useUser
} from "../../context/UserContext";

function BookCard({ book }) {
    const {
        isLoggedIn
    } = useUser();

    const navigate = useNavigate();

    const stok = Number(book.stok) || 0;
    const tersedia = stok > 0;

    const handlePinjam = () => {
        if (!tersedia) {
            return;
        }

        navigate(
            `/galeri/buku/${book.id}?pinjam=true`
        );
    };

    return (
        <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-cyan-200 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:hover:border-cyan-900">

            {/* Cover */}
            <Link
                to={`/galeri/buku/${book.id}`}
                className="block"
            >
                <div className="aspect-[3/4] overflow-hidden bg-slate-100 dark:bg-slate-800">

                    {book.cover ? (
                        <img
                            src={book.cover}
                            alt={book.judul}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                    ) : (
                        <div className="flex h-full flex-col items-center justify-center px-6 text-center">

                            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-4xl shadow-sm dark:bg-slate-700">
                                📚
                            </div>

                            <p className="mt-5 text-sm font-medium text-slate-400">
                                Tidak ada cover
                            </p>

                        </div>
                    )}

                </div>
            </Link>

            {/* Information */}
            <div className="flex flex-1 flex-col p-5">

                {/* Category + Year */}
                <div className="flex items-center justify-between gap-2">

                    <span className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">
                        {book.tahun || "-"}
                    </span>

                    <span className="max-w-[150px] truncate rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-400">
                        {book.kategori || "Umum"}
                    </span>

                </div>

                {/* Title */}
                <Link
                    to={`/galeri/buku/${book.id}`}
                    className="group"
                >
                    <h3 className="mt-4 line-clamp-2 text-lg font-bold leading-7 text-slate-900 transition-colors group-hover:text-cyan-600 dark:text-white dark:group-hover:text-cyan-400">
                        {book.judul}
                    </h3>
                </Link>

                {/* Author */}
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {book.penulis || "-"}
                </p>

                {/* Stock + Location */}
                <div className="mt-4 space-y-2">

                    {/* Stock */}
                    <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-800/70">

                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                            📦 Stok
                        </span>

                        <span
                            className={`text-sm font-bold ${
                                tersedia
                                    ? "text-emerald-600 dark:text-emerald-400"
                                    : "text-red-600 dark:text-red-400"
                            }`}
                        >
                            {stok} buku
                        </span>

                    </div>

                    {/* Location */}
                    <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-800/70">

                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                            📍 Lokasi
                        </span>

                        <span className="max-w-[150px] truncate text-sm font-semibold text-slate-700 dark:text-slate-300">
                            {book.lokasi || "Belum ditentukan"}
                        </span>

                    </div>

                </div>

                {/* Status */}
                <div className="mt-4">

                    <span
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${
                            tersedia
                                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                                : "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400"
                        }`}
                    >
                        <span
                            className={`h-2 w-2 rounded-full ${
                                tersedia
                                    ? "bg-emerald-500"
                                    : "bg-red-500"
                            }`}
                        />

                        {tersedia
                            ? "Tersedia"
                            : "Stok Habis"}
                    </span>

                </div>

                {/* Actions */}
                <div className="mt-auto flex gap-2 pt-5">

                    {/* Pinjam */}
                    <button
                        type="button"
                        onClick={handlePinjam}
                        disabled={!tersedia}
                        className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                            tersedia
                                ? "bg-cyan-600 text-white hover:bg-cyan-700 active:scale-[0.98]"
                                : "cursor-not-allowed bg-slate-200 text-slate-400 dark:bg-slate-800 dark:text-slate-600"
                        }`}
                    >
                        {tersedia
                            ? "📖 Pinjam Buku"
                            : "Stok Habis"}
                    </button>

                    {/* Detail */}
                    <Link
                        to={`/galeri/buku/${book.id}`}
                        className="flex items-center justify-center rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-cyan-300 hover:text-cyan-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-cyan-800 dark:hover:text-cyan-400"
                    >
                        Detail
                    </Link>

                </div>

                {/* Publisher */}
                <div className="mt-4 border-t border-slate-100 pt-4 dark:border-slate-800">

                    <p className="line-clamp-1 text-xs text-slate-500 dark:text-slate-500">
                        {book.penerbit || "-"}
                    </p>

                </div>

            </div>

        </article>
    );
}

export default BookCard;