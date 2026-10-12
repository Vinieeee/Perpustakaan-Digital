import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

const STORAGE_CHANGE_EVENT = "app-local-storage-change";

function readStorage(key, fallbackValue) {
    try {
        const savedValue = localStorage.getItem(key);

        return savedValue !== null
            ? JSON.parse(savedValue)
            : fallbackValue;
    } catch (error) {
        console.error(
            "Gagal membaca localStorage:",
            error
        );

        return fallbackValue;
    }
}

function useLocalStorage(key, initialValue) {
    const initialValueRef = useRef(initialValue);

    const [value, setValue] = useState(() =>
        readStorage(key, initialValueRef.current)
    );

    const valueRef = useRef(value);

    // Sinkronkan state ketika data berubah dari hook lain
    // atau dari tab browser lain.
    useEffect(() => {
        const syncValue = (event) => {
            if (event.type === "storage") {
                if (
                    event.key !== key &&
                    event.key !== null
                ) {
                    return;
                }
            } else if (event.detail?.key !== key) {
                return;
            }

            const latestValue = readStorage(
                key,
                initialValueRef.current
            );

            valueRef.current = latestValue;
            setValue(latestValue);
        };

        // Ambil data terbaru saat hook dipasang.
        const latestValue = readStorage(
            key,
            initialValueRef.current
        );

        valueRef.current = latestValue;
        setValue(latestValue);

        window.addEventListener(
            "storage",
            syncValue
        );

        window.addEventListener(
            STORAGE_CHANGE_EVENT,
            syncValue
        );

        return () => {
            window.removeEventListener(
                "storage",
                syncValue
            );

            window.removeEventListener(
                STORAGE_CHANGE_EVENT,
                syncValue
            );
        };
    }, [key]);

    // Mendukung setValue(data) maupun setValue(prev => dataBaru).
    const setStoredValue = useCallback(
        (valueOrUpdater) => {
            const currentValue = valueRef.current;

            const nextValue =
                typeof valueOrUpdater === "function"
                    ? valueOrUpdater(currentValue)
                    : valueOrUpdater;

            // Perbarui state dan referensi hook ini.
            valueRef.current = nextValue;
            setValue(nextValue);

            try {
                localStorage.setItem(
                    key,
                    JSON.stringify(nextValue)
                );
            } catch (error) {
                console.error(
                    "Gagal menyimpan localStorage:",
                    error
                );
            }

            // Beri tahu hook lain dalam tab yang sama.
            window.dispatchEvent(
                new CustomEvent(
                    STORAGE_CHANGE_EVENT,
                    {
                        detail: { key },
                    }
                )
            );
        },
        [key]
    );

    return [value, setStoredValue];
}

export default useLocalStorage;