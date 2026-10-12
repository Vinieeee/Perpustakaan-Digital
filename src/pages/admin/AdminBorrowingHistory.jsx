import {
    useMemo,
    useState
} from "react";

import useBorrowings from "../../hooks/useBorrowings";

function AdminBorrowingHistory() {
    const {
        borrowings
    } = useBorrowings();

    const [search, setSearch] =
        useState("");

    const [filterStatus, setFilterStatus] =
        useState("Semua");

    const formatTanggal = (tanggal) => {
        if (!tanggal) {
            return "-";
        }

        const date = new Date(tanggal);

        if (Number.isNaN(date.getTime())) {
            return "-";
        }

        return date.toLocaleDateString(
            "id-ID",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );
    };

    const filteredBorrowings = useMemo(() => {
        const keyword = search
            .toLowerCase()
            .trim();

        return [...borrowings]
            .filter((borrowing) => {
                const cocokStatus =
                    filterStatus === "Semua" ||
                    borrowing.status === filterStatus;

                const cocokSearch =
                    !keyword ||
                    borrowing.namaPeminjam
                        ?.toLowerCase()
                        .includes(keyword) ||
                    borrowing.emailPeminjam
                        ?.toLowerCase()
                        .includes(keyword) ||
                    borrowing.judul
                        ?.toLowerCase()
                        .includes(keyword);

                return cocokStatus && cocokSearch;
            })
            .sort(
                (a, b) =>
                    new Date(b.tanggalPengajuan || 0) -
                    new Date(a.tanggalPengajuan || 0)
            );
    }, [
        borrowings,
        search,
        filterStatus
    ]);

    const getStatusClass = (status) => {
        if (status === "Menunggu Persetujuan") {
            return "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400";
        }

        if (
            status === "Dipinjam" ||
            status === "Disetujui"
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

    const totalDipinjam = borrowings.filter(
        (item) =>
            item.status === "Dipinjam" ||
            item.status === "Disetujui"
    ).length;

    const totalDikembalikan = borrowings.filter(
        (item) =>
            item.status === "Dikembalikan"
    ).length;

    const totalDitolak = borrowings.filter(
        (item) =>
            item.status === "Ditolak"
    ).length;

    return (
        <div className="space-y-5 px-5 py-8 sm:px-8">

            {/* Header */}
            <div>
                <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                    Riwayat Peminjaman
                </h1>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Lihat seluruh riwayat pengajuan dan transaksi peminjaman buku.
                </p>
            </div>

            {/* Summary */}
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">

                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Total Transaksi
                    </p>

                    <p className="mt-1 text-3xl font-black text-slate-900 dark:text-white">
                        {borrowings.length}
                    </p>
                </div>

                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 shadow-sm dark:border-emerald-900/50 dark:bg-emerald-950/20">
                    <p className="text-sm text-emerald-700 dark:text-emerald-400">
                        Sedang Dipinjam
                    </p>

                    <p className="mt-1 text-3xl font-black text-emerald-700 dark:text-emerald-400">
                        {totalDipinjam}
                    </p>
                </div>

                <div className="rounded-2xl border border-cyan-200 bg-cyan-50 p-4 shadow-sm dark:border-cyan-900/50 dark:bg-cyan-950/20">
                    <p className="text-sm text-cyan-700 dark:text-cyan-400">
                        Dikembalikan
                    </p>

                    <p className="mt-1 text-3xl font-black text-cyan-700 dark:text-cyan-400">
                        {totalDikembalikan}
                    </p>
                </div>

                <div className="rounded-2xl border border-red-200 bg-red-50 p-4 shadow-sm dark:border-red-900/50 dark:bg-red-950/20">
                    <p className="text-sm text-red-700 dark:text-red-400">
                        Ditolak
                    </p>

                    <p className="mt-1 text-3xl font-black text-red-700 dark:text-red-400">
                        {totalDitolak}
                    </p>
                </div>

            </div>

            {/* Search and Filter */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">

                <div className="grid gap-3 md:grid-cols-[1fr_240px]">

                    <div>
                        <label
                            htmlFor="searchHistory"
                            className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300"
                        >
                            Cari Riwayat
                        </label>

                        <input
                            id="searchHistory"
                            type="text"
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                            placeholder="Cari nama, email, atau judul buku..."
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="historyStatus"
                            className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300"
                        >
                            Filter Status
                        </label>

                        <select
                            id="historyStatus"
                            value={filterStatus}
                            onChange={(event) =>
                                setFilterStatus(event.target.value)
                            }
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        >
                            <option value="Semua">
                                Semua Status
                            </option>

                            <option value="Menunggu Persetujuan">
                                Menunggu Persetujuan
                            </option>

                            <option value="Dipinjam">
                                Dipinjam
                            </option>

                            <option value="Disetujui">
                                Disetujui
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

            {/* History Table */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

                {filteredBorrowings.length === 0 ? (

                    <div className="flex min-h-[280px] flex-col items-center justify-center px-6 text-center">

                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-3xl dark:bg-slate-800">
                            📚
                        </div>

                        <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                            Riwayat Belum Tersedia
                        </h3>

                        <p className="mt-1.5 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
                            Belum ada transaksi yang sesuai dengan pencarian atau filter.
                        </p>

                    </div>

                ) : (

                    <div className="overflow-x-auto">

                        <table className="w-full min-w-[1150px] text-left">

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
                                        Tanggal Pinjam
                                    </th>

                                    <th className="px-5 py-3.5 text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                        Jatuh Tempo
                                    </th>

                                    <th className="px-5 py-3.5 text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                        Tanggal Kembali
                                    </th>

                                    <th className="px-5 py-3.5 text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                        Status
                                    </th>
                                </tr>

                            </thead>

                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">

                                {filteredBorrowings.map(
                                    (borrowing) => (
                                        <tr
                                            key={borrowing.id}
                                            className="transition hover:bg-slate-50 dark:hover:bg-slate-800/40"
                                        >

                                            <td className="px-5 py-4">
                                                <p className="font-bold text-slate-900 dark:text-white">
                                                    {borrowing.namaPeminjam || "-"}
                                                </p>

                                                <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                                                    {borrowing.emailPeminjam || "-"}
                                                </p>
                                            </td>

                                            <td className="px-5 py-4">
                                                <p className="max-w-[240px] font-semibold text-slate-900 dark:text-white">
                                                    {borrowing.judul || "-"}
                                                </p>

                                                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                                                    ID Buku: {borrowing.bookId ?? "-"}
                                                </p>
                                            </td>

                                            <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600 dark:text-slate-400">
                                                {formatTanggal(
                                                    borrowing.tanggalPengajuan
                                                )}
                                            </td>

                                            <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600 dark:text-slate-400">
                                                {formatTanggal(
                                                    borrowing.tanggalPinjam
                                                )}
                                            </td>

                                            <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600 dark:text-slate-400">
                                                {formatTanggal(
                                                    borrowing.tanggalJatuhTempo
                                                )}
                                            </td>

                                            <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600 dark:text-slate-400">
                                                {formatTanggal(
                                                    borrowing.tanggalKembali
                                                )}
                                            </td>

                                            <td className="whitespace-nowrap px-5 py-4">
                                                <span
                                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${getStatusClass(
                                                        borrowing.status
                                                    )}`}
                                                >
                                                    {borrowing.status || "Tidak diketahui"}
                                                </span>
                                            </td>

                                        </tr>
                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                )}

                <div className="border-t border-slate-200 px-5 py-3 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                    Menampilkan {filteredBorrowings.length} dari {borrowings.length} transaksi.
                </div>

            </div>

        </div>
    );
}

export default AdminBorrowingHistory;
