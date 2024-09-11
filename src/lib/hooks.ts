import React from "react";

function useLocalStorage(key: string, initialValue:any) {

  if (typeof window !== "undefined") {
    return [null, null];
  }

  // 1. Retrieve Initial Value
  const [storedValue, setStoredValue] = React.useState(() => {
    const storedItem = localStorage.getItem(key);
    return storedItem ? JSON.parse(storedItem) : initialValue;
  });

  // 2. Update Local Storage on Change
  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}


export default useLocalStorage;