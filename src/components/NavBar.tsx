function NavBar({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav
        id='nav'
        className='flex z-10 items-center sm:px-4 sm:py-3 px-3 py-2 justify-between sticky top-0 bg-slate-800 bg-opacity-90 backdrop-blur-2xl border-b border-slate-50/5'
      >
        <div className='flex sm:gap-7 gap-3 items-center'>
          <span className='sm:text-2xl cursor-pointer search-party'>
            Search Party!
          </span>
          {children}
        </div>
        <a href='https://github.com/Mark-Elliott5'>
          <img
            src='./github-mark-white.png'
            className='github-link sm:w-6 w-4'
          />
        </a>
      </nav>
    </>
  );
}

export default NavBar;
