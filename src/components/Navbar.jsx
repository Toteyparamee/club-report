import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <span className="navbar-brand">ระบบรายงานการสอนชุมนุม</span>
      <div className="navbar-links">
        <NavLink to="/report/new" className={({ isActive }) => isActive ? 'active' : ''}>
          กรอกรายงาน
        </NavLink>
        <NavLink to="/admin" className={({ isActive }) => isActive ? 'active' : ''}>
          ระบบหลังบ้าน
        </NavLink>
      </div>
    </nav>
  );
}
