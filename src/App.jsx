import {
    BrowserRouter,
    Navigate,
    Route,
    Routes
} from "react-router-dom";

import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

import Home from "./pages/user/Home";
import Gallery from "./pages/user/Gallery";
import BookDetail from "./pages/user/BookDetail";
import Contact from "./pages/user/Contact";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBooks from "./pages/admin/AdminBooks";
import AdminAddBook from "./pages/admin/AdminAddBook";
import AdminEditBook from "./pages/admin/AdminEditBook";
import AdminMessages from "./pages/admin/AdminMessages";

import { useAuth } from "./context/AuthContext";

function ProtectedRoute({ children }) {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        return (
            <Navigate
                to="/admin/login"
                replace
            />
        );
    }

    return children;
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* USER */}
                <Route
                    element={<UserLayout />}
                >
                    <Route
                        path="/"
                        element={<Home />}
                    />

                    <Route
                        path="/galeri"
                        element={<Gallery />}
                    />

                    <Route
                        path="/galeri/buku/:id"
                        element={<BookDetail />}
                    />

                    <Route
                        path="/contact"
                        element={<Contact />}
                    />
                </Route>

                {/* ADMIN LOGIN */}
                <Route
                    path="/admin/login"
                    element={<AdminLogin />}
                />

                {/* ADMIN */}
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute>
                            <AdminLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route
                        index
                        element={
                            <AdminDashboard />
                        }
                    />

                    <Route
                        path="buku"
                        element={
                            <AdminBooks />
                        }
                    />

                    <Route
                        path="buku/tambah"
                        element={
                            <AdminAddBook />
                        }
                    />

                    <Route
                        path="buku/edit/:id"
                        element={
                            <AdminEditBook />
                        }
                    />

                    <Route
                        path="pesan"
                        element={
                            <AdminMessages />
                        }
                    />
                </Route>

                {/* FALLBACK */}
                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/"
                            replace
                        />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;