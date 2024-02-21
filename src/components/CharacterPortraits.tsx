function CharacterPortraits({
  characters,
}: {
  characters: { [k: string]: boolean };
}) {
  return (
    <div className='animate-fade sticky bottom-0 flex flex-row py-1 justify-center text-center gap-2 bg-slate-800 border border-slate-50/5 bg-opacity-80 backdrop-blur-2xl'>
      {Object.keys(characters).map((key) =>
        characters[key] ? (
          <img
            key={key}
            title={key}
            className='sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 w-6 h-6 aspect-square hover:scale-200 hover:-translate-y-5 hover:z-10 active:scale-200'
            src={`${key.toLowerCase()}.jpg`}
          />
        ) : undefined
      )}
    </div>
  );
}

export default CharacterPortraits;
