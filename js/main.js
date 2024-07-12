import { Game } from './Game.js'
import { SnakeHead } from './SnakeHead.js'
import { Food } from './Food.js'
import { Bomb } from './Bomb.js'

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
    methods: {
        launchGame(){
            this.body.onkeydown = this.setDir
            this.paused = false
            this.launched = true
            this.game = new Game(22, 32, new SnakeHead(15, 10))
            if(this.level == 1){
                this.hideLastRowsColumns()
            }
            this.game.reinit()
            this.game.snake.createSnakeBaseBody()
            this.setSnakePresence()
            this.intervalController()
        },
        hideLastRowsColumns(){
            const gridelems = document.querySelectorAll('td')
            gridelems.forEach((elem) => {
                if(elem.dataset.posx == this.game.width || elem.dataset.posy == this.game.height || elem.dataset.posx == 1 || elem.dataset.posy == 1){
                    elem.style.display = 'none'
                }
            })
        },
    
        setSnakePresence(){
            const gridelems = document.querySelectorAll('td')
            for(let elem of gridelems){
                if(elem.dataset.type != 'food' && elem.dataset.type !='trap'){
                    elem.style.backgroundColor = 'grey'
                    elem.style.border = 'none'
                    elem.dataset.type = ''
                }
                for(let item of this.game.snake.bodyElem){
                    if(this.game.checkIfSnakeBody(item, elem) || this.game.checkIfSnakeHead(elem)){
                        elem.style.backgroundColor = this.game.snake.background
                        elem.style.border = '2px solid black'
                        elem.style.borderRadius = '0px'
                    }
                }
            }
        },
        intervalController(){
            if(this.paused){
                clearInterval(this.intervals.snake)
                clearInterval(this.intervals.items)
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
            this.setSnakePresence()
            this.game.eat()
            if(!this.game.isGameOver){
                this.game.isGameOver = this.game.snake.checkCollision()
            }
            }else{
                if(document.getElementById('game-grid') != null){
                    document.getElementById('game-grid').remove()
                }
                this.lost = this.game.isGameOver
                clearInterval(this.intervals.snake)
                clearInterval(this.intervals.items)
            }
            
            if(!this.game.isGameOver && this.game.snake.bodyElem.length > length){
                this.score++
                if(this.score %10 == 0){
                    this.speedSnake /= 1.2
                    this.speedItems /= 1.2
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
                    this.setItem(false)
                }else{
                    this.setItem(true)
                }
            }
        },
        setItem(_food){
            let occupiedSpace = false
            const gridelems = document.querySelectorAll('td')
            let randElem = gridelems[Math.floor(Math.random()*gridelems.length)]
            this.game.foodOrTrap = _food ? new Food(randElem.posx, randElem.posy) : new Bomb(randElem.posx, randElem.posy)
            this.game.itemArray.push(randElem)
            for(let item of this.game.snake.bodyElem){
                if(this.game.checkIfSnakeBody(item, randElem) || this.game.checkIfSnakeHead(randElem) || this.game.checkIfFoodOrTrap(randElem)){
                    occupiedSpace = true
                }
            }
            if(!occupiedSpace){
                randElem.style.backgroundColor = this.game.foodOrTrap.background
                randElem.dataset.type = this.game.foodOrTrap.type
                randElem.style.borderRadius = '15px'
            }else{
                randElem.style.backgroundColor = 'grey'
                randElem.style.border = 'none'
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