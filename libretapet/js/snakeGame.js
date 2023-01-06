document.addEventListener('DOMContentLoaded, () => {
  const squares = document.querySelectorAll('.grid div');
  const scoreDisplay = document.querySelectorAll('span');
  const startBtn = document.querySelector('.start');

  const width = 10;
  let currentIndex = 0; // PRIMER DIV DEL grid
  let appleIndex = 0; // primer div del grid
  let currentSnake = [2,1,0] ;// luego div del grid se torna 2 (cabeza) y empieza cola con 1s veniendo el cuerpo en lo seguiente
  let direction = 1;
  let speed = 0.9;
  let intervalTime = 0;
  let interval = 0;

  //function para iniciar

function startGame(){
  currentSnake.forEach(index => squares[index].classList.remove('snake'))
  squares[appleIndex].classList.remove('apple')
  clearInterval(interval)
  score = 0;
  //al azar crea apple
  direction = 1;
  scoreDisplay.innerText = score;
  intervalTime = 1000;
  currentSnake = [2, 1, 0];
  currentIndex = 0
  currentSnake.forEach(index => squares[index].classList.add('snake'))
  interval = setInterval(moveOutcomes, intervalTime)
}

// functions para possibilidades snake cuando sali del grid y vuelve hacia si 
function moveOutComes(){
  if(
      //cuando sali y se choco contra border bajo
    (currentSnake[0] + width >= (width = width) && direction === width)||
      // si snake choca con border derecho
    (currentSnake[0] % width === width -1 && direction === 1)||
      // si snake  choca contra pared  izquierdo
    (currentSnake[0] % width === 0 && direction === -1)||
      // cuando snake choca border superior
    (currentSnake[0] - width < 0 && direction === -width)||
      // cuando snake se volve hacia si mismo
    squares[currentSnake[0] + direction].classList.contains('snake')
  ){
    // retorna limpieza de intervalo se  existia algun puntaje anterior
    return clearInterval(interval)
  }
    // retira ultimo item del array y lo muestra
  const tail = currentSnake.pop()
    // retira classe de snake desde longitud 
  squares[tail].classList.remove('snake')
    // da direccioon de cabeza del array snake
  currentSnake.unshift(currentSnake[0] + direction)
    
  // comiendo manzana
    if(squares[currentSnake[0] + direction].classList.contains('apple')){
    squares[currentSnake[0]].classList.remove('apple')
    squares[tail].classList.add('snake')
    currentSnake.push('tail')

    // manzana aleatoria()
    score++
    scoreDisplay.textContent = score
    clearInterval(interval)
    // puntaje es intervalo x velocidade
    intervalTime = interval * speed
    interval = setInterval(moveOutComes, intervalTime)
    }
  squares[currentSnake[0]].classList.add('snake')
}

  // function para manzana aleatoria
  function randomApple(){
    do{
      appleIndex = Math.floor(Math.random()*squares.length)
    }
}



  // function para keyboard controls
  function control(e){
    squares[currentIndex].classList.remove('snake') // remove class de la snake
    if(e.keyCode === 39){
      direction = 1; // codigo para tecla derecha de keyboard movimienta 1 a la derecha(delante inicial)
    } else if( e.keyCode === 38){
      direction -width // pressionar flecha arriba sube 1 cuadrado
    } else if( e.keyCode === 37){
      direction = -1 // pressionar flecha izqquierda es 1 div a la izquierda
    } else if( e.keyCode === 40){
      direction = +width; // pressionar bajo mueve 1 div hacia bajo desde el div que estas
    }
  }
  document.addEventListener('keyup', control)
});