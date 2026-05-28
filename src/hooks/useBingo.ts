import { useState, useCallback, useRef } from "react";
import {
  BINGO_NUMBERS,
  getFactsByProduct,
  getRandomFactForProduct,
  getColumnForNumber,
} from "@/utils/bingoUtils";
import type { MultiplicationFact } from "@/utils/bingoUtils";

export interface CalledNumber {
  number: number;
  fact: MultiplicationFact;
  timestamp: number;
}

export function useBingo() {
  const [calledNumbers, setCalledNumbers] = useState<CalledNumber[]>([]);
  const [currentCall, setCurrentCall] = useState<CalledNumber | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const factsMapRef = useRef(getFactsByProduct());
  const availableNumbersRef = useRef<number[]>([...BINGO_NUMBERS]);

  const calledSet = new Set(calledNumbers.map((c) => c.number));

  const callNextNumber = useCallback(() => {
    if (availableNumbersRef.current.length === 0) return;
    if (isAnimating) return;

    setIsAnimating(true);

    // Pequeña animación de espera
    setTimeout(() => {
      const randomIndex = Math.floor(
        Math.random() * availableNumbersRef.current.length
      );
      const selectedNumber = availableNumbersRef.current[randomIndex];

      // Remover el número de los disponibles
      availableNumbersRef.current = availableNumbersRef.current.filter(
        (n) => n !== selectedNumber
      );

      const fact = getRandomFactForProduct(
        selectedNumber,
        factsMapRef.current
      );
      const call: CalledNumber = {
        number: selectedNumber,
        fact,
        timestamp: Date.now(),
      };

      setCurrentCall(call);
      setCalledNumbers((prev) => [...prev, call]);
      setIsAnimating(false);
      if (!gameStarted) setGameStarted(true);
    }, 600);
  }, [isAnimating, gameStarted]);

  const resetGame = useCallback(() => {
    setCalledNumbers([]);
    setCurrentCall(null);
    setIsAnimating(false);
    setGameStarted(false);
    availableNumbersRef.current = [...BINGO_NUMBERS];
  }, []);

  const getCallDisplay = (call: CalledNumber): string => {
    const col = getColumnForNumber(call.number);
    return `${col}-${call.number}`;
  };

  const getCallFactDisplay = (call: CalledNumber): string => {
    return `${call.fact.a} x ${call.fact.b}`;
  };

  const remainingCount = availableNumbersRef.current.length;
  const calledCount = calledNumbers.length;
  const totalCount = BINGO_NUMBERS.length;

  // Números agrupados por columna para el tablero de seguimiento
  const columnLetters = ["B", "I", "N", "G", "O"];

  return {
    calledNumbers,
    currentCall,
    isAnimating,
    gameStarted,
    calledSet,
    callNextNumber,
    resetGame,
    getCallDisplay,
    getCallFactDisplay,
    remainingCount,
    calledCount,
    totalCount,
    columnLetters,
  };
}
