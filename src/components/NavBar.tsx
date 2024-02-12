function NavBar({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav
        id='nav'
        className='sticky top-0 flex gap-7 items-center px-4 py-3 bg-slate-900 bg-opacity-60 backdrop-blur border-b border-slate-50/5'
      >
        <span id='logo-home'>Search Party</span>
        {children}
      </nav>
    </>
  );
}

export default NavBar;
