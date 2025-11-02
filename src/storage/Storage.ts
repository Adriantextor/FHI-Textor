import { User } from '../classes/User';
import { Workout } from '../classes/Workout';
import { WorkoutLog } from '../classes/WorkoutLog';

export class Storage {
    private static instance: Storage;
    private users: User[];
    private workoutLogs: Map<string, WorkoutLog>; // email -> WorkoutLog
    private userId: number;

    private constructor() {
        this.users = [];
        this.workoutLogs = new Map();
        this.userId = 1;
    }

    static getInstance(): Storage {
        if (!this.instance) {
            this.instance = new Storage();
        }
        return this.instance;
    }

    getNextId(): number {
        return this.userId++;
    }

    // User operations
    getAllUsers(): User[] {
        return this.users;
    }

    getUserByEmail(email: string): User | undefined {
        return this.users.find(user => user['email'] === email);
    }

    addUser(user: User): void {
        this.users.push(user);
        this.workoutLogs.set(user['email'], new WorkoutLog(user));
    }

    deleteUserByEmail(email: string): void {
        this.users = this.users.filter(user => user['email'] !== email);
        this.workoutLogs.delete(email);
    }

    // WorkoutLog operations
    getWorkoutLog(email: string): WorkoutLog | undefined {
        return this.workoutLogs.get(email);
    }

    addWorkoutToLog(email: string, workout: Workout): void {
        const log = this.workoutLogs.get(email);
        if (log) {
            log.addWorkout(workout);
        }
    }
}