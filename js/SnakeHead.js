import { Direction } from './Directions.js'
import { MovingItems } from './MovingItems.js'
import { SnakeBodyElem } from './SnakeBodyElem.js'

class SnakeHead extends MovingItems{
    constructor(posX, posY){
        super(posX, posY)
        this.bodyElem = []
        this.direction = Direction.Right
        this.collision = false
    }

    createSnakeBaseBody(){
        this.bodyElem.push(new SnakeBodyElem(this.posX -1, this.posY))
        this.bodyElem.push(new SnakeBodyElem(this.posX -2, this.posY))
        console.log(this.bodyElem)
    }

    setPosX(_newX){
        this.posX = _newX
    }

    setPosY(_newY){
        this.posY = _newY
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
        if(!this.checkCollision()){
            this.bodyElem.forEach(function(elem){
            elem.posX = lastHeadPos.posX
            elem.posY = lastHeadPos.posY
        })
        }else{
            this.collision = true
        }
    }

    checkCollision(){
        let collided = false
        const headPos = {
            posX: this.getPosX(),
            posY: this.getPosY()
        }
        this.bodyElem.forEach(function(elem){
            if(elem.posX == headPos.posX && elem.posY == headPos.posY){
                collided = true
            }else{
                collided = false
            }
        })
        return collided
    }
}

export { SnakeHead }