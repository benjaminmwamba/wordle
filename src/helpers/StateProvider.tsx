import getNewGuess from "@/utilities/guesses";
import React, { useState, createContext, Dispatch, SetStateAction } from "react";

type BoardStateType = [string[][], Dispatch<SetStateAction<string[][]>>]
type AttemptStateType = [string, Dispatch<SetStateAction<string>>]
type AnswerStateType = [string, Dispatch<SetStateAction<string>>]
type CurrentSpotType = [{ id: number, index: number }, Dispatch<SetStateAction<{id: number, index: number}>>]

export interface StateContextType {
  boardState: BoardStateType;
  attemptState: AttemptStateType;
  answerState: AnswerStateType,
  currentSpotState: CurrentSpotType
}

export const StateContext = createContext<StateContextType | undefined>(undefined);

const StateProvider = ({ children }: { children: any }) => {
  const [board, setBoard] = useState<string[][]>([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);
  const [attempt, setAttempt] = useState<string>("");
  const initialAnswer = getNewGuess()
  const [answer, setAnswer] = useState<string>(initialAnswer)
  const [currentSpot, setCurrentSpot] = useState<{id: number, index: number}>({id: 1, index: 1})

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