import { useMemo } from "react";
import useLocalStorage from "./useLocalStorage";

function useBorrowings() {
    const [
        borrowings,
        setBorrowings
    ] = useLocalStorage(
        "borrowings",
        []
    );

    const createBorrowing = ({
        book,
        namaPeminjam,
        emailPeminjam = ""
    }) => {
        const existingBorrowing =
            borrowings.find(
                (borrowing) =>
                    String(borrowing.bookId) ===
                        String(book.id) &&
                    borrowing.namaPeminjam ===
                        namaPeminjam &&
                    [
                        "Menunggu Persetujuan",
                        "Disetujui",
                        "Dipinjam"
                    ].includes(
                        borrowing.status
                    )
            );

        if (existingBorrowing) {
            return {
                success: false,
                message:
                    "Kamu masih memiliki peminjaman aktif untuk buku ini."
            };
        }

        const newBorrowing = {
            id: Date.now(),
            bookId: book.id,
            judul: book.judul,
            namaPeminjam,
            emailPeminjam,
            tanggalPengajuan:
                new Date().toISOString(),
            tanggalPinjam: null,
            tanggalJatuhTempo: null,
            tanggalKembali: null,
            status:
                "Menunggu Persetujuan"
        };

        setBorrowings(
            (currentBorrowings) => [
                ...currentBorrowings,
                newBorrowing
            ]
        );

        return {
            success: true,
            data: newBorrowing
        };
    };

    const updateBorrowing = (
        id,
        updatedData
    ) => {
        setBorrowings(
            (currentBorrowings) =>
                currentBorrowings.map(
                    (borrowing) =>
                        String(
                            borrowing.id
                        ) === String(id)
                            ? {
                                ...borrowing,
                                ...updatedData
                            }
                            : borrowing
                )
        );
    };

    const deleteBorrowing = (
        id
    ) => {
        setBorrowings(
            (currentBorrowings) =>
                currentBorrowings.filter(
                    (borrowing) =>
                        String(
                            borrowing.id
                        ) !== String(id)
                )
        );
    };

    const getBorrowingById = (
        id
    ) => {
        return borrowings.find(
            (borrowing) =>
                String(
                    borrowing.id
                ) === String(id)
        );
    };

    const getBorrowingsByBookId = (
        bookId
    ) => {
        return borrowings.filter(
            (borrowing) =>
                String(
                    borrowing.bookId
                ) === String(bookId)
        );
    };

    const activeBorrowings =
        useMemo(() => {
            return borrowings.filter(
                (borrowing) =>
                    [
                        "Menunggu Persetujuan",
                        "Disetujui",
                        "Dipinjam"
                    ].includes(
                        borrowing.status
                    )
            );
        }, [borrowings]);

    const pendingBorrowings =
        useMemo(() => {
            return borrowings.filter(
                (borrowing) =>
                    borrowing.status ===
                    "Menunggu Persetujuan"
            );
        }, [borrowings]);

    return {
        borrowings,
        setBorrowings,
        activeBorrowings,
        pendingBorrowings,
        createBorrowing,
        updateBorrowing,
        deleteBorrowing,
        getBorrowingById,
        getBorrowingsByBookId
    };
}

export default useBorrowings;