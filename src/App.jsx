import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ReportForm from './pages/ReportForm';
import AdminDashboard from './pages/AdminDashboard';
import TeacherDetail from './pages/TeacherDetail';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/report/new" element={<ReportForm />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/teacher/:id" element={<TeacherDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
