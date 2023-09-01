import './pageHeaderLeft.css';
import Image from 'next/image';
import {MENUICON} from '@/utils/constants'; // @ts-ignore
// @ts-ignore
export default function PageHeaderLeft({ className, toggleMenu }) {
  return (
    <div className={className}>
      <div
        className="flex items-center justify-center h-full aspect-square hover:bg-hover-color hover:rounded-full menu-icon"
        onClick={toggleMenu}
      >
        <Image src={MENUICON.src} alt={MENUICON.name} width={24} height={24} />
      </div>
      <div className="flex items-center gap-3 grow title-container">
        <button className="h-full aspect-square keep-logo">
          <Image src={'/keep_logo.svg'} alt={'Keep Logo'} width={28} height={28} />
        </button>
        <div className="flex items-center h-6 page-title">Keep</div>
      </div>
    </div>
  );
}
