
let legendary = 'LEGENDARY!';
let legen = prompt('How I Met Your Mother? It was Legen...Wait for it...');
let dary = 'dary';
let wrong = 'Wrong.';
let wrongAgain = 'Yeah, you are wrong again.'
let wrongLast = 'Really? Wrong, AGAIN.'


while (legen.toLowerCase() != dary) {
    alert('Wait for it...'+ wrong);
    legen = prompt('How I Met Your Mother? It was Legen...Wait for it...');
    alert('Wait for it...'+ wrongAgain);
    legen = prompt('How I Met Your Mother? It was Legen...Wait for it...');
    alert('Wait for it...'+ wrongLast);
    legen = prompt('How I Met Your Mother? It was Legen...Wait for it...');
}

alert('How I Met Your Mother? It was...' + legendary);