import {
    useMemo,
    useState
} from "react";

import useBorrowings from "../../hooks/useBorrowings";
import useBooks from "../../hooks/useBooks";

function AdminBorrowings() {
    const {
        borrowings,
        updateBorrowing
    } = useBorrowings();

    const {
        books,
        updateBook
    } = useBooks();

    const [filterStatus, setFilterStatus] =
        useState("Semua");

    const [search, setSearch] =
        useState("");

    const filteredBorrowings =
        useMemo(() => {
            return borrowings.filter(
                (borrowing) => {
                    const cocokStatus =
                        filterStatus === "Semua" ||
                        borrowing.status ===
                            filterStatus;

                    const keyword =
                        search
                            .toLowerCase()
                            .trim();

                    const cocokSearch =
                        !keyword ||
                        borrowing.namaPeminjam
                            ?.toLowerCase()
                            .includes(keyword) ||
                        borrowing.judul
                            ?.toLowerCase()
                            .includes(keyword) ||
                        borrowing.emailPeminjam
                            ?.toLowerCase()
                            .includes(keyword);

                    return (
                        cocokStatus &&
                        cocokSearch
                    );
                }
            );
        }, [
            borrowings,
            filterStatus,
            search
        ]);

    const getStatusClass = (status) => {
        if (
            status ===
            "Menunggu Persetujuan"
        ) {
            return "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400";
        }

        if (
            status === "Disetujui" ||
            status === "Dipinjam"
        ) {
            return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400";
        }

        if (status === "Ditolak") {
            return "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400";
        }

        if (status === "Dikembalikan") {
            return "bg-cyan-50 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-400";
        }

        return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";
    };

    // ================================
    // SETUJUI PEMINJAMAN
    // ================================
    const handleApprove = (
        borrowing
    ) => {
        if (
            borrowing.status !==
            "Menunggu Persetujuan"
        ) {
            alert(
                "Peminjaman ini sudah diproses."
            );
            return;
        }

        const book = books.find(
            (item) =>
                String(item.id) ===
                String(borrowing.bookId)
        );

        if (!book) {
            alert(
                "Data buku tidak ditemukan."
            );
            return;
        }

        const stokSaatIni =
            Number(book.stok) || 0;

        if (stokSaatIni <= 0) {
            alert(
                "Peminjaman tidak dapat disetujui karena stok buku sudah habis."
            );
            return;
        }

        const konfirmasi =
            window.confirm(
                `Setujui peminjaman buku "${borrowing.judul}" untuk ${borrowing.namaPeminjam}?`
            );

        if (!konfirmasi) {
            return;
        }

        const tanggalPinjam =
            new Date();

        const tanggalJatuhTempo =
            new Date();

        tanggalJatuhTempo.setDate(
            tanggalJatuhTempo.getDate() +
                7
        );

        // Kurangi stok buku
        updateBook(
            book.id,
            {
                stok:
                    stokSaatIni - 1
            }
        );

        // Update data peminjaman
        updateBorrowing(
            borrowing.id,
            {
                status: "Dipinjam",
                tanggalPinjam:
                    tanggalPinjam.toISOString(),
                tanggalJatuhTempo:
                    tanggalJatuhTempo.toISOString()
            }
        );

        alert(
            "Peminjaman berhasil disetujui.\n\nStok buku telah dikurangi 1 dan batas pengembalian ditetapkan 7 hari."
        );
    };

    // ================================
    // TOLAK PEMINJAMAN
    // ================================
    const handleReject = (
        borrowing
    ) => {
        if (
            borrowing.status !==
            "Menunggu Persetujuan"
        ) {
            alert(
                "Peminjaman ini sudah diproses."
            );
            return;
        }

        const konfirmasi =
            window.confirm(
                `Tolak pengajuan peminjaman dari ${borrowing.namaPeminjam} untuk buku "${borrowing.judul}"?`
            );

        if (!konfirmasi) {
            return;
        }

        updateBorrowing(
            borrowing.id,
            {
                status: "Ditolak"
            }
        );

        alert(
            "Pengajuan peminjaman telah ditolak."
        );
    };

    return (
        <main className="space-y-5 px-5 py-8 sm:px-8">

            {/* Header */}
            <div>
                <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                    Peminjaman Buku
                </h1>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Kelola pengajuan peminjaman buku dari pengguna.
                </p>
            </div>

            {/* Summary */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Total
                    </p>

                    <p className="mt-1 text-3xl font-black text-slate-900 dark:text-white">
                        {borrowings.length}
                    </p>
                </div>

                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 shadow-sm dark:border-amber-900/50 dark:bg-amber-950/20">
                    <p className="text-sm text-amber-700 dark:text-amber-400">
                        Menunggu
                    </p>

                    <p className="mt-1 text-3xl font-black text-amber-700 dark:text-amber-400">
                        {
                            borrowings.filter(
                                (item) =>
                                    item.status ===
                                    "Menunggu Persetujuan"
                            ).length
                        }
                    </p>
                </div>

                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 shadow-sm dark:border-emerald-900/50 dark:bg-emerald-950/20">
                    <p className="text-sm text-emerald-700 dark:text-emerald-400">
                        Dipinjam
                    </p>

                    <p className="mt-1 text-3xl font-black text-emerald-700 dark:text-emerald-400">
                        {
                            borrowings.filter(
                                (item) =>
                                    item.status ===
                                        "Disetujui" ||
                                    item.status ===
                                        "Dipinjam"
                            ).length
                        }
                    </p>
                </div>

                <div className="rounded-2xl border border-cyan-200 bg-cyan-50 p-4 shadow-sm dark:border-cyan-900/50 dark:bg-cyan-950/20">
                    <p className="text-sm text-cyan-700 dark:text-cyan-400">
                        Dikembalikan
                    </p>

                    <p className="mt-1 text-3xl font-black text-cyan-700 dark:text-cyan-400">
                        {
                            borrowings.filter(
                                (item) =>
                                    item.status ===
                                    "Dikembalikan"
                            ).length
                        }
                    </p>
                </div>

            </div>

            {/* Filter */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">

                <div className="grid gap-3 md:grid-cols-[1fr_220px]">

                    <div>
                        <label
                            htmlFor="searchBorrowing"
                            className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300"
                        >
                            Cari Peminjaman
                        </label>

                        <input
                            id="searchBorrowing"
                            type="text"
                            value={search}
                            onChange={(event) =>
                                setSearch(
                                    event.target.value
                                )
                            }
                            placeholder="Cari nama, email, atau judul buku..."
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="filterStatus"
                            className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300"
                        >
                            Status
                        </label>

                        <select
                            id="filterStatus"
                            value={filterStatus}
                            onChange={(event) =>
                                setFilterStatus(
                                    event.target.value
                                )
                            }
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        >
                            <option value="Semua">
                                Semua
                            </option>

                            <option value="Menunggu Persetujuan">
                                Menunggu Persetujuan
                            </option>

                            <option value="Disetujui">
                                Disetujui
                            </option>

                            <option value="Dipinjam">
                                Dipinjam
                            </option>

                            <option value="Ditolak">
                                Ditolak
                            </option>

                            <option value="Dikembalikan">
                                Dikembalikan
                            </option>
                        </select>
                    </div>

                </div>

            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

                {filteredBorrowings.length === 0 ? (

                    <div className="flex min-h-[280px] flex-col items-center justify-center px-6 text-center">

                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-3xl dark:bg-slate-800">
                            📖
                        </div>

                        <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                            Belum Ada Peminjaman
                        </h3>

                        <p className="mt-1.5 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
                            Belum ada pengajuan peminjaman yang sesuai dengan pencarian atau filter.
                        </p>

                    </div>

                ) : (

                    <div className="overflow-x-auto">

                        <table className="w-full min-w-[1100px] text-left">

                            <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/70">

                                <tr>

                                    <th className="px-5 py-3.5 text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                        Peminjam
                                    </th>

                                    <th className="px-5 py-3.5 text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                        Buku
                                    </th>

                                    <th className="px-5 py-3.5 text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                        Tanggal Pengajuan
                                    </th>

                                    <th className="px-5 py-3.5 text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                        Status
                                    </th>

                                    <th className="px-5 py-3.5 text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                        Aksi
                                    </th>

                                </tr>

                            </thead>

                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">

                                {filteredBorrowings.map(
                                    (borrowing) => (
                                        <tr
                                            key={
                                                borrowing.id
                                            }
                                            className="transition hover:bg-slate-50 dark:hover:bg-slate-800/40"
                                        >

                                            {/* Peminjam */}
                                            <td className="px-5 py-4">

                                                <p className="font-bold text-slate-900 dark:text-white">
                                                    {
                                                        borrowing.namaPeminjam
                                                    }
                                                </p>

                                                <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                                                    {
                                                        borrowing.emailPeminjam
                                                    }
                                                </p>

                                            </td>

                                            {/* Buku */}
                                            <td className="px-5 py-4">

                                                <p className="max-w-[280px] font-semibold text-slate-900 dark:text-white">
                                                    {
                                                        borrowing.judul
                                                    }
                                                </p>

                                                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                                                    ID Buku:{" "}
                                                    {
                                                        borrowing.bookId
                                                    }
                                                </p>

                                            </td>

                                            {/* Date */}
                                            <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-400">

                                                {new Date(
                                                    borrowing.tanggalPengajuan
                                                ).toLocaleDateString(
                                                    "id-ID",
                                                    {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric"
                                                    }
                                                )}

                                            </td>

                                            {/* Status */}
                                            <td className="px-5 py-4">

                                                <span
                                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${getStatusClass(
                                                        borrowing.status
                                                    )}`}
                                                >
                                                    {
                                                        borrowing.status
                                                    }
                                                </span>

                                            </td>

                                            {/* Action */}
                                            <td className="px-5 py-4">

                                                <div className="flex flex-wrap gap-2">

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            alert(
                                                                `Detail Peminjaman\n\nPeminjam: ${borrowing.namaPeminjam}\nEmail: ${borrowing.emailPeminjam}\nBuku: ${borrowing.judul}\nStatus: ${borrowing.status}\nTanggal Pengajuan: ${new Date(
                                                                    borrowing.tanggalPengajuan
                                                                ).toLocaleDateString(
                                                                    "id-ID"
                                                                )}\nTanggal Pinjam: ${
                                                                    borrowing.tanggalPinjam
                                                                        ? new Date(
                                                                            borrowing.tanggalPinjam
                                                                        ).toLocaleDateString(
                                                                            "id-ID"
                                                                        )
                                                                        : "-"
                                                                }\nJatuh Tempo: ${
                                                                    borrowing.tanggalJatuhTempo
                                                                        ? new Date(
                                                                            borrowing.tanggalJatuhTempo
                                                                        ).toLocaleDateString(
                                                                            "id-ID"
                                                                        )
                                                                        : "-"
                                                                }`
                                                            )
                                                        }
                                                        className="rounded-lg border border-slate-200 px-3.5 py-2 text-sm font-bold text-slate-700 transition hover:border-cyan-300 hover:text-cyan-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-cyan-700 dark:hover:text-cyan-400"
                                                    >
                                                        Detail
                                                    </button>

                                                    {borrowing.status ===
                                                        "Menunggu Persetujuan" && (
                                                        <>
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleApprove(
                                                                        borrowing
                                                                    )
                                                                }
                                                                className="rounded-lg bg-emerald-600 px-3.5 py-2 text-sm font-bold text-white transition hover:bg-emerald-700"
                                                            >
                                                                Setujui
                                                            </button>

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleReject(
                                                                        borrowing
                                                                    )
                                                                }
                                                                className="rounded-lg bg-red-600 px-3.5 py-2 text-sm font-bold text-white transition hover:bg-red-700"
                                                            >
                                                                Tolak
                                                            </button>
                                                        </>
                                                    )}

                                                </div>

                                            </td>

                                        </tr>
                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </main>
    );
}

export default AdminBorrowings;

