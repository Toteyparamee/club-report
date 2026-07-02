import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ReportForm from './pages/ReportForm';
import FcmRegister from './pages/FcmRegister';
import FcmReminderDialog from './components/FcmReminderDialog';
import { shouldShowFcmReminder } from './utils/fcmReminder';

export default function App() {
  const [showFcmReminder, setShowFcmReminder] = useState(shouldShowFcmReminder);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/report/new" element={<ReportForm />} />
        <Route path="/register-notify" element={<FcmRegister />} />
      </Routes>
      {showFcmReminder && (
        <FcmReminderDialog onClose={() => setShowFcmReminder(false)} />
      )}
    </BrowserRouter>
  );
}
