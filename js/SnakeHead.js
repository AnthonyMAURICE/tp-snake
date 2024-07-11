import { Direction } from './Directions.js'
import { MovingItems } from './MovingItems.js'
import { SnakeBodyElem } from './SnakeBodyElem.js'

class SnakeHead extends MovingItems{
    constructor(posX, posY){
        super(posX, posY)
        this.bodyElem = []
        this.direction = Direction.Right.name
        this.background = '#1d1d1d'
    }

    createSnakeBaseBody(){
        this.bodyElem = []
        this.bodyElem.push(new SnakeBodyElem(this.posX -1, this.posY))
        this.bodyElem.push(new SnakeBodyElem(this.posX -2, this.posY))
        this.bodyElem.push(new SnakeBodyElem(this.posX -3, this.posY))
        this.bodyElem.push(new SnakeBodyElem(this.posX -4, this.posY))
    }

    moving(){
        let headPosX = this.getPosX()
        let headPosY = this.getPosY()
        switch(this.direction){
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
        for(let i = this.bodyElem.length - 1; i > 0; i--){
            this.bodyElem[i].moving(this.bodyElem[i-1].getPosX(), this.bodyElem[i-1].getPosY())
        }
        this.bodyElem[0].moving(headPosX, headPosY)
    }

    checkCollision(){
        let collide = false
        const headPos = {
            posX: this.getPosX(),
            posY: this.getPosY()
        }
        this.bodyElem.forEach((elem) => {
            if(elem.posX == headPos.posX && elem.posY == headPos.posY){
                collide = true
            }
        })
        return collide
    }

    grow(){
        this.bodyElem.push(new SnakeBodyElem(this.bodyElem[this.bodyElem.length -1].getPosX, this.bodyElem[this.bodyElem.length -1].posY))
    }


}

export { SnakeHead }