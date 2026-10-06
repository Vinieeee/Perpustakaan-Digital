import {
    useEffect,
    useState
} from "react";

import useLocalStorage from "./useLocalStorage";
import fetchBooksFromXML from "../services/bookService";

function useBooks() {
    const [
        books,
        setBooks
    ] = useLocalStorage(
        "books",
        []
    );

    const [
        loading,
        setLoading
    ] = useState(
        books.length === 0
    );

    const [
        error,
        setError
    ] = useState("");

    useEffect(() => {
        if (books.length > 0) {
            return;
        }

        const loadBooks = async () => {
            try {
                setLoading(true);
                setError("");

                const xmlBooks =
                    await fetchBooksFromXML();

                setBooks(xmlBooks);
            } catch (error) {
                console.error(
                    "Gagal memuat data buku:",
                    error
                );

                setError(
                    "Data buku gagal dimuat."
                );
            } finally {
                setLoading(false);
            }
        };

        loadBooks();
    }, [
        books.length,
        setBooks
    ]);

    const addBook = (book) => {
        const newBook = {
            ...book,
            id: Date.now()
        };

        setBooks(
            (currentBooks) => [
                ...currentBooks,
                newBook
            ]
        );
    };

    const updateBook = (
        id,
        updatedBook
    ) => {
        setBooks(
            (currentBooks) =>
                currentBooks.map(
                    (book) =>
                        String(book.id) ===
                        String(id)
                            ? {
                                ...book,
                                ...updatedBook
                            }
                            : book
                )
        );
    };

    const deleteBook = (
        id
    ) => {
        setBooks(
            (currentBooks) =>
                currentBooks.filter(
                    (book) =>
                        String(book.id) !==
                        String(id)
                )
        );
    };

    const getBookById = (
        id
    ) => {
        return books.find(
            (book) =>
                String(book.id) ===
                String(id)
        );
    };

    return {
        books,
        setBooks,
        loading,
        error,
        addBook,
        updateBook,
        deleteBook,
        getBookById
    };
}

export default useBooks;