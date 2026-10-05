import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast, clearToast } = useApp();

  if (!toast) return null;

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-[420px] pointer-events-auto animate-in fade-in slide-in-from-top-4 duration-200">
      <div className="p-4 rounded-2xl bg-slate-900/95 dark:bg-slate-800/95 text-white shadow-2xl border border-slate-700/60 backdrop-blur-md flex items-start gap-3">
        <div className="mt-0.5 shrink-0">
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400" />}
          {toast.type === 'warning' && <AlertCircle className="w-5 h-5 text-amber-400" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-teal-400" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-extrabold text-sm text-slate-100">{toast.title}</div>
          <div className="text-xs text-slate-300 mt-0.5 leading-relaxed">{toast.message}</div>
        </div>
        <button
          onClick={clearToast}
          className="text-slate-400 hover:text-white transition-colors p-1"
          aria-label="Kapat"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
