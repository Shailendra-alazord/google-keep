import './pageHeaderRight.css';
import Image from 'next/image';
import {APPSICON, PROFILEICON} from '@/utils/constants'; // @ts-ignore
//
export default function PageHeaderRight({ className }) {
  return (
    <div className={className}>
      <button className="btn apps">
        <Image src={APPSICON.src} alt={APPSICON.name} width={24} height={24} />
      </button>
      <button className="btn profile">
        <Image src={PROFILEICON.src} alt={PROFILEICON.name} width={24} height={24} />
      </button>
    </div>
  );
}
