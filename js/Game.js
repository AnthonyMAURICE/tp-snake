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
                elem.style.backgroundColor = 'white'
            }
            if(this.checkIfSnakeHead(elem)){
                elem.style.backgroundColor = 'black'
            }
            for(let item of this.snake.bodyElem){
                if(this.checkIfSnakeBody(item, elem)){
                    elem.style.backgroundColor = 'black'
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
                this.foodArray.push(randElem)
                for(let elem of this.foodArray){
                    elem.style.backgroundColor = 'green'
                }
            }   
        }
    }
}

export {Game}