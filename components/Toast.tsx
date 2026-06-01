import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'error';
}

interface ToastAPI {
  success: (msg: string) => void;
  error: (msg: string) => void;
}

interface ToastContextValue {
  toast: ToastAPI;
}

const ToastContext = createContext<ToastContextValue>({
  toast: { success: () => {}, error: () => {} },
});

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const add = useCallback((message: string, type: ToastItem['type']) => {
    const id = Date.now().toString() + Math.random().toString(36).slice(2);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4500);
  }, []);

  const remove = (id: string) => setToasts(prev => prev.filter(t => t.id !== id));

  const toast: ToastAPI = {
    success: (msg) => add(msg, 'success'),
    error: (msg) => add(msg, 'error'),
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-5 right-5 z-[300] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map(t => (
          <div
            key={t.id}
            className="pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-2xl shadow-xl border animate-fade-up"
            style={{
              backgroundColor: t.type === 'success' ? '#0F1B2D' : '#8B2635',
              borderColor: t.type === 'success' ? 'rgba(212,168,71,0.3)' : 'rgba(250,247,242,0.15)',
              color: '#FAF7F2',
            }}
          >
            {t.type === 'success'
              ? <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#D4A847' }} />
              : <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#FAF7F2' }} />
            }
            <span className="text-sm font-medium flex-1">{t.message}</span>
            <button onClick={() => remove(t.id)} className="opacity-50 hover:opacity-100 transition-opacity">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
