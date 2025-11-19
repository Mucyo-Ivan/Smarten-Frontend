
import { Toaster } from "@/components/ui/toaster";
import LeakageHistory from "@/pages/leakage/LeakageHistory";
import InvestigatedLeaks from "@/pages/leakage/InvestigatedLeaks";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./hooks/use-theme";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import DeviceSelector from "./pages/device/DeviceSelector";
import Control from "./pages/control/Control";
import Monitor from "./pages/monitor/Monitor";
import Leakage from "./pages/leakage/Leakage";
import Users from "./pages/users/Users";
import UsersDetail from "./pages/users/UsersDetail";
import Settings from "./pages/settings/Settings";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import DeviceList from "./pages/device/DeviceList";
import DeviceDetail from "./pages/device/DeviceDetail";
import LeakageReport from "./pages/leakage/LeakageReport";
import ControlReport from "./pages/control/ControlReport";
import ReadingsReport from "./pages/readings/ReadingsReport";
import ProvinceMonitor from "./pages/monitor/ProvinceMonitor";
import ProvinceDevices from "./pages/device/ProvinceDevices";
import ProvinceControl from "./pages/control/ProvinceControl";
import UserDetail from "./pages/users/UserDetail";
import Notifications from "./pages/Notifications";
import RegisterESP from "./pages/device/RegisterESP";
import RegisterESPSuccess from "./pages/device/RegisterESPSuccess";
import ErrorBoundary from "./pages/ErrorBoundary";
import { NotificationProvider } from './pages/NotificationContext';
import { MonitorDataProvider } from './contexts/MonitorDataContext';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import ToastModalProvider from './components/ToastModalProvider';
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyEmail from "./pages/auth/VerifyEmail";
import EmailVerified from "./pages/auth/EmailVerified";
import AppAI from './smarten-ai'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  
    <ErrorBoundary>
    <NotificationProvider>
    <ToastModalProvider>
    <MonitorDataProvider>
    <BrowserRouter>
    <AuthProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/ai" element={<AppAI /> } />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/email-verified" element={<EmailVerified />} />

              <Route element={<ProtectedRoute/>}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/device" element={<DeviceSelector />} />
              <Route path="/device/:province" element={<ProvinceDevices />} />
              <Route path="/device/list/:regionId" element={<DeviceList />} />
              <Route path="/device/detail/:deviceId" element={<DeviceDetail />} />
              <Route path="/device/register-esp" element={<RegisterESP />} />
              <Route path="/device/register-esp/success" element={<RegisterESPSuccess />} />
              <Route path="/control" element={<Control />} />
              <Route path="/control/:province" element={<ProvinceControl />} />
              <Route path="/control/report/:regionId" element={<ControlReport />} />
              <Route path="/monitor" element={<Monitor />} />
              <Route path="/monitor/:province" element={<ProvinceMonitor />} />
              <Route path="/leakage" element={<Leakage />} />
              <Route path="/leakage/history" element={<LeakageHistory />} />
              <Route path="/leakage/investigated" element={<InvestigatedLeaks />} />
              <Route path="/leakage/:regionId" element={<LeakageReport />} />
              <Route path="/readings/:regionId" element={<ReadingsReport />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/detail/:province" element={<UsersDetail />} />
              <Route path="/users/:userId" element={<UserDetail />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/edit" element={<EditProfile />} />
              <Route path="/notifications" element={<Notifications />} />
              </Route>


             
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </QueryClientProvider>
      </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
    </MonitorDataProvider>
    </ToastModalProvider>
    </NotificationProvider>
    </ErrorBoundary>
);

export default App;
