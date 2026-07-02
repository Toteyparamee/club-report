const DISMISS_KEY = 'fcmReminderDismissedAt';
const DISMISS_DAYS = 3;

export function shouldShowFcmReminder() {
  if (typeof Notification === 'undefined' || !('serviceWorker' in navigator)) return false;
  if (Notification.permission === 'granted') return false;
  if (localStorage.getItem('fcmRegistered') === '1') return false;

  const dismissedAt = Number(localStorage.getItem(DISMISS_KEY) || 0);
  const elapsedDays = (Date.now() - dismissedAt) / (1000 * 60 * 60 * 24);
  return elapsedDays >= DISMISS_DAYS;
}

export function dismissFcmReminder() {
  localStorage.setItem(DISMISS_KEY, String(Date.now()));
}
