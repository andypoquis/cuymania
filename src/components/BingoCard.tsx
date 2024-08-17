import React from 'react';

interface BingoCardProps {
  markedNumbers: Set<number>;
}

const BingoCard: React.FC<BingoCardProps> = ({ markedNumbers }) => {
  const cardNumbers = [
    [1, 16, 31, 46, 61],
    [2, 17, 32, 47, 62],
    [3, 18, 33, 48, 63],
    [4, 19, 34, 49, 64],
    [5, 20, 35, 50, 65],
    [6, 21, 36, 51, 66],
    [7, 22, 37, 52, 67],
    [8, 23, 38, 53, 68],
    [9, 24, 39, 54, 69],
    [10, 25, 40, 55, 70],
    [11, 26, 41, 56, 71],
    [12, 27, 42, 57, 72],
    [13, 28, 43, 58, 73],
    [14, 29, 44, 59, 74],
    [15, 30, 45, 60, 75]
  ];

  const isRowComplete = (row: (number | string)[]): boolean => {
    return row.every(number => markedNumbers.has(number as number) || number === 'X');
  };

  return (
    <div className="grid grid-cols-5 gap-3 w-80 mx-auto mt-10">
      {['B', 'I', 'N', 'G', 'O'].map((letter) => (
        <div key={letter} className="w-16 h-16 flex justify-center items-center rounded-lg bg-secondary-dark text-highlight font-bold shadow-3d">
          {letter}
        </div>
      ))}
      {cardNumbers.map((row, rowIndex) => {
        const rowComplete = isRowComplete(row);
        return row.map((number, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`w-16 h-16 flex justify-center items-center rounded-lg shadow-3d ${
              rowComplete ? 'bg-highlight text-primary-dark' : markedNumbers.has(number as number) ? 'bg-purple-500 text-white' : 'bg-secondary-dark text-white'
            }`}
          >
            {number}
          </div>
        ));
      })}
    </div>
  );
};

export default BingoCard;
