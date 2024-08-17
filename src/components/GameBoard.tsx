import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import BingoCard from './BingoCard';
import BingoBall from './BingoBall';
import { FaCrown } from 'react-icons/fa';

const GameBoard: React.FC = () => {
  const [calledNumbers, setCalledNumbers] = useState<{ letter: string; number: number; id: string }[]>([]);
  const [markedNumbers, setMarkedNumbers] = useState<Set<number>>(new Set());
  const [balls, setBalls] = useState(
    Array.from({ length: 75 }, (_, i) => {
      const number = i + 1;
      let letter = '';
      if (number <= 15) letter = 'B';
      else if (number <= 30) letter = 'I';
      else if (number <= 45) letter = 'N';
      else if (number <= 60) letter = 'G';
      else letter = 'O';
      return { letter, number, id: uuidv4() };
    })
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [names, setNames] = useState(Array(15).fill(''));
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const drawBall = () => {
    if (balls.length > 0) {
      const randomIndex = Math.floor(Math.random() * balls.length);
      const newBall = balls[randomIndex];
      setCalledNumbers(prev => {
        const newCalledNumbers = [...prev, newBall];
        if (newCalledNumbers.length > 5) {
          newCalledNumbers.shift();
        }
        return newCalledNumbers;
      });
      setMarkedNumbers(prev => new Set(prev).add(newBall.number));
      setBalls(prev => prev.filter((_, index) => index !== randomIndex));
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      clearInterval(intervalRef.current!);
    } else {
      intervalRef.current = setInterval(() => {
        if (balls.length > 0) {
          drawBall();
        }
      }, 150);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current!);
    setIsPlaying(false);
    setCalledNumbers([]);
    setMarkedNumbers(new Set());
    setBalls(
      Array.from({ length: 75 }, (_, i) => {
        const number = i + 1;
        let letter = '';
        if (number <= 15) letter = 'B';
        else if (number <= 30) letter = 'I';
        else if (number <= 45) letter = 'N';
        else if (number <= 60) letter = 'G';
        else letter = 'O';
        return { letter, number, id: uuidv4() };
      })
    );
  };

  const handleNameChange = (index: number, newName: string) => {
    const newNames = [...names];
    newNames[index] = newName;
    setNames(newNames);
  };

  const isRowComplete = (rowNumbers: number[]): boolean => {
    return rowNumbers.every(number => markedNumbers.has(number));
  };

  const calculateRowPercentage = (rowNumbers: number[]): number => {
    const markedCount = rowNumbers.filter(number => markedNumbers.has(number)).length;
    console.log(`Row Numbers: ${rowNumbers}, Marked Count: ${markedCount}`);
    return (markedCount / 5) * 100;
  };

  const sortedRows = [...Array(15).keys()].map(row => {
    const rowNumbers = Array.from({ length: 5 }, (_, i) => row + 1 + i * 15);
    const percentage = calculateRowPercentage(rowNumbers);
    const complete = isRowComplete(rowNumbers);
    const name = names[row];

    console.log(`Row: ${row + 1}, Row Numbers: ${rowNumbers}, Name: ${name}, Percentage: ${percentage}, Complete: ${complete}`);

    return {
      row,
      percentage,
      name,
      complete,
    };
  }).sort((a, b) => {
    const result = b.complete ? -1 : b.percentage - a.percentage;
    console.log(`Sorting - A: ${a.row + 1}, B: ${b.row + 1}, Result: ${result}`);
    return result;
  });

  useEffect(() => {
    if (isPlaying && balls.length === 0) {
      clearInterval(intervalRef.current!);
      setIsPlaying(false);
    }
  }, [balls, isPlaying]);

  return (
    <div className="flex">
      <div className="flex flex-col items-center p-5 bg-primary-dark">
        <BingoCard markedNumbers={markedNumbers} />
        <div className="flex gap-4 mt-10">
          {calledNumbers.map(({ letter, number, id }) => (
            <BingoBall key={uuidv4()} letter={letter} number={number} />
          ))}
        </div>
        <div className="flex gap-4 mt-4">
          <button
            onClick={handlePlayPause}
            className="bg-green-500 text-white px-4 py-2 rounded shadow-md"
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button
            onClick={handleReset}
            className="bg-red-500 text-white px-4 py-2 rounded shadow-md"
          >
            Reset
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center p-5 bg-primary-dark text-white">
        <div className="mb-4">
          <h2 className="text-lg font-bold mb-2">Player Names</h2>
          {Array.from({ length: 15 }, (_, rowIndex) => (
            <div key={rowIndex} className="mb-2">
              <input
                type="text"
                value={names[rowIndex]}
                onChange={(e) => handleNameChange(rowIndex, e.target.value)}
                className="bg-secondary-dark text-white rounded px-2 py-1"
                placeholder={`Fila ${rowIndex + 1}`}
                disabled={isPlaying}
              />
            </div>
          ))}
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-bold mb-2">Progress</h2>
          <div>
            {sortedRows.map(({ row, percentage, name, complete }, index) => (
              <div key={row} className="flex justify-between w-64 mb-1">
                <span>{`Fila ${row + 1} - ${name}`}</span>
                <span className="flex items-center">
                  {index === 0 && <FaCrown className="text-yellow-500 mr-1" />}
                  {index === 1 && <FaCrown className="text-gray-400 mr-1" />}
                  {index === 2 && <FaCrown className="text-orange-500 mr-1" />}
                  {index > 2 && `${index + 1}°`}
                  {`${percentage.toFixed(2)}%`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
