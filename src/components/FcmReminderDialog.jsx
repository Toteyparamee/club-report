import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { detectPlatform } from '../utils/detectOS';
import { dismissFcmReminder } from '../utils/fcmReminder';

function getInstructions({ os, browser, isStandalone }) {
  if (os === 'ios') {
    if (!isStandalone) {
      return {
        title: '📱 iPhone / iPad (Safari)',
        steps: [
          'แตะไอคอน แชร์ (สี่เหลี่ยมมีลูกศรชี้ขึ้น) ที่แถบด้านล่างของ Safari',
          'เลื่อนลงแล้วเลือก "เพิ่มไปยังหน้าจอโฮม" (Add to Home Screen)',
          'แตะ "เพิ่ม" มุมขวาบน',
          'เปิดแอปจากไอคอนบนหน้าจอโฮม แล้วกดปุ่ม "เปิดรับการแจ้งเตือน" อีกครั้ง',
        ],
        note: 'iPhone/iPad ต้องเพิ่มเว็บไซต์นี้ไปยังหน้าจอโฮมก่อน จึงจะรับการแจ้งเตือนได้ (ข้อจำกัดของ iOS)',
      };
    }
    return {
      title: '📱 iPhone / iPad',
      steps: [
        'กดปุ่ม "🔔 เปิดรับการแจ้งเตือน" ด้านล่าง',
        'เมื่อมีป๊อปอัปขออนุญาต ให้เลือก "อนุญาต" (Allow)',
      ],
    };
  }

  if (os === 'android') {
    return {
      title: '🤖 Android',
      steps: [
        'กดปุ่ม "🔔 เปิดรับการแจ้งเตือน" ด้านล่าง',
        'เมื่อมีป๊อปอัปขออนุญาตแจ้งเตือน ให้เลือก "อนุญาต" (Allow)',
        'หากไม่มีป๊อปอัปขึ้น ให้เข้า การตั้งค่าเบราว์เซอร์ > การแจ้งเตือน > เปิดใช้งานสำหรับเว็บไซต์นี้',
      ],
    };
  }

  const browserNote = {
    chrome: 'มุมซ้ายของแถบที่อยู่ (address bar) จะมีไอคอนกระดิ่ง/ล็อกให้กดอนุญาต',
    edge: 'มุมซ้ายของแถบที่อยู่ (address bar) จะมีไอคอนกระดิ่ง/ล็อกให้กดอนุญาต',
    firefox: 'ป๊อปอัปขออนุญาตจะขึ้นที่มุมซ้ายบนของหน้าต่างเบราว์เซอร์',
    safari: 'ป๊อปอัปขออนุญาตจะขึ้นบริเวณแถบที่อยู่ (address bar)',
    other: 'ป๊อปอัปขออนุญาตแจ้งเตือนจะปรากฏขึ้นจากเบราว์เซอร์',
  };

  return {
    title: '💻 คอมพิวเตอร์ (Desktop)',
    steps: [
      'กดปุ่ม "🔔 เปิดรับการแจ้งเตือน" ด้านล่าง',
      'เมื่อเบราว์เซอร์ถามขออนุญาตแจ้งเตือน ให้เลือก "อนุญาต" (Allow)',
      browserNote[browser] || browserNote.other,
    ],
  };
}

export default function FcmReminderDialog({ onClose }) {
  const navigate = useNavigate();
  const [platform] = useState(() => detectPlatform());
  const info = getInstructions(platform);

  const handleDismiss = () => {
    dismissFcmReminder();
    onClose();
  };

  const handleGoRegister = () => {
    onClose();
    navigate('/register-notify');
  };

  return (
    <div className="modal-overlay" onClick={handleDismiss}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-title">🔔 เปิดการแจ้งเตือนกันเถอะ</div>

        <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '1.25rem' }}>
          คุณยังไม่ได้เปิดรับการแจ้งเตือนบนอุปกรณ์นี้ เปิดไว้เพื่อรับแจ้งเตือนเมื่อใกล้ถึงวันกรอกรายงานชุมนุม
        </p>

        <div style={{
          background: '#f8fafc', border: '1px solid #e2e8f0',
          borderRadius: '12px', padding: '1rem 1.25rem', marginBottom: '1.25rem',
        }}>
          <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1e293b', marginBottom: '0.6rem' }}>
            {info.title}
          </div>
          <ol style={{ margin: 0, paddingLeft: '1.1rem', color: '#334155', fontSize: '0.87rem', lineHeight: 1.7 }}>
            {info.steps.map((s, i) => <li key={i}>{s}</li>)}
          </ol>
          {info.note && (
            <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: '#b45309', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '8px', padding: '0.5rem 0.75rem' }}>
              ⚠️ {info.note}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={handleDismiss}
            style={{
              flex: 1, padding: '0.75rem', background: '#f1f5f9', color: '#475569',
              border: 'none', borderRadius: '10px', fontSize: '0.9rem', fontWeight: 600,
              cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            ไว้ทีหลัง
          </button>
          <button
            onClick={handleGoRegister}
            style={{
              flex: 1.4, padding: '0.75rem',
              background: 'linear-gradient(135deg, #1a56db, #6366f1)',
              color: '#fff', border: 'none', borderRadius: '10px',
              fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
              boxShadow: '0 4px 12px rgba(26,86,219,0.25)',
            }}
          >
            🔔 ไปลงทะเบียนรับแจ้งเตือน
          </button>
        </div>
      </div>
    </div>
  );
}
