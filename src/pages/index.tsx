import { Inter } from 'next/font/google'
import styles from '@/styles/App.module.scss'
import Board from '@/components/board/Board'
import Keyboard from '@/components/keyboard/Keyboard'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  const [board, setBoard] = useState<string[][]>([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ])
  

  return (
    <div className={styles.app_container}>
      <nav className={styles.navbar}>
        <h2 className={styles.wordle_title}>wordle</h2>
      </nav>
      <section className={styles.lower_part}>
        <Board board={board} />
        <Keyboard />
      </section>
    </div>
  )
}
