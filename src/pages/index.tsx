import { Inter } from 'next/font/google'
import { useContext, useEffect, useState } from 'react'
import StateProvider, { StateContext } from '@/helpers/StateProvider'
import WordleUI from '@/components/WordleUI'


const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  
  

  return <WordleUI/>
}