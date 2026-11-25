import { useSyncExternalStore } from 'react';

const EVENT = 'local-storage-change';

export function notifyStorageChange() {
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener(EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(EVENT, callback);
  };
}

export function useStorageFlag(getValue: () => boolean) {
  return useSyncExternalStore(subscribe, getValue, () => false);
}
