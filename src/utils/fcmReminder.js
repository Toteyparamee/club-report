import { getTeacher } from '../api';
import { getExistingFcmToken } from '../firebase';

const DISMISS_KEY = 'fcmReminderDismissedAt';
const DISMISS_DAYS = 3;

function isDismissedRecently() {
  const dismissedAt = Number(localStorage.getItem(DISMISS_KEY) || 0);
  const elapsedDays = (Date.now() - dismissedAt) / (1000 * 60 * 60 * 24);
  return elapsedDays < DISMISS_DAYS;
}

export async function shouldShowFcmReminder() {
  if (typeof Notification === 'undefined' || !('serviceWorker' in navigator)) return false;
  if (Notification.permission !== 'granted') {
    // ยังไม่เคย allow notification เลย — เด้งเตือนตามรอบ dismiss ปกติ
    return !isDismissedRecently();
  }

  const teacherId = localStorage.getItem('fcmTeacherId');

  if (!teacherId) {
    // ครูที่ลงทะเบียนไว้ก่อนหน้านี้ (ก่อนมี fcmTeacherId) ให้เชื่อ flag เดิมไปก่อน ไม่ต้องเช็ค DB
    if (localStorage.getItem('fcmRegistered') === '1') return false;
    return !isDismissedRecently();
  }

  try {
    const [teacher, currentToken] = await Promise.all([
      getTeacher(teacherId),
      getExistingFcmToken(),
    ]);
    const tokenMatches = currentToken && teacher?.fcmToken === currentToken;
    if (tokenMatches) return false;
    return !isDismissedRecently();
  } catch {
    // เช็ค DB ไม่ได้ (เช่น เน็ตหลุด) — อย่ารบกวนผู้ใช้ด้วย false positive
    return false;
  }
}

export function dismissFcmReminder() {
  localStorage.setItem(DISMISS_KEY, String(Date.now()));
}
