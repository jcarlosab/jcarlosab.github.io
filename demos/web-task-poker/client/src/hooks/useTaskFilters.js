const useTaskFilters = (tasks) => {
	const currentTask = tasks.find(t => ['pending', 'voting'].includes(t.state));
	const completedTasks = tasks.filter(t => t.state === 'completed');
	
	return { currentTask, completedTasks };
};

export default useTaskFilters;