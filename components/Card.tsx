import styles from '../styles/Card.module.css'

export default function Card() {
    return (
        <div className={styles.card}>
            <p className={styles.small_heading}>wallet</p>
            <p className={styles.normal_text}>0x0randomwalletid</p>
            <hr className={styles.separator}/>
            <div className={styles.status}>
                <div className={styles.eth}>
                    <p className={styles.small_heading}>wallet status eth</p>
                    <p className={styles.price}>0.76 eth</p>
                </div>
                <hr className={styles.separator_sec}/>
                <div className={styles.eur}>
                    <p className={styles.small_heading}>wallet status eur</p>
                    <p className={styles.price}>1000 eur</p>
                </div>
            </div>
        </div>
    );
}
