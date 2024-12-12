import React, { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed bottom-4 right-4 flex items-center bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-slide-up">
      <CheckCircle className="w-5 h-5 mr-2" />
      <span>{message}</span>
    </div>
  );
}