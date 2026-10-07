import { useMemo, useState } from "react";

import useMessages from "../../hooks/useMessages";

function AdminMessages() {
    const {
        messages,
        markAsRead,
        markAsUnread,
        deleteMessage,
        clearMessages
    } = useMessages();

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] =
        useState("");
    const [selectedMessage, setSelectedMessage] =
        useState(null);

    const filteredMessages = useMemo(() => {
        const keyword = search
            .toLowerCase()
            .trim();

        return [...messages]
            .filter((message) => {
                const searchableText = [
                    message.nama,
                    message.email,
                    message.subject,
                    message.message
                ]
                    .filter(Boolean)
                    .join(" ")
                    .toLowerCase();

                const matchesSearch =
                    !keyword ||
                    searchableText.includes(keyword);

                const matchesStatus =
                    !statusFilter ||
                    message.status === statusFilter;

                return (
                    matchesSearch &&
                    matchesStatus
                );
            })
            .sort(
                (a, b) =>
                    new Date(b.tanggal) -
                    new Date(a.tanggal)
            );
    }, [
        messages,
        search,
        statusFilter
    ]);

    const unreadCount = messages.filter(
        (message) =>
            message.status === "Belum Dibaca"
    ).length;

    const readCount = messages.filter(
        (message) =>
            message.status === "Dibaca"
    ).length;

    const formatDate = (date) => {
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
        ).format(new Date(date));
    };

    const handleOpenMessage = (message) => {
        setSelectedMessage(message);

        if (
            message.status ===
            "Belum Dibaca"
        ) {
            markAsRead(message.id);
        }
    };

    const handleCloseMessage = () => {
        setSelectedMessage(null);
    };

    const handleDelete = (message) => {
        const confirmed = window.confirm(
            `Yakin ingin menghapus pesan dari ${message.nama}?`
        );

        if (!confirmed) {
            return;
        }

        deleteMessage(message.id);

        if (
            selectedMessage?.id ===
            message.id
        ) {
            setSelectedMessage(null);
        }
    };

    const handleClearAll = () => {
        if (messages.length === 0) {
            return;
        }

        const confirmed = window.confirm(
            "Yakin ingin menghapus semua pesan? Tindakan ini tidak dapat dibatalkan."
        );

        if (!confirmed) {
            return;
        }

        clearMessages();
        setSelectedMessage(null);
    };

    return (
        <div className="px-5 py-8 sm:px-8">
            {/* HEADER */}
            <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div>

                    <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                        Pesan Masuk
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                        Kelola pesan yang
                        dikirimkan pengunjung
                        melalui halaman Contact.
                    </p>
                </div>

                {messages.length > 0 && (
                    <button
                        type="button"
                        onClick={handleClearAll}
                        className="rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-950/60"
                    >
                        🗑 Hapus Semua Pesan
                    </button>
                )}
            </div>

            {/* STATISTICS */}
            <div className="mb-6 grid gap-4 sm:grid-cols-3">
                {/* TOTAL */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Total Pesan
                            </p>

                            <p className="mt-2 text-3xl font-black text-slate-900 dark:text-white">
                                {messages.length}
                            </p>
                        </div>

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-100 text-2xl dark:bg-cyan-950/50">
                            💬
                        </div>
                    </div>
                </div>

                {/* UNREAD */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Belum Dibaca
                            </p>

                            <p className="mt-2 text-3xl font-black text-slate-900 dark:text-white">
                                {unreadCount}
                            </p>
                        </div>

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-2xl dark:bg-amber-950/50">
                            📩
                        </div>
                    </div>
                </div>

                {/* READ */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Sudah Dibaca
                            </p>

                            <p className="mt-2 text-3xl font-black text-slate-900 dark:text-white">
                                {readCount}
                            </p>
                        </div>

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-2xl dark:bg-emerald-950/50">
                            ✓
                        </div>
                    </div>
                </div>
            </div>

            {/* FILTER */}
            <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px_auto]">
                    <div className="relative">
                        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                            🔎
                        </span>

                        <input
                            type="text"
                            value={search}
                            onChange={(event) =>
                                setSearch(
                                    event.target.value
                                )
                            }
                            placeholder="Cari nama, email, subjek, atau isi pesan..."
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500"
                        />
                    </div>

                    <select
                        value={statusFilter}
                        onChange={(event) =>
                            setStatusFilter(
                                event.target.value
                            )
                        }
                        className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"
                    >
                        <option value="">
                            Semua Status
                        </option>

                        <option value="Belum Dibaca">
                            Belum Dibaca
                        </option>

                        <option value="Dibaca">
                            Dibaca
                        </option>
                    </select>

                    <button
                        type="button"
                        onClick={() => {
                            setSearch("");
                            setStatusFilter("");
                        }}
                        className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-cyan-300 hover:text-cyan-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-cyan-500 dark:hover:text-cyan-400"
                    >
                        Reset Filter
                    </button>
                </div>

                <div className="mt-5 border-t border-slate-100 pt-4 dark:border-slate-800">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Menampilkan{" "}
                        <span className="font-bold text-slate-900 dark:text-white">
                            {filteredMessages.length}
                        </span>{" "}
                        dari{" "}
                        <span className="font-bold text-slate-900 dark:text-white">
                            {messages.length}
                        </span>{" "}
                        pesan
                    </p>
                </div>
            </div>

            {/* EMPTY */}
            {filteredMessages.length === 0 && (
                <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 text-center dark:border-slate-700 dark:bg-slate-900">
                    <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-100 text-4xl dark:bg-slate-800">
                        💬
                    </div>

                    <h2 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">
                        Tidak Ada Pesan
                    </h2>

                    <p className="mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
                        Belum ada pesan yang
                        masuk atau tidak ada
                        pesan yang sesuai dengan
                        filter.
                    </p>
                </div>
            )}

            {/* MESSAGE LIST */}
            {filteredMessages.length > 0 && (
                <div className="space-y-4">
                    {filteredMessages.map(
                        (message) => {
                            const isUnread =
                                message.status ===
                                "Belum Dibaca";

                            return (
                                <article
                                    key={
                                        message.id
                                    }
                                    className={`rounded-2xl border bg-white p-5 shadow-sm transition dark:bg-slate-900 ${
                                        isUnread
                                            ? "border-cyan-200 dark:border-cyan-900/60"
                                            : "border-slate-200 dark:border-slate-800"
                                    }`}
                                >
                                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
                                        {/* ICON */}
                                        <div
                                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl ${
                                                isUnread
                                                    ? "bg-cyan-100 dark:bg-cyan-950/50"
                                                    : "bg-slate-100 dark:bg-slate-800"
                                            }`}
                                        >
                                            {isUnread
                                                ? "📩"
                                                : "✉️"}
                                        </div>

                                        {/* CONTENT */}
                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                                <div>
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <h3 className="font-bold text-slate-900 dark:text-white">
                                                            {
                                                                message.nama
                                                            }
                                                        </h3>

                                                        {isUnread && (
                                                            <span className="rounded-full bg-cyan-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-400">
                                                                Baru
                                                            </span>
                                                        )}
                                                    </div>

                                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                                        {
                                                            message.email
                                                        }
                                                    </p>
                                                </div>

                                                <span
                                                    className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${
                                                        isUnread
                                                            ? "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400"
                                                            : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
                                                    }`}
                                                >
                                                    {
                                                        message.status
                                                    }
                                                </span>
                                            </div>

                                            <h4 className="mt-4 text-base font-bold text-slate-800 dark:text-slate-200">
                                                {
                                                    message.subject ||
                                                    "Tanpa Subjek"
                                                }
                                            </h4>

                                            <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                                {
                                                    message.message
                                                }
                                            </p>

                                            <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
                                                <p className="text-xs text-slate-400">
                                                    {formatDate(
                                                        message.tanggal
                                                    )}
                                                </p>

                                                <div className="flex flex-wrap gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleOpenMessage(
                                                                message
                                                            )
                                                        }
                                                        className="rounded-lg border border-cyan-200 bg-cyan-50 px-3 py-2 text-xs font-bold text-cyan-700 transition hover:bg-cyan-100 dark:border-cyan-900/50 dark:bg-cyan-950/30 dark:text-cyan-400 dark:hover:bg-cyan-950/60"
                                                    >
                                                        Lihat Detail
                                                    </button>

                                                    {isUnread ? (
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                markAsRead(
                                                                    message.id
                                                                )
                                                            }
                                                            className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-600 transition hover:bg-emerald-100 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-400"
                                                        >
                                                            Tandai Dibaca
                                                        </button>
                                                    ) : (
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                markAsUnread(
                                                                    message.id
                                                                )
                                                            }
                                                            className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-bold text-amber-600 transition hover:bg-amber-100 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-400"
                                                        >
                                                            Tandai Belum Dibaca
                                                        </button>
                                                    )}

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleDelete(
                                                                message
                                                            )
                                                        }
                                                        className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-100 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400"
                                                    >
                                                        Hapus
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            );
                        }
                    )}
                </div>
            )}

            {/* DETAIL MODAL */}
            {selectedMessage && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
                    onClick={handleCloseMessage}
                >
                    <div
                        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >
                        {/* MODAL HEADER */}
                        <div className="flex items-start justify-between gap-4 border-b border-slate-200 p-6 dark:border-slate-800">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
                                    Detail Pesan
                                </span>

                                <h2 className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
                                    {
                                        selectedMessage.subject ||
                                        "Tanpa Subjek"
                                    }
                                </h2>
                            </div>

                            <button
                                type="button"
                                onClick={
                                    handleCloseMessage
                                }
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-lg text-slate-600 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                                aria-label="Tutup"
                            >
                                ×
                            </button>
                        </div>

                        {/* MODAL CONTENT */}
                        <div className="space-y-6 p-6">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-950">
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                        Nama
                                    </p>

                                    <p className="mt-2 font-semibold text-slate-900 dark:text-white">
                                        {
                                            selectedMessage.nama
                                        }
                                    </p>
                                </div>

                                <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-950">
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                        Email
                                    </p>

                                    <p className="mt-2 break-all font-semibold text-slate-900 dark:text-white">
                                        {
                                            selectedMessage.email
                                        }
                                    </p>
                                </div>

                                <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-950">
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                        Status
                                    </p>

                                    <p className="mt-2 font-semibold text-slate-900 dark:text-white">
                                        {
                                            selectedMessage.status
                                        }
                                    </p>
                                </div>

                                <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-950">
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                        Tanggal
                                    </p>

                                    <p className="mt-2 font-semibold text-slate-900 dark:text-white">
                                        {formatDate(
                                            selectedMessage.tanggal
                                        )}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                                    Isi Pesan
                                </p>

                                <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
                                    <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700 dark:text-slate-300">
                                        {
                                            selectedMessage.message
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* MODAL FOOTER */}
                        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 p-6 sm:flex-row sm:justify-end dark:border-slate-800">
                            <button
                                type="button"
                                onClick={() =>
                                    handleDelete(
                                        selectedMessage
                                    )
                                }
                                className="rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400"
                            >
                                Hapus Pesan
                            </button>

                            <button
                                type="button"
                                onClick={
                                    handleCloseMessage
                                }
                                className="rounded-xl bg-cyan-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-cyan-400"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminMessages;