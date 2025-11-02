import { Request, Response } from 'express';
import { Storage } from '../storage/Storage';
import { Workout } from '../classes/Workout';
import { Exercise } from '../classes/Exercise';
import { Set } from '../classes/Set';
import { getValidEmail } from '../utils/validation.utils';

const storage = Storage.getInstance();

// GET všetky tréningy používateľa
export const getUserWorkouts = (req: Request, res: Response) => {
    const email = getValidEmail(req, res);
    if (!email) return;

    const log = storage.getWorkoutLog(email);
    if (!log) {
        res.status(404).send('User not found');
        return;
    }

    res.send(log.getWorkouts());
}

// POST - pridanie nového tréningu
export const createWorkout = (req: Request, res: Response) => {
    const email = getValidEmail(req, res);
    if (!email) return;

    const user = storage.getUserByEmail(email);
    if (!user) {
        res.status(404).send('User not found');
        return;
    }

    const workout = new Workout(user);

    // Pridanie cvikov z requestu
    if (req.body.exercises && Array.isArray(req.body.exercises)) {
        req.body.exercises.forEach((ex: any) => {
            const exercise = new Exercise(ex.name);

            if (ex.sets && Array.isArray(ex.sets)) {
                ex.sets.forEach((s: any) => {
                    exercise.addSet(new Set(s.reps, s.weight));
                });
            }

            workout.addExercise(exercise);
        });
    }

    storage.addWorkoutToLog(email, workout);
    res.status(201).send({ message: 'Workout created', totalVolume: workout.totalVolume() });
}

// GET - celkový počet tréningov
export const getTotalWorkouts = (req: Request, res: Response) => {
    const email = getValidEmail(req, res);
    if (!email) return;

    const log = storage.getWorkoutLog(email);
    if (!log) {
        res.status(404).send('User not found');
        return;
    }

    res.send({ totalWorkouts: log.totalWorkouts() });
}