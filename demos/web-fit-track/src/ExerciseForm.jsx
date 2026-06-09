import React, { useState } from "react";
import './app.css';

export default function ExerciseForm({ isRunning, setEjercicios, onClose }) {
	const [nombre, setNombre] = useState("");
	const [series, setSeries] = useState(1);
	const [reps, setReps] = useState(1);
	const [descansoSerie, setDescansoSerie] = useState(30);
	const [descansoEjercicio, setDescansoEjercicio] = useState(60);

	function handleAddEjercicio() {
		if (!nombre || series < 1 || reps < 1) {
			alert("Completa todos los campos correctamente");
			return;
		}
		setEjercicios((ejs) => [
			...ejs,
			{ nombre, series, reps, descansoSerie, descansoEjercicio },
		]);
		setNombre("");
		setSeries(1);
		setReps(1);
		setDescansoSerie(30);
		setDescansoEjercicio(60);
		onClose();
	}

	return (
		<div className="modal">
			<div className="modal-content exercise-form">
				<button className="close-button" onClick={onClose}>✖</button>
				<h2>Añadir Ejercicio</h2>
				<label>
					Nombre ejercicio:
					<input
						value={nombre}
						onChange={(e) => setNombre(e.target.value)}
						disabled={isRunning}
					/>
				</label>
				<label>
					Series:
					<input
						type="number"
						min="1"
						value={series}
						onChange={(e) => setSeries(Number(e.target.value))}
						disabled={isRunning}
					/>
				</label>
				<label>
					Repeticiones:
					<input
						type="number"
						min="1"
						value={reps}
						onChange={(e) => setReps(Number(e.target.value))}
						disabled={isRunning}
					/>
				</label>
				<label>
					Descanso entre series (seg):
					<input
						type="number"
						min="0"
						value={descansoSerie}
						onChange={(e) => setDescansoSerie(Number(e.target.value))}
						disabled={isRunning}
					/>
				</label>
				<label>
					Descanso entre ejercicios (seg):
					<input
						type="number"
						min="0"
						value={descansoEjercicio}
						onChange={(e) => setDescansoEjercicio(Number(e.target.value))}
						disabled={isRunning}
					/>
				</label>
				<button className="add-button" onClick={handleAddEjercicio} disabled={isRunning}>Añadir ejercicio</button>
			</div>
		</div>
	);
}

