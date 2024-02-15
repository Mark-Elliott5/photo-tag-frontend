import { useEffect, useState } from 'react';
import { Flipped, Flipper } from 'react-flip-toolkit';

function ContextMenu({
  clickPosition,
  handleCloseMenu,
  characters,
}: {
  clickPosition: { x: number; y: number };
  handleCloseMenu: (e: React.MouseEvent<HTMLButtonElement>) => void;
  characters: {
    [k: string]: boolean;
  };
}) {
  const [menuPosition, setMenuPosition] = useState({
    x: clickPosition.x + scrollX,
    y: clickPosition.y + scrollY,
    hidden: true,
  });

  useEffect(() => {
    const { x, y } = clickPosition;
    const position = {
      y: y,
      x: x,
      hidden: false,
    };
    const menuElement = document.getElementById('context-menu');

    if (menuElement) {
      const rect = menuElement.getBoundingClientRect();

      const innerWidth = window.innerWidth;
      const innerHeight = window.innerHeight;

      if (rect.width + x > innerWidth) {
        position.x = innerWidth - rect.width * 1.25;
      }

      if (rect.height + y > innerHeight) {
        position.y = innerHeight - rect.height * 1.25;
      }

      position.x += window.scrollX;
      position.y += window.scrollY;

      setMenuPosition(position);
    }
  }, [clickPosition]);

  // implement changing characters to find per pageload in future

  return (
    <Flipper flipKey={menuPosition} spring={{ stiffness: 600, damping: 50 }}>
      <Flipped flipId='square'>
        <div
          id='context-menu'
          style={{
            visibility: menuPosition.hidden ? 'hidden' : undefined,
            position: 'absolute',
            top: menuPosition.y,
            left: menuPosition.x,
          }}
          className='flex flex-col items-center px-4 py-3 bg-slate-800 border border-slate-50/5 bg-opacity-80 backdrop-blur-2xl gap-2 rounded-2xl'
        >
          {Object.keys(characters).map((key) => (
            <div key={key} className='flex items-center gap-2'>
              <img
                className='sm:w-8 sm:h-8 w-6 h-6 aspect-square'
                src={`../public/${key}.jpg`}
              />
              <button
                onClick={handleCloseMenu}
                value={key}
                className='min-w-32 sm:text-base text-sm bg-sky-400/10 text-sky-400 py-1 px-4 rounded-full'
              >
                {key}
              </button>
            </div>
          ))}
        </div>
      </Flipped>
    </Flipper>
  );
}

export default ContextMenu;
