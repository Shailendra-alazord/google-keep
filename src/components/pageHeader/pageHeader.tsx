import './pageHeader.css';
import PageHeaderCenter from '@/components/pageHeaderCenter/pageHeaderCenter';
import PageHeaderLeft from '@/components/pageHeaderLeft/pageHeaderLeft';
import PageHeaderRight from '@/components/pageHeaderRight/pageHeaderRight';

// @ts-ignore
export default function PageHeader({ className, toggleMenu, updateQuery }) {
  return (
    <div className={className}>
      <PageHeaderLeft
        className=" flex items-center gap-5 h-full w-60 py-1 px-3 page-header-left"
        toggleMenu={toggleMenu}
      />
      <PageHeaderCenter className="grow flex items-center gap-5 h-full page-header-center" updateQuery={updateQuery} />
      <PageHeaderRight className=" flex items-center justify-center gap-5 h-full w-36 py-1 px-3 page-header-right" />
    </div>
  );
}
