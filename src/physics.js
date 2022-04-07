class Physics {

        constructor(initPosition) {
            this.tickrate = 0
            this.mass = 10
            this.force = {x:0, y :0} 
            this.acceleration = {x: 0, y: 0}
            this.velocity = {x: 0, y: 0}
            this.position = initPosition
            this.maxPosition = {
                x: 700,
                y: 500
            }
        }

        accelerationCalc = () => {
            this.acceleration.x = this.force.x / this.mass
            this.acceleration.y = this.force.y / this.mass
        }

        velocityCalc = () => {
            this.velocity.x += this.acceleration.x * this.tickrate
            this.velocity.y += this.acceleration.y * this.tickrate
        }

        positionCalc = () => {
             this.position.x  += this.velocity.x * this.tickrate
             this.position.y  += this.velocity.y * this.tickrate
        }

        checkCollosion = () => {
            if (this.position.x < 0) {
                this.position.x = 0 
                this.velocity.x *= -1
                this.acceleration.x = 0 
            } 
            if (this.position.x > this.maxPosition.x){
                this.position.x = this.maxPosition.x
                this.velocity.x *= -1
                this.acceleration.x = 0 
            }  
            if (this.position.y < 0)  {
                this.position.y = 0 
                this.velocity.y *= -1
                this.acceleration.y = 0 
            }
            if (this.position.y > this.maxPosition.y) {
                this.position.y = this.maxPosition.y
                this.velocity.y *= -1
                this.acceleration.y = 0 
            }
        }

        simulate = () => {
            this.accelerationCalc()
            this.velocityCalc()
            this.positionCalc()
            this.checkCollosion()
        }

    }