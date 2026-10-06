import { useState } from "react";
import useMessages from "../../hooks/useMessages";

function Contact() {
    const { addMessage } =
        useMessages();

    const [form, setForm] =
        useState({
            nama: "",
            email: "",
            subject: "",
            message: ""
        });

    const [submitted, setSubmitted] =
        useState(false);

    const handleChange = (event) => {
        const {
            name,
            value
        } = event.target;

        setForm((current) => ({
            ...current,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (
            !form.nama.trim() ||
            !form.email.trim() ||
            !form.subject.trim() ||
            !form.message.trim()
        ) {
            alert(
                "Semua field wajib diisi."
            );

            return;
        }

        addMessage(form);

        setForm({
            nama: "",
            email: "",
            subject: "",
            message: ""
        });

        setSubmitted(true);

        setTimeout(() => {
            setSubmitted(false);
        }, 5000);
    };

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950">

            {/* Header */}
            <section className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">

                <div className="mx-auto max-w-7xl px-6 py-14">

                    <span className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
                        Contact
                    </span>

                    <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-900 dark:text-white md:text-5xl">
                        Hubungi Kami
                    </h1>

                    <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
                        Punya pertanyaan atau ingin
                        menyampaikan pesan kepada
                        pengelola perpustakaan?
                        Silakan hubungi kami melalui
                        formulir berikut.
                    </p>

                </div>

            </section>

            {/* Content */}
            <section className="mx-auto max-w-7xl px-6 py-12">

                <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">

                    {/* Information */}
                    <div className="space-y-5">

                        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900">

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-100 text-2xl dark:bg-cyan-950/50">
                                📚
                            </div>

                            <h2 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
                                Perpustakaan Digital
                            </h2>

                            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                Kami menyediakan katalog
                                digital untuk membantu
                                pengguna menemukan dan
                                mengelola informasi koleksi
                                buku dengan lebih mudah.
                            </p>

                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900">

                            <div className="space-y-5">

                                <div className="flex gap-4">

                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                                        📍
                                    </div>

                                    <div>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">
                                            Lokasi
                                        </p>

                                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                            Perpustakaan Kampus
                                        </p>
                                    </div>

                                </div>

                                <div className="flex gap-4">

                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                                        ✉️
                                    </div>

                                    <div>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">
                                            Email
                                        </p>

                                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                            Silakan gunakan
                                            formulir kontak.
                                        </p>
                                    </div>

                                </div>

                                <div className="flex gap-4">

                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                                        🕐
                                    </div>

                                    <div>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">
                                            Layanan
                                        </p>

                                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                            Senin - Jumat
                                        </p>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Form */}
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8 dark:border-slate-800 dark:bg-slate-900">

                        {submitted && (
                            <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/20">

                                <p className="font-semibold text-emerald-700 dark:text-emerald-400">
                                    Pesan berhasil dikirim!
                                </p>

                                <p className="mt-1 text-sm text-emerald-600 dark:text-emerald-500">
                                    Pesan kamu sudah tersimpan
                                    dan akan diperiksa oleh
                                    admin.
                                </p>

                            </div>
                        )}

                        <div className="mb-7">

                            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                                Kirim Pesan
                            </h2>

                            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                                Isi formulir di bawah dengan
                                informasi yang benar.
                            </p>

                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >

                            {/* Nama */}
                            <div>

                                <label
                                    htmlFor="nama"
                                    className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
                                >
                                    Nama
                                </label>

                                <input
                                    id="nama"
                                    name="nama"
                                    type="text"
                                    value={
                                        form.nama
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Masukkan nama"
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500"
                                />

                            </div>

                            {/* Email */}
                            <div>

                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
                                >
                                    Email
                                </label>

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={
                                        form.email
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="nama@email.com"
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500"
                                />

                            </div>

                            {/* Subject */}
                            <div>

                                <label
                                    htmlFor="subject"
                                    className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
                                >
                                    Subjek
                                </label>

                                <input
                                    id="subject"
                                    name="subject"
                                    type="text"
                                    value={
                                        form.subject
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Subjek pesan"
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500"
                                />

                            </div>

                            {/* Message */}
                            <div>

                                <label
                                    htmlFor="message"
                                    className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
                                >
                                    Pesan
                                </label>

                                <textarea
                                    id="message"
                                    name="message"
                                    rows="6"
                                    value={
                                        form.message
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Tuliskan pesan kamu..."
                                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500"
                                />

                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full rounded-xl bg-cyan-500 px-6 py-3.5 font-bold text-white shadow-lg shadow-cyan-500/10 transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-400"
                            >
                                Kirim Pesan
                            </button>

                        </form>

                    </div>

                </div>

            </section>

        </main>
    );
}

export default Contact;