import BookCard from "./BookCard";

function BookGrid({ books }) {
    if (books.length === 0) {
        return (
            <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 text-center dark:border-slate-700 dark:bg-slate-900">

                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-100 text-4xl dark:bg-slate-800">
                    🔎
                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">
                    Buku tidak ditemukan
                </h3>

                <p className="mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
                    Tidak ada buku yang sesuai
                    dengan kata kunci atau filter
                    yang kamu pilih.
                </p>

            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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