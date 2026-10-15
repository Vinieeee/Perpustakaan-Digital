import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import Swal from "sweetalert2"; // Tambahan SweetAlert2
import useBooks from "../../hooks/useBooks";

function AdminBooks() {
    const { books, loading, error, deleteBook } = useBooks();

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    
    // State untuk menyimpan data buku yang diklik (Modal Detail)
    const [selectedBook, setSelectedBook] = useState(null);

    const categories = useMemo(() => {
        return [
            ...new Set(
                books
                    .map((book) => book.kategori)
                    .filter(Boolean)
            )
        ].sort();
    }, [books]);

    const filteredBooks = useMemo(() => {
        const keyword = search.toLowerCase().trim();

        return books.filter((book) => {
            const searchableText = [
                book.judul,
                book.penulis,
                book.penerbit,
                book.tahun,
                book.identifier,
                book.lokasiRak
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();

            const matchesSearch = !keyword || searchableText.includes(keyword);
            const matchesCategory = !category || book.kategori === category;

            return matchesSearch && matchesCategory;
        });
    }, [books, search, category]);

    const handleDelete = (book) => {
        Swal.fire({
            title: 'Hapus Buku?',
            text: `Yakin ingin menghapus buku "${book.judul}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal',
            background: '#0f172a',
            color: '#f8fafc'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteBook(book.id);
                
                if (selectedBook?.id === book.id) {
                    setSelectedBook(null);
                }

                Swal.fire({
                    title: 'Terhapus!',
                    text: 'Buku berhasil dihapus.',
                    icon: 'success',
                    background: '#0f172a',
                    color: '#f8fafc',
                    confirmButtonColor: '#0891b2'
                });
            }
        });
    };

    const resetFilter = () => {
        setSearch("");
        setCategory("");
    };

    return (
        <div className="px-5 py-8 sm:px-8">
            
            {/* HEADER */}
            <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <h1 className="mt-2 text-3xl font-black tracking-tight text-white">
                        Kelola Buku
                    </h1>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                        Kelola koleksi buku yang tersedia pada katalog perpustakaan digital.
                    </p>
                </div>

                <Link
                    to="/admin/buku/tambah"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:bg-cyan-400"
                >
                    <span className="text-lg">+</span>
                    Tambah Buku
                </Link>
            </div>

            {/* STATISTIC */}
            <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-400">Total Buku</p>
                            <p className="mt-2 text-3xl font-black text-white">
                                {books.length}
                            </p>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-950/50 text-2xl">
                            📚
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-400">Hasil Pencarian</p>
                            <p className="mt-2 text-3xl font-black text-white">
                                {filteredBooks.length}
                            </p>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-950/50 text-2xl">
                            🔎
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-400">Kategori</p>
                            <p className="mt-2 text-3xl font-black text-white">
                                {categories.length}
                            </p>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-950/50 text-2xl">
                            🗂️
                        </div>
                    </div>
                </div>
            </div>

            {/* FILTER */}
            <div className="mb-6 rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm">
                <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px_auto]">
                    <div className="relative">
                        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                            🔎
                        </span>
                        <input
                            type="text"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Cari judul, penulis, penerbit, tahun, rak..."
                            className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 placeholder:text-slate-500"
                        />
                    </div>

                    <select
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                        className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-300 outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                    >
                        <option value="">Semua Kategori</option>
                        {categories.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>

                    <button
                        type="button"
                        onClick={resetFilter}
                        className="rounded-xl border border-slate-700 bg-slate-950 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-cyan-500 hover:text-cyan-400"
                    >
                        Reset Filter
                    </button>
                </div>

                <div className="mt-5 border-t border-slate-800 pt-4">
                    <p className="text-sm text-slate-400">
                        Menampilkan{" "}
                        <span className="font-bold text-white">{filteredBooks.length}</span>{" "}
                        dari{" "}
                        <span className="font-bold text-white">{books.length}</span>{" "}
                        buku
                    </p>
                </div>
            </div>

            {/* LOADING & ERROR & EMPTY STATES */}
            {loading && (
                <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-cyan-400" />
                    <p className="mt-4 text-sm text-slate-400">Memuat data buku...</p>
                </div>
            )}

            {error && !loading && (
                <div className="rounded-2xl border border-red-900/50 bg-red-950/20 p-8 text-center">
                    <div className="text-4xl">⚠️</div>
                    <h2 className="mt-4 font-bold text-red-400">Gagal Memuat Data</h2>
                    <p className="mt-2 text-sm text-red-500">{error}</p>
                </div>
            )}

            {!loading && !error && filteredBooks.length === 0 && (
                <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-900 px-6 text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-800 text-4xl">
                        📚
                    </div>
                    <h2 className="mt-6 text-xl font-bold text-white">Buku Tidak Ditemukan</h2>
                    <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
                        Tidak ada buku yang sesuai dengan pencarian atau filter yang digunakan.
                    </p>
                    <button
                        type="button"
                        onClick={resetFilter}
                        className="mt-5 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-cyan-400"
                    >
                        Reset Filter
                    </button>
                </div>
            )}

            {/* GRID BUKU */}
            {!loading && !error && filteredBooks.length > 0 && (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    {filteredBooks.map((book) => (
                        <article
                            key={book.id}
                            className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-sm transition hover:border-cyan-800 hover:shadow-xl hover:shadow-cyan-900/20"
                        >
                            <div 
                                className="flex flex-1 flex-col cursor-pointer"
                                onClick={() => setSelectedBook(book)}
                            >
                                <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-950">
                                    {book.cover ? (
                                        <img
                                            src={book.cover}
                                            alt={book.judul}
                                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                            onError={(e) => { e.currentTarget.style.display = "none"; }}
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center text-4xl opacity-50">
                                            📚
                                        </div>
                                    )}
                                    
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                    
                                    <div className="absolute left-2 top-2 rounded bg-black/60 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
                                        Rak: {book.lokasiRak || "-"}
                                    </div>
                                    
                                    <div className={`absolute right-2 top-2 rounded px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm ${Number(book.stok) > 0 ? "bg-cyan-600/80" : "bg-red-600/80"}`}>
                                        Stok: {book.stok !== undefined ? book.stok : "0"}
                                    </div>
                                </div>

                                <div className="flex flex-1 flex-col p-4">
                                    <span className="mb-2 w-fit rounded-full bg-cyan-950/50 px-2.5 py-1 text-[10px] font-bold text-cyan-400">
                                        {book.kategori || "Umum"}
                                    </span>
                                    
                                    <h3 className="line-clamp-2 font-bold leading-tight text-white group-hover:text-cyan-400 transition-colors">
                                        {book.judul}
                                    </h3>
                                    
                                    <p className="mt-1 line-clamp-1 text-xs text-slate-400">
                                        {book.penulis || "-"}
                                    </p>

                                    <div className="mt-auto pt-3 text-[11px] text-slate-500 flex justify-between items-center">
                                        <span className="truncate pr-2">{book.penerbit || "-"}</span>
                                        <span className="shrink-0 font-semibold">{book.tahun || "-"}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2 border-t border-slate-800 p-3 bg-slate-950/50 z-10">
                                <Link
                                    to={`/admin/buku/edit/${book.id}`}
                                    onClick={(e) => e.stopPropagation()}
                                    className="flex items-center justify-center rounded-lg border border-blue-900/50 bg-blue-950/30 px-3 py-2 text-[11px] font-bold text-blue-400 transition hover:bg-blue-900/50"
                                >
                                    Edit
                                </Link>

                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(book);
                                    }}
                                    className="flex items-center justify-center rounded-lg border border-red-900/50 bg-red-950/30 px-3 py-2 text-[11px] font-bold text-red-400 transition hover:bg-red-900/50"
                                >
                                    Hapus
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            )}

            {/* MODAL DETAIL BUKU */}
            {selectedBook && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm transition-all"
                    onClick={() => setSelectedBook(null)}
                >
                    <div 
                        className="relative flex w-full max-w-4xl max-h-[90vh] flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl md:flex-row"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button 
                            onClick={() => setSelectedBook(null)}
                            className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-slate-800/80 text-slate-300 transition hover:bg-slate-700 hover:text-white"
                        >
                            ✕
                        </button>

                        <div className="relative h-64 w-full shrink-0 bg-slate-950 md:h-auto md:w-2/5">
                            {selectedBook.cover ? (
                                <img
                                    src={selectedBook.cover}
                                    alt={selectedBook.judul}
                                    className="h-full w-full object-cover"
                                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-6xl opacity-50">
                                    📚
                                </div>
                            )}
                            <div className="absolute bottom-4 left-4 flex gap-2 md:hidden">
                                <span className="rounded-lg bg-black/70 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md">
                                    Rak: {selectedBook.lokasiRak || "-"}
                                </span>
                                <span className={`rounded-lg px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md ${Number(selectedBook.stok) > 0 ? 'bg-cyan-600/80' : 'bg-red-600/80'}`}>
                                    Stok: {selectedBook.stok !== undefined ? selectedBook.stok : "0"}
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-1 flex-col overflow-y-auto p-6 md:p-8">
                            <div className="mb-4 flex flex-wrap gap-2">
                                <span className="rounded-full bg-cyan-950/60 px-3 py-1 text-xs font-bold text-cyan-400 border border-cyan-900/50">
                                    {selectedBook.kategori || "Umum"}
                                </span>
                                {selectedBook.tahun && (
                                    <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-bold text-slate-300">
                                        Tahun {selectedBook.tahun}
                                    </span>
                                )}
                            </div>

                            <h2 className="text-2xl font-black text-white md:text-3xl">
                                {selectedBook.judul}
                            </h2>
                            
                            {selectedBook.subjudul && (
                                <p className="mt-1 text-lg font-medium text-slate-400">
                                    {selectedBook.subjudul}
                                </p>
                            )}

                            <div className="mt-6 grid grid-cols-2 gap-y-4 gap-x-6 border-y border-slate-800 py-5">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Penulis</p>
                                    <p className="mt-1 font-semibold text-slate-200">{selectedBook.penulis || "-"}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Penerbit</p>
                                    <p className="mt-1 font-semibold text-slate-200">{selectedBook.penerbit || "-"}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">ID / ISBN</p>
                                    <p className="mt-1 font-semibold text-slate-200">{selectedBook.identifier || "-"}</p>
                                </div>
                                <div className="hidden md:block">
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Ketersediaan</p>
                                    <p className="mt-1 font-semibold text-slate-200">
                                        Rak <span className="text-cyan-400">{selectedBook.lokasiRak || "-"}</span> 
                                        {" "}• Stok <span className={Number(selectedBook.stok) > 0 ? "text-emerald-400" : "text-red-400"}>
                                            {selectedBook.stok !== undefined ? selectedBook.stok : "0"}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Abstrak / Deskripsi</h3>
                                <p className="mt-2 leading-relaxed text-slate-300 whitespace-pre-wrap">
                                    {selectedBook.abstrak || "Tidak ada abstrak atau deskripsi yang tersedia untuk buku ini."}
                                </p>
                            </div>

                            <div className="mt-8 flex gap-3 pt-4">
                                <Link
                                    to={`/admin/buku/edit/${selectedBook.id}`}
                                    className="flex-1 rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-blue-500"
                                >
                                    Edit Buku Ini
                                </Link>
                                <button
                                    onClick={() => handleDelete(selectedBook)}
                                    className="flex-1 rounded-xl bg-red-950/40 border border-red-900/50 px-4 py-3 text-center text-sm font-bold text-red-400 transition hover:bg-red-900/50 hover:text-red-300"
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default AdminBooks;