//import Physics from './physics'

async function init() {

    const xSlider = document.getElementById("x_slider")
    const ySlider = document.getElementById("y_slider")

    const accValue = document.getElementById("acc_value")
    const velValue = document.getElementById("vel_value")
    const posValue = document.getElementById("pos_value")
    const fps = document.getElementById("fps")

    const rocketShip = document.getElementById("game")
    const meteor = document.getElementById("meteor")


    const upButton = document.getElementById("up")
    const downButton = document.getElementById("down")
    const leftButton = document.getElementById("left")
    const rightButton = document.getElementById("right")

    async function main() {
        upButton.onclick = (e) => { move(rocketShip, 'up') }
        downButton.onclick = (e) => { move(rocketShip, 'down') }
        leftButton.onclick = (e) => { move(rocketShip, 'left') }
        rightButton.onclick = (e) => { move(rocketShip, 'right') }
    
        document.addEventListener('keypress', (e) => keyPress(e, rocketShip))

        const position = { x: 10, y: 10 }

        const game = new Physics(position)

        let counter = 0

        while (true) {
            let initDate = new Date().getTime()
            moveTo(meteor, game.position)
            game.simulate()
            game.force.x = xSlider.value * 10
            game.force.y = ySlider.value * 10
            await sleep(10)
            let endDate = new Date().getTime()
            game.tickrate = calculateTickRate(initDate, endDate)
            if (calculateFps(initDate, endDate) / counter > 10) {
                updateDashboard(game.acceleration, game.velocity, game.position)
                fps.innerHTML = Math.round(calculateFps(initDate, endDate) * 10) / 10
                counter = 0
            }
            counter++
            
        }
    }

    function calculateTickRate(initDate, endDate){
        return (endDate - initDate) / 100
    }

    function calculateFps(initDate, endDate) {
        return 1000 / (endDate - initDate)
    }

    function updateDashboard(acc, vel, pos) {
        accValue.innerHTML = JSON.stringify(acc) 
        velValue.innerHTML = JSON.stringify(vel)
        posValue.innerHTML = JSON.stringify(pos)
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function keyPress(e, element) {
        switch (e.code) {
            case 'KeyW':
                move(element, 'up')
                break
            case 'KeyS':
                move(element, 'down')
                break
            case 'KeyA':
                move(element, 'left')
                break
            case 'KeyD':
                move(element, 'right')
                break
            case 'Space':
                break
        }
    }

    function moveTo(element, position) {
        element.style.top = position.y
        element.style.left = position.x
    }

    function move(element, direction) {
        console.log(element)
        switch (direction) {
            case 'up':
                element.style.bottom = extractPosition(element.style.bottom, '+')
                break
            case 'down':
                element.style.bottom = extractPosition(element.style.bottom, '-')
                break
            case 'left':
                element.style.right = extractPosition(element.style.right, '+')
                break
            case 'right':
                element.style.right = extractPosition(element.style.right, '-')
                break
        }

    }

    function extractRawPosition(rawPosition) {
        let position = rawPosition
        if (position == '') {
            position = 0
        }
        else {
            position = parseInt(rawPosition.slice(0, -2))
        }
        return position
    }

    function extractPosition(rawPosition, prefix) {
        const increment = 50
        let position = rawPosition
        if (position == '') {
            position = '0px'
        }
        else {
            if (prefix == '+') {
                position = parseInt(rawPosition.slice(0, -2)) + increment
            } else if (prefix == '-') {
                position = parseInt(rawPosition.slice(0, -2)) - increment
            }

        }
        return position
    }
    main()
}

window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    init()
});