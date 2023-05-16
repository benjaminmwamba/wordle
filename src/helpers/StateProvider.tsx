import getNewGuess from "@/utilities/guesses";
import React, { useState, createContext, Dispatch, SetStateAction, useEffect } from "react";




export type StateContextType = [
  string[][], Dispatch<SetStateAction<string[][]>>,
  string, Dispatch<SetStateAction<string>>,
  { id: number, index: number }, Dispatch<SetStateAction<{id: number, index: number}>>,
]

export const StateContext = createContext<StateContextType | undefined>(undefined) ;

const StateProvider = ({ children }: { children: any }) => {
  // INITIAL STATES
  const [board, setBoard] = useState<string[][]>([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);

  const initialAnswer = getNewGuess()
  const [answer, setAnswer] = useState<string>(initialAnswer)

  const [currentSpot, setCurrentSpot] = useState<{id: number, index: number}>({id: 1, index: 1})

  useEffect(() => {
    console.log(answer)
  }, [answer])



  const [attempt, setAttempt] = useState<string>("");
  const newContextValue: StateContextType = [
    board, setBoard,
    attempt, setAttempt,
    currentSpot, setCurrentSpot
  ]

  return (
    <StateContext.Provider value={newContextValue}>
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;