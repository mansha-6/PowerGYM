import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "@/components/ProtectedRoute";
import AdminLogin from "./pages/admin/AdminLogin";
import MemberLogin from "./pages/member/MemberLogin";
import MemberSignup from "./pages/member/MemberSignup";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import MembersPage from "./pages/admin/MembersPage";
import BillsPage from "./pages/admin/BillsPage";
import PackagesPage from "./pages/admin/PackagesPage";
import SupplementsPage from "./pages/admin/SupplementsPage";
import DietPage from "./pages/admin/DietPage";
import ReportsPage from "./pages/admin/ReportsPage";

// Member Pages
import MemberDashboard from "./pages/member/MemberDashboard";
import MemberBillsPage from "./pages/member/MemberBillsPage";
import NotificationsPage from "./pages/shared/NotificationsPage";

// User Pages
import UserDashboard from "./pages/user/UserDashboard";
import UserSignup from "./pages/user/UserSignup";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/member/login" element={<MemberLogin />} />
            <Route path="/member/signup" element={<MemberSignup />} />
            
            {/* Admin Routes */}
            <Route element={<ProtectedRoute requiredRole="admin" />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/members" element={<MembersPage />} />
              <Route path="/admin/bills" element={<BillsPage />} />
              <Route path="/admin/packages" element={<PackagesPage />} />
              <Route path="/admin/supplements" element={<SupplementsPage />} />
              <Route path="/admin/diet" element={<DietPage />} />
              <Route path="/admin/notifications" element={<NotificationsPage />} />
              <Route path="/admin/reports" element={<ReportsPage />} />
            </Route>
            
            {/* Member Routes */}
            <Route element={<ProtectedRoute requiredRole="member" />}>
              <Route path="/member" element={<MemberDashboard />} />
              <Route path="/member/bills" element={<MemberBillsPage />} />
              <Route path="/member/notifications" element={<NotificationsPage />} />
            </Route>
            
            {/* User Routes */}
            <Route path="/user" element={<UserDashboard />} />
            <Route path="/user/signup" element={<UserSignup />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
