async function init() {

    const accValue = document.getElementById("acc_value")
    const velValue = document.getElementById("vel_value")
    const posValue = document.getElementById("pos_value")
    const fps = document.getElementById("fps")


    const bullet = new Bullet({x:5, y:5})
    const meteorObject = new Meteor({x:80, y:50})
    async function main() {

        
        const meteorContainer = []
        for (i=0; i < 1000; i++) {
            meteorContainer.push(new Meteor({x: 10, y: 10}))
        }

    
        document.addEventListener('keydown', (e) => keyPress(e, meteorObject))
       
        let counter = 0

        while (true) {
            let initDate = new Date().getTime()

            await sleep(10)
            let endDate = new Date().getTime()
            let tickrate = calculateTickRate(initDate, endDate)

            meteorContainer.forEach(meteor => meteor.render(tickrate))

            meteorObject.render(tickrate)
    
            if (counter > 10) {
                updateDashboard(meteorObject.physics.acceleration, meteorObject.physics.velocity, meteorObject.physics.position)
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
        element.move({direction: e.code, strength: 20})
    }

    main()
}

window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    init()
});