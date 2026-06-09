import CompletedTask from './CompletedTask'

const CompletedTasksList = ({ tasks }) => {
	if (!tasks.length) {
		return (
			<div className="tasks-completed">
				<h3>Completadas</h3>
				<p className="empty-state">No hay tareas completadas aún</p>
			</div>
		);
	}

	return (
		<div className="tasks-completed">
			<h3>Completadas ({tasks.length})</h3>
			{[...tasks].reverse().map(task => (
				<CompletedTask key={task.id} task={task} />
			))}
		</div>
	);
};

export default CompletedTasksList;