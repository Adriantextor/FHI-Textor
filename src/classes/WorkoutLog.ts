// Trieda WorkoutLog slúži na evidenciu všetkých tréningov jedného používateľa
import { Workout } from './Workout';
import { User } from './User';

export class WorkoutLog {
    private user: User; // používateľ, ktorému log patrí
    private workouts: Workout[]; // zoznam tréningov

    constructor(user:User) {
        this.user = user;
        this.workouts = [];
    }

    // Pridá nový tréning do logu
    addWorkout(workout:Workout) :void{
        this.workouts.push(workout);
    }

    getWorkouts(): Workout[]{
        return this.workouts;
    }

    // Vráti počet uložených tréningov
    totalWorkouts(): number {
        return this.workouts.length;
    }

    // Vyprázdni log (všetky tréningy odstráni) a vráti ich
    emptyWorkouts(): Workout[] {
        const workouts = this.workouts;
        this.workouts = [];
        return workouts;
    }
}