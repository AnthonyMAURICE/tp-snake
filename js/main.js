import { Game } from './Game.js'
import { SnakeHead } from './SnakeHead.js'

const app = {
    data() {
        return {
            game: new Game(),
            snake: new SnakeHead(10, 10),
            direction: 'Right'
        }
    },
    mounted(){
        this.snake.createSnakeBaseBody()
        this.setSnakePresence()
        const body = document.querySelector("body");
        body.onkeydown = this.test
    },
    methods: {
        setSnakePresence(){
            const gridelems = document.querySelectorAll('td')
            for(let elem of gridelems){
                if(this.checkIfSnakeHead(elem) || this.checkIfSnakeBody(elem)){
                    elem.style.backgroundColor = 'black'
                }else{
                    elem.style.backgroundColor = 'white'
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
        checkIfSnakeBody(_elem){
            for(let item of this.snake.bodyElem){
                if(item.getPosX() == _elem.dataset.posx && item.getPosY() == _elem.dataset.posy){
                    return true
                }else{
                    return false
                }
            }
        },
        test(e){
            this.snake.movingHead(e.code)
            this.setSnakePresence()
            this.game.isGameOver = this.snake.checkCollision() ? true : false
        }
    }
}

Vue.createApp(app).mount('#snakeApp');