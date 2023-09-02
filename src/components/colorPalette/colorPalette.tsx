import { useCallback, useRef, useState } from 'react';

const colorList = [
  { name: 'default', code: '#FFFFFF' },
  { name: 'coral', code: '#FF7F50' },
  { name: 'peach', code: '#FFDAB9' },
  { name: 'sand', code: '#F4A460' },
  { name: 'mint', code: '#e2f6d3' },
  { name: 'sage', code: '#b4ddd3' },
  { name: 'fog', code: '#d4e4ed' },
  { name: 'storm', code: '#aeccdc' },
  { name: 'dusk', code: '#d3bfdb' },
  { name: 'blossom', code: '#f6e2dd' },
];
// @ts-ignore
export default function ColorPalette({ className, noteData }) {
  const { note, noteDispatch } = noteData;
  const [hovered, setHovered] = useState(false);
  const [currentColor, setCurrentColor] = useState(note.backgroundColor);
  const ref = useRef(null);
  const handleClick = useCallback(
    (color: any) => {
      setHovered(true);
      noteDispatch({ type: 'bg-update', payload: color });
    },
    [noteDispatch]
  );

  const handleEntry = useCallback((color: any) => {
    setHovered(true);
    setCurrentColor(color);
  }, []);

  const handleExit = useCallback(() => setHovered(false), []);
  return (
    <div className={className} ref={ref}>
      {colorList.map((color: any) => {
        return (
          <div
            key={`color-${color.name}`}
            className={`relative h-full aspect-square flex items-center justify-center ${
              color.code === note.backgroundColor ? 'border-2 border-purple-500 ' : 'border border-gray-300 '
            }rounded-full cursor-pointer color-icon`}
            style={{ backgroundColor: color.code }}
            onClick={() => handleClick(color.code)}
            onMouseEnter={() => handleEntry(color.code)}
            onMouseLeave={handleExit}
          >
            {hovered && currentColor === color.code && (
              <div className="absolute -bottom-4 bg-gray-900 text-white z-20 min-w-fit text-xs px-1 rounded color-label">
                {color.name}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
