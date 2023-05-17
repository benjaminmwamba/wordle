import { EMPTY_STRING } from "@/utilities/constants";
import getNewGuess from "@/utilities/guesses";
import React, { useState, createContext, Dispatch, SetStateAction, useEffect } from "react";

type BoardStateType = [{ color: string, text: string }[][], Dispatch<SetStateAction<{ color: string, text: string }[][]>>]
type AttemptStateType = [string, Dispatch<SetStateAction<string>>]
type AnswerStateType = [string, Dispatch<SetStateAction<string>>]
type CurrentSpotType = [{ id: number, index: number }, Dispatch<SetStateAction<{ id: number, index: number }>>]

export interface StateContextType {
  boardState: BoardStateType;
  attemptState: AttemptStateType;
  answerState: AnswerStateType,
  currentSpotState: CurrentSpotType
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

export const StateContext = createContext<StateContextType | undefined>(undefined);

const StateProvider = ({ children }: { children: any }) => {
  const [board, setBoard] = useState<{ color: string, text: string }[][]>(initialBoardState);
  const [attempt, setAttempt] = useState<string>(EMPTY_STRING);
  const [answer, setAnswer] = useState<string>(initialAnswer)
  const [currentSpot, setCurrentSpot] = useState<{ id: number, index: number }>({ id: 1, index: 1 })

  useEffect(() => {
    console.log(answer)
  }, [answer])

  const boardState: BoardStateType = [board, setBoard]
  const attemptState: AttemptStateType = [attempt, setAttempt]
  const answerState: AnswerStateType = [answer, setAnswer]
  const currentSpotState: CurrentSpotType = [currentSpot, setCurrentSpot]


  const contextValue: StateContextType = {
    boardState,
    attemptState,
    answerState,
    currentSpotState
  };

  return (
    <StateContext.Provider value={contextValue}>
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;