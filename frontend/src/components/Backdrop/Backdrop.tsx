import * as React from 'react';

export interface IBackdropProps {
  closeMovieDetail: () => void;
  onClick: () => void;
}

const Backdrop: React.FC<IBackdropProps> = ({closeMovieDetail }) => {
  return (
    <div onClick={closeMovieDetail}>
      <div className='absolute top-0 left-0 w-full z-40 h-full bg-neutral-900/85'>
      </div>
    </div>
  );
}

export default Backdrop;
