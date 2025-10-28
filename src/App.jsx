import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // 🌟 Import Toaster for global notifications
import Home from "./pages/Home";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import Tickets from "./pages/Tickets";
import AuthGuard from "./components/AuthGuard";

export default function App() {
  return (
    <BrowserRouter>
      {/* 🌟 Add the Toaster Component here. 
          This makes 'toast.success()' and 'toast.error()' available everywhere. */}
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />

        {/* Protected Routes using AuthGuard */}
        <Route
          path="/dashboard"
          element={
            <AuthGuard>
              <Dashboard />
            </AuthGuard>
          }
        />
        <Route
          path="/tickets"
          element={
            <AuthGuard>
              <Tickets />
            </AuthGuard>
          }
        />
        
        {/* Optional: Add a 404/Catch-all route */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}