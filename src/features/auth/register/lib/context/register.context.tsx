import { createContext, useContext, useEffect, useState } from 'react';

interface RegisterContextType {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  emailValue: string;
  setEmailValue: (email: string) => void;
}

export const RegisterContext = createContext<RegisterContextType | null>(null);

export default function RegisterContextProvider({ children }: { children: React.ReactNode }) {
  // Step State
  const [step, setStep] = useState(1);
  const [mounted, setMounted] = useState(false);

  // Email State
  const [emailValue, setEmailValue] = useState(() => {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem('register-email') ?? '';
  });

  function handleSetEmail(email: string) {
    localStorage.setItem('register-email', email);
    setEmailValue(email);
  }

  useEffect(() => {
    const savedStep = localStorage.getItem('step');
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time init from localStorage on mount
    if (savedStep) setStep(Number(savedStep));
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <RegisterContext.Provider value={{ step, setStep, emailValue, setEmailValue: handleSetEmail }}>
      {children}
    </RegisterContext.Provider>
  );
}

export function useRegisterContext() {
  const context = useContext(RegisterContext);
  if (!context) throw new Error('useRegisterContext must be used within RegisterContextProvider');
  return context;
}
