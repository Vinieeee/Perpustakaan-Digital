import {
    Link,
    useNavigate,
    useParams,
    useSearchParams
} from "react-router-dom";

import useBooks from "../../hooks/useBooks";
import useBorrowings from "../../hooks/useBorrowings";

import {
    useUser
} from "../../context/UserContext";

function BookDetail() {
    const { id } = useParams();

    const navigate = useNavigate();

    const [searchParams, setSearchParams] =
        useSearchParams();

    const {
        user,
        isLoggedIn
    } = useUser();

    const {
        getBookById,
        loading,
        error
    } = useBooks();

    const {
        createBorrowing
    } = useBorrowings();

    const book = getBookById(id);

    const stok = Number(book?.stok) || 0;
    const tersedia = stok > 0;

    const modePeminjaman =
        searchParams.get("pinjam");

    const showBorrowInfo =
        modePeminjaman === "true";

    const showBorrowForm =
        modePeminjaman === "confirm";

    const handlePinjam = () => {
        if (!tersedia) {
            return;
        }

        setSearchParams({
            pinjam: "true"
        });
    };

    const closeBorrowInfo = () => {
        setSearchParams({});
    };

    const handleAjukanPeminjaman = () => {
        if (!user) {
            navigate("/login", {
                state: {
                    from: `/galeri/buku/${book.id}?pinjam=confirm`
                }
            });

            return;
        }

        const result = createBorrowing({
            book,
            namaPeminjam: user.nama,
            emailPeminjam: user.email
        });

        if (!result.success) {
            alert(result.message);
            return;
        }

        alert(
            "Peminjaman berhasil diajukan dan sedang menunggu persetujuan admin."
        );

        setSearchParams({});
    };

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
                                {book.kategori || "Umum"}
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
                                {book.penulis || "-"}
                            </p>

                        </div>

                        {/* Metadata */}
                        <div className="mt-4 grid gap-4 sm:grid-cols-2">

                            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">

                                <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
                                    Penerbit
                                </p>

                                <p className="mt-2 font-semibold text-slate-900 dark:text-white">
                                    {book.penerbit || "-"}
                                </p>

                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">

                                <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
                                    Tahun Terbit
                                </p>

                                <p className="mt-2 font-semibold text-slate-900 dark:text-white">
                                    {book.tahun || "-"}
                                </p>

                            </div>

                        </div>

                        {/* Stock & Location */}
                        <div className="mt-4 grid gap-4 sm:grid-cols-2">

                            {/* Stock */}
                            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">

                                <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
                                    Ketersediaan
                                </p>

                                <div className="mt-3 flex items-center gap-3">

                                    <div
                                        className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                                            tersedia
                                                ? "bg-emerald-50 dark:bg-emerald-950/40"
                                                : "bg-red-50 dark:bg-red-950/40"
                                        }`}
                                    >
                                        📦
                                    </div>

                                    <div>
                                        <p
                                            className={`font-bold ${
                                                tersedia
                                                    ? "text-emerald-600 dark:text-emerald-400"
                                                    : "text-red-600 dark:text-red-400"
                                            }`}
                                        >
                                            {tersedia
                                                ? "Tersedia"
                                                : "Stok Habis"}
                                        </p>

                                        <p className="text-sm text-slate-500 dark:text-slate-400">
                                            {stok} buku tersedia
                                        </p>
                                    </div>

                                </div>

                            </div>

                            {/* Location */}
                            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">

                                <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
                                    Lokasi Buku
                                </p>

                                <div className="mt-3 flex items-center gap-3">

                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 dark:bg-cyan-950/40">
                                        📍
                                    </div>

                                    <div>
                                        <p className="font-bold text-slate-900 dark:text-white">
                                            {book.lokasi || "Belum ditentukan"}
                                        </p>

                                        <p className="text-sm text-slate-500 dark:text-slate-400">
                                            Lokasi rak
                                        </p>
                                    </div>

                                </div>

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

                        {/* Borrow Status */}
                        <div
                            className={`mt-6 rounded-2xl border p-6 ${
                                tersedia
                                    ? "border-emerald-200 bg-emerald-50 dark:border-emerald-900/50 dark:bg-emerald-950/20"
                                    : "border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-950/20"
                            }`}
                        >

                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                                <div>

                                    <p
                                        className={`font-bold ${
                                            tersedia
                                                ? "text-emerald-700 dark:text-emerald-400"
                                                : "text-red-700 dark:text-red-400"
                                        }`}
                                    >
                                        {tersedia
                                            ? "Buku dapat dipinjam"
                                            : "Buku sedang tidak tersedia"}
                                    </p>

                                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                                        {tersedia
                                            ? "Kamu dapat mengajukan peminjaman buku ini."
                                            : "Silakan cek kembali setelah stok tersedia."}
                                    </p>

                                </div>

                                <button
                                    type="button"
                                    onClick={handlePinjam}
                                    disabled={!tersedia}
                                    className={`shrink-0 rounded-xl px-6 py-3 font-bold text-white transition ${
                                        tersedia
                                            ? "bg-cyan-600 hover:-translate-y-1 hover:bg-cyan-700"
                                            : "cursor-not-allowed bg-slate-400 dark:bg-slate-700"
                                    }`}
                                >
                                    {tersedia
                                        ? "📖 Pinjam Buku"
                                        : "Stok Habis"}
                                </button>

                            </div>

                        </div>

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

            {/* Borrowing Rules Modal */}
            {showBorrowInfo && tersedia && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm">

                    <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900">

                        <div className="flex items-start justify-between gap-4">

                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.15em] text-cyan-600 dark:text-cyan-400">
                                    Peminjaman Buku
                                </p>

                                <h2 className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
                                    Aturan Peminjaman
                                </h2>
                            </div>

                            <button
                                type="button"
                                onClick={closeBorrowInfo}
                                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white"
                            >
                                ✕
                            </button>

                        </div>

                        <div className="mt-6 space-y-3">

                            <div className="flex gap-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70">
                                <span>1️⃣</span>
                                <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                                    Pastikan buku masih memiliki stok sebelum mengajukan peminjaman.
                                </p>
                            </div>

                            <div className="flex gap-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70">
                                <span>2️⃣</span>
                                <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                                    Pengajuan peminjaman harus menunggu persetujuan dari admin perpustakaan.
                                </p>
                            </div>

                            <div className="flex gap-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70">
                                <span>3️⃣</span>
                                <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                                    Stok buku baru berkurang setelah pengajuan disetujui.
                                </p>
                            </div>

                            <div className="flex gap-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70">
                                <span>4️⃣</span>
                                <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                                    Buku harus dikembalikan sesuai ketentuan yang ditetapkan perpustakaan.
                                </p>
                            </div>

                        </div>

                        <div className="mt-6 flex justify-end gap-3">

                            <button
                                type="button"
                                onClick={closeBorrowInfo}
                                className="rounded-xl border border-slate-200 px-5 py-3 font-bold text-slate-700 transition hover:border-cyan-300 hover:text-cyan-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-cyan-700 dark:hover:text-cyan-400"
                            >
                                Nanti
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    if (!isLoggedIn) {
                                        navigate("/login", {
                                            state: {
                                                from: `/galeri/buku/${book.id}?pinjam=true`
                                            }
                                        });

                                        return;
                                    }

                                    setSearchParams({
                                        pinjam: "confirm"
                                    });
                                }}
                                className="rounded-xl bg-cyan-600 px-5 py-3 font-bold text-white transition hover:bg-cyan-700"
                            >
                                Lanjutkan
                            </button>

                        </div>

                    </div>

                </div>
            )}

            {/* Borrowing Confirmation Modal */}
            {showBorrowForm && tersedia && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm">

                    <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900">

                        {/* Header */}
                        <div className="flex items-start justify-between gap-4">

                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.15em] text-cyan-600 dark:text-cyan-400">
                                    Peminjaman Buku
                                </p>

                                <h2 className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
                                    Konfirmasi Peminjaman
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                    Periksa data berikut sebelum mengajukan peminjaman.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={closeBorrowInfo}
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white"
                            >
                                ✕
                            </button>

                        </div>

                        {/* Book Information */}
                        <div className="mt-6 rounded-2xl border border-cyan-100 bg-cyan-50 p-4 dark:border-cyan-900/50 dark:bg-cyan-950/30">

                            <p className="text-xs font-bold uppercase tracking-wide text-cyan-600 dark:text-cyan-400">
                                Buku yang Dipinjam
                            </p>

                            <h3 className="mt-2 text-lg font-bold text-slate-900 dark:text-white">
                                {book.judul}
                            </h3>

                            <div className="mt-3 space-y-1 text-sm text-slate-600 dark:text-slate-400">

                                <p>
                                    Penulis:{" "}
                                    <span className="font-medium">
                                        {book.penulis || "-"}
                                    </span>
                                </p>

                                <p>
                                    Lokasi:{" "}
                                    <span className="font-medium">
                                        {book.lokasi || "Belum ditentukan"}
                                    </span>
                                </p>

                                <p>
                                    Stok tersedia:{" "}
                                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                                        {stok} buku
                                    </span>
                                </p>

                            </div>

                        </div>

                        {/* User Information */}
                        <div className="mt-5 space-y-4">

                            <div>
                                <label
                                    htmlFor="namaPeminjam"
                                    className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
                                >
                                    Nama Peminjam
                                </label>

                                <input
                                    id="namaPeminjam"
                                    type="text"
                                    value={user?.nama || ""}
                                    readOnly
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="emailPeminjam"
                                    className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
                                >
                                    Email
                                </label>

                                <input
                                    id="emailPeminjam"
                                    type="email"
                                    value={user?.email || ""}
                                    readOnly
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                                />
                            </div>

                        </div>

                        {/* Duration */}
                        <div className="mt-4 rounded-xl bg-amber-50 p-4 dark:bg-amber-950/30">

                            <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">
                                ⏱️ Durasi Peminjaman
                            </p>

                            <p className="mt-1 text-sm leading-6 text-amber-700 dark:text-amber-400">
                                Maksimal peminjaman adalah 7 hari sejak peminjaman disetujui oleh admin.
                            </p>

                        </div>

                        {/* Actions */}
                        <div className="mt-6 flex gap-3">

                            <button
                                type="button"
                                onClick={closeBorrowInfo}
                                className="flex-1 rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                            >
                                Batal
                            </button>

                            <button
                                type="button"
                                onClick={handleAjukanPeminjaman}
                                className="flex-1 rounded-xl bg-cyan-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-cyan-700 active:scale-[0.98]"
                            >
                                📖 Ajukan Peminjaman
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </main>
    );
}

export default BookDetail;

