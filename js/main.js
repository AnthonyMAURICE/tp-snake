import { Game } from './Game.js'
import { SnakeHead } from './SnakeHead.js'
import { Food } from './Food.js'

const app = {
    data() {
        return {
            game: new Game(20, 30, new SnakeHead(10, 10), new Food()),
            speed: 200,
            lost: false,
            score: 0,
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
        this.game.snake.createSnakeBaseBody()
        this.game.setSnakePresence()
        const body = document.querySelector("body");
        body.onkeydown = this.setDir
    },
    
    methods: {
        launchGame(){
            this.launched = true
            this.game.hideLastRowsColumns()
            const body = document.querySelector("body");
            body.onkeydown = this.setDir
            this.intervalController()
        },
        intervalController(){
            if(this.paused){
                clearInterval(this.intervals.snake)
                clearInterval(this.intervals.items)
                this.intervals.snake = null
                this.intervals.items = null
            }else{
                this.intervals.snake = setInterval(this.move, this.speed)
                this.intervals.items = setInterval(this.itemDisplay, 5000)
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
            }
        },
        itemDisplay(){
            if(!this.game.isGameOver){
                if(this.getRandomArbitrary(1, 5) <= 2){
                    this.game.setItem(false)
                }else{
                    this.game.setItem(true)
                }
            }
        },
        reload(){
            location.reload()
        },
        getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
        },
        pause(){
            this.paused = this.paused ? false : true
            this.intervalController()
        }
    }
}

Vue.createApp(app).mount('#snakeApp');