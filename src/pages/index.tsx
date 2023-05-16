import { Inter } from 'next/font/google'
import { useContext, useEffect, useState } from 'react'

import WordleUI from '@/components/WordleUI'
import { StateContext } from '@/helpers/StateProvider'


const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  console.log(useContext(StateContext))

  return <WordleUI />
}