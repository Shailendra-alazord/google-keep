'use client';
import Image from 'next/image';
import {
    ALERTICON,
    ARCHIVEICON,
    COLLABORATORICON,
    MOREICON,
    PALETTEICON,
    PHOTOICON,
    PINICON,
    UNPINICON,
} from '@/utils/constants';
import './modalNote.css';
import {useCallback, useEffect, useMemo, useRef} from 'react';
import ActionMenu from '@/components/actionMenu/actionMenu';
import ColorPalette from '@/components/colorPalette/colorPalette';
import useNote from '@/utils/useNote';

//@ts-ignore
export default function ModalNote({ modalNote, noteListData, toggleModal, modalNoteDispatch }) {
  const { noteListDispatch } = noteListData;
  const modalRef = useRef(null);
  const { note, noteDispatch } = useNote(modalNote);
  const noteData = useMemo(
    () => ({
      note,
      noteDispatch,
    }),
    [note, noteDispatch]
  );

  const handleClick = useCallback(() => {
    alert('functionality will be added soon');
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
  const handlePin = useCallback(
    (event: any) => {
      event.preventDefault();
      noteDispatch({ type: 'pin-change', payload: {} });
    },
    [noteDispatch]
  );

  const handleClose = useCallback(
    (event: any) => {
      event.preventDefault();
      console.log('modal note modified the note to', note);
      noteListDispatch({ type: 'update-note', payload: note });
      modalNoteDispatch({ type: 'update', payload: note });
      toggleModal();
    },
    [note, noteListDispatch, toggleModal]
  );

  const handleTitle = useCallback(
    (event: any) => {
      noteDispatch({ type: 'title-update', payload: event.target.value });
    },
    [noteDispatch]
  );

  const handleBody = useCallback(
    (event: any) => {
      noteDispatch({ type: 'body-update', payload: event.target.value });
    },
    [noteDispatch]
  );

  useEffect(() => {
    function handleClickOutside(event: any) {
      //@ts-ignore
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose(event);
      }
    }

    document.addEventListener('click', handleClickOutside, true);
    return () => document.removeEventListener('click', handleClickOutside, true);
  }, [handleClose]);

  return (
    <div className="fixed inset-0 h-full w-full bg-modal-backdrop modal-note-container">
      <form
        id="modal-note"
        ref={modalRef}
        className="absolute inset-0 m-auto w-150 h-fit min-h-100 bg-white flex flex-col px-4 pt-4 pb-3 rounded-lg modal-note"
        style={{ backgroundColor: note.backgroundColor }}
      >
        <div className="flex h-10 text-1.5xl modal-title">
          <input
            className="grow bg-transparent outline-none px-2 modal-input"
            placeholder="Title"
            value={note.title}
            onChange={handleTitle}
          />
          <button
            className="h-full aspect-square hover:rounded-full hover:bg-hover-color modal-pin"
            onClick={handlePin}
          >
            {note.pinned ? (
              <Image src={UNPINICON.src} alt={UNPINICON.name} width={24} height={24} />
            ) : (
              <Image src={PINICON.src} alt={PINICON.name} width={24} height={24} />
            )}
          </button>
        </div>
        <textarea
          className="grow bg-transparent outline-none resize-none py-5 px-2 modal-body"
          placeholder="Take a note..."
          value={note.body}
          onChange={handleBody}
        />

        <div className="flex h-10">
          <ActionMenu
            className="flex h-full gap-8 items-center modal-bottom-icons"
            defaultClass="h-full aspect-square hover:bg-hover-color hover:rounded-full modal-icon"
            iconHeight={20}
            actionButtonList={iconList}
          />
          <button
            onClick={handleClose}
            className="ml-auto h-full w-20 hover:bg-hover-color hover:rounded-lg modal-close"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
}
