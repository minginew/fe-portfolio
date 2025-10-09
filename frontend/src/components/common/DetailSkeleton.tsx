const DetailSkeleton = () => {
  return (
    <div className='relative flex h-auto min-h-screen w-full max-w-6xl animate-pulse flex-col justify-center px-8 py-5'>
      <div className='flex h-full w-full flex-col gap-4'>
        <div className='my-3 h-12 w-1/2 rounded bg-gray-200'></div>
        <div className='flex items-center'>
          <span className='h-4 w-32 rounded bg-gray-200'></span>
          <div className='flex w-full gap-2 pl-10'>
            <div className='h-4 w-20 rounded bg-gray-200'></div>
            <div className='h-4 w-4 rounded bg-gray-200'></div>
            <div className='h-4 w-20 rounded bg-gray-200'></div>
          </div>
        </div>
        <div className='flex items-center'>
          <span className='h-4 w-32 rounded bg-gray-200'></span>
          <div className='flex w-full gap-2 pl-10'>
            <div className='h-6 w-16 rounded-2xl bg-gray-200'></div>
            <div className='h-6 w-16 rounded-2xl bg-gray-200'></div>
            <div className='h-6 w-16 rounded-2xl bg-gray-200'></div>
            <div className='h-6 w-16 rounded-2xl bg-gray-200'></div>
          </div>
        </div>
        <div className='flex items-center'>
          <span className='h-4 w-32 rounded bg-gray-200'></span>
          <div className='flex w-full gap-2 pl-10'>
            <div className='h-6 w-16 rounded-2xl bg-gray-200'></div>
            <div className='h-6 w-16 rounded-2xl bg-gray-200'></div>
            <div className='h-6 w-16 rounded-2xl bg-gray-200'></div>
            <div className='h-6 w-16 rounded-2xl bg-gray-200'></div>
          </div>
        </div>
        <div className='mt-3 flex items-center gap-5'>
          <div className='h-8 w-8 rounded-full bg-gray-200'></div>
          <div className='h-7 w-72 rounded bg-gray-200'></div>
        </div>
        <div className='mt-3 border-t border-gray-300 pt-10'>
          <div className='mt-3 flex w-full items-center gap-10'>
            <div className='h-72 w-72 rounded bg-gray-200'></div>
            <div className='flex w-full flex-col gap-5'>
              <div className='h-7 max-w-xl rounded bg-gray-200'></div>
              <div className='h-7 max-w-lg rounded bg-gray-200'></div>
              <div className='h-7 max-w-md rounded bg-gray-200'></div>
              <div className='h-7 max-w-md rounded bg-gray-200'></div>
              <div className='h-24 max-w-xl rounded bg-gray-200'></div>
            </div>
          </div>
          <div className='mt-10 h-52 w-4xl rounded bg-gray-200'></div>
          <div className='mt-10 h-52 w-4xl rounded bg-gray-200'></div>
        </div>
      </div>
    </div>
  );
};

export default DetailSkeleton;
