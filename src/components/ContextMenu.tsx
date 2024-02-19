import { useEffect, useState } from 'react';
import { Flipped, Flipper } from 'react-flip-toolkit';
import { guessWaldo } from '../fetch/fetchFunctions';
import { AxiosResponse } from 'axios';

function ContextMenu({
  guessCoords,
  clickPosition,
  handleCloseMenu,
  characters,
}: {
  guessCoords: { x: number; y: number };
  clickPosition: { x: number; y: number };
  handleCloseMenu: (
    correct: boolean,
    win: boolean,
    value: string,
    error?: string
  ) => void;
  characters: {
    [k: string]: boolean;
  };
}) {
  const [menuPosition, setMenuPosition] = useState({
    x: clickPosition.x + scrollX,
    y: clickPosition.y + scrollY + 20, // + 20 animates menu upward on click
    hidden: true,
  });

  const checkCoords = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const response:
      | AxiosResponse<{ correct: boolean; win: boolean }>
      | undefined = await guessWaldo(
      guessCoords,
      (e.target as HTMLButtonElement).value
    );
    console.log(response);
    if (!response) {
      return handleCloseMenu(
        false,
        false,
        (e.target as HTMLButtonElement).value,
        'Server error!'
      );
    }
    handleCloseMenu(
      response.data.correct,
      response.data.win,
      (e.target as HTMLButtonElement).value
    );
  };

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

      // if context menu will be offscreen, reset position.value to nearest
      // value that will contain the full width/height of the context menu,
      // then add scrollValue. Else, just add scrollValue to initial click
      // position.
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
            <div key={key} className='flex items-center gap-2 w-full'>
              <img
                className='sm:w-8 sm:h-8 w-6 h-6 aspect-square'
                src={`${key.toLowerCase()}.jpg`}
              />
              <button
                onClick={checkCoords}
                value={key}
                className='w-full sm:text-base text-sm bg-sky-400/10 text-sky-400 py-1 px-4 rounded-full'
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
