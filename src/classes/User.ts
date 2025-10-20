// Trieda User reprezentuje používateľa (osobu, ktorá cvičí)
export class User {
    private name: string;
    private email: string;

    constructor(name:string, email:string ){
        this.name=name;
        this.email=email;
    }

    getName():string{
        return this.name;
    }
}

