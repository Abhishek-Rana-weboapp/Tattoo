
export default function Modal({ children }) {
  
  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-30 p-2'>
      <div className='w-full md:w-1/2 bg-white flex flex-col items-center gap-2 p-2 rounded-lg '>
        {children}
      </div>
    </div>
  );
}
