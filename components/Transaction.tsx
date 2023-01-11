import styles from '../styles/Transaction.module.css'

export default function Transaction() {
    return (
        <div className={styles.transaction}>
            <input className={styles.address_input}/>
            <button className={styles.button}>Send eth</button>
        </div>
    )
}
