let exerciseIndex = 1; // Start from 1 since 0 is in the HTML

function addExercise() {
    const container = document.getElementById('exercise-fields');

    const newExercise = document.createElement('div');
    newExercise.classList.add('exercise-group');

    newExercise.innerHTML = `
        <label>Exercise Name:</label>
        <input type="text" name="exercises[${exerciseIndex}][name]" required>

        <label>Reps:</label>
        <input type="number" name="exercises[${exerciseIndex}][reps]" min="1">

        <label>Sets:</label>
        <input type="number" name="exercises[${exerciseIndex}][sets]" min="1">

        <label>Duration:</label>
        <input type="text" name="exercises[${exerciseIndex}][duration]" placeholder="e.g., 30 sec">

        <label>Notes:</label>
        <input type="text" name="exercises[${exerciseIndex}][notes]">

        <button type="button" onclick="removeExercise(this)">Remove</button>
    `;

    container.appendChild(newExercise);
    exerciseIndex++;
}

function removeExercise(button) {
    button.parentElement.remove();
}
