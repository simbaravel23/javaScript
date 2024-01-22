let canvas = document.getElementById("snake");

//irá renderizar o joguinho
//irá tratar o arquivo como um 2d
let context = canvas.getContext("2d");
let box = 32;//tamanho dos quadradinhos
let snake = [];

//tamanho da cobrinha.
snake[0] = {
    x:8 * box,
    y:8 * box
}

let direction = "right"

//Colocando a minha comidinha em posições aleatórias
//Math.random irá retornar um número aleatório até 1
//OBS: Math.floor retira a parte flutuante do Math.random
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

//funções de desenho
function criarBG(){
    context.fillStyle = "lightblue";
    
    //irá desenhar o retangulo onde o jogo irá acontecer 
    //trabalha com a posição de x e y, altura e largura
    context.fillRect(0, 0, 16 * box, 16 * box)
}

function criarCobrinha(){
    for(i=0; i < snake.length; i++){
        context.fillStyle = "black";
        context.fillRect(snake[i].x, snake[i].y, box, box)
    }

}

function drawFood(){
    context.fillStyle = "darkblue";
    context.fillRect(food.x, food.y, box, box);
}

//keydown significa que estamos escutando as teclas 
document.addEventListener("keydown", update)

//37 = para direita
//38 = para baixo 
//39 = para esquerda
//40 = para cima
function update(event){
    //se a direção não for ao contrario ela muda
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarJogo(){
    //fazendo a cobrinha não sumir do espaço definido para o jogo 
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    //parando o jogo caso a cobrinha bata o próprio corpinho
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert("Game Over X(");        
        }
    }
    

    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //criando coordenadas de aumentar ou diminuir a cobrinha
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "down") snakeY += box;
    if(direction == "up") snakeY -= box;

    //condição para a cobrinha comer a comidinha e ela aparecer em outro lugar aleatorio, e assim a cobrinha irá crescendo
    if(snakeX != food.x || snakeY != food.y){
        snake.pop(); //tira o último elemento do array
    }
    else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }
    

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    //adiciona um elemento a frente
    snake.unshift(newHead);
}

//intervalo de 100 milisegundos para ir atualizando o joguinho
let jogo = setInterval(iniciarJogo, 100);