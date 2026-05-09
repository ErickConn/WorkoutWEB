import { useContext } from 'react';
import { AlertContext } from '../context/AlertContext';
import styles from './alert.module.css';

export const Alert = () => {
    const { alert, closeAlert } = useContext(AlertContext);

    if (!alert) return null;

    return(
        <div className={`${styles.alert} ${styles[alert.type]}`}>
            <span>{ alert.message }</span>
            <button onClick={closeAlert}>x</button>
        </div>
    )
}