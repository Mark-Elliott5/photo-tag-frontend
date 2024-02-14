import { useEffect, useState } from 'react';

function ContextMenu({
  clickPosition,
  handleCloseMenu,
}: {
  clickPosition: { x: number; y: number };
  handleCloseMenu: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  const [menuPosition, setMenuPosition] = useState({
    x: 0,
    y: 0,
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

  // implement react-flip-toolkit later?

  return (
    <div
      id='context-menu'
      style={{
        visibility: menuPosition.hidden ? 'hidden' : undefined,
        position: 'absolute',
        top: menuPosition.y,
        left: menuPosition.x,
      }}
      className='flex flex-col items-center px-4 py-3 bg-slate-800 border border-slate-50/5 bg-opacity-80 backdrop-blur gap-2 rounded-2xl'
    >
      <button
        onClick={handleCloseMenu}
        value='AmongUs'
        className='bg-sky-400/10 text-sky-400 py-1 px-4 rounded-full'
      >
        Among Us
      </button>
      <button
        onClick={handleCloseMenu}
        value='GMan'
        className='bg-sky-400/10 text-sky-400 py-1 px-4 rounded-full'
      >
        G-Man
      </button>
      <button
        onClick={handleCloseMenu}
        value='Aang'
        className='bg-sky-400/10 text-sky-400 py-1 px-4 rounded-full'
      >
        Aang
      </button>
      <button
        onClick={handleCloseMenu}
        value='Mikasa'
        className='bg-sky-400/10 text-sky-400 py-1 px-4 rounded-full'
      >
        Mikasa
      </button>
      <button
        onClick={handleCloseMenu}
        value='IceKing'
        className='bg-sky-400/10 text-sky-400 py-1 px-4 rounded-full'
      >
        Ice King
      </button>
    </div>
  );
}

export default ContextMenu;
