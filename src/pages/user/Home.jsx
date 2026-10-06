import Hero from "../../components/common/Hero";
import BookSlider from "../../components/books/BookSlider";
import useBooks from "../../hooks/useBooks";

function Home() {
    const {
        books,
        loading,
        error
    } = useBooks();

    return (
        <main className="bg-white dark:bg-slate-950">

            <Hero />

            {/* Koleksi Buku */}
            {!loading && !error && (
                <BookSlider
                    books={books}
                />
            )}

            {/* Loading */}
            {loading && (
                <section className="bg-slate-50 py-20 dark:bg-slate-900">
                    <div className="mx-auto max-w-7xl px-6 text-center">

                        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-cyan-500" />

                        <p className="mt-4 text-slate-500 dark:text-slate-400">
                            Memuat koleksi buku...
                        </p>

                    </div>
                </section>
            )}

            {/* Error */}
            {error && (
                <section className="bg-slate-50 py-20 dark:bg-slate-900">
                    <div className="mx-auto max-w-7xl px-6">

                        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900/50 dark:bg-red-950/20">

                            <h2 className="font-bold text-red-700 dark:text-red-400">
                                Gagal Memuat Buku
                            </h2>

                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                {error}
                            </p>

                        </div>

                    </div>
                </section>
            )}

            {/* Information */}
            <section className="bg-white py-20 dark:bg-slate-950">

                <div className="mx-auto max-w-7xl px-6">

                    <div className="grid gap-6 md:grid-cols-3">

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7 dark:border-slate-800 dark:bg-slate-900">
                            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-100 text-2xl dark:bg-cyan-950/50">
                                📚
                            </div>

                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                Koleksi Buku
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                Jelajahi berbagai koleksi
                                buku berdasarkan kategori,
                                penulis, dan tahun terbit.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7 dark:border-slate-800 dark:bg-slate-900">
                            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-100 text-2xl dark:bg-cyan-950/50">
                                🔎
                            </div>

                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                Pencarian Mudah
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                Temukan buku yang dibutuhkan
                                dengan fitur pencarian dan
                                filter koleksi.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7 dark:border-slate-800 dark:bg-slate-900">
                            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-100 text-2xl dark:bg-cyan-950/50">
                                💻
                            </div>

                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                Akses Digital
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                Akses katalog perpustakaan
                                secara praktis melalui
                                perangkat digital.
                            </p>
                        </div>

                    </div>

                </div>

            </section>

        </main>
    );
}

export default Home;