import Ball from "./ball";
import Player from "./player";
import Placeable from "./placeable";
import GoalZone from "./goal_zone";
import Scorecard from "./scorecard";
// const Field = require("./field")


class Game {

    constructor() {
        this.DIM_X = 1000;
        this.DIM_Y = 600;
        this.players = []; 
        this.ball = new Ball({ 
            pos: [this.DIM_X/2, this.DIM_Y/2],
            vel: [0,0]
        })

        this.player1 = new Player({ 
            pos: [this.DIM_X/2 - 150, this.DIM_Y/2 ],
            vel: [0, 0],
            team: 1
        })

        this.player2 = new Player({ 
            pos: [this.DIM_X/2 + 150, this.DIM_Y/2 ],
            vel: [0, 0],
            team: 2,
            color: "blue"
        })


        this.goal1 = new GoalZone({
            pos: [this.DIM_X-50, this.DIM_Y/2 - 25], 
            vel: [0, 0],
            dim: [50,50],
            team: 1

        })

        this.goal2 = new GoalZone({
            pos: [0, this.DIM_Y/2 - 25],
            vel: [0, 0],
            dim: [50,50],
            team: 2
        })

        this.block = new Placeable ({   
            pos: [this.DIM_X/2 + 25, this.DIM_Y/2 - 25],
            vel: [0, 0],
            dim: [50,50],
            mass: 200
        })

        this.scoreCard = new Scorecard([this.DIM_X/2,this.DIM_Y/2])
        this.movables = [this.ball, this.player1, this.player2, this.goal1, this.goal2, this.block];
        this.pressedKeys = {};
        this.keyToggled = {};
    }

    getDIM() {
        return [this.DIM_X, this.DIM_Y]
    }

    //new game
    reset() {
        this.ball.pos = [this.DIM_X/2, this.DIM_Y/2]
        this.ball.vel = [0,0]
    }

    //called every frame
    move(ctx) {
        this.checkCollisions(ctx);

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
            return this.rectCircleCollision(obj2, obj1)

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
                    // console.log(obj1.constructor.name, obj2.constructor.name)
                    if (obj1.shape === "circle" && obj2.shape === "circle") {
                        obj1.bounce(obj2);
                    }

                    // if (obj1.constructor.name === "Ball" && obj2.constructor.name === "GoalZone"){
                    //     this.scoreGoal(obj2.team)
                    //     console.log("goal!")
                    // }
                    // if (obj2.constructor.name === "Ball" && obj1.constructor.name === "GoalZone"){
                    //     this.scoreGoal(obj2.team)
                    //     console.log("goal!")
                    // }

                    if (obj1.shape === "circle" && obj2.shape === "rectangle") {
                        if (obj1.constructor.name === "Ball" && obj2.constructor.name === "GoalZone"){
                                this.scoreGoal(obj2.team)
                                console.log("goal!")
                                
                        } else if (obj2.constructor.name !== "GoalZone") {
                            console.log(obj2.constructor.name)
                            obj2.bounce(obj1);
                        }
                    }

                    if (obj1.shape === "rectangle" && obj2.shape === "circle") {
                        if (obj1.constructor.name === "GoalZone" && obj2.constructor.name === "Ball"){
                                this.scoreGoal(obj2.team)
                                console.log("goal!")
                                
                        } else if (obj1.constructor.name != "GoalZone"){
                            console.log(obj1.constructor.name)
                            obj1.bounce(obj2);
                        }
                    }

                }
            }
        }
    }
    

    draw(ctx) {
        this.scoreCard.draw(ctx)
        this.movables.forEach( (obj) => {
            obj.draw(ctx)
        })
    }

    handleInputs() {
        for (var key in this.pressedKeys){
            if (this.pressedKeys[key] === true) {
                // console.log(key)
                if (key === "KeyS") {
                    this.player1.moveInput("down")
                }
                if (key === "KeyW") {
                    this.player1.moveInput("up")
                }
                if (key === "KeyA") {
                    this.player1.moveInput("left")
                }
                if (key === "KeyD") {
                    this.player1.moveInput("right")
                }
                if (key === "Space") {
                    if (!this.keyToggled[key]) {
                    this.player1.moveInput("launch")
                    this.pressedKeys[key] = false;
                    this.keyToggled[key] = true;
                    }
                }
                if (key === "ArrowDown") {
                    this.player2.moveInput("down")
                }
                if (key === "ArrowUp") {
                    this.player2.moveInput("up")
                }
                if (key === "ArrowLeft") {
                    this.player2.moveInput("left")
                }
                if (key === "ArrowRight") {
                    this.player2.moveInput("right")
                }
                if (key === "KeyM") {
                    if (!this.keyToggled[key]) {
                    this.player2.moveInput("launch")
                    this.pressedKeys[key] = false;
                    this.keyToggled[key] = true;
                    }
                }
            }
            
          }
    }

    scoreGoal(team) {
        if (team === 1) {
            this.scoreCard.score[0] += 1
        }
        if (team === 2) {
            this.scoreCard.score[1] += 1
        }
        

        this.reset();
    }

    
}

export default Game