
import WordleUI from "@/components/WordleUi";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { StateContext, StateContextType } from "@/helpers/StateProvider";
import isValidWord from "@/utilities/words";
import { BACKSPACE_KEY_WORD, DELAY_FOR_RESETTING_CASE_COLOR, EMPTY_STRING, ENTER_KEY_WORD, FIRST_INDEX, GREEN, LAST_INDEX, LAST_SLOT, LIGHTER_GREY, ORANGE, initialCurrentSpot, initialKeyboardKeys, isLetterInAlphabet } from "@/utilities/constants";
import styles from "src/styles/Board.module.scss"
import getNewGuess from "@/utilities/guesses";

const Index: React.FC = () => {
  
  const { boardState, currentSpotState, attemptState, answerState, keyboardKeysState, isGameOverState } = useContext(StateContext) as StateContextType;
  const [board, setBoard] = boardState
  const [currentSpot, setCurrentSpot] = currentSpotState
  const [attempt, setAttempt] = attemptState
  const [answer, setAnswer] = answerState
  const [isAllowedToWrite, setIsAllowedToWrite] = useState<boolean>(true)
  const [keyboardKeys, setKeyboardKeys] = keyboardKeysState
  const [isWordValid, setIsWordValid] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = isGameOverState

  const handleCurrentSpotChange = useCallback(() => {
    setCurrentSpot((previousSpot) => {
      const PREVIOUS_SLOT = previousSpot.id
      const NEW_INDEX = previousSpot.index + 1
      return { id: PREVIOUS_SLOT, index: NEW_INDEX }
    })
  }, [setCurrentSpot])

  const handleAttempt = useCallback((letter: string) => {
    const newAttempt = attempt + letter
    setAttempt(newAttempt)
  }, [attempt, setAttempt])

  const typeLetterOnBoard = useCallback((letter: string) => {
    const newBoard = [...board]
    newBoard[currentSpot.id - 1][currentSpot.index - 1].text = letter
    handleAttempt(letter)
    setBoard(newBoard)
    handleCurrentSpotChange()
  }, [board, currentSpot.id, currentSpot.index, handleAttempt, setBoard, handleCurrentSpotChange])
  const handleLetter = useCallback((letter: string): void => {
    if (currentSpot.id === LAST_SLOT && currentSpot.index === FIRST_INDEX) {
      
      return
    } else if (currentSpot.index === LAST_INDEX) return
    typeLetterOnBoard(letter)
  }, [currentSpot.id, currentSpot.index, typeLetterOnBoard]);

  const handleWordIsInvalid = useCallback(() => {


    const boardSlots = document.querySelectorAll(`[data-board_slot]`);
    const currentSlot = boardSlots[currentSpot.id - 1];

    const allSelectedCases = currentSlot.querySelectorAll("[data-board_case]")
    allSelectedCases.forEach(boardCase => {
      boardCase.classList.add(styles.shake_animation)
      setTimeout(() => {
        boardCase.classList.remove(styles.shake_animation)
      }, DELAY_FOR_RESETTING_CASE_COLOR);
    })
  }, [currentSpot.id])

  const handleKeyboardKeyColor = useCallback(() => {

    const deepCopyKeyboard: { color: string, text: string }[][] = JSON.parse(JSON.stringify(keyboardKeys)); // Create a deep copy of the board

    deepCopyKeyboard.forEach((keys) => {
      keys.forEach((key, slotIndex) => {
        const { text } = key;
        if (attempt.includes(text) === false) return
        if (text === EMPTY_STRING) return

        if (!answer.includes(text)) {
          key.color = LIGHTER_GREY; //Change color to LIGHT_GREY if the letter is not in the answer
        } else if (answer.indexOf(text) === attempt.indexOf(text)) {
          key.color = GREEN; // Change color to GREEN if the letter is in the answer and at the same index as attempt
        } else {
          key.color = ORANGE; // Change color to YELLOW if the letter is in the answer but not at the same index as attempt
        }

      });
    });
    setKeyboardKeys(deepCopyKeyboard)

  }, [answer, attempt, keyboardKeys, setKeyboardKeys])
  const handleWordIsValid = useCallback(() => {
    setIsWordValid(true)

    handleKeyboardKeyColor()
  }, [handleKeyboardKeyColor])


  const handleEnter = useCallback(() => {
    if (currentSpot.index !== LAST_INDEX) return
    //setAttempt(lettersFromTheCurrentSlot)

    if (isValidWord(attempt) === true) {
      handleWordIsValid()
    } else {
      handleWordIsInvalid()
    }
  }, [attempt, currentSpot.index, handleWordIsInvalid, handleWordIsValid]);

  const handleBackspace = useCallback(() => {
    if (currentSpot.index === FIRST_INDEX) return

    const newBoard = [...board]
    if (currentSpot.index === LAST_INDEX) {

      newBoard[currentSpot.id - 1][currentSpot.index - 2].text = EMPTY_STRING;
      setIsWordValid(false)
    } else {

      newBoard[currentSpot.id - 1][currentSpot.index - 2].text = EMPTY_STRING;
    }
    setAttempt(previousAttempt => {
      const newAttempt = previousAttempt.slice(0, -1);
      return newAttempt
    })
    setBoard(newBoard)
    setCurrentSpot(previousSpot => {
      const CURRENT_SLOT = previousSpot.id
      const PREVIOUS_INDEX = previousSpot.index - 1
      return { id: CURRENT_SLOT, index: PREVIOUS_INDEX }
    })
  }, [board, currentSpot.id, currentSpot.index, setAttempt, setBoard, setCurrentSpot])

  const keyUp = useCallback((event: KeyboardEvent) => {
    if (isAllowedToWrite === false) return
    const key = event.key
    if (isLetterInAlphabet(key)) {
      handleLetter(key)
    } else if (key === ENTER_KEY_WORD) {
      handleEnter()
    } else if (key === BACKSPACE_KEY_WORD) {
      handleBackspace()
    }
  }, [handleBackspace, handleEnter, handleLetter, isAllowedToWrite])


  useEffect(() => {
    window.addEventListener("keyup", keyUp)
    return () => window.removeEventListener("keyup", keyUp)
  }, [keyUp])

  const getEveryLetterThatMatchesAttemptAndAnswer = useCallback((): string => {
    const deepCopyBoard: { color: string, text: string }[][] = JSON.parse(JSON.stringify(board)); // Create a deep copy of the board

    const CURRENT_SPOT_IN_INDEX_NOTATION = currentSpot.id - 1
    const targetRow = deepCopyBoard[CURRENT_SPOT_IN_INDEX_NOTATION];

    const everyLetterThatMatches: string[] = targetRow
      .filter((slot, slotIndex) => slot.text === answer[slotIndex])
      .map((slot) => slot.text);
    return everyLetterThatMatches.join("")
  }, [answer, board, currentSpot.id])

  const isAttemptEqualToAnswer = useCallback(() => {
    return getEveryLetterThatMatchesAttemptAndAnswer() === answer
  }, [answer, getEveryLetterThatMatchesAttemptAndAnswer])

  const handleBoardKeyColor = useCallback(() => {
    const deepCopyBoard: { color: string, text: string }[][] = JSON.parse(JSON.stringify(board)); // Create a deep copy of the board

    deepCopyBoard.forEach((row, rowIndex) => {
      const CURRENT_SPOT_IN_INDEX_NOTATION = currentSpot.id - 1
      if (rowIndex !== CURRENT_SPOT_IN_INDEX_NOTATION) return
      row.forEach((slot, slotIndex) => {
        const { text } = slot;

        if (!answer.includes(text)) {
          slot.color = LIGHTER_GREY; //Change color to LIGHT_GREY if the letter is not in the answer
        } else if (text === answer[slotIndex]) {
          slot.color = GREEN; // Change color to GREEN if the letter is in the answer and at the same index as attempt
        } else {
          slot.color = ORANGE; // Change color to YELLOW if the letter is in the answer but not at the same index as attempt
        }
      });
    });

    setBoard(deepCopyBoard); // Update the state with the modified board
    setCurrentSpot(previousSpot => {
      const NEXT_SLOT = previousSpot.id + 1
      return { id: NEXT_SLOT, index: FIRST_INDEX }
    })
    setAttempt(EMPTY_STRING)
    if (isAttemptEqualToAnswer()) {
      setIsAllowedToWrite(false)
      setIsGameOver(true)
    }
  }, [answer, board, currentSpot.id, isAttemptEqualToAnswer, setAttempt, setBoard, setCurrentSpot, setIsGameOver]);

  useEffect(() => {
    if (isWordValid === false) return

    handleBoardKeyColor()
    setIsWordValid(false)
  }, [currentSpot.id, handleBoardKeyColor, isAttemptEqualToAnswer, isWordValid, setIsGameOver])

  useEffect(() => {
    if (currentSpot.id === 7) setIsGameOver(true)
  }, [currentSpot.id, setIsGameOver])

  const startOverOnEnter = useCallback(() => {
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
  }, [setAnswer, setAttempt, setBoard, setCurrentSpot, setIsGameOver, setKeyboardKeys])
  useEffect(() => {
    if (isGameOver === false) {
      setIsAllowedToWrite(true)
    } else {
      setIsAllowedToWrite(false)
      window.addEventListener("keyup", startOverOnEnter)
      return () => window.removeEventListener("keyup", startOverOnEnter)
    }
  }, [isGameOver, keyUp, startOverOnEnter])

  return <WordleUI />
};

export default Index;
