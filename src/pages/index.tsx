import { Inter } from 'next/font/google'
import styles from '@/styles/App.module.scss'
import Board from '@/components/board/Board'
import Keyboard from '@/components/keyboard/Keyboard'
import { useContext, useState } from 'react'
import StateProvider, { StateContext } from '@/helpers/StateProvider'


const inter = Inter({ subsets: ['latin'] })


export default function Home() {


  return (
    <StateProvider>
      <div className={styles.app_container}>
        <nav className={styles.navbar}>
          <h2 className={styles.wordle_title}>wordle</h2>
        </nav>
        <Board />
      </div>
      
    </StateProvider>
  )
}