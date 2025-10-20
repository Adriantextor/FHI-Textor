
class person {
    meno: string;
    vek: number;
    mesto: string;

    constructor(meno: string, vek: number, mesto: string) {
        this.meno = meno;
        this.vek = vek;
        this.mesto = mesto;
    }
    pozdrav() {
        console.log(`Ahoj, volám sa ${this.meno}, mám ${this.vek} rokov a bývam v meste ${this.mesto}.`);
    }
}

abstract class zamestnanec extends person {
    abstract pozicia: string;

    protected constructor(meno: string, vek: number, mesto: string) {
        super(meno, vek, mesto);
    }
    pozdrav() {
        super.pozdrav();
        console.log(`Pracujem ako ${this.pozicia}.`);
    }
}

class Programator extends zamestnanec {
    pozicia: string = "Programátor";

    constructor(meno: string, vek: number, mesto: string) {
        super(meno, vek, mesto);
    }
}

let osoba1;
osoba1 = new person("Ján", 30, "Bratislava");
osoba1.pozdrav();

osoba1 = new Programator("Martin", 28, "Prešov");
osoba1.pozdrav();
