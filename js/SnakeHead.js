import { Direction } from './Directions.js'
import { MovingItems } from './MovingItems.js'
import { SnakeBodyElem } from './SnakeBodyElem.js'

class SnakeHead extends MovingItems{
    constructor(posX, posY){
        super(posX, posY)
        this.bodyElem = []
        this.direction = Direction.Right
    }

    createSnakeBaseBody(){
        this.bodyElem.push(new SnakeBodyElem(this.posX -1, this.posY))
        this.bodyElem.push(new SnakeBodyElem(this.posX -2, this.posY))
        this.bodyElem.push(new SnakeBodyElem(this.posX -3, this.posY))
    }

    setPosX(_newX){
        this.posX = _newX
    }

    setPosY(_newY){
        this.posY = _newY
    }

    moving(_direction){
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
        const temp = {
            posX: this.bodyElem[0].getPosX(),
            posY: this.bodyElem[0].getPosY()
        }
        for(let i = 0; i < this.bodyElem.length; i++){
            if(i == 0){
                this.bodyElem[0].moving(lastHeadPos.posX, lastHeadPos.posY)
            }else{

                this.bodyElem[i].moving(temp.posX, temp.posY)
                console.log(this.bodyElem[i])
            }
        }
            
    }

    checkCollision(){
        let collided = false
        const headPos = {
            posX: this.getPosX(),
            posY: this.getPosY()
        }
        this.bodyElem.forEach((elem) => {
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