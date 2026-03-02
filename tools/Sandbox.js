function generatePrimes() {
    let primes = new Array(10**6+1).fill(true);
    primes[1] = false;
    let max = 10**6;
    for(let i = 2; i < 10**6+1; i++) {
        if(primes[i]) {
            for(let j = 2; i * j <= max; j++) {
                primes[i*j] = false;
            }
        }
    }
    return primes;
}
console.log(generatePrimes());