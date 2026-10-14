import { useEffect, useState } from "react";
import Swal from "sweetalert2"; // Tambahkan import SweetAlert2

const initialForm = {
    judul: "",
    penulis: "",
    penerbit: "",
    tahun: "",
    kategori: "",
    cover: ""
};

function BookForm({
    initialData = initialForm,
    onSubmit,
    submitText = "Simpan Buku"
}) {
    const [form, setForm] = useState(initialData);

    useEffect(() => {
        setForm(initialData);
    }, [initialData]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((current) => ({
            ...current,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Fungsi bantuan agar pemanggilan SweetAlert lebih rapi
        const showWarning = (pesan) => {
            Swal.fire({
                icon: 'warning',
                title: 'Data Belum Lengkap!',
                text: pesan,
                background: '#0f172a', // Warna slate-900
                color: '#f8fafc', // Warna teks
                confirmButtonColor: '#0891b2', // Warna cyan-600
                confirmButtonText: 'Oke, paham'
            });
        };

        if (!form.judul.trim()) {
            return showWarning("Judul buku wajib diisi.");
        }

        if (!form.penulis.trim()) {
            return showWarning("Penulis wajib diisi.");
        }

        if (!form.penerbit.trim()) {
            return showWarning("Penerbit wajib diisi.");
        }

        if (!form.tahun) {
            return showWarning("Tahun terbit wajib diisi.");
        }

        if (!form.kategori.trim()) {
            return showWarning("Kategori wajib diisi.");
        }

        onSubmit({
            ...form,
            tahun: Number(form.tahun)
        });
    };

    return (
        <form
            className="book-form"
            onSubmit={handleSubmit}
        >
            <div className="form-group">
                <label htmlFor="judul">
                    Judul Buku
                </label>

                <input
                    id="judul"
                    name="judul"
                    type="text"
                    value={form.judul}
                    onChange={handleChange}
                    placeholder="Masukkan judul buku"
                />
            </div>

            <div className="form-group">
                <label htmlFor="penulis">
                    Penulis
                </label>

                <input
                    id="penulis"
                    name="penulis"
                    type="text"
                    value={form.penulis}
                    onChange={handleChange}
                    placeholder="Masukkan nama penulis"
                />
            </div>

            <div className="form-group">
                <label htmlFor="penerbit">
                    Penerbit
                </label>

                <input
                    id="penerbit"
                    name="penerbit"
                    type="text"
                    value={form.penerbit}
                    onChange={handleChange}
                    placeholder="Masukkan penerbit"
                />
            </div>

            <div className="book-form-row">
                <div className="form-group">
                    <label htmlFor="tahun">
                        Tahun Terbit
                    </label>

                    <input
                        id="tahun"
                        name="tahun"
                        type="number"
                        value={form.tahun}
                        onChange={handleChange}
                        placeholder="2026"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="kategori">
                        Kategori
                    </label>

                    <input
                        id="kategori"
                        name="kategori"
                        type="text"
                        value={form.kategori}
                        onChange={handleChange}
                        placeholder="Contoh: Teknologi"
                    />
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="cover">
                    URL Cover Buku
                </label>

                <input
                    id="cover"
                    name="cover"
                    type="text"
                    value={form.cover}
                    onChange={handleChange}
                    placeholder="https://..."
                />
            </div>

            {form.cover && (
                <div className="book-form-preview">
                    <span>
                        Preview Cover
                    </span>

                    <img
                        src={form.cover}
                        alt="Preview cover"
                        onError={(event) => {
                            event.currentTarget.style.display =
                                "none";
                        }}
                    />
                </div>
            )}

            <button
                type="submit"
                className="admin-primary-button"
            >
                {submitText}
            </button>
        </form>
    );
}

export default BookForm;