import express from 'express';
import { Request, Response } from 'express';
import {
    getAllUsers,
    getUserByEmail,
    createUser,
    updateUserByEmail,
    deleteUserByEmail
} from './services/user.service';
import {
    getUserWorkouts,
    createWorkout,
    getTotalWorkouts
} from './services/workout.service';
import {
    getExercisesFromWorkout,
    getExerciseByName,
    addExerciseToWorkout,
    deleteExerciseFromWorkout,
    getExerciseVolume
} from './services/exercise.service';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('FHI-Textor Fitness Tracker API 💪 Server is running!');
});

// User routes
app.get('/users', getAllUsers);
app.get('/users/:email', getUserByEmail);
app.post('/users', createUser);
app.put('/users/:email', updateUserByEmail);
app.delete('/users/:email', deleteUserByEmail);

// Workout routes
app.get('/users/:email/workouts', getUserWorkouts);
app.post('/users/:email/workouts', createWorkout);
app.get('/users/:email/workouts/total', getTotalWorkouts);

// Exercise routes
app.get('/users/:email/workouts/:workoutIndex/exercises', getExercisesFromWorkout);
app.get('/users/:email/workouts/:workoutIndex/exercises/:name', getExerciseByName);
app.post('/users/:email/workouts/:workoutIndex/exercises', addExerciseToWorkout);
app.delete('/users/:email/workouts/:workoutIndex/exercises/:name', deleteExerciseFromWorkout);
app.get('/users/:email/workouts/:workoutIndex/exercises/:name/volume', getExerciseVolume);

app.listen(port, () => {
    console.log(`🚀 Server is running at http://localhost:${port}`);
});

// import express from 'express';
// import { Request, Response } from 'express';
//
//
// const app = express()
// const port = 3000
//
// let id = 1;
//
// app.use(express.json());
//
// const getNextId = (): number => {
//     return id++;
// }
//
// app.get('/', (req: Request, res: Response) => {
//     res.send('Hello World!')
// })
//
// app.listen(port, () => {
//     console.log(`Server is running at http://localhost:${port}`);
// })
//
// app.post('/', (req: Request, res: Response) => {
//     res.send('Hello World!')
// })
//
//
//
//
//
// import { User } from './classes/User';
// import { Set } from './classes/Set';
// import { Exercise } from './classes/Exercise';
// import { Workout } from './classes/Workout';
// import { WorkoutLog } from './classes/WorkoutLog';
//
// //Vytvorenie používateľov
// const user1 = new User('Ján Novák', 'jan@email.com');
// const user2 = new User('Peter Kováč', 'peter@email.com');
//
// // Workout pre Jána Nováka
// const workout1 = new Workout(user1);
// const benchPress = new Exercise('Bench Press');
// benchPress.addSet(new Set(10, 60));
// benchPress.addSet(new Set(8, 70));
// benchPress.addSet(new Set(6, 80));
// workout1.addExercise(benchPress);
//
// const squat = new Exercise('Squat');
// squat.addSet(new Set(12, 100));
// squat.addSet(new Set(10, 120));
// workout1.addExercise(squat);
//
// // Workout pre Petra Kováča
// const workout2 = new Workout(user2);
// const deadlift = new Exercise('Deadlift');
// deadlift.addSet(new Set(5, 140));
// deadlift.addSet(new Set(3, 160));
// workout2.addExercise(deadlift);
//
// // Log pre oboch používateľov
// const log1 = new WorkoutLog(user1);
// const log2 = new WorkoutLog(user2);
//
// log1.addWorkout(workout1);
// log2.addWorkout(workout2);
//
// // Funkcia na výpis tréningov
// function printWorkoutLog(log: WorkoutLog): void {
//     console.log(`\n Workout log pre používateľa: ${log['user'].getName()}`);
//     console.log('----------------------------------------------------------');
//
//     if (log.totalWorkouts() === 0) {
//         console.log(' Žiadne tréningy');
//         return;
//     }
//     // prejde všetky tréningy v logu
//     log.getWorkouts().forEach((workout, index) => {
//         console.log(` Tréning č.${index + 1} (${workout['date'].toLocaleDateString()})`);
//
//         // prejde každý cvik
//         workout.getExercises().forEach((exercise) => {
//             console.log(`  • Cvik: ${exercise.getName()}`);
//             console.log(`    Počet sérií: ${exercise['sets'].length}`);
//
//             // prejde jednotlivé série
//             exercise['sets'].forEach((set, i) => {
//                 console.log(`      Séria ${i + 1}: ${set.getReps()} opakovaní × ${set.getWeight()} kg`);
//             });
//
//             console.log(`    Celkový objem: ${exercise.totalVolume()} kg`);
//         });
//         console.log(`➡ Celkový objem tréningu: ${workout.totalVolume()} kg`);
//         console.log('');
//     });
// }
//
// // Výpis
// printWorkoutLog(log1);
// printWorkoutLog(log2);
//
// // Test vymazania cviku
// console.log('\n Test vymazania cviku "Bench Press" z workout1...');
// console.log(`Počet cvikov pred vymazaním: ${workout1.getExercises().length}`);
// console.log(`Celkový objem pred vymazaním: ${workout1.totalVolume()} kg`);
//
// workout1.deleteExercise('Bench Press');
//
// console.log(`Počet cvikov po vymazaní: ${workout1.getExercises().length}`);
// console.log(`Celkový objem po vymazaní: ${workout1.totalVolume()} kg`);
// console.log('\nCviky, ktoré ostali:');
// workout1.getExercises().forEach(ex => {
//     console.log(`  - ${ex.getName()}`);
// });
//
// // Prázdnenie logu
// console.log('\n Vyprázdňujem log Jána Nováka...');
// const emptied = log1.emptyWorkouts();
// console.log('Po vyprázdnení logu:', log1.getWorkouts());
// console.log(`Počet zmazaných tréningov: ${emptied.length}`);
//
