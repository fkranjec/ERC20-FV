import styles from '../styles/Transaction.module.css'

export default function Transaction() {
    return (
        <div className={styles.transaction}>
            <input type='text' placeholder='Insert wallet address...' className={styles.address_input}/>
            <p className={styles.heading}>Eth amount:</p>
            <input min='1' defaultValue={1} type='number' placeholder='Insert amount...' className={styles.address_input}/>
            <button className={styles.button}>Send eth</button>
        </div>
    )
}
