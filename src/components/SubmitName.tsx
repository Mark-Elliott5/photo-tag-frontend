import { useState } from 'react';
import { submitName } from '../fetch/fetchFunctions';

function SubmitName({
  handleCloseSubmitName,
}: {
  handleCloseSubmitName: () => void;
}) {
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [nameError, setNameError] = useState(false);

  const sendName = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNameError(false);
    setLoadingSpinner(true);
    const name = new FormData(e.currentTarget).get('name');
    try {
      if (!name) {
        throw new Error('No name supplied to submitName');
      }
      const response = await submitName(name as string);
      if (!response.data || !response.data.accepted) {
        throw new Error(`Name rejected`);
      }
      handleCloseSubmitName();
    } catch (err) {
      console.error('submitName error: ' + err);
      setNameError(true);
    }
    setLoadingSpinner(false);
  };

  return (
    <div className='animate-fade fixed w-full h-full'>
      <div
        className='text-center text-white px-3 py-3 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-800 border border-slate-50/5 bg-opacity-80 backdrop-blur-2xl rounded-2xl'
        id='submit-name-wrapper'
      >
        {loadingSpinner ? (
          <p>Loading</p>
        ) : (
          <>
            {nameError ? (
              <p className='mb-2 font-bold'>
                There was an error accepting your name. Please try again.
              </p>
            ) : (
              <p className='mb-2 font-bold'>Submit your name!</p>
            )}

            <form
              className='flex flex-col items-center justify-center gap-2'
              onSubmit={sendName}
            >
              <input
                minLength={1}
                maxLength={20}
                required
                name='name'
                type='text'
                className='w-full'
              ></input>
              <div className='flex w-full justify-between'>
                <button
                  className='bg-red-500/10 text-red-500 py-1 hover:border-red-500 focus:outline-4 focus:outline-red-500 px-4 rounded-full'
                  type='button'
                  onClick={handleCloseSubmitName}
                >
                  Skip
                </button>
                <button
                  className='bg-sky-400/10 text-sky-400 py-1 px-4 rounded-full hover:border-sky-400 focus:outline-4 focus:outline-sky-400'
                  type='submit'
                >
                  Submit
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default SubmitName;
