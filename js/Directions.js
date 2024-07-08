class Direction {
    static Up = new Direction('ArrowUp');
    static Down = new Direction('ArrowDown');
    static Left = new Direction('ArrowLeft');
    static Right = new Direction('ArrowRight');

    constructor(name) {
        this.name = name;
    }
}

export { Direction }