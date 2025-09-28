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
console.log("2. úloha");
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
console.log("3. úloha");
console.log(jePalindrom("abba"));
console.log(jePalindrom("nie je palindrom"), "\n");




//4. úloha mocnina
function mocnina(a:number, n:number){
    return a**n;
}
console.log("4. úloha");
console.log(mocnina(-2,5))
console.log("\n");


//5. úloha Fibonacci

function fibonacci(pocet: number){
    let a:number=0;
    let b:number = 1;

    console.log(a);
    console.log(b);

    for (let i=2; i<pocet;i++){
        let nove = a+b;
        a=b;
        b=nove;
        console.log(nove);
    }
}
console.log("5. úloha");
fibonacci(11);
console.log("\n");

//6. úloha

function faktorial(vstupn:number){

    if (vstupn <= 0) {
        console.log("Zadaj celé čislo >0")
        return;
    }
    let vysledok1 = 1;
    let postup = vstupn + "! = ";
    for (let i = vstupn; i >= 1; i--) {
        vysledok1 *= i;
        postup += i;
        if (i > 1) {
            postup += ".";
        }
    }

    postup += " = " + vysledok1;
    console.log(postup);
}
console.log("6. úloha");
faktorial(5);
faktorial(0);
console.log("\n");


//7. úloha
function taxi(km:number, cakanievmin:number, znecistenie:string){
    let zaklSuma:number = 1.50;
    if (km>5){
        zaklSuma +=((km-5) * 0.75)
    }
    zaklSuma += ((cakanievmin /60)*10);

    if (znecistenie.toLowerCase() === "a"){
        zaklSuma += 20;
    }

    console.log(zaklSuma.toFixed(2)+"eur")
}
console.log("7. úloha");
taxi(15, 5, "n");
taxi(10, 10, "a");
console.log("\n");

//8. úloha
function baltimoresky(text:string){
    const veta: { [key:string]: string} = {
        "B": "1",
        "A": "2",
        "L": "3",
        "T": "4",
        "I": "5",
        "M": "6",
        "O": "7",
        "R": "8",
        "E": "9",
        "S": "10",
        "K": "11",
        "Y": "12"
    };

    let vysledok2 = ";";
    for (let znak of text){
        let velke = znak.toUpperCase();
        if(veta[velke]){
            vysledok2 += veta[velke];
        } else {
            vysledok2 += znak;
        }
    }
    console.log(vysledok2)
}
console.log("8. úloha");
baltimoresky("To nemyslíze vážne!");
