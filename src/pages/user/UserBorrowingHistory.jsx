import { useMemo } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";

import { useUser } from "../../context/UserContext";
import useBorrowings from "../../hooks/useBorrowings";

function formatDate(date) {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return "-";
    }

    return parsedDate.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

function getStatusStyle(status) {
    switch (status) {
        case "Menunggu Persetujuan":
            return "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400";

        case "Disetujui":
            return "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400";

        case "Dipinjam":
            return "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400";

        case "Dikembalikan":
            return "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400";

        case "Ditolak":
            return "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400";

        default:
            return "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300";
    }
}

function UserBorrowingHistory() {
    const { user, isLoggedIn } = useUser();
    const { borrowings } = useBorrowings();
    const location = useLocation();

    // Jika belum login, arahkan ke halaman login.
    if (!isLoggedIn || !user) {
        return (
            <Navigate
                to="/login"
                state={{ from: location.pathname }}
                replace
            />
        );
    }

    // Pengguna hanya melihat transaksi miliknya sendiri.
    const userBorrowings = useMemo(() => {
        const userEmail = (user.email || "").trim().toLowerCase();

        return borrowings
            .filter((borrowing) => {
                const borrowingEmail = (
                    borrowing.emailPeminjam || ""
                ).trim().toLowerCase();

                return (
                    userEmail !== "" &&
                    borrowingEmail === userEmail
                );
            })
            .sort(
                (a, b) =>
                    new Date(b.tanggalPengajuan || 0) -
                    new Date(a.tanggalPengajuan || 0)
            );
    }, [borrowings, user.email]);

    const totalAktif = userBorrowings.filter(
        (borrowing) =>
            ["Disetujui", "Dipinjam"].includes(
                borrowing.status
            )
    ).length;

    const totalMenunggu = userBorrowings.filter(
        (borrowing) =>
            borrowing.status === "Menunggu Persetujuan"
    ).length;

    const totalSelesai = userBorrowings.filter(
        (borrowing) =>
            borrowing.status === "Dikembalikan"
    ).length;

    return (
        <main className="min-h-screen bg-slate-50 px-5 py-10 dark:bg-slate-950 sm:px-8">
            <div className="mx-auto max-w-6xl space-y-8">

                {/* HEADER */}
                <section>
                    <p className="text-sm font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
                        Area Pengguna
                    </p>

                    <h1 className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
                        Riwayat Peminjaman
                    </h1>

                    <p className="mt-3 text-slate-600 dark:text-slate-400">
                        Halo, {user.nama}. Pantau status peminjaman,
                        tanggal jatuh tempo, dan riwayat pengembalian
                        buku kamu di sini.
                    </p>
                </section>

                {/* RINGKASAN */}
                <section className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Peminjaman Aktif
                        </p>

                        <p className="mt-2 text-3xl font-bold text-purple-600 dark:text-purple-400">
                            {totalAktif}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Menunggu Persetujuan
                        </p>

                        <p className="mt-2 text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                            {totalMenunggu}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Buku Dikembalikan
                        </p>

                        <p className="mt-2 text-3xl font-bold text-green-600 dark:text-green-400">
                            {totalSelesai}
                        </p>
                    </div>
                </section>

                {/* DAFTAR PEMINJAMAN */}
                <section>
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                            Daftar Transaksi
                        </h2>

                        <Link
                            to="/galeri"
                            className="rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-700"
                        >
                            + Cari Buku
                        </Link>
                    </div>

                    {userBorrowings.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center dark:border-slate-700 dark:bg-slate-900">
                            <div className="text-5xl">📚</div>

                            <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                                Belum Ada Peminjaman
                            </h3>

                            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
                                Transaksi peminjaman dengan email akun
                                kamu akan muncul di halaman ini.
                            </p>

                            <Link
                                to="/galeri"
                                className="mt-6 inline-flex rounded-xl bg-cyan-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700"
                            >
                                Jelajahi Galeri Buku
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {userBorrowings.map((borrowing) => (
                                <article
                                    key={borrowing.id}
                                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6"
                                >
                                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                                        <div className="min-w-0">
                                            <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                                Transaksi #{borrowing.id}
                                            </p>

                                            <h3 className="mt-2 break-words text-lg font-bold text-slate-900 dark:text-white">
                                                {borrowing.judul || "Buku tanpa judul"}
                                            </h3>

                                            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                                                Diajukan pada{" "}
                                                {formatDate(
                                                    borrowing.tanggalPengajuan
                                                )}
                                            </p>
                                        </div>

                                        <span
                                            className={`inline-flex w-fit shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                                                borrowing.status
                                            )}`}
                                        >
                                            {borrowing.status || "Tidak diketahui"}
                                        </span>
                                    </div>

                                    <div className="mt-5 grid gap-4 border-t border-slate-100 pt-5 dark:border-slate-800 sm:grid-cols-3">
                                        <div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                                Tanggal Pinjam
                                            </p>

                                            <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
                                                {formatDate(
                                                    borrowing.tanggalPinjam
                                                )}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                                Tanggal Jatuh Tempo
                                            </p>

                                            <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
                                                {formatDate(
                                                    borrowing.tanggalJatuhTempo
                                                )}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                                Tanggal Pengembalian
                                            </p>

                                            <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
                                                {formatDate(
                                                    borrowing.tanggalKembali
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                    {borrowing.status ===
                                        "Menunggu Persetujuan" && (
                                        <p className="mt-4 rounded-xl bg-yellow-50 p-3 text-sm leading-6 text-yellow-800 dark:bg-yellow-500/10 dark:text-yellow-300">
                                            Permintaan kamu sedang menunggu
                                            persetujuan admin.
                                        </p>
                                    )}

                                    {borrowing.status === "Dipinjam" && (
                                        <p className="mt-4 rounded-xl bg-purple-50 p-3 text-sm leading-6 text-purple-800 dark:bg-purple-500/10 dark:text-purple-300">
                                            Buku sedang kamu pinjam.
                                            Pastikan dikembalikan sebelum
                                            tanggal jatuh tempo.
                                        </p>
                                    )}

                                    {borrowing.status === "Dikembalikan" && (
                                        <p className="mt-4 rounded-xl bg-green-50 p-3 text-sm leading-6 text-green-800 dark:bg-green-500/10 dark:text-green-300">
                                            Buku telah tercatat kembali
                                            di perpustakaan.
                                        </p>
                                    )}

                                    {borrowing.status === "Ditolak" && (
                                        <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm leading-6 text-red-800 dark:bg-red-500/10 dark:text-red-300">
                                            Permintaan peminjaman ini
                                            ditolak oleh admin.
                                        </p>
                                    )}
                                </article>
                            ))}
                        </div>
                    )}
                </section>

            </div>
        </main>
    );
}

export default UserBorrowingHistory;
