function VotesCount({ votes, totalUsers }) {
	const votesDone = Array.isArray(votes) ? votes.length : 0;
	return (
		<div className="votes-count">
			{votesDone} de {totalUsers} han votado
		</div>
	);
}

export default VotesCount;