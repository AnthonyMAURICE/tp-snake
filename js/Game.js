class Game{
    constructor(height, width, snake, food){
        this.score = 0
        this.level = 1
        this.isGameOver = false
        this.height = height
        this.width = width
        this.snake = snake
        this.foodOrTrap = null
        this.itemArray = []
    }

    getHeigth(){
        return this.height
    }

    getWidth(){
        return this.width
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

    checkIfFoodOrTrap(_elem){
        if(_elem.dataset.type == 'food' || _elem.dataset.type == 'trap'){
            return true
        }else{
            return false
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
            console.log('It\'s normally normal')
        }
    }

    reinit(){
        const gridelems = document.querySelectorAll('td')
        gridelems.forEach((elem) => {
            elem.dataset.type = ''
        })
    }

}

export {Game}