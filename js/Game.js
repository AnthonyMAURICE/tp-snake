class Game{
    constructor(){
        this.score = 0
        this.level = 1
        this.isGameOver = false
        this.height = 25
        this.width = 30
    }

    getHeigth(){
        return this.height
    }

    getWidth(){
        return this.width
    }
}

export {Game}