'use client';

import {createContext, useCallback, useState} from 'react'; // @ts-ignore

// @ts-ignore
export const DisplayContext = createContext();

export default function DisplayProvider(props: any) {
  const [layoutMode, setLayoutMode] = useState('GRID');
  const [searchMode, setSearchMode] = useState(false);
  const toggleLayoutMode = useCallback(() => {
    setLayoutMode(prevState => (prevState === 'GRID' ? 'LIST' : 'GRID'));
  }, []);
  return (
    <DisplayContext.Provider
      value={{
        layoutMode: layoutMode,
        toggleLayoutMode: toggleLayoutMode,
        searchMode: searchMode,
        setSearchMode: setSearchMode,
      }}
    >
      {props.children}
    </DisplayContext.Provider>
  );
}
