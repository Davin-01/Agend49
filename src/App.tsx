import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import UpgradeBanner from "./components/UpgradeBanner";
import Index from "./pages/Index";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Dashboard from "./pages/Dashboard";
import Agents from "./pages/Agents";
import CreateAgent from "./pages/CreateAgent";
import AgentDetail from "./pages/AgentDetail";
import Marketplace from "./pages/Marketplace";
import Wallet from "./pages/Wallet";
import Analytics from "./pages/Analytics";
import Notifications from "./pages/Notifications";
import Payment from "./pages/Payment";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import EmailVerification from "./pages/EmailVerification";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Component to conditionally show upgrade banner only on dashboard pages
const ConditionalUpgradeBanner = () => {
  const location = useLocation();

  // Show upgrade banner only on dashboard/authenticated pages
  const isDashboardPage = location.pathname.startsWith('/dashboard') ||
                          location.pathname.startsWith('/agents') ||
                          location.pathname.startsWith('/marketplace') ||
                          location.pathname.startsWith('/wallet') ||
                          location.pathname.startsWith('/analytics') ||
                          location.pathname.startsWith('/notifications') ||
                          location.pathname.startsWith('/payment');

  return isDashboardPage ? <UpgradeBanner /> : null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ConditionalUpgradeBanner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/agents/create" element={<CreateAgent />} />
          <Route path="/agents/:id" element={<AgentDetail />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-email" element={<EmailVerification />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
