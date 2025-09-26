
function bmiIndex(weight: number, height: number){
    const heightCm: number = height / 100;
    const heightnadruhu: number = heightCm **2;

    return weight/heightnadruhu;
}

console.log(bmiIndex(100, 198))




function mocnina(a:number, n:number){
    return a**n;
}
console.log(mocnina(-2,5))




