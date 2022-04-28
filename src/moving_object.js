

class MovingObject {

    // CONSTRUCTOR TAKES IN HASH WITH PARAMETERS
    constructor(options) { 
        this.mass = options['mass'];
        this.pos = options['pos'];
        this.vel = options['vel'];
        this.radius = options['radius'];
        this.color = options['color']
        this.friction = 1;
        this.shape = "circle"; 

    }


    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI)
        ctx.fill();
    }

    rebound(wall) {
        if (wall === "horizontal") {
            this.vel[0] = -1 * this.friction * this.vel[0]
        } 

        if (wall === "vertical") {
            this.vel[1] = -1 * this.friction * this.vel[1]
        }
    }


    move() {
        this.vel[0] = this.friction*this.vel[0];
        this.vel[1] = this.friction* this.vel[1]
        // if (Math.abs(this.vel[0]) < 0.1 ) {
        //     this.vel[0] = 0;
        // } 
        // if (Math.abs(this.vel[1]) < 0.1) {
        //     this.vel[1] = 0;
        // }
        this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
    }

    bounce(otherObj) {
        // find angles of velocity
        const angle1 = this.findAngle()
        const angle2 = otherObj.findAngle()
        const angleDif = ((angle2 - angle1) + 2 * Math.PI) % (2 * Math.PI)
        // angle of line between center of balls
        let line =Math.atan2((otherObj.pos[1] - this.pos[1]), (otherObj.pos[0] - this.pos[0]))
        line = (line + 2 * Math.PI) % (2 * Math.PI)
        // console.log(`angleDif: ${angleDif}`, `lineAngle ${line}`)
        let contactAngle =  (((angleDif - line) + (2 * Math.PI)) % (2 * Math.PI));
        // console.log(contactAngle)
        // console.log(angle1, angle2, line, contactAngle)

        const v1 = (this.vel[0] ** 2 + this.vel[1] ** 2) ** 0.5;
        const v2 = (otherObj.vel[0] ** 2 + otherObj.vel[1] ** 2) ** 0.5;
        const eq = (v1 * Math.cos(angle1-contactAngle) * (this.mass- otherObj.mass) + 2*otherObj.mass * v2 * Math.cos(angle2 - contactAngle))/(this.mass + otherObj.mass)
        const eq2 = (v2 * Math.cos(angle2-contactAngle) * (otherObj.mass - this.mass) + 2*this.mass * v1 * Math.cos(angle1 - contactAngle))/(this.mass + otherObj.mass)

        // console.log(`initial obj1 vel: ${v1}`, `initial obj2 vel: ${v2}`, `contactAngle: ${contactAngle}`)

        const v1x = eq * Math.cos(contactAngle) + v1 * Math.sin(angle1 - contactAngle) * Math.cos(contactAngle + Math.PI/2)
        const v1y = eq * Math.sin(contactAngle) + v1 * Math.sin(angle1 - contactAngle) * Math.sin(contactAngle + Math.PI/2)

        const v2x = eq2 * Math.cos(contactAngle) + v2 * Math.sin(angle2 - contactAngle) * Math.cos(contactAngle + Math.PI/2)
        const v2y = eq2 * Math.sin(contactAngle) + v2 * Math.sin(angle2 - contactAngle) * Math.sin(contactAngle + Math.PI/2)
        

        this.vel = [v1x, v1y];
        otherObj.vel = [v2x, v2y];

    }

    //angle of velocity
    findAngle() {
        // if (Math.abs(this.vel[1]) < 0.01) {
        //     this.vel[1] = 0.0001
        // }
        // let z = (this.vel[0] + ((this.vel[0] ** 2 + this.vel[1] ** 2) ** 0.5));
        // let angle = 2 * Math.atan(this.vel[1] / z)
        let angle = Math.atan2(this.vel[1], this.vel[0])
        if(isNaN(angle)) (
            angle = Math.PI
        )


        return (angle + 2 * Math.PI) % (2 * Math.PI);
    }

    center() {
        return this.pos;
    }

    


}

export default MovingObject