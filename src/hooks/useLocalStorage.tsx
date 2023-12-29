import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type useLocalStorage<ValueType> = [ValueType, Dispatch<SetStateAction<ValueType>>];

export function useLocalStorage<ValueType>(key: string, initialValue: ValueType): useLocalStorage<ValueType> {
	// Get stored value from localStorage
	const storedValue = localStorage.getItem(key);
	const initial = storedValue ? JSON.parse(storedValue) : initialValue;

	// State to hold the current value
	const [value, setValue] = useState<ValueType>(initial);

	// Update localStorage when the value changes
	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return [value, setValue];
}
