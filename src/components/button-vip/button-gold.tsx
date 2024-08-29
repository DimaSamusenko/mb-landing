import styles from './button-gold.module.css';

export default function ButtonGold({label}) {
    return (
        <div className={styles.button}>{label}</div>
    );
}
