export const EMPTY_STRING = "";
export const ALPHABET = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

export const isLetterInAlphabet = (letter: string): boolean => ALPHABET.includes(letter)

export const ENTER_KEY_WORD = "Enter";
export const BACKSPACE_KEY_WORD = "Backspace";
export const LAST_INDEX = 6;
export const DELAY_FOR_RESETTING_CASE_COLOR = 1100;
export const LAST_SLOT = 7;
export const FIRST_INDEX = 1;

export const GREEN = "#538d4e";
export const ORANGE = "#b59f3b"
export const BRIGHT_GREY = "#818384"
export const LIGHTER_GREY = "#3a3a3c"
export const REGULAR_BACKGROUND_COLOR = "#121213";

export const initialBoardState: { color: string, text: string }[][] = [
	[{ color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }],
	[{ color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }],
	[{ color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }],
	[{ color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }],
	[{ color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }],
	[{ color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }],
];
export const initialKeyboardKeys: { color: string, text: string }[][] = [
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
export const initialCurrentSpot = { id: 1, index: 1 }