import { Inter } from 'next/font/google'
import { useContext, useEffect, useState } from 'react'

import WordleUI from '@/components/WordleUI'
import { StateContext, StateContextType } from '@/helpers/StateProvider'


const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  const { boardState } = useContext(StateContext) as StateContextType;
  const [board, setBoard] = boardState;

  return <WordleUI />
}