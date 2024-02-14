import { useState } from 'react';
import { submitName } from '../fetch/fetchFunctions';

function SubmitName({
  setSubmitNameVisible,
}: {
  setSubmitNameVisible: (bool: boolean) => void;
}) {
  const [loadingSpinner, setLoadingSpinner] = useState(false);

  const handleSubmitName = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingSpinner(true);
    const name = new FormData(e.currentTarget).get('name');
    try {
      if (!name) {
        throw new Error('No name supplied to submitName');
      }
      const response = await submitName(name as string);
      if (!response || response.status !== 200) {
        throw new Error(`submitName failed`);
      }
      setSubmitNameVisible(true);
      console.log('submitName attempt');
    } catch (err) {
      setLoadingSpinner(false);
      console.log(err);
    }
  };

  return (
    <div className='fixed w-full h-full'>
      <div
        className='text-center text-sky-400 px-3 py-3 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-800 border border-slate-50/5 bg-opacity-80 backdrop-blur-2xl rounded-2xl'
        id='submit-name-wrapper'
      >
        {loadingSpinner ? (
          <div>Loading Spinner here</div>
        ) : (
          <>
            <p className='mb-2 font-bold'>Submit your name!</p>
            <form
              className='flex flex-col items-center justify-center gap-2'
              onSubmit={handleSubmitName}
            >
              <input minLength={1} required name='name' type='text'></input>
              <button
                className='bg-sky-400/10 py-1 px-4 rounded-full'
                type='submit'
              >
                Submit
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default SubmitName;
