'use client';
// @ts-ignore
import {LEFTPANEICONS} from '@/utils/constants';
import Image from 'next/image';
import './pageBodyLeft.css';
import {useCallback} from 'react'; // @ts-ignore

// @ts-ignore
export default function PageBodyLeft({ className, menuOpen }) {
  const handleClick = useCallback(() => {
    alert('functionality will be added soon');
  }, []);

  return (
    <div className={className}>
      <div className="sticky top-16 flex flex-col pt-2 w-fit hover:cursor-pointer left-pane-icons-container">
        {LEFTPANEICONS.map((icon: any) => {
          return (
            <div
              key={'left-pane-icon' + icon.name}
              className="h-12 rounded-r-3xl hover:bg-hover-color left-pane-icon-container flex pl-5"
              style={{ backgroundColor: `${icon.name === 'notes' && '#feefc3'}` }}
              onClick={handleClick}
            >
              <div className={'flex item-center justify-center h-full aspect-square left-pane-icon ' + icon.name}>
                <Image src={icon.src} alt={icon.name} width={24} height={24} />
              </div>
              {menuOpen && (
                <div className="flex items-center grow pl-5 text-sm font-medium w-56 left-pane-icon-label">
                  {icon.label}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="dummy div"></div>
    </div>
  );
}
