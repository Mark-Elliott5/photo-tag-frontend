function NavBar({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav id='nav' className='flex gap-7 items-center ml-4 mr-4'>
        <span id='logo-home'>Where's Waldo</span>
        {children}
      </nav>
    </>
  );
}

export default NavBar;
