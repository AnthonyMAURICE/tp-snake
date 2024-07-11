import { StaticItem } from "./StaticItems.js"

class Bomb extends StaticItem{
    constructor(posX, posY){
        super(posX, posY)
        this.background = 'red'
        this.type = 'trap'
    }

}

export {Bomb}