import { Link } from "react-router-dom";

function BookCard({ book }) {
    return (
        <Link
            to={`/galeri/buku/${book.id}`}
            className="group block h-full"
        >
            <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-cyan-200 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:hover:border-cyan-900">

                {/* Cover */}
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

                {/* Information */}
                <div className="flex flex-1 flex-col p-5">

                    {/* Category + Year */}
                    <div className="flex items-center justify-between gap-2">

                        <span className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">
                            {book.tahun || "-"}
                        </span>

                        <span className="max-w-[150px] truncate rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-400">
                            {book.kategori ||
                                "Umum"}
                        </span>

                    </div>

                    {/* Title */}
                    <h3 className="mt-4 line-clamp-2 text-lg font-bold leading-7 text-slate-900 transition-colors group-hover:text-cyan-600 dark:text-white dark:group-hover:text-cyan-400">
                        {book.judul}
                    </h3>

                    {/* Author */}
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                        {book.penulis || "-"}
                    </p>

                    {/* Publisher */}
                    <div className="mt-auto pt-5">

                        <div className="border-t border-slate-100 pt-4 dark:border-slate-800">

                            <p className="line-clamp-1 text-xs text-slate-500 dark:text-slate-500">
                                {book.penerbit ||
                                    "-"}
                            </p>

                        </div>

                    </div>

                </div>

            </article>
        </Link>
    );
}

export default BookCard;