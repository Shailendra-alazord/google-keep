import {DEFAULTNOTE} from '@/utils/constants';
import {useReducer} from 'react';

//@ts-ignore
function noteReducer(note, { type, payload }) {
  switch (type) {
    case 'title-update':
      return { ...note, title: payload };
    case 'body-update':
      return { ...note, body: payload };
    case 'pin-change':
      return { ...note, pinned: !note.pinned };
    case 'bg-update':
      return { ...note, backgroundColor: payload };
    case 'update':
      return payload;
    default:
      throw new Error('Error called in noteDispatch');
  }
}

export default function useNote(initialNote = DEFAULTNOTE) {
  // @ts-ignore
  const [note, dispatch] = useReducer(noteReducer, initialNote);
  return { note, noteDispatch: dispatch };
}
