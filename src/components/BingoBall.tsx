import React from 'react';

interface BingoBallProps {
  number: number;
  letter: string;
}

const getColorByLetter = (letter: string): string => {
  switch (letter) {
    case 'B':
      return 'bg-blue-500 text-white shadow-3d';
    case 'I':
      return 'bg-red-500 text-white shadow-3d';
    case 'N':
      return 'bg-gray-300 text-black shadow-3d';
    case 'G':
      return 'bg-green-500 text-white shadow-3d';
    case 'O':
      return 'bg-yellow-500 text-black shadow-3d';
    default:
      return 'bg-gray-500 text-white';
  }
};

const BingoBall: React.FC<BingoBallProps> = ({ number, letter }) => {
  const colorClasses = getColorByLetter(letter);

  return (
    <div className={`w-16 h-16 flex justify-center items-center rounded-lg border-2 ${colorClasses}`}>
      {letter}{number}
    </div>
  );
};

export default BingoBall;
