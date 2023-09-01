'use client';
import './pageLayout.css';
import PageBody from '@/components/pageBody/pageBody';
import PageHeader from '@/components/pageHeader/pageHeader';
import DisplayProvider from '@/providers/displayProvider';
import { useCallback, useState } from 'react';

export default function PageLayout() {
  const [menuOpen, setMenuOpen] = useState(true);
  const [query, setQuery] = useState('');

  const toggleMenu = useCallback(() => {
    setMenuOpen(prevState => !prevState);
  }, []);

  const updateQuery = useCallback((data: string) => {
    setQuery(data);
  }, []);

  return (
    <div className="flex flex-col h-full page-layout">
      <DisplayProvider>
        <PageHeader
          className="fixed w-full flex justify-between items-center h-16 py-2 px-3 bg-white border-b border-gray-300 page-header"
          toggleMenu={toggleMenu}
          updateQuery={updateQuery}
        />
        <PageBody className="flex h-full mt-16 page-body" menuOpen={menuOpen} query={query} />
      </DisplayProvider>
    </div>
  );
}
