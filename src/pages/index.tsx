import { Inter } from 'next/font/google'
import styles from '@/styles/App.module.scss'
import Board from '@/components/board/Board'
import Keyboard from '@/components/keyboard/Keyboard'

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  
  return (
    
    <div className={styles.app_container}>
      <nav className={styles.navbar}>
        <h2 className={styles.wordle_title}>wordle</h2>
      </nav>
      <section className={styles.lower_part}>
        <Board />
        <Keyboard />
      </section>
    </div>
  )
}
