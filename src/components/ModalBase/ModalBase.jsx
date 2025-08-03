import styles from "./ModalBase.module.css";
import { useEffect } from "react";
import clsx from "clsx";

export const ModalBase = ({ onClose, children, isOpen, className = "" }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className={clsx(styles.backdrop, isOpen ? styles.open : styles.closing)}
      onClick={handleBackdropClick}
    >
      <div
        className={clsx(
          styles.modal,
          className,
          isOpen ? styles.open : styles.closing
        )}
      >
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};
