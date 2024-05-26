function NavBar({
  children,
  guessColor,
}: {
  children: React.ReactNode;
  guessColor: 'red' | 'green' | undefined;
}) {
  return (
    <>
      <nav
        id='nav'
        className={`animate-fade shadow-outline flex z-10 items-center sm:px-4 sm:py-3 px-3 py-2 justify-between sticky top-0 ${guessColor === 'red' ? 'bg-red-800' : guessColor === 'green' ? 'bg-green-800' : 'bg-slate-800'} ${guessColor ? 'bg-opacity-95' : 'bg-opacity-90'} backdrop-blur-2xl border-b border-slate-50/5 transition-colors`}
      >
        <div className='flex sm:gap-7 bg-re gap-3 items-center'>
          <span className='sm:text-2xl select-none cursor-pointer search-party'>
            Search Party!
          </span>
          {children}
        </div>
        {/* <a href='https://github.com/Mark-Elliott5'>
          <img
            src='./github-mark-white.png'
            className='github-link sm:w-6 w-4'
          />
        </a> */}
      </nav>
    </>
  );
}

export default NavBar;
