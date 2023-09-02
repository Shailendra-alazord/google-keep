// @ts-ignore
import Image from 'next/image';
import {BRUSHICON, CHECKBOXICON, PHOTOICON} from '@/utils/constants'; // @ts-ignore
import './noteMaker.css'; // @ts-ignore

// @ts-ignore
export default function NoteMaker({ className, toggleFocus }) {
  return (
    <div className={className} onClick={toggleFocus}>
      <input className="grow outline-none placeholder-default note-maker-title" placeholder="Take a note..." />
      <button className="h-full aspect-square hover:rounded-full note-maker-icon">
        <Image src={CHECKBOXICON.src} alt={CHECKBOXICON.name} width={24} height={24} />
      </button>
      <button className="h-full aspect-square hover:rounded-full note-maker-icon">
        <Image src={BRUSHICON.src} alt={BRUSHICON.name} width={24} height={24} />
      </button>
      <button className="h-full aspect-square hover:rounded-full note-maker-icon">
        <Image src={PHOTOICON.src} alt={PHOTOICON.name} width={24} height={24} />
      </button>
    </div>
  );
}
