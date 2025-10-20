// Trieda Workout predstavuje jeden celý tréning používateľa
import { Exercise } from './Exercise';
import { User } from './User';

export class Workout {
    private exercises: Exercise[]; // všetky cviky v tréningu
    private user: User; // používateľ, ktorému tréning patrí
    private date: Date; // dátum tréningu

    constructor(user:User){
        this.user = user;
        this.exercises = []
        this.date = new Date(); // automaticky nastaví dnešný dátum
    }

    // Pridá nový cvik do tréningu
    addExercise(exercise: Exercise): void {
        this.exercises.push(exercise);
    }
    // Odstráni cvik podľa názvu (napr. deleteExercise("Bench Press"))
    deleteExercise(name:string): void {
        this.exercises = this.exercises.filter(ex => ex.getName() !== name);
    }

    // Vypočíta celkový objem všetkých cvikov v tréningu
    totalVolume(): number {
        return this.exercises.reduce((total, ex) => total + ex.totalVolume(), 0);
    }

    // Getter pre všetky cviky
    getExercises(): Exercise[]{
        return this.exercises;
    }

}