import { useState } from 'react';

export function useToast() {
  const [toast, setToast] = useState<{ message: string } | null>(null);

  const showToast = (message: string) => {
    setToast({ message });
  };

  const hideToast = () => {
    setToast(null);
  };

  return { toast, showToast, hideToast };
}