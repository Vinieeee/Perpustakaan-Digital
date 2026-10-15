import Swal from "sweetalert2";
import { useMemo, useRef, useState } from "react";
import useBooks from "../../hooks/useBooks";
import useBorrowings from "../../hooks/useBorrowings";

function formatDate(date) {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return "-";
    }

    return parsedDate.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

function getStatusStyle(status) {
    switch (status) {
        case "Menunggu Persetujuan":
            return "bg-yellow-500/10 text-yellow-400";

        case "Disetujui":
            return "bg-blue-500/10 text-blue-400";

        case "Dipinjam":
            return "bg-purple-500/10 text-purple-400";

        case "Dikembalikan":
            return "bg-green-500/10 text-green-400";

        case "Ditolak":
            return "bg-red-500/10 text-red-400";

        default:
            return "bg-slate-500/10 text-slate-400";
    }
}

function AdminBorrowingHistory() {
    const { books, updateBook } = useBooks();

    const {
        borrowings,
        updateBorrowing,
    } = useBorrowings();

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("Semua");
    const [processingIds, setProcessingIds] = useState([]);

    // Mencegah klik ganda sebelum komponen selesai diperbarui.
    const processingRef = useRef(new Set());

    const filteredBorrowings = useMemo(() => {
        return [...borrowings]
            .filter((borrowing) => {
                const keyword = search.toLowerCase();

                const matchesSearch =
                    (borrowing.namaPeminjam || "")
                        .toLowerCase()
                        .includes(keyword) ||
                    (borrowing.judul || "")
                        .toLowerCase()
                        .includes(keyword) ||
                    (borrowing.emailPeminjam || "")
                        .toLowerCase()
                        .includes(keyword);

                const matchesStatus =
                    statusFilter === "Semua" ||
                    borrowing.status === statusFilter;

                return matchesSearch && matchesStatus;
            })
            .sort(
                (a, b) =>
                    new Date(b.tanggalPengajuan || 0) -
                    new Date(a.tanggalPengajuan || 0)
            );
    }, [borrowings, search, statusFilter]);

    const totalBorrowings = borrowings.length;

    const totalBorrowed = borrowings.filter(
        (borrowing) => borrowing.status === "Dipinjam"
    ).length;

    const totalReturned = borrowings.filter(
        (borrowing) => borrowing.status === "Dikembalikan"
    ).length;

    const totalPending = borrowings.filter(
        (borrowing) =>
            borrowing.status === "Menunggu Persetujuan"
    ).length;

    const handleReturn = (borrowing) => {
        const borrowingId = String(borrowing.id);

        if (borrowing.status !== "Dipinjam") return;
        if (processingRef.current.has(borrowingId)) return;

        const book = books.find((item) => String(item.id) === String(borrowing.bookId));

        if (!book) {
            Swal.fire({ icon: 'error', title: 'Oops...', text: 'Data buku tidak ditemukan. Pengembalian dibatalkan.', background: '#0f172a', color: '#f8fafc', confirmButtonColor: '#0891b2' });
            return;
        }

        const currentStock = Number(book.stok);

        if (!Number.isFinite(currentStock) || currentStock < 0) {
            Swal.fire({ icon: 'error', title: 'Oops...', text: 'Stok buku tidak valid. Periksa data buku terlebih dahulu.', background: '#0f172a', color: '#f8fafc', confirmButtonColor: '#0891b2' });
            return;
        }

        Swal.fire({
            title: 'Konfirmasi Pengembalian',
            text: `Konfirmasi pengembalian buku "${borrowing.judul}" dari ${borrowing.namaPeminjam}? Stok buku akan bertambah 1.`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#10b981',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Ya, Kembalikan',
            cancelButtonText: 'Batal',
            background: '#0f172a',
            color: '#f8fafc'
        }).then((result) => {
            if (result.isConfirmed) {
                processingRef.current.add(borrowingId);
                setProcessingIds((current) => [...current, borrowingId]);

                try {
                    updateBook(book.id, { stok: currentStock + 1 });
                    updateBorrowing(borrowing.id, {
                        status: "Dikembalikan",
                        tanggalKembali: new Date().toISOString(),
                    });

                    Swal.fire({
                        title: 'Berhasil!',
                        text: 'Pengembalian berhasil dikonfirmasi. Stok buku telah diperbarui.',
                        icon: 'success',
                        background: '#0f172a',
                        color: '#f8fafc',
                        confirmButtonColor: '#0891b2'
                    });
                } finally {
                    processingRef.current.delete(borrowingId);
                    setProcessingIds((current) => current.filter((id) => id !== borrowingId));
                }
            }
        });
    };

    return (
        <div className="space-y-6 px-5 py-8 sm:px-8">
            {/* HEADER */}
            <div>
                <p className="text-sm text-cyan-400">
                    ADMIN PANEL
                </p>

                <h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
                    Riwayat Peminjaman
                </h1>

                <p className="mt-2 text-sm text-slate-400">
                    Pantau seluruh transaksi peminjaman dan
                    pengembalian buku perpustakaan.
                </p>
            </div>

            {/* SUMMARY */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5">
                    <p className="text-sm text-slate-400">
                        Total Transaksi
                    </p>

                    <p className="mt-2 text-3xl font-bold text-white">
                        {totalBorrowings}
                    </p>
                </div>

                <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5">
                    <p className="text-sm text-slate-400">
                        Sedang Dipinjam
                    </p>

                    <p className="mt-2 text-3xl font-bold text-purple-400">
                        {totalBorrowed}
                    </p>
                </div>

                <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5">
                    <p className="text-sm text-slate-400">
                        Sudah Dikembalikan
                    </p>

                    <p className="mt-2 text-3xl font-bold text-green-400">
                        {totalReturned}
                    </p>
                </div>

                <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5">
                    <p className="text-sm text-slate-400">
                        Menunggu Persetujuan
                    </p>

                    <p className="mt-2 text-3xl font-bold text-yellow-400">
                        {totalPending}
                    </p>
                </div>
            </div>

            {/* FILTER */}
            <div className="flex flex-col gap-3 sm:flex-row">
                <input
                    type="text"
                    value={search}
                    onChange={(event) =>
                        setSearch(event.target.value)
                    }
                    placeholder="Cari nama, email, atau judul buku..."
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-500 sm:flex-1"
                />

                <select
                    value={statusFilter}
                    onChange={(event) =>
                        setStatusFilter(event.target.value)
                    }
                    className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500"
                >
                    <option value="Semua">
                        Semua Status
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

                    <option value="Dikembalikan">
                        Dikembalikan
                    </option>

                    <option value="Ditolak">
                        Ditolak
                    </option>
                </select>
            </div>

            {/* TABLE */}
            <div className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-900">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1100px] text-left text-sm">
                        <thead className="border-b border-slate-700 bg-slate-800/70 text-slate-300">
                            <tr>
                                <th className="px-5 py-4 font-semibold">
                                    Peminjam
                                </th>

                                <th className="px-5 py-4 font-semibold">
                                    Buku
                                </th>

                                <th className="px-5 py-4 font-semibold">
                                    Tanggal Pengajuan
                                </th>

                                <th className="px-5 py-4 font-semibold">
                                    Tanggal Pinjam
                                </th>

                                <th className="px-5 py-4 font-semibold">
                                    Jatuh Tempo
                                </th>

                                <th className="px-5 py-4 font-semibold">
                                    Tanggal Kembali
                                </th>

                                <th className="px-5 py-4 font-semibold">
                                    Status
                                </th>

                                <th className="px-5 py-4 font-semibold">
                                    Aksi
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-800">
                            {filteredBorrowings.map((borrowing) => {
                                const isProcessing =
                                    processingIds.includes(
                                        String(borrowing.id)
                                    );

                                return (
                                    <tr
                                        key={borrowing.id}
                                        className="text-slate-300 transition hover:bg-slate-800/40"
                                    >
                                        <td className="px-5 py-4">
                                            <p className="font-medium text-white">
                                                {borrowing.namaPeminjam || "-"}
                                            </p>

                                            <p className="mt-1 text-xs text-slate-500">
                                                {borrowing.emailPeminjam || "-"}
                                            </p>
                                        </td>

                                        <td className="px-5 py-4">
                                            <span className="font-medium text-white">
                                                {borrowing.judul || "-"}
                                            </span>
                                        </td>

                                        <td className="whitespace-nowrap px-5 py-4">
                                            {formatDate(
                                                borrowing.tanggalPengajuan
                                            )}
                                        </td>

                                        <td className="whitespace-nowrap px-5 py-4">
                                            {formatDate(
                                                borrowing.tanggalPinjam
                                            )}
                                        </td>

                                        <td className="whitespace-nowrap px-5 py-4">
                                            {formatDate(
                                                borrowing.tanggalJatuhTempo
                                            )}
                                        </td>

                                        <td className="whitespace-nowrap px-5 py-4">
                                            {formatDate(
                                                borrowing.tanggalKembali
                                            )}
                                        </td>

                                        <td className="px-5 py-4">
                                            <span
                                                className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                                                    borrowing.status
                                                )}`}
                                            >
                                                {borrowing.status || "-"}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4">
                                            {borrowing.status === "Dipinjam" ? (
                                                <button
                                                    type="button"
                                                    disabled={isProcessing}
                                                    onClick={() =>
                                                        handleReturn(borrowing)
                                                    }
                                                    className="whitespace-nowrap rounded-lg bg-green-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
                                                >
                                                    {isProcessing
                                                        ? "Memproses..."
                                                        : "Kembalikan Buku"}
                                                </button>
                                            ) : borrowing.status === "Dikembalikan" ? (
                                                <span className="text-xs text-green-400">
                                                    Selesai
                                                </span>
                                            ) : (
                                                <span className="text-xs text-slate-500">
                                                    -
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}

                            {filteredBorrowings.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={8}
                                        className="px-5 py-12 text-center"
                                    >
                                        <p className="font-medium text-slate-300">
                                            Tidak ada data peminjaman.
                                        </p>

                                        <p className="mt-1 text-xs text-slate-500">
                                            Coba ubah kata kunci pencarian
                                            atau filter status.
                                        </p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <p className="text-xs leading-relaxed text-slate-500">
                Catatan: data peminjaman dan stok disimpan melalui
                localStorage browser ini. Untuk penggunaan multi-admin
                atau multi-perangkat, diperlukan backend dan database.
            </p>
        </div>
    );
}

export default AdminBorrowingHistory;
