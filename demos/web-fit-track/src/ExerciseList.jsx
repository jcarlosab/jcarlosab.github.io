import React from "react";
import { Droppable, Draggable } from '@hello-pangea/dnd';

export default function ExerciseList({ ejercicios, handleDelete, isRunning }) {
  return (
    <Droppable droppableId="ejercicios">
		{(provided) => (
			<div className="scroll-container">
			<ul {...provided.droppableProps} ref={provided.innerRef} className="exercise-list">
				{ejercicios.map((e, i) => (
					<Draggable key={i} draggableId={`${i}`} index={i}>
						{(provided) => (
							<li
								ref={provided.innerRef}
								{...provided.draggableProps}
								{...provided.dragHandleProps}
								className="exercise-item"
								style={provided.draggableProps.style}
							>
								<span>{e.nombre} - {e.series}x{e.reps} - {e.descansoSerie}s - {e.descansoEjercicio}s</span>
								<button onClick={() => handleDelete(i)} disabled={isRunning} className="delete-button">Borrar</button>
							</li>
						)}
					</Draggable>
				))}
				{provided.placeholder}
			</ul>
			</div>
		)}
    </Droppable>
  );
}
