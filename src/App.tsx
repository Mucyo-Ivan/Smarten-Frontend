
import { Toaster } from "@/components/ui/toaster";
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
import Settings from "./pages/settings/Settings";
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <BrowserRouter>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/device" element={<DeviceSelector />} />
            <Route path="/device/:province" element={<ProvinceDevices />} />
            <Route path="/device/list/:regionId" element={<DeviceList />} />
            <Route path="/device/detail/:deviceId" element={<DeviceDetail />} />
            <Route path="/control" element={<Control />} />
            <Route path="/control/:province" element={<ProvinceControl />} />
            <Route path="/control/report/:regionId" element={<ControlReport />} />
            <Route path="/monitor" element={<Monitor />} />
            <Route path="/monitor/:province" element={<ProvinceMonitor />} />
            <Route path="/leakage" element={<Leakage />} />
            <Route path="/leakage/:regionId" element={<LeakageReport />} />
            <Route path="/readings/:regionId" element={<ReadingsReport />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:userId" element={<UserDetail />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
