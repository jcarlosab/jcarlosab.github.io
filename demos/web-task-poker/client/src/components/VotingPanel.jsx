import { useRoom } from '../context/RoomContext';

const EmptyState = () => {
  return (
    <div className="voting-panel empty">
      <div className="empty-state">
        <i className="bi bi-hourglass-split"></i>
        <h3>Esperando votación</h3>
        <p>El moderador iniciará una votación pronto...</p>
      </div>
    </div>
  );
};

function VotingPanel() {
  const { tasks, currentUser, vote } = useRoom();
  const votingTask = tasks.find(t => t.state === 'voting');
  
  if (!votingTask) {
    return <EmptyState />;
  }
  
  const currentVote = votingTask.votes?.find(
    v => v.socketId === currentUser.socketId
  );
  
  const fibonacciNumbers = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, '?'];  // ⭐ AÑADIR '?'
  
  return (
    <div className="voting-panel">
      {/* ... resto del código ... */}
      <div className="cards-grid">
        {fibonacciNumbers.map((number) => (
          <button
            key={number}
            className={`poker-card ${currentVote?.score === number ? 'selected' : ''} ${number === '?' ? 'skip-card' : ''}`}
            onClick={() => vote(number)}
          >
            <span className="card-value">{number}</span>
            {currentVote?.score === number && (
              <i className="bi bi-check-circle-fill card-check"></i>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default VotingPanel;