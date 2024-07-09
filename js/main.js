import { Game } from './Game.js'
import { SnakeHead } from './SnakeHead.js'
import { Food } from './Food.js'
import { Bomb } from './Bomb.js'

const app = {
    data() {
        return {
            game: new Game(25, 30, new SnakeHead(10, 10), new Food()),
            speed: 200,
            lost: false,
            score: 0,
            body: document.querySelector("body")
        }
    },
    mounted(){
        this.game.snake.createSnakeBaseBody()
        this.game.setSnakePresence()
        const body = document.querySelector("body");
        this.launchGame()
        body.onkeydown = this.setDir
    },
    
    methods: {
        launchGame(){
            let intervalSnake = null
            let intervalFood = null
            if(this.lost){
                clearInterval(intervalSnake)
                clearInterval(intervalFood)
            }else{
                intervalSnake = setInterval(this.move, this.speed)
                intervalFood = setInterval(this.foodDisplay, 5000)
            }
        },
        setDir(e){
            this.game.snake.direction = e.code
        },
        move(){
            let length = this.game.snake.bodyElem.length
            if(!this.game.isGameOver){
            this.game.snake.moving()
            this.game.teleport()
            this.game.setSnakePresence()
            this.game.eat()
            this.game.isGameOver = this.game.snake.checkCollision()
            
            }else{
                if(document.getElementById('game-grid') != null){
                    document.getElementById('game-grid').remove()
                }
                this.lost = true
                this.launchGame()
            }
            
            if(!this.game.isGameOver && this.game.snake.bodyElem.length > length){
                this.score++
            }
        },
        foodDisplay(){
            if(this.game.food.isOnGrid < 3 && !this.lost){
                this.game.setFood()
                this.game.food.isOnGrid++
            }
        },
        reload(){
            location.reload()
        }
    }
}

Vue.createApp(app).mount('#snakeApp');