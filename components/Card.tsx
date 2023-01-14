import styles from '../styles/Card.module.css'

export interface ICard{
  wallet: string,
  eth: string,
  eur: string
}

export default function Card({wallet, eth, eur}:ICard) {
    return (
        <div className={styles.card}>
            <p className={styles.small_heading}>wallet</p>
            <p className={styles.normal_text}>{wallet}</p>
            <hr className={styles.separator}/>
            <div className={styles.status}>
                <div className={styles.eth}>
                    <p className={styles.small_heading}>wallet status eth</p>
                    <p className={styles.price}>{eth} eth</p>
                </div>
                <hr className={styles.separator_sec}/>
                <div className={styles.eur}>
                    <p className={styles.small_heading}>wallet status eur</p>
                    <p className={styles.price}>{eur} eur</p>
                </div>
            </div>
        </div>
    );
}
