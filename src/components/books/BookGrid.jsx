import BookCard from "./BookCard";

function BookGrid({ books }) {
    if (books.length === 0) {
        return (
            <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-900 px-6 text-center">

                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-800 text-4xl">
                    🔎
                </div>

                <h3 className="mt-6 text-xl font-bold text-white">
                    Buku tidak ditemukan
                </h3>

                <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
                    Tidak ada buku yang sesuai dengan kata kunci atau filter yang kamu pilih.
                </p>

            </div>
        );
    }

    return (
        /* Mengubah jumlah kolom menjadi lebih banyak agar card tampil ramping */
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {books.map((book) => (
                <BookCard
                    key={book.id}
                    book={book}
                />
            ))}
        </div>
    );
}

export default BookGrid;