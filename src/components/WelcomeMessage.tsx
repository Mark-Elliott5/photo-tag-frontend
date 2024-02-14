function WelcomeMessage() {
  return (
    <div
      className='fixed text-center text-sky-400 px-5 py-7 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-800 border border-slate-50/5 bg-opacity-80 backdrop-blur-2xl rounded-2xl'
      id='welcome'
    >
      <p className='text-2xl font-extrabold mb-2'>
        Welcome to{' '}
        <span className='search-party text-white'>Search Party!</span>
      </p>
      <p>There are five characters for you to find from various franchises.</p>
      <p>
        Find and click all five to get a chance to put your name and time on the
        leaderboard!
      </p>
      <p>
        Click the <span className='font-extrabold text-lg'>Start</span> button
        at the top to begin.
      </p>
    </div>
  );
}

export default WelcomeMessage;
