"use client";

import { useState, useEffect } from "react";
import { logErrorToSentry } from "@/lib/sentry";

export function useLocalStorage<T>(
    key: string,
    initialValue: T,
): [T, (value: T | ((val: T) => T)) => void] {
    const [storedValue, setStoredValue] = useState<T>(initialValue);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        try {
            const item = window.localStorage.getItem(key);
            if (item !== null) {
                setStoredValue(JSON.parse(item));
            }
        } catch (error) {
            logErrorToSentry(error, {
                tags: { feature: "localStorage", operation: "read", key },
                level: "warning",
            });
            console.warn(`Error reading localStorage key "${key}":`, error);
        }
        setIsHydrated(true);
    }, [key]);

    const setValue = (value: T | ((val: T) => T)) => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            if (typeof window !== "undefined") {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            logErrorToSentry(error, {
                tags: { feature: "localStorage", operation: "write", key },
                level: "warning",
            });
            console.warn(`Error setting localStorage key "${key}":`, error);
        }
    };

    return [isHydrated ? storedValue : initialValue, setValue];
}
