class Game{
    constructor(height, width, snake, food){
        this.score = 0
        this.level = 1
        this.isGameOver = false
        this.height = height + 2
        this.width = width + 2
        this.snake = snake
        this.food = food
        this.itemArray = []
    }

    getHeigth(){
        return this.height
    }

    getWidth(){
        return this.width
    }

    hideLastRowsColumns(){
        const gridelems = document.querySelectorAll('td')
        gridelems.forEach((elem) => {
            if(elem.dataset.posx == this.width || elem.dataset.posy == this.height || elem.dataset.posx == 1 || elem.dataset.posy == 1){
                elem.style.display = 'none'
            }
        })
    }

    setSnakePresence(){
        const gridelems = document.querySelectorAll('td')
        for(let elem of gridelems){
            if(elem.dataset.type != 'food' && elem.dataset.type !='trap'){
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
    setItem(_food){
        const gridelems = document.querySelectorAll('td')
        let randElem = gridelems[Math.floor(Math.random()*gridelems.length)]
        this.itemArray.push(randElem)
        for(let item of this.snake.bodyElem){
            if(!this.checkIfSnakeBody(item, randElem) && !this.checkIfSnakeHead(randElem)){
                randElem.style.backgroundColor = _food ? 'green' : 'red'
                randElem.dataset.type = _food ? 'food' : 'trap'
                randElem.style.borderRadius = '15px'
            }else{
                randElem.style.backgroundColor = 'lightblue'
                randElem.style.border = 'none'
            }
        }
        
    }

    eat(){
        let growing = false
        for(let elem of this.itemArray){
            if(this.snake.getPosX() == elem.dataset.posx && this.snake.getPosY() == elem.dataset.posy){
                if(elem.dataset.type == 'food'){
                    growing = true
                    elem.dataset.type = ''
                }else if(elem.dataset.type == 'trap'){
                    elem.style.backgroundColor = 'red'
                    elem.style.borderRadius = '15px'
                    elem.style.border = '5px solid goldenrod'
                    elem.classList.add('anim')
                    this.isGameOver = true
                }else{
                    elem.dataset.type = ''
                }
                
            }
        }
        if(growing){
            this.snake.grow()
        }
    }

    teleport(){
        if(this.snake.getPosX() <1 && this.snake.direction == 'ArrowLeft'){
            this.snake.posX = this.width
        }else if(this.snake.getPosX() > this.width && this.snake.direction == 'ArrowRight'){
            this.snake.posX = 1
        }else if(this.snake.getPosY() < 1 && this.snake.direction == 'ArrowUp'){
            this.snake.posY = this.height
        }else if(this.snake.getPosY() > this.height && this.snake.direction == 'ArrowDown'){
            this.snake.posY = 1
        }else{
            return 'Something went wrong here...'
        }
    }

}

export {Game}