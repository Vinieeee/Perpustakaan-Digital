import { useEffect, useState } from "react";

function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        try {
            const savedValue = localStorage.getItem(key);

            return savedValue
                ? JSON.parse(savedValue)
                : initialValue;
        } catch (error) {
            console.error(
                "Gagal membaca localStorage:",
                error
            );

            return initialValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(
                key,
                JSON.stringify(value)
            );
        } catch (error) {
            console.error(
                "Gagal menyimpan localStorage:",
                error
            );
        }
    }, [key, value]);

    return [value, setValue];
}

export default useLocalStorage;