'use client';
// @ts-ignore
import MainHeader from '@/components/mainHeader/mainHeader';
import MainBody from '@/components/mainBody/mainBody';
import './pageBodyRight.css';
import {useContext, useMemo} from 'react';
import {DisplayContext} from '@/providers/displayProvider';
import useNoteList from '@/utils/useNoteList';

// @ts-ignore
export default function PageBodyRight({ className, query }) {
  // @ts-ignore
  const { noteList, noteListDispatch } = useNoteList();
  // @ts-ignore
  const { searchMode } = useContext(DisplayContext);
  const noteListData = useMemo(
    () => ({
      noteList,
      noteListDispatch,
    }),
    [noteList, noteListDispatch]
  );

  return (
    <div className={className}>
      {!searchMode && (
        <MainHeader className="flex items-center justify-center main-header" noteListData={noteListData} />
      )}
      <MainBody className="grow main-body" noteListData={noteListData} query={query} />
    </div>
  );
}
