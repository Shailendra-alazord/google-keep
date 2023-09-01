import './note.css';
import {
  ALERTICON,
  ARCHIVEICON,
  COLLABORATORICON,
  DELETEICON,
  PALETTEICON,
  PHOTOICON,
  PINICON,
  UNPINICON,
} from '@/utils/constants';
import ActionButton from '@/components/actionButton/actionButton';
import { useCallback, useMemo, useState } from 'react';
import ActionMenu from '@/components/actionMenu/actionMenu';
import ColorPalette from '@/components/colorPalette/colorPalette';
import useNote from '@/utils/useNote';

const bottomIcons = [ALERTICON, COLLABORATORICON, PALETTEICON, PHOTOICON, ARCHIVEICON, DELETEICON];
// @ts-ignore
export default function Note({ note, noteListData, className, toggleModalNote, layoutMode }) {
  const { noteListDispatch } = noteListData;
  const { note: currentNote, noteDispatch: currentNoteDispatch } = useNote(note);
  //@ts-ignore
  const [hovered, setHovered] = useState(false);

  const noteData = useMemo(
    () => ({ note: currentNote, noteDispatch: currentNoteDispatch }),
    [currentNote, currentNoteDispatch]
  );

  const deleteNote = useCallback(() => {
    noteListDispatch({ type: 'delete-note', payload: currentNote });
  }, [currentNote, noteListDispatch]);

  const togglePin = useCallback(() => {
    noteListDispatch({ type: 'toggle-pin', payload: currentNote });
  }, [currentNote, noteListDispatch]);

  const handleAction = useCallback(
    (icon: string) => {
      switch (icon) {
        case 'pin':
          togglePin();
          break;
        case 'unpin':
          togglePin();
          break;
        case 'delete':
          deleteNote();
          break;
        default:
          alert('associated function to be added soon');
      }
    },
    [deleteNote, togglePin]
  );

  const handleClick = useCallback(() => {
    toggleModalNote(currentNote);
  }, [currentNote, toggleModalNote]);

  const toggleHover = useCallback(() => {
    setHovered(!hovered);
  }, [hovered]);

  const iconList = useMemo(
    () => [
      {
        icon: ALERTICON,
        className: '',
        handleAction: () => {},
        childComponent: () => {},
      },
      {
        icon: COLLABORATORICON,
        className: '',
        handleAction: () => {},
        childComponent: () => {},
      },
      {
        icon: PALETTEICON,
        className: '',
        handleAction: () => {},
        childComponent: () => (
          <ColorPalette
            // absolute -left-8 top-8 flex gap-1 h-12 p-2 border bg-white z-10 rounded-lg color-palette-note-maker
            className="absolute -left-8 top-8 flex gap-1 h-12 p-2 border bg-white z-10 rounded-lg color-palette-note-maker"
            noteData={noteData}
          />
        ),
      },
      {
        icon: PHOTOICON,
        className: '',
        handleAction: () => {},
        childComponent: () => {},
      },
      {
        icon: ARCHIVEICON,
        className: '',
        handleAction: () => {},
        childComponent: () => {},
      },
      {
        icon: DELETEICON,
        className: '',
        handleAction: deleteNote,
        childComponent: () => {},
      },
    ],
    [deleteNote, noteData]
  );
  return (
    <pre
      className={className}
      style={{ backgroundColor: currentNote.backgroundColor }}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
    >
      <div className={`flex h-6 note-title`}>
        <div onClick={handleClick} className="flex grow items-center font-medium note-title-label">
          {note.title ?? 'Title'}
        </div>
        {hovered && (
          <ActionButton
            className="flex items-center justify-center h-8 aspect-square hover:rounded-full pin-btn"
            handleAction={handleAction}
            icon={note.pinned ? UNPINICON : PINICON}
            iconHeight={24}
            childComponent={() => {}}
          />
        )}
      </div>
      <div className={`flex grow py-2 note-body`} onClick={handleClick}>
        {note.body}
      </div>
      {hovered ? (
        <ActionMenu
          className={`flex h-8 items-center ${
            layoutMode === 'GRID' ? 'justify-between' : 'justify-start gap-5'
          } note-icon-list`}
          iconHeight={18}
          defaultClass="relative flex item-center justify-center h-full aspect-square hover:rounded-full bottom-icons"
          actionButtonList={iconList}
        />
      ) : (
        <div className="h-8 w-full"></div>
      )}
    </pre>
  );
}
