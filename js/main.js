import { Game } from './Game.js'
import { SnakeHead } from './SnakeHead.js'
import { Food } from './Food.js'

const app = {
    data() {
        return {
            game: new Game(25, 30, new SnakeHead(10, 10), new Food())
        }
    },
    mounted(){
        this.game.snake.createSnakeBaseBody()
        this.game.setSnakePresence()
        const body = document.querySelector("body");
        setInterval(this.move, 500)
        setInterval(this.foodDisplay, 5000)
        body.onkeydown = this.setDir
    },
    methods: {
        setDir(e){
            this.game.snake.direction = e.code
        },
        move(){
            this.game.snake.moving()
            this.game.setSnakePresence()
            this.game.isGameOver = this.game.snake.checkCollision()
            if(this.game.isGameOver){
                document.getElementById('game-grid').remove()
                document.getElementById('lost').textContent = "PERDU !"
            }            
        },
        foodDisplay(){
            if(this.game.food.isOnGrid < 3){
                this.game.setFood()
                this.game.food.isOnGrid++
            }
        },
        eat(){
            for(let elem of this.game.foodArray){
                if(this.game.snake.getPosX() == elem.getPosX() && this.game.snake.getPosY() == elem.getPosY()){
                    elem.isEaten = true
                    this.game.food.isOnGrid--
                    this.game.snake.grow()
                }
            }
        }
    }
}

Vue.createApp(app).mount('#snakeApp');