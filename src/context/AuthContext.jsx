import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return (
            localStorage.getItem("adminLoggedIn") ===
            "true"
        );
    });

    useEffect(() => {
        localStorage.setItem(
            "adminLoggedIn",
            isLoggedIn
        );
    }, [isLoggedIn]);

    const login = (username, password) => {
        /*
         * Sementara menggunakan akun dummy.
         * Nanti bisa diganti dengan sistem autentikasi
         * yang lebih aman / backend.
         */

        if (
            username === "admin" &&
            password === "123"
        ) {
            setIsLoggedIn(true);

            return {
                success: true
            };
        }

        return {
            success: false,
            message: "Username atau password salah."
        };
    };

    const logout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("adminLoggedIn");
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    return useContext(AuthContext);
}

export {
    AuthProvider,
    useAuth
};