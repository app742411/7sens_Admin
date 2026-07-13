import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DashboardLayout } from './layouts/DashboardLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { Dashboard } from './pages/dashboard/Dashboard';
import { Login } from './pages/auth/Login';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { ResetPassword } from './pages/auth/ResetPassword';
import { AddEvent } from './pages/dashboard/AddEvent';
import { Events } from './pages/dashboard/Events';
import { EventDetails } from './pages/dashboard/EventDetails';
import { Transactions } from './pages/dashboard/Transactions';
import { Users } from './pages/dashboard/Users';
import { UserDetails } from './pages/dashboard/UserDetails';
import { Notifications } from './pages/dashboard/Notifications';
import { Settings } from './pages/dashboard/Settings';
import { TransactionDetails } from './pages/dashboard/TransactionDetails';
import { Bookings } from './pages/dashboard/Bookings';
import { BookingDetails } from './pages/dashboard/BookingDetails';
import { Coupons } from './pages/dashboard/Coupons';
import { HomepageCMS } from './pages/dashboard/cms/HomepageCMS';
import { TermsCMS } from './pages/dashboard/cms/TermsCMS';
import { PrivacyCMS } from './pages/dashboard/cms/PrivacyCMS';
import { FaqCMS } from './pages/dashboard/cms/FaqCMS';
import { ContactSection } from './components/cms/ContactSection';
import { DesignSystem } from './pages/dashboard/DesignSystem';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Authenticated Routes with Sidebar */}
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          {/* Add more authenticated routes here */}
          <Route path="users" element={<Users />} />
          <Route path="users/:id" element={<UserDetails />} />
          <Route path="events" element={<Events />} />
          <Route path="events/:id" element={<EventDetails />} />
          <Route path="events/add" element={<AddEvent />} />
          <Route path="events/edit/:id" element={<AddEvent />} />
          <Route path="payments" element={<Transactions />} />
          <Route path="payments/:id" element={<TransactionDetails />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="bookings/:id" element={<BookingDetails />} />
          <Route path="coupons" element={<Coupons />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings" element={<Settings />} />
          <Route path="cms/homepage" element={<HomepageCMS />} />
          <Route path="cms/terms" element={<TermsCMS />} />
          <Route path="cms/privacy" element={<PrivacyCMS />} />
          <Route path="cms/faq" element={<FaqCMS />} />
          <Route path="cms/contact" element={<div className="w-full bg-[#FAFAF8] min-h-screen"><ContactSection /></div>} />
          <Route path="design-system" element={<DesignSystem />} />
        </Route>

        {/* Authentication Routes without Sidebar */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
