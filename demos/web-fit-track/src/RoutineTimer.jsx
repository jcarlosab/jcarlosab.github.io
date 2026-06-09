import React from "react";

export default function RoutineTimer({ exercise, currentEjercicioIndex, currentSerie, phase, timer, onStop }) {
    const currentExercise = exercise[currentEjercicioIndex] || {};
    let totalDuration = 1; // Default to 1 to avoid division by zero

    // Determine the total duration based on the current phase
    if (phase === "ejercicio") {
        totalDuration = currentExercise.reps * 3; // 3s per repetition
    } else if (phase === "descansoSerie") {
        totalDuration = currentExercise.descansoSerie;
    } else if (phase === "descansoEjercicio") {
        totalDuration = currentExercise.descansoEjercicio;
    }

    const progress = Math.min((timer / totalDuration) * 100, 100); // Ensure progress doesn't exceed 100%

    return (
        <>
            <h1>{exercise[currentEjercicioIndex].nombre}</h1>
            <div className="timer-container">
                <div
                    className="circular-timer"
                    style={{ "--progress": `${progress}%` }}
                >
                </div>
                <div className="timer-seconds">{timer}s</div>
            </div>
            <div className="info">
				<h2>{phase}</h2>
                <p>{currentSerie} / {exercise[currentEjercicioIndex].series}</p>
            </div>
            <div className="series-progress">
                <div className="series-bar" style={{ width: `${(currentSerie / exercise[currentEjercicioIndex].series) * 100}%` }}></div>
            </div>
            <button className="stop-button" onClick={onStop}>Stop</button>
        </>
    );
}
