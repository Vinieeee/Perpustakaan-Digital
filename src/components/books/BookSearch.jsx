function BookSearch({
    search,
    setSearch,
    category,
    setCategory,
    year,
    setYear,
    categories,
    years,
    onReset
}) {
    return (
        <div className="book-search">

            {/* Search */}
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Cari judul, penulis, atau penerbit..."
                    value={search}
                    onChange={(event) =>
                        setSearch(event.target.value)
                    }
                />
            </div>

            {/* Filter */}
            <div className="search-filter">

                <select
                    value={category}
                    onChange={(event) =>
                        setCategory(event.target.value)
                    }
                >
                    <option value="">
                        Semua Kategori
                    </option>

                    {categories.map((item) => (
                        <option
                            key={item}
                            value={item}
                        >
                            {item}
                        </option>
                    ))}
                </select>

                <select
                    value={year}
                    onChange={(event) =>
                        setYear(event.target.value)
                    }
                >
                    <option value="">
                        Semua Tahun
                    </option>

                    {years.map((item) => (
                        <option
                            key={item}
                            value={item}
                        >
                            {item}
                        </option>
                    ))}
                </select>

                <button onClick={onReset}>
                    Reset
                </button>

            </div>

        </div>
    );
}

export default BookSearch;