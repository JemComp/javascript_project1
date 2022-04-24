import Ball from "./ball";
// const Field = require(",/field")


class Game {

    constructor() {
        this.DIM_X = 1000;
        this.DIM_Y = 600;
        this.players = []; 
        this.ball = new Ball({ 
            pos: [this.DIM_X/2, this.DIM_Y/2],
            vel: [2,0]
        })
        this.ball.color = "yellow";
        this.ball.radius = 30;
        this.ball.mass = 50;
        this.ball2 = new Ball({ 
            pos: [this.DIM_X/2 + 50, this.DIM_Y/2 ],
            vel: [0, 10]
        })

        this.movable = [this.ball, this.ball2];
    }

    getDIM() {
        return [this.DIM_X, this.DIM_Y]
    }

    //new game
    reset() {
        this.ball = new Ball ({ 
            pos: [this.DIM_X/2, this.DIX_Y/2],
            vel: [0,0]
        })
    }

    //called every frame
    move() {
        this.checkCollisions();

        this.movable.forEach( (obj) => {
            this.reboundWalls(obj)
            obj.move()
        })
    }

    //bounces off sides of canvas
    reboundWalls(obj) {
        // hits horizontal bounds
        if (obj.pos[0] + obj.vel[0] + obj.radius > this.DIM_X || obj.pos[0] - obj.radius < 0) {
            obj.rebound("horizontal")
        } 
        // hits vertical bounds
        if (obj.pos[1] + obj.vel[1] + obj.radius > this.DIM_Y || obj.pos[1] - obj.radius < 0) {
            obj.rebound("vertical")
        } 
    }

    //checks collision
    collision(obj1, obj2) {
        if (obj1.shape === "circle" && obj2.shape === "circle") {
            const dx = (obj1.pos[0] + obj1.vel[0]) - (obj2.pos[0] + obj2.vel[0])
            const dy = (obj1.pos[1] + obj1.vel[1]) - (obj2.pos[1] + obj2.vel[1])
            const dist = obj1.radius + obj2.radius
            return (dx ** 2 + dy ** 2 <= dist **2)
        }
    }

    //runs through all movables to find collisions
    checkCollisions() {
        for (let i = 0; i < this.movable.length-1; i++) {
            for (let j = i+1; j < this.movable.length; j++) {
                const obj1 = this.movable[i];
                const obj2 = this.movable[j];
                if (this.collision(obj1, obj2)) {
                    console.log("hit!")
                    obj1.bounce(obj2);

                }
            }
        }
    }
    

    draw(ctx) {
        this.movable.forEach( (obj) => {
            obj.draw(ctx)
        })
    }

    
}

export default Game