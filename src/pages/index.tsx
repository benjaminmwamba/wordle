import { Inter } from 'next/font/google'
import styles from '@/styles/App.module.scss'
import Board from '@/components/board/Board'
import Keyboard from '@/components/keyboard/Keyboard'
import { changeBoardKeyBackgroundColor } from '@/components/board/changeBoardKeyBackgroundColor'
import { changeBoardKeyInnerText, ChangeBoardKeyInnerTextProps } from '@/components/board/changeBoardKeyInnerText'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  const [current, setCurrent] = useState<ChangeBoardKeyInnerTextProps>({boardSlotNumber: 0, boardCaseNumber: 0, text: "a"})
  
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
