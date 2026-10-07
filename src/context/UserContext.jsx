import {
    createContext,
    useContext,
    useState
} from "react";

const UserContext = createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState(() => {
        const savedUser =
            localStorage.getItem("libraryUser");

        if (!savedUser) {
            return null;
        }

        try {
            return JSON.parse(savedUser);
        } catch {
            return null;
        }
    });

    const login = (nama, email) => {
        const namaBersih = nama.trim();
        const emailBersih = email.trim();

        if (!namaBersih) {
            return {
                success: false,
                message: "Nama wajib diisi."
            };
        }

        if (!emailBersih) {
            return {
                success: false,
                message: "Email wajib diisi."
            };
        }

        const userData = {
            id: emailBersih.toLowerCase(),
            nama: namaBersih,
            email: emailBersih
        };

        localStorage.setItem(
            "libraryUser",
            JSON.stringify(userData)
        );

        setUser(userData);

        return {
            success: true,
            data: userData
        };
    };

    const logout = () => {
        localStorage.removeItem("libraryUser");
        setUser(null);
    };

    const isLoggedIn = Boolean(user);

    return (
        <UserContext.Provider
            value={{
                user,
                isLoggedIn,
                login,
                logout
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

function useUser() {
    return useContext(UserContext);
}

export {
    UserProvider,
    useUser
};