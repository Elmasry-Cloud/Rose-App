import { useState, useEffect } from 'react';

const TIMER_KEY = 'otp-timer-end';
const TIMER_DURATION = 60;

export function useOtpTimer() {
  const [timeLeft, setTimeLeft] = useState(0);

  //   Get Time from localStorage
  useEffect(() => {
    const endTime = localStorage.getItem(TIMER_KEY);
    if (endTime) {
      const remaining = Math.ceil((Number(endTime) - Date.now()) / 1000);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time init from stored endTime on mount
      if (remaining > 0) setTimeLeft(remaining);
    }
  }, []);

  //   Timer
  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  // Start Timer
  function startTimer() {
    const endTime = Date.now() + TIMER_DURATION * 1000;
    localStorage.setItem(TIMER_KEY, endTime.toString());
    setTimeLeft(TIMER_DURATION);
  }

  return { timeLeft, startTimer };
}
