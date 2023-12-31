import { useLocalStorage } from "@/hooks/useLocalStorage";
import { UserWithId } from "@/pages/api/createAccount";
import { EMPTY_STRING } from "@/utilities/constants";
import getNewGuess from "@/utilities/guesses";
import React, { useState, createContext, Dispatch, SetStateAction, useEffect } from "react";

type BoardStateType = [BoardType, Dispatch<SetStateAction<{ color: string, text: string }[][]>>]
type AttemptStateType = [string, Dispatch<SetStateAction<string>>]
type AnswerStateType = [string, Dispatch<SetStateAction<string>>]
type CurrentSpotStateType = [{ id: number, index: number }, Dispatch<SetStateAction<{ id: number, index: number }>>]
type KeyboardKeysStateType = [{ color: string, text: string }[][], Dispatch<SetStateAction<{ color: string, text: string }[][]>>]
type IsGameOverType = [boolean, Dispatch<SetStateAction<boolean>>]
type UserStateType = [UserWithId | undefined, (newUserData: UserWithId) => void];

type BoardType = { color: string, text: string }[][];
type CurrentSpotType = { id: number, index: number };
type KeyboardKeysType = { color: string, text: string }[][];

export interface StateContextType {
  userState: UserStateType,
  boardState: BoardStateType;
  attemptState: AttemptStateType;
  answerState: AnswerStateType,
  currentSpotState: CurrentSpotStateType,
  keyboardKeysState: KeyboardKeysStateType,
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
  [
    { color: EMPTY_STRING, text: "q" },
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

  //IMPORTANT
  const [userPrimaryLoginData, setUserPrimaryLoginData] = useState<UserWithId>()

  const changePrimaryUserLoginData = (newUserData: UserWithId): void => {
    if ((userPrimaryLoginData === null) || (userPrimaryLoginData === undefined)) {

      if ((newUserData === null) || (newUserData === undefined)) {
        console.log("MESSAGE FROM PROVIDER: the NEW_USER_DATA is either null or undefined")
        return
      }
      setUserPrimaryLoginData(newUserData)
      console.log("FROM PROVIDER", newUserData)
      return
    }
    console.log("MESSAGE FROM PROVIDER: the USER_DATA is either null or undefined")
  }
  //IMPORTANT

  /*
  const [board, setBoard] = useState<{ color: string, text: string }[][]>(initialBoardState);
  const [attempt, setAttempt] = useState<string>(EMPTY_STRING);
  const [answer, setAnswer] = useState<string>(initialAnswer)
  const [currentSpot, setCurrentSpot] = useState<{ id: number, index: number }>(initialCurrentSpot)
  
  const [keyboardKeys, setKeyboardKeys] = useState<{ color: string, text: string }[][]>(initialKeyboardKeys)
  const [isGameOver, setIsGameOver] = useState<boolean>(false)
  */

  //const [board, setBoard] = useLocalStorage<{ color: string, text: string }[][]>(initialBoardState);
  const [board, setBoard] = useLocalStorage<BoardType>({ key: "board", initialValue: initialBoardState });
  const [attempt, setAttempt] = useLocalStorage<string>({ key: "attempt", initialValue: EMPTY_STRING });
  const [answer, setAnswer] = useLocalStorage<string>({ key: "answer", initialValue: initialAnswer })
  const [currentSpot, setCurrentSpot] = useLocalStorage<CurrentSpotType>({ key: "currentSpot", initialValue: initialCurrentSpot })

  const [keyboardKeys, setKeyboardKeys] = useLocalStorage<KeyboardKeysType>({ key: "keyboardKeys", initialValue: initialKeyboardKeys })
  const [isGameOver, setIsGameOver] = useLocalStorage<boolean>({ key: "isGameOver", initialValue: false })

  const userState: UserStateType = [userPrimaryLoginData, changePrimaryUserLoginData];
  const boardState: BoardStateType = [board, setBoard]
  const attemptState: AttemptStateType = [attempt, setAttempt]
  const answerState: AnswerStateType = [answer, setAnswer]
  const currentSpotState: CurrentSpotStateType = [currentSpot, setCurrentSpot]
  const keyboardKeysState: KeyboardKeysStateType = [keyboardKeys, setKeyboardKeys]
  const isGameOverState: IsGameOverType = [isGameOver, setIsGameOver]

  const startOver = () => {
    setBoard([
      [{ color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }],
      [{ color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }],
      [{ color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }],
      [{ color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }],
      [{ color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }],
      [{ color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }],
    ]);
    setAttempt(EMPTY_STRING);
    setAnswer(getNewGuess());
    setCurrentSpot(initialCurrentSpot)
    setKeyboardKeys(initialKeyboardKeys)
    setIsGameOver(false)

  }




  const contextValue: StateContextType = {
    userState,
    boardState,
    attemptState,
    answerState,
    currentSpotState,
    keyboardKeysState,
    isGameOverState,
    startOver
  };

  useEffect(() => {
    console.log(answer)
  }, [answer])

  return (
    <StateContext.Provider value={contextValue}>
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;