import React, { useState, createContext, Dispatch, SetStateAction } from "react";

export type BoardStateType = [string[][], Dispatch<SetStateAction<string[][]>>]


export type AttemptStateType = [string,Dispatch<SetStateAction<string>>]

export interface StateContextType {
  boardState: BoardStateType;
  attemptState: AttemptStateType;
}

export const StateContext = createContext<StateContextType | undefined>(undefined) ;

const StateProvider = ({ children }: {children: any}) => {
  const [board, setBoard] = useState<string[][]>([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);
  const [attempt, setAttempt] = useState<string>("");

	const boardState: BoardStateType = [board,setBoard]

	const attemptState: AttemptStateType = [attempt, setAttempt]

  const contextValue: StateContextType = {
    boardState,
    attemptState,
  };

  return (
    <StateContext.Provider value={contextValue}>
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
