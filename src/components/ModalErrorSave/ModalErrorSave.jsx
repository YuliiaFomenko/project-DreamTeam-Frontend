import { ModalBase } from '../ModalBase/ModalBase';
import styles from './ModalErrorSave.module.css';
import { useNavigate } from 'react-router-dom';

export const ModalErrorSave = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <ModalBase onClose={onClose}>
      <h2 className={styles.title}>Error while saving</h2>
      <p className={styles.text}>
        To save this article, you need to authorize first
      </p>
      <div className={styles.buttonGroup}>
        <button
          className={styles.loginBtn}
          onClick={() => {
            navigate('/login');
            onClose();
          }}
        >
          Login
        </button>
        <button
          className={styles.registerBtn}
          onClick={() => {
            navigate('/register');
            onClose();
          }}
        >
          Register
        </button>
      </div>
    </ModalBase>
  );
};
