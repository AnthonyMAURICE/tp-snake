class Game{
    constructor(height, width, snake, food){
        this.score = 0
        this.level = 1
        this.isGameOver = false
        this.height = height
        this.width = width
        this.snake = snake
        this.food = food
        this.foodArray = []
    }

    getHeigth(){
        return this.height
    }

    getWidth(){
        return this.width
    }

    setSnakePresence(){
        const gridelems = document.querySelectorAll('td')
        for(let elem of gridelems){
            if(elem.style.backgroundColor != 'green'){
                elem.style.backgroundColor = 'lightblue'
                elem.style.border = 'none'
            }
            if(this.checkIfSnakeHead(elem)){
                elem.style.backgroundColor = '#1d1d1d'
                elem.style.border = '2px solid black'
                elem.style.borderRadius = '0px'
            }
            for(let item of this.snake.bodyElem){
                if(this.checkIfSnakeBody(item, elem)){
                    elem.style.backgroundColor = '#1d1d1d'
                    elem.style.border = '2px solid black'
                    elem.style.borderRadius = '0px'
                }
            }
        }
    }
    checkIfSnakeHead(_elem){
        if(this.snake.getPosX() == _elem.dataset.posx && this.snake.getPosY() == _elem.dataset.posy){
            return true
        }else{
            return false
        }
    }
    checkIfSnakeBody(item, _elem){
        if(item.posX == _elem.dataset.posx && item.posY == _elem.dataset.posy){
            return true
        }else{
            return false
        }
    }
    setFood(){
        const gridelems = document.querySelectorAll('td')
        let randElem = gridelems[Math.floor(Math.random()*gridelems.length)]
        this.foodArray.push(randElem)
        for(let item of this.snake.bodyElem){
            if(!this.checkIfSnakeBody(item, randElem) && !this.checkIfSnakeHead(randElem)){
                randElem.style.backgroundColor = 'green'
                randElem.style.borderRadius = '15px'
            }   
        }
        
    }

    eat(){
        let growing = false
        for(let elem of this.foodArray){
            if(this.snake.getPosX() == elem.dataset.posx && this.snake.getPosY() == elem.dataset.posy){
                growing = true
            }
        }
        if(growing){
            this.food.isOnGrid--
            this.snake.grow()
        }
    }

    teleport(){
        if(this.snake.getPosX() == 0 && this.snake.direction == 'ArrowLeft'){
            this.snake.posX = this.width
        }else if(this.snake.getPosX() > this.width && this.snake.direction == 'ArrowRight'){
            this.snake.posX = 0
        }else if(this.snake.getPosY() == 0 && this.snake.direction == 'ArrowUp'){
            this.snake.posY = this.height
        }else if(this.snake.getPosY() > this.height && this.snake.direction == 'ArrowDown'){
            this.snake.posY = 0
        }else{
            return 'Something went wrong here...'
        }
    }

}

export {Game}