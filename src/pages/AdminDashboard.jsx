import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTeachers, createTeacher, deleteTeacher, getNotifyEnabled, setNotifyEnabled } from '../api';

const SUBJECT_GROUPS = [
  'ภาษาไทย','คณิตศาสตร์','วิทยาศาสตร์','สังคมศึกษาฯ',
  'การงานอาชีพ','สุขศึกษาฯ','ศิลปะ','ภาษาต่างประเทศ','คอมพิวเตอร์','แนะแนว',
];
const PREFIXES = ['นาย','นาง','นางสาว'];

const emptyForm = { prefix: 'นาย', firstName: '', lastName: '', subjectGroup: '', clubName: '' };

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [selectedGroup, setSelectedGroup] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');
  const [notifyEnabled, setNotifyEnabledState] = useState(true);

  useEffect(() => {
    getNotifyEnabled().then(d => setNotifyEnabledState(d.enabled)).catch(() => {});
  }, []);

  const handleToggleNotify = async () => {
    const next = !notifyEnabled;
    setNotifyEnabledState(next);
    await setNotifyEnabled(next).catch(() => setNotifyEnabledState(!next));
  };

  const loadTeachers = (group) => {
    setLoading(true);
    getTeachers(group || '')
      .then(setTeachers)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadTeachers(selectedGroup); }, [selectedGroup]);

  const setField = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleAdd = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!form.firstName) return setFormError('กรุณากรอกชื่อ');
    if (!form.subjectGroup) return setFormError('กรุณาเลือกกลุ่มสาระ');
    if (!form.clubName) return setFormError('กรุณากรอกชื่อชุมนุม');
    setSaving(true);
    try {
      await createTeacher(form);
      setForm(emptyForm);
      setShowAdd(false);
      loadTeachers(selectedGroup);
    } catch {
      setFormError('เกิดข้อผิดพลาด');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('ต้องการลบครูคนนี้?')) return;
    await deleteTeacher(id).catch(() => {});
    loadTeachers(selectedGroup);
  };

  const inputStyle = {
    width: '100%', padding: '0.6rem 0.85rem',
    border: '1.5px solid #e2e8f0', borderRadius: '8px',
    fontSize: '0.95rem', fontFamily: 'inherit',
    background: '#f8fafc', boxSizing: 'border-box',
  };

  return (
    <div className="page">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 className="page-title" style={{ margin: 0 }}>ระบบหลังบ้าน — รายงานการสอนชุมนุม</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: notifyEnabled ? '#f0fdf4' : '#fef2f2', border: `1.5px solid ${notifyEnabled ? '#86efac' : '#fca5a5'}`, borderRadius: '10px', padding: '0.45rem 0.85rem' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 600, color: notifyEnabled ? '#16a34a' : '#dc2626' }}>
              แจ้งเตือน Line {notifyEnabled ? 'เปิดอยู่' : 'ปิดอยู่'}
            </span>
            <button
              onClick={handleToggleNotify}
              style={{
                width: '42px', height: '24px', borderRadius: '12px', border: 'none', cursor: 'pointer',
                background: notifyEnabled ? '#22c55e' : '#d1d5db', position: 'relative', transition: 'background 0.2s',
              }}
            >
              <span style={{
                position: 'absolute', top: '3px', left: notifyEnabled ? '21px' : '3px',
                width: '18px', height: '18px', borderRadius: '50%', background: '#fff', transition: 'left 0.2s',
              }} />
            </button>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => { setShowAdd(true); setFormError(''); }}
          >
            + เพิ่มครู
          </button>
        </div>
      </div>

      {/* Modal เพิ่มครู */}
      {showAdd && (
        <div className="modal-overlay" onClick={() => setShowAdd(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-title">เพิ่มครูผู้สอนชุมนุม</div>
            {formError && (
              <div className="alert alert-error">{formError}</div>
            )}
            <form onSubmit={handleAdd}>
              <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div>
                  <label className="form-group" style={{ fontSize: '0.88rem', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '0.35rem' }}>คำนำหน้า</label>
                  <select value={form.prefix} onChange={setField('prefix')} style={inputStyle}>
                    {PREFIXES.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.88rem', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '0.35rem' }}>ชื่อ</label>
                  <input type="text" placeholder="ชื่อ" value={form.firstName} onChange={setField('firstName')} style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontSize: '0.88rem', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '0.35rem' }}>นามสกุล</label>
                  <input type="text" placeholder="นามสกุล" value={form.lastName} onChange={setField('lastName')} style={inputStyle} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div>
                  <label style={{ fontSize: '0.88rem', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '0.35rem' }}>กลุ่มสาระการเรียนรู้</label>
                  <select value={form.subjectGroup} onChange={setField('subjectGroup')} style={inputStyle}>
                    <option value="">— เลือกกลุ่มสาระ —</option>
                    {SUBJECT_GROUPS.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.88rem', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '0.35rem' }}>ชื่อชุมนุม</label>
                  <input type="text" placeholder="ชื่อชุมนุม" value={form.clubName} onChange={setField('clubName')} style={inputStyle} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowAdd(false)}>ยกเลิก</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? 'กำลังบันทึก...' : 'บันทึก'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="filter-bar">
        <select value={selectedGroup} onChange={e => setSelectedGroup(e.target.value)}>
          <option value="">— กลุ่มสาระทั้งหมด —</option>
          {SUBJECT_GROUPS.map(g => <option key={g} value={g}>{g}</option>)}
        </select>
        <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>แสดง {teachers.length} คน</span>
      </div>

      {loading ? (
        <p style={{ color: '#9ca3af' }}>กำลังโหลด...</p>
      ) : teachers.length === 0 ? (
        <div className="empty-state"><p>ไม่พบข้อมูลครู</p></div>
      ) : (
        <div className="teacher-grid">
          {teachers.map(t => (
            <div key={t.id} className="teacher-card" style={{ position: 'relative' }}>
              <div onClick={() => navigate(`/admin/teacher/${t.id}`)}>
                <div className="tc-name">{t.prefix}{t.firstName} {t.lastName}</div>
                <div className="tc-group">{t.subjectGroup}</div>
                <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.4rem' }}>🎒 {t.clubName}</div>
                <span className="tc-count">รายงาน {t._count?.reports ?? 0} ครั้ง</span>
              </div>
              <button
                onClick={() => handleDelete(t.id)}
                style={{
                  position: 'absolute', top: '0.75rem', right: '0.75rem',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: '#ef4444', fontSize: '1rem', padding: '0.25rem',
                }}
                title="ลบ"
              >✕</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
