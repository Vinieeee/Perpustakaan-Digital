import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

// Import komponen Login gabungan yang baru
import Login from "./pages/Login";

// Komponen User
import Home from "./pages/user/Home";
import Gallery from "./pages/user/Gallery";
import BookDetail from "./pages/user/BookDetail";
import Contact from "./pages/user/Contact";
import UserBorrowingHistory from "./pages/user/UserBorrowingHistory";

// Komponen Admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBooks from "./pages/admin/AdminBooks";
import AdminAddBook from "./pages/admin/AdminAddBook";
import AdminEditBook from "./pages/admin/AdminEditBook";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminBorrowings from "./pages/admin/AdminBorrowings";
import AdminBorrowingHistory from "./pages/admin/AdminBorrowingHistory";

// Pastikan file-file konteks ini benar-benar ada di folder src/context/
import { useAuth } from "./context/AuthContext";
import { useUser } from "./context/UserContext";

// Proteksi Khusus Admin
function AdminProtectedRoute({ children }) {
    const { isLoggedIn } = useAuth();
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }
    return children;
}

// Proteksi Khusus User
function UserProtectedRoute({ children }) {
    const { isLoggedIn } = useUser();
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }
    return children;
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                
                {/* ROOT ROUTE: Arahkan langsung ke halaman Login */}
                <Route path="/" element={<Navigate to="/login" replace />} />
                
                {/* HALAMAN LOGIN TUNGGAL (User & Admin) */}
                <Route path="/login" element={<Login />} />

                {/* AREA USER (Harus Login sebagai User) */}
                <Route 
                    element={
                        <UserProtectedRoute>
                            <UserLayout />
                        </UserProtectedRoute>
                    }
                >
                    <Route path="/home" element={<Home />} />
                    <Route path="/galeri" element={<Gallery />} />
                    <Route path="/galeri/buku/:id" element={<BookDetail />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/riwayat-peminjaman" element={<UserBorrowingHistory />} />
                </Route>

                {/* AREA ADMIN (Harus Login sebagai Admin) */}
                <Route 
                    path="/admin" 
                    element={
                        <AdminProtectedRoute>
                            <AdminLayout />
                        </AdminProtectedRoute>
                    }
                >
                    <Route index element={<AdminDashboard />} />
                    <Route path="buku" element={<AdminBooks />} />
                    <Route path="buku/tambah" element={<AdminAddBook />} />
                    <Route path="buku/edit/:id" element={<AdminEditBook />} />
                    <Route path="pesan" element={<AdminMessages />} />
                    <Route path="peminjaman" element={<AdminBorrowings />} />
                    <Route path="riwayat-peminjaman" element={<AdminBorrowingHistory />} />
                </Route>

                {/* FALLBACK (Jika URL tidak ditemukan, kembalikan ke Login) */}
                <Route path="*" element={<Navigate to="/login" replace />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;