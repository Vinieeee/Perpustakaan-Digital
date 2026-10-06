function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
            <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">

                <div className="max-w-xl">
                    <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">
                        Perpustakaan Digital
                    </h3>

                    <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                        Sistem katalog buku digital
                        untuk memudahkan pencarian
                        dan pengelolaan koleksi buku.
                    </p>
                </div>

                <div>
                    <p className="text-sm text-slate-500 dark:text-slate-500">
                        © 2026 Perpustakaan Digital
                    </p>
                </div>

            </div>
        </footer>
    );
}

export default Footer;