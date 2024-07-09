import { Game } from './Game.js'
import { SnakeHead } from './SnakeHead.js'
import { Food } from './Food.js'

const app = {
    data() {
        return {
            game: new Game(25, 30, new SnakeHead(10, 10), new Food()),
            speed: 333,
            lost: false,
            score: 0
        }
    },
    mounted(){
        this.game.snake.createSnakeBaseBody()
        this.game.setSnakePresence()
        const body = document.querySelector("body");
        setInterval(this.move, this.speed)
        setInterval(this.foodDisplay, 5000)
        body.onkeydown = this.setDir
    },
    methods: {
        setDir(e){
            this.game.snake.direction = e.code
        },
        move(){
            let length = this.game.snake.bodyElem.length
            this.game.snake.moving()
            this.game.teleport()
            this.game.setSnakePresence()
            this.game.eat()
            this.game.isGameOver = this.game.snake.checkCollision()
            if(this.game.isGameOver){
                document.getElementById('game-grid').remove()
                this.lost = true
            }
            if(this.game.snake.bodyElem.length > length && this.speed > 50){
                this.speed -= 15
                this.score++
            }
        },
        foodDisplay(){
            if(this.game.food.isOnGrid < 3){
                this.game.setFood()
                this.game.food.isOnGrid++
            }
        }
        
    }
}

Vue.createApp(app).mount('#snakeApp');