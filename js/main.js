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
        test(e){
            this.snake.movingHead(e.code)
            this.setSnakePresence()
            this.game.isGameOver = this.snake.collision
            if(this.game.isGameOver){
                console.log('A perdu')
            }            
        }
    }
}

Vue.createApp(app).mount('#snakeApp');