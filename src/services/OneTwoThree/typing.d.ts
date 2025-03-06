export type Choice = '✊' | '✋' | '✌️';
export type Result = 'Player' | 'Bot' | 'Tie';

export type GameRound = {
  playerChoice: Choice;
  botChoice: Choice;
  result: Result;
};