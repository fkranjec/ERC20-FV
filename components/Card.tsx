import styles from '../styles/Card.module.css'

export interface ICard{
  wallet: string,
  eth: string,
}

export default function Card({wallet, eth}:ICard) {
    return (
        <div className={styles.card}>
            <p className={styles.small_heading}>wallet</p>
            <p className={styles.normal_text}>{wallet}</p>
            <hr className={styles.separator}/>
            <div className={styles.status}>
                <div className={styles.eth}>
                    <p className={styles.small_heading}>wallet status</p>
                    <p className={styles.price}>{parseInt(eth)/100} $FLDC</p>
                </div>
           </div>
        </div>
    );
}
