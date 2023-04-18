import React, { useState, useCallback, createContext } from 'react';
import useKeydown from '../../hooks/use-keydown';

export const ToastContext = createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const createToast = useCallback(
    (message, variant) => {
      const nextToasts = [
        ...toasts,
        { id: crypto.randomUUID(), message, variant },
      ];

      setToasts(nextToasts);
    },
    [toasts]
  );

  const dismissToast = useCallback(
    (id) => {
      const nextToasts = toasts.filter((toast) => toast.id !== id);
      setToasts(nextToasts);
    },
    [toasts]
  );

  const handleEscape = useCallback(() => {
    setToasts([]);
  }, []);

  useKeydown('Escape', handleEscape);

  return (
    <ToastContext.Provider value={{ toasts, createToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
