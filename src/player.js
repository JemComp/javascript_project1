import MovingObject from "./moving_object";

class Player extends MovingObject {
    constructor(options) {
        super({
            mass: 40,
            pos: options['pos'],
            vel: options['vel'],
            color: options["color"] ||= "red",
            radius: 20
        });
        this.team = options["team"];
        this.friction = .9;
    }


    moveInput(direction) {
        switch(direction) {
            case "up":
                if (this.vel[1] > -10) {
                    this.vel[1] -= .8;
                }  
              break;
            case "down":
              if (this.vel[1] < 10) {
                  this.vel[1] += .8;
              }  
              break;
            case "left":
                if (this.vel[0] > -10) {
                    this.vel[0] -= .8;
                }  
                break;
            case "right":
                if (this.vel[0] < 10) {
                    this.vel[0] += .8;
                }  
                break;
            case "launch": 
                this.vel[0] *= 4;
                this.vel[1] *= 4;

            default:
              // code block
          }
    }
}

export default Player