function NavBar({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav id='nav'>
        <span id='logo-home'>Where's Waldo</span>
        {children}
      </nav>
    </>
  );
}

export default NavBar;
