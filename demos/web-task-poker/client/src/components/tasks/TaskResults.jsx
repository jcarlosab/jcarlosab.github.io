import calculateTaskResults from '../../utils/calculateTaskResults'

const TaskResults = ({ results, isExpanded, onToggle }) => {
	const resultData = calculateTaskResults(results);

	return (
		<div className="task-results-container">
		<div className="task-actions" onClick={onToggle}>
			<i className={`bi bi-chevron-${isExpanded ? 'down' : 'up'} expand-icon`}></i>
		</div>
		{isExpanded && (
			<p className="task-result">{resultData.text}</p>
		)}
		</div>
	);
};

export default TaskResults;