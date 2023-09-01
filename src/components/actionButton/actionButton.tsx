// @ts-ignore
import Image from 'next/image';
import {useCallback, useState} from 'react'; // @ts-ignore

// @ts-ignore
export default function ActionButton({ icon, handleAction, className, childComponent, iconHeight }) {
  const [clicked, setClicked] = useState(false);
  const handleClick = useCallback(
    (event: any) => {
      handleAction(icon.name);
      setClicked(!clicked);
      console.log('clicked');
      event.preventDefault();
    },
    [handleAction, clicked, icon.name]
  );

  return (
    <div className="relative h-full flex items-center justify-center p-0.5">
      <button className={className + ' ' + icon.name} onClick={handleClick}>
        <Image src={icon.src} alt={icon.name} width={iconHeight} height={iconHeight} />
      </button>
      {clicked && childComponent()}
    </div>
  );
}
