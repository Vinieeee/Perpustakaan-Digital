import { useEffect, useState } from "react";

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

        if (!form.judul.trim()) {
            alert("Judul buku wajib diisi.");
            return;
        }

        if (!form.penulis.trim()) {
            alert("Penulis wajib diisi.");
            return;
        }

        if (!form.penerbit.trim()) {
            alert("Penerbit wajib diisi.");
            return;
        }

        if (!form.tahun) {
            alert("Tahun terbit wajib diisi.");
            return;
        }

        if (!form.kategori.trim()) {
            alert("Kategori wajib diisi.");
            return;
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