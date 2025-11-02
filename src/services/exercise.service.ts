import { Request, Response } from 'express';
import { Storage } from '../storage/Storage';
import { Exercise } from '../classes/Exercise';
import { Set } from '../classes/Set';
import { getValidEmail } from '../utils/validation.utils';

const storage = Storage.getInstance();

// GET všetky cviky z konkrétneho tréningu
export const getExercisesFromWorkout = (req: Request, res: Response) => {
    const email = getValidEmail(req, res);
    if (!email) return;

    const workoutIndex = Number(req.params.workoutIndex);

    if (isNaN(workoutIndex)) {
        res.status(400).send('Invalid workout index');
        return;
    }

    const log = storage.getWorkoutLog(email);
    if (!log) {
        res.status(404).send('User not found');
        return;
    }

    const workouts = log.getWorkouts();
    const workout = workouts[workoutIndex];

    if (!workout) {
        res.status(404).send('Workout not found');
        return;
    }

    res.send(workout.getExercises());
}

// GET konkrétny cvik z tréningu podľa názvu
export const getExerciseByName = (req: Request, res: Response) => {
    const email = getValidEmail(req, res);
    if (!email) return;

    const workoutIndex = Number(req.params.workoutIndex);
    const exerciseName = req.params.name;

    if (!exerciseName) {
        res.status(400).send('Exercise name is required');
        return;
    }

    if (isNaN(workoutIndex)) {
        res.status(400).send('Invalid workout index');
        return;
    }

    const log = storage.getWorkoutLog(email);
    if (!log) {
        res.status(404).send('User not found');
        return;
    }

    const workout = log.getWorkouts()[workoutIndex];
    if (!workout) {
        res.status(404).send('Workout not found');
        return;
    }

    const exercise = workout.getExercises().find(ex => ex.getName() === exerciseName);
    if (!exercise) {
        res.status(404).send('Exercise not found');
        return;
    }

    res.send(exercise);
}

// POST - pridanie cviku do existujúceho tréningu
export const addExerciseToWorkout = (req: Request, res: Response) => {
    const email = getValidEmail(req, res);
    if (!email) return;

    const workoutIndex = Number(req.params.workoutIndex);

    if (isNaN(workoutIndex)) {
        res.status(400).send('Invalid workout index');
        return;
    }

    const log = storage.getWorkoutLog(email);
    if (!log) {
        res.status(404).send('User not found');
        return;
    }

    const workout = log.getWorkouts()[workoutIndex];
    if (!workout) {
        res.status(404).send('Workout not found');
        return;
    }

    const { name, sets } = req.body;

    if (!name) {
        res.status(400).send('Exercise name is required');
        return;
    }

    const exercise = new Exercise(name);

    // Pridanie sérií ak sú zadané
    if (sets && Array.isArray(sets)) {
        sets.forEach((s: any) => {
            if (s.reps && s.weight) {
                exercise.addSet(new Set(s.reps, s.weight));
            }
        });
    }

    workout.addExercise(exercise);
    res.status(201).send({
        message: 'Exercise added to workout',
        exerciseName: exercise.getName(),
        totalVolume: exercise.totalVolume()
    });
}

// DELETE - zmazanie cviku z tréningu
export const deleteExerciseFromWorkout = (req: Request, res: Response) => {
    const email = getValidEmail(req, res);
    if (!email) return;

    const workoutIndex = Number(req.params.workoutIndex);
    const exerciseName = req.params.name;

    if (!exerciseName) {
        res.status(400).send('Exercise name is required');
        return;
    }

    if (isNaN(workoutIndex)) {
        res.status(400).send('Invalid workout index');
        return;
    }

    const log = storage.getWorkoutLog(email);
    if (!log) {
        res.status(404).send('User not found');
        return;
    }

    const workout = log.getWorkouts()[workoutIndex];
    if (!workout) {
        res.status(404).send('Workout not found');
        return;
    }

    // Skontroluj či cvik existuje
    const exercise = workout.getExercises().find(ex => ex.getName() === exerciseName);
    if (!exercise) {
        res.status(404).send('Exercise not found');
        return;
    }

    workout.deleteExercise(exerciseName);
    res.send({ message: 'Exercise deleted from workout' });
}

// GET - celkový objem konkrétneho cviku
export const getExerciseVolume = (req: Request, res: Response) => {
    const email = getValidEmail(req, res);
    if (!email) return;

    const workoutIndex = Number(req.params.workoutIndex);
    const exerciseName = req.params.name;

    if (!exerciseName) {
        res.status(400).send('Exercise name is required');
        return;
    }

    if (isNaN(workoutIndex)) {
        res.status(400).send('Invalid workout index');
        return;
    }

    const log = storage.getWorkoutLog(email);
    if (!log) {
        res.status(404).send('User not found');
        return;
    }

    const workout = log.getWorkouts()[workoutIndex];
    if (!workout) {
        res.status(404).send('Workout not found');
        return;
    }

    const exercise = workout.getExercises().find(ex => ex.getName() === exerciseName);
    if (!exercise) {
        res.status(404).send('Exercise not found');
        return;
    }

    res.send({
        exerciseName: exercise.getName(),
        totalVolume: exercise.totalVolume()
    });
}