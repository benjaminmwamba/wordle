import React, { useCallback, useContext, useEffect } from "react";
import styles from "src/styles/Board.module.scss";
import { StateContext, StateContextType } from "@/helpers/StateProvider";
import BoardUI from "./BoardUI";
import { alphabet } from "./boardConstants";


const Board = () => {
	const [board, setBoard,
		attempt, setAttempt,
		currentSpot, setCurrentSpot] = useContext(StateContext) as StateContextType;
	
	

	return <BoardUI/>
};

export default Board;
