class MovingItems{
    
    constructor(_posX, _posY) {
        if (this.constructor === MovingItems) {
            throw new TypeError('Abstract class "MovingItems" cannot be instantiated directly');
        }
        this.posX = _posX
        this.posY = _posY
        
        
    }
    
    getPosX(){
        return this.posX
    }

    getPosY(){
        return this.posY
    }

    
}

export { MovingItems }