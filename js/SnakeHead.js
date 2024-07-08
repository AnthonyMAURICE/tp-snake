import { Direction } from './Directions.js'
import { MovingItems } from './MovingItems.js'
import { SnakeBodyElem } from './SnakeBodyElem.js'

class SnakeHead extends MovingItems{
    constructor(itemX, itemY){
        super(itemX, itemY)
        this.bodyElem = []
        this.direction = Direction.Right
    }

    createSnakeBaseBody(){
        this.bodyElem.push(new SnakeBodyElem(this.posX -1, this.posY))
    }

    setPosX(_newX){
        this.posX = _newX
    }

    setPosY(_newY){
        this.posY = _newY
    }

    setNewDirection(_newDir){
        this.direction = _newDir
    }

    movingHead(_direction){
        const lastHeadPos = {
            posX: this.getPosX(),
            posY: this.getPosY()
        }
        switch(_direction){
            case Direction.Up.name:
                this.posY--
                break
            case Direction.Down.name:
                this.posY++
                break
            case Direction.Left.name:
                this.posX--
                break
            case Direction.Right.name:
                this.posX++
                break
            default:
                'something went really wrong'
        }
        this.bodyElem.forEach(function(elem){
            elem.posX = lastHeadPos.posX
            elem.posY = lastHeadPos.posY
        })
    }

    checkCollision(){
        this.bodyElem.some(function(elem){
            elem.posX == this.getPosX()
            elem.posY == this.getPosY()
        })
    }
}

export { SnakeHead }