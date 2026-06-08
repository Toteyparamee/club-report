import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div style={{
      minHeight: 'calc(100vh - 60px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      background: 'linear-gradient(135deg, #e8f0fe 0%, #f4f6fb 60%, #fce8f3 100%)',
    }}>
      {/* Hero card */}
      <div style={{
        background: '#fff',
        borderRadius: '24px',
        boxShadow: '0 8px 40px rgba(26,86,219,0.10)',
        padding: '3rem 3.5rem',
        maxWidth: '520px',
        width: '100%',
        textAlign: 'center',
      }}>
        {/* Logo */}
        <img
          src="/logo.png"
          alt="logo"
          style={{ width: '90px', height: '90px', objectFit: 'contain', margin: '0 auto 1.5rem', display: 'block' }}
        />

        <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#1e293b', lineHeight: 1.35, marginBottom: '0.6rem' }}>
          ระบบรายงานผลการดำเนินกิจกรรมชุมนุม
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '2.5rem' }}>
          กรุณาเลือกประเภทการใช้งาน
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* กรอกรายงาน */}
          <button
            onClick={() => navigate('/report/new')}
            style={{
              display: 'flex', alignItems: 'center', gap: '1rem',
              padding: '1rem 1.5rem',
              background: 'linear-gradient(135deg, #1a56db, #6366f1)',
              color: '#fff',
              border: 'none', borderRadius: '14px',
              cursor: 'pointer', fontSize: '1rem', fontWeight: 600,
              fontFamily: 'inherit',
              boxShadow: '0 4px 14px rgba(26,86,219,0.3)',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(26,86,219,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 14px rgba(26,86,219,0.3)'; }}
          >
            <span style={{
              width: '40px', height: '40px', background: 'rgba(255,255,255,0.2)',
              borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </span>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '1rem', fontWeight: 700 }}>กรอกรายงาน</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.85, fontWeight: 400 }}>บันทึกผลการดำเนินกิจกรรมชุมนุม</div>
            </div>
          </button>

          {/* Admin */}
          <button
            onClick={() => navigate('/admin')}
            style={{
              display: 'flex', alignItems: 'center', gap: '1rem',
              padding: '1rem 1.5rem',
              background: '#fff',
              color: '#1e293b',
              border: '1.5px solid #e2e8f0', borderRadius: '14px',
              cursor: 'pointer', fontSize: '1rem', fontWeight: 600,
              fontFamily: 'inherit',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              transition: 'transform 0.15s, box-shadow 0.15s, border-color 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)'; e.currentTarget.style.borderColor = '#1a56db'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
          >
            <span style={{
              width: '40px', height: '40px', background: '#f1f5f9',
              borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a56db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
              </svg>
            </span>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '1rem', fontWeight: 700 }}>Admin</div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 400 }}>ดูภาพรวมและจัดการข้อมูล</div>
            </div>
          </button>
        </div>
      </div>

      <p style={{ marginTop: '2rem', color: '#cbd5e1', fontSize: '0.8rem' }}>
        ระบบรายงานกิจกรรมชุมนุม · โรงเรียน
      </p>
    </div>
  );
}
