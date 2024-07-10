import { Game } from './Game.js'
import { SnakeHead } from './SnakeHead.js'
import { Food } from './Food.js'

const app = {
    data() {
        return {
            game: '',
            speedSnake: 200,
            speedItems: 3000,
            lost: false,
            score: 0,
            level: 1,
            paused: false,
            launched: false,
            body: document.querySelector("body"),
            intervals: {
                snake: null,
                items: null
            }
        }
    },
    mounted(){
        this.body.onkeydown = this.setDir
    },
    
    methods: {
        launchGame(){
            this.game = new Game(20, 30, new SnakeHead(15, 10), new Food())
            this.game.hideLastRowsColumns()
            this.game.reinit()
            this.game.snake.createSnakeBaseBody()
            this.game.setSnakePresence()
            this.paused = false
            this.launched = true
            this.intervalController()
        },
        intervalController(){
            if(this.paused){
                clearInterval(this.intervals.snake)
                clearInterval(this.intervals.items)
                this.intervals.snake = null
                this.intervals.items = null
            }else{
                this.intervals.snake = setInterval(this.move, this.speedSnake)
                this.intervals.items = setInterval(this.itemDisplay, this.speedItems)
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
            if(!this.game.isGameOver){
                this.game.isGameOver = this.game.snake.checkCollision()
            }
            }else{
                if(document.getElementById('game-grid') != null){
                    document.getElementById('game-grid').remove()
                }
                this.lost = true
                clearInterval(this.intervals.snake)
                clearInterval(this.intervals.items)
                this.intervals.snake = null
                this.intervals.items = null
            }
            
            if(!this.game.isGameOver && this.game.snake.bodyElem.length > length){
                this.score++
                if(this.score %10 == 0){
                    this.speedSnake /= 1.2
                    this.speedItems /= 2
                    this.level++
                    this.paused = true
                    this.intervalController()
                    this.launchGame()
                }
            }
        },
        itemDisplay(){
            if(!this.game.isGameOver){
                if(this.getRandom(1, 10) >= 4){
                    this.game.setItem(false)
                }else{
                    this.game.setItem(true)
                }
            }
        },
        reload(){
            location.reload()
        },
        getRandom(min, max) {
            return Math.random() * (max - min) + min;
        },
        pause(){
            this.paused = this.paused ? false : true
            this.intervalController()
        }
    }
}

Vue.createApp(app).mount('#snakeApp');