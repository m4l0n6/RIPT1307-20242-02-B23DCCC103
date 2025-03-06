import { useState } from 'react';
import type { Choice, Result, GameRound } from '../services/OneTwoThree/typing';

export default function useOneTwoThreeModel() {
    const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
    const [botChoice, setBotChoice] = useState<Choice | null>(null);
    const [score, setScore] = useState<{ player: number; bot: number }>({ player: 0, bot: 0 });
    const [result, setResult] = useState<Result | null>(null);
    const [gameHistory, setGameHistory] = useState<GameRound[]>([]);
    const [showHistory, setShowHistory] = useState<boolean>(false);
    const choices: Choice[] = ['✊', '✋', '✌️'];

    const handlePlayerChoice = (choice: Choice) => {
    
        const botChoice = choices[Math.floor(Math.random() * 3)];
        setPlayerChoice(choice);
        setBotChoice(botChoice);

        const winningCombos: Record<Choice, Choice> = {
        '✊': '✌️',
        '✋': '✊',
        '✌️': '✋',
        };

        const gameResult: Result = choice === botChoice ? 'Tie' : winningCombos[choice] === botChoice ? 'Player' : 'Bot';
        setResult(gameResult);

        setGameHistory((prev) => [{ playerChoice: choice, botChoice, result: gameResult }, ...prev]);

        if (gameResult === 'Player') setScore((prev) => ({ ...prev, player: prev.player + 1 }));
        if (gameResult === 'Bot') setScore((prev) => ({ ...prev, bot: prev.bot + 1 }));
    };

  const resetGame = () => {
    setPlayerChoice(null);
    setBotChoice(null);
    setResult(null);
    setScore({ player: 0, bot: 0 });
    setGameHistory([]);
  };

  return {
    choices,    
    playerChoice,
    botChoice,
    score,
    result,
    gameHistory,
    showHistory,
    setShowHistory,
    handlePlayerChoice,
    resetGame,
  };
}
