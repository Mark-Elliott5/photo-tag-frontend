function NavBar({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav
        id='nav'
        className='sticky top-0 flex gap-7 items-center px-4 py-3 bg-slate-800 bg-opacity-90 backdrop-blur-2xl border-b border-slate-50/5'
      >
        <span className='text-2xl cursor-pointer search-party'>
          Search Party!
        </span>
        {children}
      </nav>
    </>
  );
}

export default NavBar;
