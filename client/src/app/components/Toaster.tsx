"use client";
import { useState, useEffect } from "react";

interface ToasterProps {
  message: string;
  duration: number;
  onClose: () => void;
}

const Toaster: React.FC<ToasterProps> = ({ message, duration, onClose }) => {
  const [showToaster, setShowToaster] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowToaster(false);
      onClose();
    }, duration);

    return () => clearTimeout(timeout);
  }, [duration, onClose]);

  return (
    <div
      className={`${
        showToaster ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      } fixed bottom-10 right-4 bg-pink-400 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300`}
    >
      {message}
    </div>
  );
};

export default Toaster;
