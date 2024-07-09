import { StaticItem } from "./StaticItems.js"

class Food extends StaticItem{
    constructor(posX, posY){
        super(posX, posY)
        this.isEaten = false
        this.isOnGrid = 0
    }

}

export {Food}