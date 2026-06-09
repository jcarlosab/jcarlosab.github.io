import { useState } from 'react';
import TaskVotes from './TaskVotes';
import TaskResults from './TaskResults';

const CompletedTask = ({ task }) => {
  const [showResults, setShowResults] = useState(false);
  const votesCount = task.votes?.length || 0;

  return (
    <div className="task-item completed">
      <div className="task-info">
        <h4>{task.title}</h4>
        
        {/* ⭐ Aquí SÍ mostrar los votos porque ya está completada */}
        <TaskVotes votes={task.votes} />
        
        <div className="vote-count-badge">
          <i className="bi bi-check-circle-fill"></i>
          {votesCount} {votesCount === 1 ? 'voto' : 'votos'}
        </div>
      </div>
      
      <TaskResults 
        results={task.results}
        isExpanded={showResults}
        onToggle={() => setShowResults(!showResults)}
      />
    </div>
  );
};

export default CompletedTask;