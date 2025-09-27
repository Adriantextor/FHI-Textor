//1. úloha BMI
function bmiIndex(weight: number, height: number){
    const heightCm: number = height / 100;
    const heightnadruhu: number = heightCm **2;

    return weight/heightnadruhu;
}
console.log("1. uĺoha BMI", bmiIndex(100, 198), "\n")


//2. úloha
function pocetPismen(veta: string){
    const malaVeta = veta.toLowerCase();
    const pocet: { [key: string]: number } = {};

    for (const znak of malaVeta) {

        if (znak >= 'a' && znak <= 'z') {

            if (pocet[znak]) {
                pocet[znak]++;
            } else {
                pocet[znak] = 1;
            }
        }
    }

    for (const znak in pocet) {
        console.log(znak, pocet[znak]);
    }
}

pocetPismen("Alabama");
console.log("\n");

//3. úloha
function jePalindrom(veta: string): boolean {

    let cistaVeta = veta.toLowerCase().replace(/\s+/g, '');
    let dlzka = cistaVeta.length;

    for (let i = 0; i < dlzka / 2; i++) {
        if (cistaVeta[i] !== cistaVeta[dlzka - 1 - i]) {
            return false;
        }
    }
    return true;
}
console.log(jePalindrom("abba"));
console.log(jePalindrom("nie je palindrom"), "\n");




//4. úloha mocnina
function mocnina(a:number, n:number){
    return a**n;
}
console.log(mocnina(-2,5))




