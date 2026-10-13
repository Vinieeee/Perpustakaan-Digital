import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

function BookCard({ book }) {
    const { isLoggedIn } = useUser();
    const navigate = useNavigate();

    const stok = Number(book.stok) || 0;
    const tersedia = stok > 0;

    const handlePinjam = () => {
        if (!tersedia) return;
        navigate(`/galeri/buku/${book.id}?pinjam=true`);
    };

    return (
        <article className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-900 hover:shadow-lg">

            {/* Cover */}
            <Link to={`/galeri/buku/${book.id}`} className="block">
                <div className="aspect-[3/4] overflow-hidden bg-slate-800">
                    {book.cover ? (
                        <img
                            src={book.cover}
                            alt={book.judul}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                    ) : (
                        <div className="flex h-full flex-col items-center justify-center px-3 text-center">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-700 text-xl shadow-sm">
                                📚
                            </div>
                            <p className="mt-2 text-[10px] font-medium text-slate-400">
                                Tidak ada cover
                            </p>
                        </div>
                    )}
                </div>
            </Link>

            {/* Information */}
            <div className="flex flex-1 flex-col p-3">

                {/* Category + Year */}
                <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-semibold text-cyan-400">
                        {book.tahun || "-"}
                    </span>
                    <span className="max-w-[90px] truncate rounded-full bg-cyan-950/50 px-2 py-0.5 text-[10px] font-semibold text-cyan-400">
                        {book.kategori || "Umum"}
                    </span>
                </div>

                {/* Title */}
                <Link to={`/galeri/buku/${book.id}`} className="group">
                    <h3 className="mt-2 line-clamp-2 text-sm font-bold leading-5 text-white transition-colors group-hover:text-cyan-400">
                        {book.judul}
                    </h3>
                </Link>

                {/* Author */}
                <p className="mt-1 line-clamp-1 text-xs leading-4 text-slate-400">
                    {book.penulis || "-"}
                </p>

                {/* Stock + Location */}
                <div className="mt-2.5 space-y-1">

                    {/* Stock */}
                    <div className="flex items-center justify-between rounded-lg bg-slate-800/70 px-2 py-1">
                        <span className="text-[10px] font-medium text-slate-400">
                            📦 Stok
                        </span>
                        <span
                            className={`text-xs font-bold ${
                                tersedia ? "text-emerald-400" : "text-red-400"
                            }`}
                        >
                            {stok} buku
                        </span>
                    </div>

                    {/* Location */}
                    <div className="flex items-center justify-between rounded-lg bg-slate-800/70 px-2 py-1">
                        <span className="text-[10px] font-medium text-slate-400">
                            📍 Lokasi
                        </span>
                        <span className="max-w-[90px] truncate text-xs font-semibold text-slate-300">
                            {book.lokasi || "Belum ditentukan"}
                        </span>
                    </div>

                </div>

                {/* Status */}
                <div className="mt-2">
                    <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                            tersedia
                                ? "bg-emerald-950/40 text-emerald-400"
                                : "bg-red-950/40 text-red-400"
                        }`}
                    >
                        <span
                            className={`h-1.5 w-1.5 rounded-full ${
                                tersedia ? "bg-emerald-500" : "bg-red-500"
                            }`}
                        />
                        {tersedia ? "Tersedia" : "Stok Habis"}
                    </span>
                </div>

                {/* Actions */}
                <div className="mt-auto flex gap-1.5 pt-3">

                    {/* Pinjam */}
                    <button
                        type="button"
                        onClick={handlePinjam}
                        disabled={!tersedia}
                        className={`flex-1 rounded-lg px-2 py-1.5 text-xs font-bold transition ${
                            tersedia
                                ? "bg-cyan-600 text-white hover:bg-cyan-700 active:scale-[0.98]"
                                : "cursor-not-allowed bg-slate-800 text-slate-600"
                        }`}
                    >
                        {tersedia ? "📖 Pinjam" : "Habis"}
                    </button>

                    {/* Detail */}
                    <Link
                        to={`/galeri/buku/${book.id}`}
                        className="flex items-center justify-center rounded-lg border border-slate-700 px-2 py-1.5 text-xs font-bold text-slate-300 transition hover:border-cyan-800 hover:text-cyan-400"
                    >
                        Detail
                    </Link>

                </div>

                {/* Publisher */}
                <div className="mt-2 border-t border-slate-800 pt-2">
                    <p className="line-clamp-1 text-[10px] text-slate-500">
                        {book.penerbit || "-"}
                    </p>
                </div>

            </div>

        </article>
    );
}

export default BookCard;