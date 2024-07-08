import { MovingItems } from './MovingItems.js'

class SnakeBodyElem extends MovingItems{
    constructor(itemX, itemY){
        super(itemX, itemY)
    }

    moving(_previousX, _previousY){
        this.posX = _previousX
        this.posY = _previousY
    }

}

export { SnakeBodyElem }