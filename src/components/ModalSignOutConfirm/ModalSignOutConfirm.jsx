

import { ModalBase } from '../ModalBase/ModalBase';
import modalBaseStyles from '../ModalBase/ModalBase.module.css';
import styles from './ModalSignOutConfirm.module.css';

export const ModalSignOutConfirm = ({ onClose, onLogout }) => {
  return (
    <ModalBase onClose={onClose} className={modalBaseStyles.compact}>
      <h2 className={styles.title}>Are you sure?</h2>
      <p className={styles.text}>We will miss you!</p>
      <div className={styles.buttonGroup}>
        <button
          className={styles.logoutBtn}
          onClick={() => {
            onLogout();
            onClose();
          }}
        >
          Log out
        </button>
        <button className={styles.cancelBtn} onClick={onClose}>
          Cancel
        </button>
      </div>
    </ModalBase>
  );
};
