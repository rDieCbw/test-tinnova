import styles from './styles/globals.module.scss'
import Image from 'next/image'

export const metadata = {
  title: 'Tinnova Form',
  description: 'Tinnova react test',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={styles.body}>
        <header className={styles.header}>
          <Image
            src="/logo_dark.png"
            alt="Logo"
            width={171}
            height={60}
            priority
          />
        </header>
        <main className={styles.main}>
          {children}
        </main>
        <footer className={styles.footer}>
          Developed by&nbsp;<a href='https://github.com/rDieCbw' title='Link github'>RAUL 'Die_C' BW</a>
        </footer>
      </body>
    </html>
  )
}
