//@ts-ignore
import ActionButton from '@/components/actionButton/actionButton';
import {useState} from 'react';

// @ts-ignore
export default function ActionMenu({ className, actionButtonList, defaultClass, iconHeight }) {
  const [activeButton, setActiveButton] = useState('DEFAULT');
  return (
    <div className={className}>
      {actionButtonList.map((actionButton: any) => (
        <ActionButton
          key={'icon-' + actionButton.icon.name}
          className={`${defaultClass} ${actionButton.className}`}
          icon={actionButton.icon}
          handleAction={actionButton.handleAction}
          childComponent={actionButton.childComponent}
          iconHeight={iconHeight}
          activeButton={activeButton}
          setActiveButton={setActiveButton}
        />
      ))}
    </div>
  );
}
