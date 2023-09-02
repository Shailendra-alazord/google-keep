// @ts-nocheck
import Image from 'next/image';
import { useCallback, useRef } from 'react'; // @ts-ignore

export default function ActionButton({
  icon,
  handleAction,
  className,
  childComponent,
  iconHeight,
  activeButton,
  setActiveButton,
}) {
  const ref = useRef(null);

  const handleClick = useCallback(
    (event: any) => {
      handleAction(icon.name);
      setActiveButton((prevState: any) => (prevState !== icon.name ? icon.name : 'DEFAULT'));
      console.log('clicked');
      event.preventDefault();
    },
    [handleAction, setActiveButton, icon.name]
  );

  return (
    <div className="relative h-full flex items-center justify-center p-0.5">
      <button className={className + ' ' + icon.name} onClick={handleClick} ref={ref}>
        <Image src={icon.src} alt={icon.name} width={iconHeight} height={iconHeight} />
      </button>
      {activeButton === icon.name && childComponent()}
    </div>
  );
}
