function WelcomeMessage() {
  return (
    <div
      className='animate-fade fixed text-center text-white sm:px-5 sm:py-7 px-4 py-6 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-800 border border-slate-50/5 bg-opacity-80 backdrop-blur-2xl rounded-2xl'
      id='welcome'
    >
      <p className='sm:text-2xl text-xl font-extrabold mb-2 text-sky-400'>
        Welcome to
        <span className='search-party text-white'> Search Party!</span>
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
