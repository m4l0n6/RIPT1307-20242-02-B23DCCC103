import { useState } from 'react';
import type { Choice, Result, GameRound } from '../services/OneTwoThree/typing';

export default function useOneTwoThreeModel() {
    const [playerChoice, setPlayerChoice] = useState<Choice | null>(null); // lựa chọn của người chơi
    const [botChoice, setBotChoice] = useState<Choice | null>(null); // lựa chọn của máy
    const [score, setScore] = useState<{ player: number; bot: number }>({ player: 0, bot: 0 }); // điểm số
    const [result, setResult] = useState<Result | null>(null); // kết quả
    const [gameHistory, setGameHistory] = useState<GameRound[]>([]); // lịch sử game
    const [showHistory, setShowHistory] = useState<boolean>(false); // hiển thị lịch sử game
    const choices: Choice[] = ['✊', '✋', '✌️']; // lựa chọn

    const handlePlayerChoice = (choice: Choice) => { // xử lý lựa chọn của người chơi
        const newBotChoice = choices[Math.floor(Math.random() * 3)]; // lựa chọn của máy
        setPlayerChoice(choice); // cập nhật lựa chọn của người chơi
        setBotChoice(newBotChoice); // cập nhật lựa chọn của máy

        const winningCombos: Record<Choice, Choice> = { // cách thức thắng
        '✊': '✌️',
        '✋': '✊',
        '✌️': '✋',
        };

        const gameResult: Result = choice === botChoice ? 'Tie' : winningCombos[choice] === botChoice ? 'Player' : 'Bot'; // kết quả
        setResult(gameResult);

        setGameHistory((prev) => [{ playerChoice: choice, botChoice: newBotChoice, result: gameResult }, ...prev]);

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
