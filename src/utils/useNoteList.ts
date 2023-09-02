import {useReducer} from 'react'; // @ts-ignore

// @ts-ignore
function noteListReducer(state: any, { type, payload }) {
  let newState = [...state];
  switch (type) {
    case 'add-note':
      newState = [payload, ...state];
      break;
    case 'delete-note':
      newState = state.filter((note: any) => {
        return note.id !== payload.id;
      });
      break;
    case 'update-note':
      newState = state.map((note: any) => (note.id === payload.id ? payload : note));
      break;
    case 'toggle-pin':
      newState = state.map((note: any) => {
        return note.id === payload.id ? { ...note, pinned: !note.pinned } : note;
      });
      break;
    case 'change-color':
      newState = state.map((note: any) => {
        return note.id === payload.id ? { ...note, backgroundColor: payload.backgroundColor } : note;
      });
      break;
    default:
      throw new Error('Error in dispatch function');
  }
  localStorage.setItem('noteList', JSON.stringify(newState));
  return newState;
}

export default function useNoteList() {
  // @ts-ignore
  const [state, dispatch] = useReducer(noteListReducer, JSON.parse(localStorage.getItem('noteList')) ?? []);
  return { noteList: state, noteListDispatch: dispatch };
}
