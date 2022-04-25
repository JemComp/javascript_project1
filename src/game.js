import Ball from "./ball";
import Player from "./player";
import Placeable from "./placeable";
// const Field = require(",/field")


class Game {

    constructor() {
        this.DIM_X = 1000;
        this.DIM_Y = 600;
        this.players = []; 
        this.ball = new Ball({ 
            pos: [this.DIM_X/2, this.DIM_Y/2],
            vel: [-50,0]
        })

        this.player = new Player({ 
            pos: [this.DIM_X/2 + 50, this.DIM_Y/2 ],
            vel: [10, 0]
        })

        this.placeable1 = new Placeable({
            pos: [this.DIM_X/2 + 50, this.DIM_Y/2 ],
            vel: [0, 0],
            dim: [50,50]
        })
        this.movables = [this.ball, this.player, this.placeable1];
        this.pressedKeys = {};
        this.keyToggled = {};
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

        this.movables.forEach( (obj) => {
            this.reboundWalls(obj)
            obj.move()
        })
    }

    //bounces off sides of canvas
    reboundWalls(obj) {
        // hits horizontal bounds
        if (obj.pos[0] + obj.vel[0] + obj.radius > this.DIM_X || obj.pos[0] - obj.radius < 0) {
            obj.rebound("horizontal")
            //clamps the ball between the walls 
            obj.pos[0] = Math.min(Math.max( obj.pos[0], 0 + obj.radius), this.DIM_X - obj.radius)
        } 
        // hits vertical bounds
        if (obj.pos[1] + obj.vel[1] + obj.radius > this.DIM_Y || obj.pos[1] - obj.radius < 0) {
            obj.rebound("vertical")
            //clamps the ball between the walls
            obj.pos[1] = Math.min(Math.max( obj.pos[1], 0 + obj.radius), this.DIM_Y - obj.radius)

        } 
    }

    //checks collision
    collision(obj1, obj2) {
        if (obj1.shape === "circle" && obj2.shape === "circle") {
            const dx = (obj1.pos[0] + obj1.vel[0]) - (obj2.pos[0] + obj2.vel[0])
            const dy = (obj1.pos[1] + obj1.vel[1]) - (obj2.pos[1] + obj2.vel[1])
            const dist = obj1.radius + obj2.radius
            return (dx ** 2 + dy ** 2 <= dist ** 2)
        }

        if(obj1.shape === "rectangle" && obj2.shape === "rectangle") {
            return (obj1.pos[0] < obj2.pos[0] + obj2.dim[0] &&
                obj1.pos[0] + obj1.dim[0] + obj1.vel[0]> obj2.pos[0] + obj2.vel[0]&&
                obj1.pos[1] + obj1.vel[1]< obj2.pos[1] + obj2.dim[1] + obj2.vel[1] &&
                obj1.dim[1] + obj1.pos[1] + obj1.vel[1] > obj2.pos[1] + obj2.vel[1]);
        }

        if(obj1.shape === "circle" && obj2.shape === "rectangle") {
            return this.rectCircleCollision(obj1, obj2)
        }
        if(obj1.shape === "rectangle" && obj2.shape === "circle") {
            // return this.rectCircleCollision(obj2, obj1)

        }
    }

    rectCircleCollision(circle, rect) {
        let dx=Math.abs(circle.pos[0]-(rect.pos[0]+rect.dim[0]/2));
        let dy=Math.abs(circle.pos[1]-(rect.pos[1]+rect.dim[1]/2));
        
        if( dx > circle.radius+rect.dim[0]/2 || dy > circle.radius+rect.dim[1]/2 ){ 
            return false; 
        }

        if( dx <= rect.dim[0] || dy <= rect.dim[1]){ 
            return true; 
        }

        dx = dx-rect.dim[0];
        dy = dy-rect.dim[1];

        return(dx*dx+dy*dy<=circle.radius * circle.radius);
    }

    //runs through all movables to find collisions
    checkCollisions() {
        for (let i = 0; i < this.movables.length-1; i++) {
            for (let j = i+1; j < this.movables.length; j++) {
                const obj1 = this.movables[i];
                const obj2 = this.movables[j];
                if (this.collision(obj1, obj2)) {
                    console.log("hit!")
                    if (obj1.shape === "circle" && obj2.shape === "circle") {
                        obj1.bounce(obj2);
                    }

                }
            }
        }
    }
    

    draw(ctx) {
        this.movables.forEach( (obj) => {
            obj.draw(ctx)
        })
    }

    handleInputs() {
        for (var key in this.pressedKeys){
            if (this.pressedKeys[key] === true) {
                // console.log(key)
                if (key === "KeyS") {
                    this.player.moveInput("down")
                }
                if (key === "KeyW") {
                    this.player.moveInput("up")
                }
                if (key === "KeyA") {
                    this.player.moveInput("left")
                }
                if (key === "KeyD") {
                    this.player.moveInput("right")
                }
                if (key === "Space") {
                    if (!this.keyToggled[key]) {
                    this.player.moveInput("launch")
                    this.pressedKeys[key] = false;
                    this.keyToggled[key] = true;
                    }
                }
            }
            
          }
    }

    
}

export default Game