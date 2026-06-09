import VotingPanel from "../VotingPanel";
import { useRoom } from '../../context/RoomContext';

const CurrentTask = ({ task, isAdmin, onStartVoting, onCompleteVoting }) => {
  const { users } = useRoom();
  
  const isPending = task.state === 'pending';
  const isVoting = task.state === 'voting';
  
  // Contar participantes (excluir admin)
  const participantsCount = users.filter(u => u.role === 'participant').length;
  const votesCount = task.votes?.length || 0;
  const allVoted = votesCount === participantsCount && participantsCount > 0;

  return (
    <div className="task-item current-task">
      <h4>{task.title}</h4>
      
      {!isAdmin && (
        <VotingPanel />
      )}

      {isAdmin && (
        <div className="task-actions">
          {/* ⭐ ELIMINAR: {isVoting && <TaskVotes votes={task.votes} />} */}
          {/* Solo mostrar contador mientras se vota, NO los votos */}
          
          {isPending && (
            <a className='link' onClick={() => onStartVoting(task.id)}>
              Iniciar Votación
            </a>
          )}
          
          {isVoting && (
            <>
              <a 
                className={`link ${!allVoted ? 'disabled' : ''}`}
                onClick={() => allVoted && onCompleteVoting(task.id)}
              >
                Finalizar Votación
              </a>
              
              {/* Mostrar solo el progreso, sin revelar votos */}
              <div className="vote-progress">
                <i className="bi bi-people-fill"></i>
                <span className={allVoted ? 'complete' : ''}>
                  {votesCount} de {participantsCount} han votado
                </span>
                {allVoted && <i className="bi bi-check-circle-fill"></i>}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CurrentTask;