'use client';
// @ts-ignore
import Image from 'next/image';
import {useCallback, useEffect, useMemo, useRef} from 'react';
import {
    ALERTICON,
    ARCHIVEICON,
    COLLABORATORICON,
    MOREICON,
    PALETTEICON,
    PHOTOICON,
    PINICON,
    UNPINICON,
} from '@/utils/constants'; // @ts-ignore
import './noteMakerFocused.css';
import ActionMenu from '@/components/actionMenu/actionMenu';
import ColorPalette from '@/components/colorPalette/colorPalette';
import useNote from '@/utils/useNote';
import ActionButton from '@/components/actionButton/actionButton';

// @ts-ignore
export default function NoteMakerFocused({ className, focus, toggleFocus, noteListData }) {
  const { noteListDispatch } = noteListData;
  const { note, noteDispatch } = useNote();
  const formRef = useRef(null);
  const noteData = useMemo(
    () => ({
      note,
      noteDispatch,
    }),
    [note, noteDispatch]
  );
  // @ts-ignore
  const handleClick = useCallback((...args) => {
    alert('Functionality will be added soon');
  }, []);
  const iconList = useMemo(
    () => [
      {
        icon: ALERTICON,
        className: '',
        handleAction: handleClick,
        childComponent: () => {},
      },
      {
        icon: COLLABORATORICON,
        className: '',
        handleAction: handleClick,
        childComponent: () => {},
      },
      {
        icon: PALETTEICON,
        className: '',
        handleAction: () => {},
        childComponent: () => (
          <ColorPalette
            className="absolute -left-8 top-8 flex gap-1 h-12 p-2 border bg-white z-10 rounded-lg color-palette-note-maker"
            noteData={noteData}
          />
        ),
      },
      {
        icon: PHOTOICON,
        className: '',
        handleAction: handleClick,
        childComponent: () => {},
      },
      {
        icon: ARCHIVEICON,
        className: '',
        handleAction: handleClick,
        childComponent: () => {},
      },
      {
        icon: MOREICON,
        className: '',
        handleAction: handleClick,
        childComponent: () => {},
      },
    ],
    [handleClick, noteData]
  );
  const submitNote = useCallback(() => {
    if (note.title || note.body) {
      const newNote = { ...note, id: Date.now().toString() };
      noteDispatch({ type: 'update', payload: newNote });
      noteListDispatch({ type: 'add-note', payload: newNote });
    }
    toggleFocus();
  }, [note, noteDispatch, noteListDispatch, toggleFocus]);

  const handleSubmit = useCallback(
    (event: any) => {
      event.preventDefault();
      submitNote();
    },
    [submitNote]
  );

  function handleTitle(event: any) {
    noteDispatch({ type: 'title-update', payload: event.target.value });
  }

  function handleBody(event: any) {
    noteDispatch({ type: 'body-update', payload: event.target.value });
  }

  function handlePin() {
    noteDispatch({ type: 'pin-change', payload: {} });
  }

  useEffect(() => {
    function handleClickOutside(event: any) {
      //@ts-ignore
      if (formRef.current && !formRef.current.contains(event.target)) {
        submitNote();
      }
    }

    document.addEventListener('click', handleClickOutside, true);
    return () => document.removeEventListener('click', handleClickOutside, true);
  }, [submitNote]);

  return (
    <form
      id="note-maker"
      ref={formRef}
      className={className}
      onSubmit={handleSubmit}
      style={{ backgroundColor: note.backgroundColor }}
    >
      <div className="flex items-center h-10 p-1  note-maker-title-container">
        <input
          name="note-maker-title"
          className="grow outline-none placeholder-default bg-transparent note-maker-title"
          placeholder="Title"
          value={note.title}
          onChange={handleTitle}
        />
        <ActionButton
          className="h-full aspect-square hover:bg-hover-color rounded-full note-maker-pin"
          handleAction={handlePin}
          icon={note.pinned ? UNPINICON : PINICON}
          iconHeight={24}
          childComponent={() => {}}
        />
      </div>
      <textarea
        autoFocus
        name="note-maker-body"
        className="min-h-12 resize-none outline-none px-1 py-3 placeholder-default bg-transparent note-maker-body"
        placeholder="Take a note..."
        value={note.body}
        onChange={handleBody}
      />
      <div className="flex h-10 p-1 bottom-icons">
        <ActionMenu
          className="flex items-center gap-5 h-full grow bottom-icon-list"
          defaultClass="relative h-full aspect-square hover:rounded-full note-maker-icon"
          actionButtonList={iconList}
          iconHeight={20}
        />
        <button className="h-full w-20 hover:rounded-lg note-maker-close" type="submit" onClick={handleSubmit}>
          Close
        </button>
      </div>
    </form>
  );
}
