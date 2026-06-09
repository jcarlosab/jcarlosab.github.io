import React, { useState, useEffect, useRef, useCallback } from "react";
import { DragDropContext } from '@hello-pangea/dnd';
import ExerciseForm from "./ExerciseForm";
import ExerciseList from "./ExerciseList";
import RoutineTimer from "./RoutineTimer";
import sound from './assets/finish.mp3';


export default function TrainFlow() {
	const [ejercicios, setEjercicios] = useState(() => {
		const saved = localStorage.getItem("ejercicios");
		return saved ? JSON.parse(saved) : [];
	});

	const [currentEjercicioIndex, setCurrentEjercicioIndex] = useState(0);
	const [currentSerie, setCurrentSerie] = useState(1);
	const [phase, setPhase] = useState("reposo"); // reposo, ejercicio, descansoSerie, descansoEjercicio
	const [timer, setTimer] = useState(0);
	const [isRunning, setIsRunning] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isListModalOpen, setIsListModalOpen] = useState(false);

	const timerRef = useRef(null);
	const audioRef = useRef(new Audio(sound));

	useEffect(() => {
		localStorage.setItem("ejercicios", JSON.stringify(ejercicios));
	}, [ejercicios]);

	const avanzarPhase = useCallback(() => {
		const ejercicio = ejercicios[currentEjercicioIndex];
		audioRef.current.play().catch((e) => console.error("Error al reproducir sonido:", e));
		if (phase === "ejercicio") {
			if (currentSerie < ejercicio.series) {
				setPhase("descansoSerie");
				setTimer(ejercicio.descansoSerie);
			} else {
				if (currentEjercicioIndex < ejercicios.length - 1) {
					setPhase("descansoEjercicio");
					setTimer(ejercicio.descansoEjercicio);
				} else {
					setIsRunning(false);
					alert("Rutina terminada!");
					setPhase("reposo");
					return;
				}
			}
		} else if (phase === "descansoSerie") {
			setCurrentSerie((s) => s + 1);
			setPhase("ejercicio");
			setTimer(ejercicio.reps * 3); // 3s por repetición (ajustable)
		} else if (phase === "descansoEjercicio") {
			setCurrentEjercicioIndex((i) => i + 1);
			setCurrentSerie(1);
			setPhase("ejercicio");
			const siguienteEjercicio = ejercicios[currentEjercicioIndex + 1];
			if (siguienteEjercicio) {
				setTimer(siguienteEjercicio.reps * 3);
			}
		}
	}, [ejercicios, currentEjercicioIndex, currentSerie, phase]);

	useEffect(() => {
		if (!isRunning) return;

		if (timer === 0) {
			avanzarPhase();
			return;
		}

		timerRef.current = setTimeout(() => {
			setTimer(timer - 1);
		}, 1000);

		return () => clearTimeout(timerRef.current);
	}, [timer, isRunning, avanzarPhase]);

	function handleStart() {
		if (ejercicios.length === 0) return alert("Añade ejercicios primero.");
		if (isRunning) return;

		setCurrentEjercicioIndex(0);
		setCurrentSerie(1);
		setPhase("ejercicio");

		const duracionEjercicio = ejercicios[0].reps * 3; // 3s por repetición (ajustable)
		setTimer(duracionEjercicio);
		setIsRunning(true);
	}

	function handleStop() {
		setIsRunning(false);
		setPhase("");
		setTimer(0);
		setCurrentEjercicioIndex(0);
		setCurrentSerie(1);
	}

	function handleDelete(index) {
		if (isRunning) return;
		const nuevosEjercicios = [...ejercicios];
		nuevosEjercicios.splice(index, 1);
		setEjercicios(nuevosEjercicios);
	}

	function onDragEnd(result) {
		if (!result.destination) return;
		const items = Array.from(ejercicios);
		const [reordered] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reordered);
		setEjercicios(items);
	}

	return (
		<div>
		{!isRunning && (
			<>
			<h1>Fit Track</h1>
			<a href="#" className="button" onClick={() => setIsModalOpen(true)}>
				<span className="icon">➕</span>Add Exercises
			</a>
			<a href="#" className="button" onClick={() => setIsListModalOpen(true)}>
				<span className="icon">📜</span>View/Modify List <span className="counter">({ejercicios.length})</span>
			</a>
			{isModalOpen && (
				<ExerciseForm
				isRunning={isRunning}
				setEjercicios={setEjercicios}
				onClose={() => setIsModalOpen(false)}
				/>
			)}
			{isListModalOpen && (
				<div className="modal">
				<div className="modal-content">
					<button className="close-button" onClick={() => setIsListModalOpen(false)}>✖</button>
					<h2>Lista de Ejercicios</h2>
					<DragDropContext onDragEnd={onDragEnd}>
					<ExerciseList
						ejercicios={ejercicios}
						handleDelete={handleDelete}
						isRunning={isRunning}
					/>
					</DragDropContext>
				</div>
				</div>
			)}
			<a href="#" className="button start-button" onClick={handleStart} disabled={ejercicios.length === 0}>Start</a>
			</>
		)}
		{isRunning && (
			<div className="routine-timer-container">
				<RoutineTimer
					exercise={ejercicios}
					currentEjercicioIndex={currentEjercicioIndex}
					currentSerie={currentSerie}
					phase={phase}
					timer={timer}
					onStop={handleStop}
				/>
			</div>
		)}
		</div>
	);
	}

