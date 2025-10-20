// Trieda Exercise reprezentuje konkrétny cvik (napr. Bench Press) s viacerými sériami

import { Set } from './Set';

export class Exercise{
    private name: string;
    private sets: Set[];

    constructor(name:string){
        this.name = name;
        this.sets = []; // začína prázdne, série sa pridávajú postupne
    }
    // Getter pre názov cviku
    getName():string{
        return this.name;
    }

    // Pridá novú sériu do cviku
    addSet(set: Set):void{
        this.sets.push(set);
    }


    // Vypočíta celkový objem pre daný cvik (súčet reps * váha pre všetky série)
    totalVolume(): number{
        return this.sets.reduce((total,set) =>
            total + (set.getReps() * set.getWeight()), 0
        );
    }
}