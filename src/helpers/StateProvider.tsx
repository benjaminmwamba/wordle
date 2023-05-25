import { EMPTY_STRING } from "@/utilities/constants";
import getNewGuess from "@/utilities/guesses";
import React, { useState, createContext, Dispatch, SetStateAction, useEffect } from "react";

type BoardStateType = [{ color: string, text: string }[][], Dispatch<SetStateAction<{ color: string, text: string }[][]>>]
type AttemptStateType = [string, Dispatch<SetStateAction<string>>]
type AnswerStateType = [string, Dispatch<SetStateAction<string>>]
type CurrentSpotType = [{ id: number, index: number }, Dispatch<SetStateAction<{ id: number, index: number }>>]
type KeyboardKeysType = [{ color: string, text: string }[][], Dispatch<SetStateAction<{ color: string, text: string }[][]>>]
type IsGameOverType = [boolean, Dispatch<SetStateAction<boolean>>]

export interface StateContextType {
  boardState: BoardStateType;
  attemptState: AttemptStateType;
  answerState: AnswerStateType,
  currentSpotState: CurrentSpotType,
  keyboardKeysState: KeyboardKeysType,
  isGameOverState: IsGameOverType,
  startOver: () => void
}

const initialAnswer = getNewGuess()
const initialBoardState: { color: string, text: string }[][] = [
  [{ color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }],
  [{ color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }],
  [{ color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }],
  [{ color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }],
  [{ color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }],
  [{ color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }],
];
const initialKeyboardKeys: { color: string, text: string }[][] = [
  [{ color: EMPTY_STRING, text: "q" },
  { color: EMPTY_STRING, text: "w" },
  { color: EMPTY_STRING, text: "e" },
  { color: EMPTY_STRING, text: "r" },
  { color: EMPTY_STRING, text: "t" },
  { color: EMPTY_STRING, text: "y" },
  { color: EMPTY_STRING, text: "u" },
  { color: EMPTY_STRING, text: "i" },
  { color: EMPTY_STRING, text: "o" },
  { color: EMPTY_STRING, text: "p" }
  ],
  [
    { color: EMPTY_STRING, text: EMPTY_STRING },
    { color: EMPTY_STRING, text: "a" },
    { color: EMPTY_STRING, text: "s" },
    { color: EMPTY_STRING, text: "d" },
    { color: EMPTY_STRING, text: "f" },
    { color: EMPTY_STRING, text: "g" },
    { color: EMPTY_STRING, text: "h" },
    { color: EMPTY_STRING, text: "j" },
    { color: EMPTY_STRING, text: "k" },
    { color: EMPTY_STRING, text: "l" },
    { color: EMPTY_STRING, text: EMPTY_STRING }
  ],
  [
    { color: EMPTY_STRING, text: "enter" },
    { color: EMPTY_STRING, text: "z" },
    { color: EMPTY_STRING, text: "x" },
    { color: EMPTY_STRING, text: "c" },
    { color: EMPTY_STRING, text: "v" },
    { color: EMPTY_STRING, text: "b" },
    { color: EMPTY_STRING, text: "n" },
    { color: EMPTY_STRING, text: "m" },
    { color: EMPTY_STRING, text: "fd" }
  ]
];
const initialCurrentSpot = { id: 1, index: 1 }

export const StateContext = createContext<StateContextType | undefined>(undefined);

const StateProvider = ({ children }: { children: any }) => {
  const [board, setBoard] = useState<{ color: string, text: string }[][]>(initialBoardState);
  const [attempt, setAttempt] = useState<string>(EMPTY_STRING);
  const [answer, setAnswer] = useState<string>(initialAnswer)
  const [currentSpot, setCurrentSpot] = useState<{ id: number, index: number }>(initialCurrentSpot)
  
  const [keyboardKeys, setKeyboardKeys] = useState<{ color: string, text: string }[][]>(initialKeyboardKeys)
  const [isGameOver, setIsGameOver] = useState<boolean>(false)

  useEffect(() => {
    console.log(answer)
  }, [answer])

  const boardState: BoardStateType = [board, setBoard]
  const attemptState: AttemptStateType = [attempt, setAttempt]
  const answerState: AnswerStateType = [answer, setAnswer]
  const currentSpotState: CurrentSpotType = [currentSpot, setCurrentSpot]
  const keyboardKeysState: KeyboardKeysType = [keyboardKeys, setKeyboardKeys]
  const isGameOverState: IsGameOverType = [isGameOver, setIsGameOver]

  const startOver = () => {
    setBoard(initialBoardState);
    setAttempt(EMPTY_STRING);
    setAnswer(initialAnswer);
    setCurrentSpot(initialCurrentSpot)
    setKeyboardKeys(initialKeyboardKeys)
    setIsGameOver(false)
    console.log("game over reset")
  }


  const contextValue: StateContextType = {
    boardState,
    attemptState,
    answerState,
    currentSpotState,
    keyboardKeysState,
    isGameOverState,
    startOver
  };

  return (
    <StateContext.Provider value={contextValue}>
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;