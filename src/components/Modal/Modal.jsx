import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const Modal = ({ 
  isOpen, 
  onClose, 
  children, 
  className = '',
  closeOnOverlayClick = true,
  closeOnEscKey = true 
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscKey = (e) => {
      if (closeOnEscKey && e.key === 'Escape') {
        onClose();
      }
    };

    const handleBodyScroll = () => {
      document.body.style.overflow = 'hidden';
    };

    handleBodyScroll();
    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose, closeOnEscKey]);

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div 
      className={`${css.modalOverlay} ${className}`} 
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modalContent}>
        <button
          className={css.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg width="24" height="24" viewBox="0 0 32 32">
            <use href="/src/assets/img/sprite.svg#icon-close"></use>
          </svg>
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;