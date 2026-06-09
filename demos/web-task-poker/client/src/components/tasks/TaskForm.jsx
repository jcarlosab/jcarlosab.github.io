import { useState } from 'react';

const TaskForm = ({ onSubmit, disabled }) => {
	const [title, setTitle] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(title);
		setTitle('');
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="task-input-container">
				<input
				type="text"
				placeholder="Nueva tarea..."
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				disabled={disabled}
				/>
				<button className="link" type="submit" disabled={disabled}>
					Añadir
				</button>
			</div>
		</form>
	);
};

export default TaskForm;