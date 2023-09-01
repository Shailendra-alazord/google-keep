'use client';
// @ts-ignore
import {useCallback, useState} from 'react';
import NoteMaker from '@/components/noteMaker/noteMaker';
import NoteMakerFocused from '@/components/noteMakerFocused/noteMakerFocused'; // @ts-ignore
import './mainHeader.css';
// @ts-ignore
export default function MainHeader({ className, noteListData }) {
  const [focus, setFocus] = useState(false);
  const toggleFocus = useCallback(() => {
    setFocus(prevState => !prevState);
  }, []);

  return (
    <div className={className}>
      {focus ? (
        <NoteMakerFocused
          className="flex flex-col h-fit w-150 gap-0 px-4 py-1 rounded-lg border border-gray-300 note-maker"
          focus={focus}
          toggleFocus={toggleFocus}
          noteListData={noteListData}
        />
      ) : (
        <NoteMaker
          className="flex h-12 w-150 gap-2 px-4 py-1 rounded-lg border border-gray-300 note-maker"
          toggleFocus={toggleFocus}
        />
      )}
    </div>
  );
}
