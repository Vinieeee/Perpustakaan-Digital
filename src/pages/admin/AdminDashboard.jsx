import { Link } from "react-router-dom";

import useBooks from "../../hooks/useBooks";
import useMessages from "../../hooks/useMessages";

function AdminDashboard() {
    const {
        books,
        loading: booksLoading
    } = useBooks();

    const {
        messages,
        getUnreadCount
    } = useMessages();

    const unreadCount =
        getUnreadCount();

    const categories = [
        ...new Set(
            books
                .map(
                    (book) =>
                        book.kategori
                )
                .filter(Boolean)
        )
    ];

    const recentMessages =
        [...messages]
            .sort(
                (a, b) =>
                    new Date(
                        b.tanggal
                    ) -
                    new Date(
                        a.tanggal
                    )
            )
            .slice(0, 5);

    const formatDate = (
        date
    ) => {
        if (!date) {
            return "-";
        }

        return new Intl.DateTimeFormat(
            "id-ID",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            }
        ).format(
            new Date(date)
        );
    };

    return (
        <div className="px-5 py-8 sm:px-8">

            {/* Header */}
            <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

                <div>
                    <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                        Dashboard
                    </h1>

                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Pantau koleksi buku dan
                        aktivitas pesan perpustakaan.
                    </p>
                </div>

                <Link
                    to="/admin/buku/tambah"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/10 transition hover:-translate-y-0.5 hover:bg-cyan-400"
                >
                    <span>＋</span>
                    Tambah Buku
                </Link>

            </div>

            {/* Statistics */}
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

                {/* Books */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">

                    <div className="flex items-start justify-between">

                        <div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                Total Buku
                            </p>

                            <p className="mt-3 text-3xl font-black text-slate-900 dark:text-white">
                                {booksLoading
                                    ? "..."
                                    : books.length}
                            </p>

                            <p className="mt-2 text-xs text-slate-500">
                                Koleksi tersedia
                            </p>
                        </div>

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-2xl dark:bg-cyan-950/50">
                            📚
                        </div>

                    </div>

                </div>

                {/* Categories */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">

                    <div className="flex items-start justify-between">

                        <div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                Kategori
                            </p>

                            <p className="mt-3 text-3xl font-black text-slate-900 dark:text-white">
                                {
                                    categories.length
                                }
                            </p>

                            <p className="mt-2 text-xs text-slate-500">
                                Jenis koleksi
                            </p>
                        </div>

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-2xl dark:bg-violet-950/50">
                            🗂️
                        </div>

                    </div>

                </div>

                {/* Messages */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">

                    <div className="flex items-start justify-between">

                        <div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                Total Pesan
                            </p>

                            <p className="mt-3 text-3xl font-black text-slate-900 dark:text-white">
                                {
                                    messages.length
                                }
                            </p>

                            <p className="mt-2 text-xs text-slate-500">
                                Pesan masuk
                            </p>
                        </div>

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl dark:bg-blue-950/50">
                            ✉️
                        </div>

                    </div>

                </div>

                {/* Unread */}
                <div className="rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm dark:border-red-900/40 dark:bg-red-950/20">

                    <div className="flex items-start justify-between">

                        <div>
                            <p className="text-sm font-medium text-red-600 dark:text-red-400">
                                Belum Dibaca
                            </p>

                            <p className="mt-3 text-3xl font-black text-red-700 dark:text-red-300">
                                {
                                    unreadCount
                                }
                            </p>

                            <p className="mt-2 text-xs text-red-500 dark:text-red-400">
                                Perlu diperiksa
                            </p>
                        </div>

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-2xl shadow-sm dark:bg-red-950/50">
                            🔔
                        </div>

                    </div>

                </div>

            </div>

            {/* Main Content */}
            <div className="mt-8 grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">

                {/* Recent Messages */}
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

                    <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5 dark:border-slate-800">

                        <div>
                            <h2 className="font-bold text-slate-900 dark:text-white">
                                Pesan Terbaru
                            </h2>

                            <p className="mt-1 text-xs text-slate-500">
                                Aktivitas pesan terakhir
                            </p>
                        </div>

                        <Link
                            to="/admin/pesan"
                            className="text-sm font-semibold text-cyan-600 hover:text-cyan-500 dark:text-cyan-400"
                        >
                            Lihat semua →
                        </Link>

                    </div>

                    {recentMessages.length ===
                    0 ? (
                        <div className="flex min-h-[280px] flex-col items-center justify-center px-6 text-center">

                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-3xl dark:bg-slate-800">
                                ✉️
                            </div>

                            <h3 className="mt-5 font-bold text-slate-900 dark:text-white">
                                Belum ada pesan
                            </h3>

                            <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
                                Pesan dari halaman
                                contact akan muncul di
                                sini.
                            </p>

                        </div>
                    ) : (
                        <div className="divide-y divide-slate-100 dark:divide-slate-800">

                            {recentMessages.map(
                                (
                                    message
                                ) => (
                                    <Link
                                        key={
                                            message.id
                                        }
                                        to="/admin/pesan"
                                        className="block px-6 py-5 transition hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                    >

                                        <div className="flex items-start gap-4">

                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-100 font-bold text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-400">
                                                {message.nama
                                                    ?.charAt(
                                                        0
                                                    )
                                                    ?.toUpperCase() ||
                                                    "?"}
                                            </div>

                                            <div className="min-w-0 flex-1">

                                                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">

                                                    <p className="truncate text-sm font-bold text-slate-900 dark:text-white">
                                                        {
                                                            message.nama
                                                        }
                                                    </p>

                                                    <span className="text-xs text-slate-400">
                                                        {formatDate(
                                                            message.tanggal
                                                        )}
                                                    </span>

                                                </div>

                                                <p className="mt-1 truncate text-sm font-semibold text-slate-700 dark:text-slate-300">
                                                    {
                                                        message.subject
                                                    }
                                                </p>

                                                <p className="mt-1 line-clamp-1 text-xs text-slate-500 dark:text-slate-500">
                                                    {
                                                        message.message
                                                    }
                                                </p>

                                            </div>

                                            {message.status ===
                                                "Belum Dibaca" && (
                                                <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-red-500" />
                                            )}

                                        </div>

                                    </Link>
                                )
                            )}

                        </div>
                    )}

                </div>

                {/* Quick Actions */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">

                    <div>
                        <h2 className="font-bold text-slate-900 dark:text-white">
                            Aksi Cepat
                        </h2>

                        <p className="mt-1 text-xs text-slate-500">
                            Kelola website dengan cepat
                        </p>
                    </div>

                    <div className="mt-6 space-y-3">

                        <Link
                            to="/admin/buku"
                            className="group flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-cyan-300 hover:bg-cyan-50 dark:border-slate-800 dark:hover:border-cyan-900 dark:hover:bg-cyan-950/20"
                        >

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-xl dark:bg-cyan-950/50">
                                📚
                            </div>

                            <div className="flex-1">

                                <p className="text-sm font-bold text-slate-900 dark:text-white">
                                    Kelola Buku
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                    Lihat dan edit koleksi
                                </p>

                            </div>

                            <span className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-cyan-500">
                                →
                            </span>

                        </Link>

                        <Link
                            to="/admin/buku/tambah"
                            className="group flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-cyan-300 hover:bg-cyan-50 dark:border-slate-800 dark:hover:border-cyan-900 dark:hover:bg-cyan-950/20"
                        >

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-xl dark:bg-emerald-950/50">
                                ➕
                            </div>

                            <div className="flex-1">

                                <p className="text-sm font-bold text-slate-900 dark:text-white">
                                    Tambah Buku
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                    Masukkan koleksi baru
                                </p>

                            </div>

                            <span className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-cyan-500">
                                →
                            </span>

                        </Link>

                        <Link
                            to="/admin/pesan"
                            className="group flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-cyan-300 hover:bg-cyan-50 dark:border-slate-800 dark:hover:border-cyan-900 dark:hover:bg-cyan-950/20"
                        >

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl dark:bg-blue-950/50">
                                ✉️
                            </div>

                            <div className="flex-1">

                                <p className="text-sm font-bold text-slate-900 dark:text-white">
                                    Periksa Pesan
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                    {unreadCount > 0
                                        ? `${unreadCount} pesan belum dibaca`
                                        : "Tidak ada pesan baru"}
                                </p>

                            </div>

                            <span className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-cyan-500">
                                →
                            </span>

                        </Link>

                    </div>

                </div>

            </div>

            {/* Category Overview */}
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">

                <div className="mb-6">

                    <h2 className="font-bold text-slate-900 dark:text-white">
                        Kategori Koleksi
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                        Distribusi kategori buku yang
                        tersedia
                    </p>

                </div>

                {categories.length ===
                0 ? (
                    <p className="py-8 text-center text-sm text-slate-500">
                        Belum ada kategori.
                    </p>
                ) : (
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

                        {categories.map(
                            (item) => {
                                const count =
                                    books.filter(
                                        (
                                            book
                                        ) =>
                                            book.kategori ===
                                            item
                                    ).length;

                                return (
                                    <div
                                        key={
                                            item
                                        }
                                        className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50"
                                    >

                                        <div className="flex items-center justify-between gap-3">

                                            <p className="truncate text-sm font-semibold text-slate-700 dark:text-slate-300">
                                                {
                                                    item
                                                }
                                            </p>

                                            <span className="rounded-lg bg-white px-2.5 py-1 text-xs font-bold text-cyan-600 shadow-sm dark:bg-slate-900 dark:text-cyan-400">
                                                {
                                                    count
                                                }
                                            </span>

                                        </div>

                                    </div>
                                );
                            }
                        )}

                    </div>
                )}

            </div>

        </div>
    );
}

export default AdminDashboard;