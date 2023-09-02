import Note from '@/components/note/note'; // @ts-ignore
import './notesLayout.css';
import filterNoteList from '@/utils/filterNoteList';
// @ts-ignore
export default function NotesLayout({ className, noteListData, toggleModal, modalNoteDispatch, layoutMode, query }) {
  const { noteList } = noteListData;
  const filteredList = filterNoteList(noteList, query);
  const noteListPinned = filteredList.filter((note: { pinned: any }) => note.pinned);
  const noteListOthers = filteredList.filter((note: { pinned: any }) => !note.pinned);
  console.log('notelist pinned changed', noteListPinned);
  const handleClick = (note: any) => {
    console.log('modal note set to', note);
    toggleModal();
    modalNoteDispatch({ type: 'update', payload: note });
  };
  console.log('check noteList data', noteListData);
  return (
    <div className={className}>
      {noteListPinned.length > 0 && (
        <>
          {layoutMode === 'GRID' && <div className="p-2 container-label">PINNED</div>}
          <div
            className={`p-2 ${
              layoutMode === 'GRID' ? 'flex gap-5 flex-wrap mb-10' : 'flex flex-col gap-4 w-max mb-20 mx-auto'
            } notes-container`}
          >
            {layoutMode !== 'GRID' && <div className="container-label pl-3">PINNED</div>}
            {noteListPinned.map((note: any) => {
              return (
                <Note
                  key={note.id}
                  note={note}
                  noteListData={noteListData}
                  className={`${
                    layoutMode === 'GRID'
                      ? 'flex flex-col w-60 pt-3 pb-2 px-3 border border-gray-300 rounded-lg text-sm'
                      : 'flex justify-start flex-col gap-5 w-150 min-h-40 px-3 pt-3 pb-2 border border-gray-300 rounded-lg text-sm'
                  } note-container `}
                  toggleModalNote={handleClick}
                  layoutMode={layoutMode}
                />
              );
            })}
          </div>
        </>
      )}
      {noteListOthers.length > 0 && (
        <>
          {layoutMode === 'GRID' && <div className="p-2 container-label">OTHERS</div>}
          <div
            className={`p-2 ${
              layoutMode === 'GRID' ? 'flex gap-5 flex-wrap mb-10' : 'flex flex-col gap-4 w-max mb-20 mx-auto'
            } notes-container`}
          >
            {layoutMode !== 'GRID' && <div className="container-label pl-3">OTHERS</div>}
            {noteListOthers.map((note: any) => {
              return (
                <Note
                  key={note.id}
                  note={note}
                  noteListData={noteListData}
                  className={`${
                    layoutMode === 'GRID'
                      ? 'flex flex-col w-60 pt-3 pb-2 px-3 border border-gray-300 rounded-lg text-sm'
                      : 'flex justify-start flex-col gap-5 w-150 min-h-40 px-3 pt-3 pb-2 border border-gray-300 rounded-lg text-sm'
                  } note-container`}
                  toggleModalNote={handleClick}
                  layoutMode={layoutMode}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
