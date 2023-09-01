'use client';
import Image from 'next/image';
import {CLOSEICON, GRIDICON, LISTICON, REFRESHICON, SEARCHICON, SETTINGSICON} from '@/utils/constants';
import './pageHeaderCenter.css';
import {useCallback, useContext, useState} from 'react';
import {DisplayContext} from '@/providers/displayProvider';

// @ts-ignore
export default function PageHeaderCenter({ className, updateQuery }) {
  // @ts-ignore
  const { layoutMode, toggleLayoutMode, searchMode, setSearchMode } = useContext(DisplayContext);
  const [query, setQuery] = useState('');
  const handleChange = useCallback(
    (event: any) => {
      event.preventDefault();
      setQuery(event.target.value);
      updateQuery(event.target.value);
    },
    [updateQuery]
  );

  const handleSearch = useCallback((event: any) => {
    event.preventDefault();
  }, []);

  const handleClose = useCallback(
    (event: any) => {
      event.preventDefault();
      setQuery('');
      updateQuery('');
      setSearchMode(false);
    },
    [setSearchMode, updateQuery]
  );

  const handleSubmit = useCallback((event: any) => {
    event.preventDefault();
  }, []);

  const handleClick = useCallback(() => {
    toggleLayoutMode();
  }, [toggleLayoutMode]);

  return (
    <div className={className}>
      <form
        className="flex items-center h-full w-full gap-2 px-3 rounded-lg mr-auto focus-within:bg-white search-container"
        onSubmit={handleSubmit}
        onFocus={() => setSearchMode(true)}
      >
        <div
          className="flex items-center justify-center h-9 aspect-square hover:rounded-full hover:bg-hover-color btn submit"
          onClick={handleSearch}
        >
          <Image src={SEARCHICON.src} alt={SEARCHICON.name} width={24} height={24} />
        </div>
        <input
          className="bg-transparent grow outline-none search-global"
          type="text"
          placeholder="Search"
          value={query}
          onChange={handleChange}
        />
        {searchMode && (
          <button className="btn close" onClick={handleClose}>
            <Image src={CLOSEICON.src} alt={CLOSEICON.name} width={24} height={24} />
          </button>
        )}
      </form>
      <button className={'btn refresh'}>
        <Image src={REFRESHICON.src} alt={REFRESHICON.name} width={24} height={24} />
      </button>
      {layoutMode === 'GRID' ? (
        <button className={'btn list'} onClick={handleClick}>
          <Image src={LISTICON.src} alt={LISTICON.name} width={24} height={24} />
        </button>
      ) : (
        <button className={'btn grid'} onClick={handleClick}>
          <Image src={GRIDICON.src} alt={GRIDICON.name} width={24} height={24} />
        </button>
      )}
      <button className={'btn settings'}>
        <Image src={SETTINGSICON.src} alt={SETTINGSICON.name} width={24} height={24} />
      </button>
    </div>
  );
}
