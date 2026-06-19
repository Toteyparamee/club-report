import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <span className="navbar-brand">ระบบรายงานการสอนชุมนุม</span>
      <NavLink
        to="/register-notify"
        style={({ isActive }) => ({
          fontSize: '0.85rem', fontWeight: 600,
          color: isActive ? '#1a56db' : '#64748b',
          textDecoration: 'none', whiteSpace: 'nowrap',
        })}
      >
        🔔 รับแจ้งเตือน
      </NavLink>
    </nav>
  );
}
