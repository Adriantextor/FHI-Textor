// Trieda Set reprezentuje jednu sériu cviku (počet opakovaní a váha)
export class Set{
    private reps: number; // počet opakovaní v sérii
    private weight: number; // váha (v kg) použitá v sérii

    constructor(reps: number, weight: number){
        this.reps = reps;
        this.weight = weight;
    }
    // Getter na počet opakovaní
    getReps():number{
        return this.reps
    }
    // Getter na váhu
    getWeight():number{
        return this.weight
    }
}