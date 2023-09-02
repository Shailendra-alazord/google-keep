// @ts-ignore
import PageBodyLeft from '@/components/pageBodyLeft/pageBodyLeft';
import PageBodyRight from '@/components/pageBodyRight/pageBodyRight';
import './pageBody.css';

// @ts-ignore
export default function PageBody({ className, menuOpen, query }) {
  return (
    <div className={className}>
      <PageBodyLeft className="min-h-full-vh page-body-left" menuOpen={menuOpen} />
      <PageBodyRight className="grow flex flex-col min-h-full-vh p-8 page-body-right" query={query} />
    </div>
  );
}
