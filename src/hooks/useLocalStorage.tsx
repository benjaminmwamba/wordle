"use client"
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type useLocalStorage<ValueType> = [ValueType, Dispatch<SetStateAction<ValueType>>];

interface UseLocalStorageParameters<InitialValueType> {
	key: string,
	initialValue: InitialValueType
}

export function useLocalStorage<ValueType>({ key, initialValue }: UseLocalStorageParameters<ValueType>): useLocalStorage<ValueType> {
	// Check if localStorage is available
	const isLocalStorageAvailable = typeof window !== 'undefined' && window.localStorage;

	// Get stored value from localStorage if available
	//const storedValue = isLocalStorageAvailable ? localStorage.getItem(key) : null;
	const storedValue = isLocalStorageAvailable ? localStorage.getItem(key) : null;
	const initial = storedValue ? JSON.parse(storedValue) : initialValue;

	// State to hold the current value
	const [value, setValue] = useState<ValueType>(initial);

	// Update localStorage when the value changes
	useEffect(() => {
		if (isLocalStorageAvailable) {
			localStorage.setItem(key, JSON.stringify(value));
		}
	}, [isLocalStorageAvailable, key, value]);

	return [value, setValue];
}
