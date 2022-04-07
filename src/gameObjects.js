class GameObject {

    constructor(size, type) {
        this.element = document.createElement("div");
        this.size = size
        this.physics = new Physics({x:100, y:100} )
        this.createObject(type)
        this.physics.maxPosition = {
            x: 800 - size.x,
            y: 600 - size.y
        }
        this.physics.force = {x: 0, y: 100}
    }

    createObject = (type) => {
        this.element.className = type
        this.element.style.height = this.size.y;
        this.element.style.width = this.size.x;
        document.getElementById("canvas").appendChild(this.element)
    }

    render = (tickrate) => {
        this.physics.tickrate = tickrate
        this.physics.simulate()
        this.element.style.top = this.physics.position.y
        this.element.style.left = this.physics.position.x
    }

    move = (command) => {
        switch (command.direction) {
            case 'KeyW' :
                this.physics.velocity.y -= command.strength
                break
            case 'KeyS' :
                this.physics.velocity.y += command.strength
                break
            case 'KeyA' :
                this.physics.velocity.x -= command.strength
                break
            case 'KeyD' :
                this.physics.velocity.x += command.strength
                break
        }
    }

}

class Meteor extends GameObject {
    constructor(size) {
        super(size, "meteor")
        this.physics.velocity.x = (Math.random() - 0.5) * 10
        this.physics.velocity.y = (Math.random() - 0.5) * 10
      }
    
}

class SpaceShip extends GameObject {
    constructor(size) {
        super(size, "spaceShip")
      }
}


class Bullet extends GameObject {
    constructor(size) {
        super(size, "bullet")
      }
    
      move = (command) => {
        switch (command.direction) {
            case 'Space' :
                this.physics.velocity.y -= 100
                break
        }
    }
}