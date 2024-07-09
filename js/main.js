import { Game } from './Game.js'
import { SnakeHead } from './SnakeHead.js'

const app = {
    data() {
        return {
            game: new Game(),
            snake: new SnakeHead(10, 10),
        }
    },
    mounted(){
        this.snake.createSnakeBaseBody()
        this.setSnakePresence()
        const body = document.querySelector("body");
        setInterval(this.move, 500)
        body.onkeydown = this.setDir
    },
    methods: {
        setSnakePresence(){
            const gridelems = document.querySelectorAll('td')
            for(let elem of gridelems){
                elem.style.backgroundColor = 'white'
                if(this.checkIfSnakeHead(elem)){
                    elem.style.backgroundColor = 'black'
                }
                for(let item of this.snake.bodyElem){
                    if(this.checkIfSnakeBody(item, elem)){
                        elem.style.backgroundColor = 'black'
                    }
                }
            }
        },
        checkIfSnakeHead(_elem){
            if(this.snake.getPosX() == _elem.dataset.posx && this.snake.getPosY() == _elem.dataset.posy){
                return true
            }else{
                return false
            }
        },
        checkIfSnakeBody(item, _elem){
            if(item.getPosX() == _elem.dataset.posx && item.getPosY() == _elem.dataset.posy){
                return true
            }else{
                return false
            }
        },
        setDir(e){
            this.snake.direction = e.code
        },
        move(){
            this.snake.moving()
            this.setSnakePresence()
            this.game.isGameOver = this.snake.checkCollision()
            if(this.game.isGameOver){
                document.getElementById('game-grid').remove()
                document.getElementById('lost').textContent = "PERDU !"
            }            
        }
    }
}

Vue.createApp(app).mount('#snakeApp');