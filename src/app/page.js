import Link from 'next/link'
import styles from './styles/page.module.scss'

export default function Index() {
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <h1 className={styles.title}>Sistema de cadastro de usuários</h1>
        <div className={styles.buttonWrapper}>
          <Link className={styles.button} href="/form">Cadastrar</Link>
          <Link className={styles.button} href="/list">Ver cadastros</Link>
        </div>
      </div>
    </main>
  )
}
