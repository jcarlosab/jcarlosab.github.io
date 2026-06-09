const TaskVotes = ({ votes }) => {
  if (!votes?.length) return null;

  return (
    <div className="task-votes">
      {votes.map((vote, index) => (
        <div key={index} className={`task-vote ${vote.score === '?' ? 'skip-vote' : ''}`}>
          <div className="vote-score">{vote.score}</div>
          {vote.username && (
            <div className="vote-username">{vote.username}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskVotes;