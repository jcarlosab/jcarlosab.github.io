import useTaskFilters from '../../hooks/useTaskFilters'
import useTaskActions from '../../hooks/useTaskActions'
import CurrentTask from './CurrentTask';
import CompletedTasksList from './CompletedTasksList';
import TaskForm from './TaskForm';
import { useRoom } from '../../context/RoomContext';

function TaskList ({ editable = false }) {
	// Obtener estado del contexto
	const { socket, roomUUID, tasks, currentUser } = useRoom();
	
	// Lógica de filtrado
	const isAdmin = currentUser.role === 'master';
	const { currentTask, completedTasks } = useTaskFilters(tasks);
	const { createTask, startVoting, completeVoting } = useTaskActions(socket, roomUUID);

	const hasActiveTask = !!currentTask;

	return (
		<div className="task-container">
			{editable && isAdmin && (
				<TaskForm onSubmit={createTask} disabled={hasActiveTask} />
			)}

			<div className="task-items">
				{currentTask && (
					<CurrentTask
						task={currentTask}
						isAdmin={isAdmin}
						onStartVoting={startVoting}
						onCompleteVoting={completeVoting}
					/>
				)}

				<CompletedTasksList tasks={completedTasks} />
			</div>
		</div>
	)
}

export default TaskList;