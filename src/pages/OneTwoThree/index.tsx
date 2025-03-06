import './components/style.less';
import { useModel } from 'umi';

const OneTwoThree = () => {
	const {
		choices,
		playerChoice,
		botChoice,
		score,
		result,
		gameHistory,
		showHistory,
		handlePlayerChoice,
		resetGame,
		setShowHistory,
	} = useModel('ontwothree');
	return (
		<div className='container'>
			<div className='game-wrapper'>
				<h1 className='title'>Rock Paper Scissors</h1>

				<div className='score-board'>
					<h1>{score.player}</h1>
					<h1>:</h1>
					<h1>{score.bot}</h1>
					<div className='player-label'>You</div>
					<div className='bot-label'>Bot</div>
				</div>

				{result && (
					<div
						className={`result-text ${
							result === 'Tie' ? 'tie-result' : result === 'Player' ? 'player-win' : 'bot-win'
						}`}
					>
						{result === 'Tie' ? "It's a Tie!" : `${result} Wins!`}
					</div>
				)}

				<div className='choice-display'>
					{playerChoice && <div className='choice'>{playerChoice}</div>}
					{botChoice && <div className='choice'>{botChoice}</div>}
				</div>

				<div className='game-controls'>
					<div className='choice-buttons'>
						{choices.map((choice) => (
							<div
								key={choice}
								onClick={() => handlePlayerChoice(choice)}
								className={`choice-button ${playerChoice === choice ? 'selected-choice' : ''}`}
							>
								{choice}
							</div>
						))}
					</div>
					<div className='action-buttons'>
						<div onClick={resetGame} className='reset-button'>
							Reset Game
						</div>
						<div onClick={() => setShowHistory((prev) => !prev)} className='history-button'>
							{showHistory ? 'Hide History' : 'Show History'}
						</div>
					</div>
				</div>
			</div>
			{showHistory && (
				<div className='game-history'>
					<div className='history-header'>
						<h3>Game History</h3>
					</div>
					{gameHistory.length === 0 ? (
						<p>No game history yet</p>
					) : (
						<div className='history-list'>
							{gameHistory.map((round, index) => (
								<div key={index} className='history-item'>
									<span className='history-choice'>You: {round.playerChoice}</span>
									<span className='history-choice'>Bot: {round.botChoice}</span>
									<span
										className={`history-result ${
											round.result === 'Tie' ? 'tie-result' : round.result === 'Player' ? 'player-win' : 'bot-win'
										}`}
									>
										{round.result}
									</span>
								</div>
							))}
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default OneTwoThree;
