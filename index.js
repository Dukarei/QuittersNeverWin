const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')


//stuff to center game
var style = canvas.style;
style.marginLeft = "auto";
style.marginRight = "auto";
style.padding = "50px"
var parentStyle = canvas.parentElement.style;
parentStyle.color = "black";
parentStyle.textAlign = "center";
parentStyle.width = "100%";

const background = new Sprite({
    position: {
        x:0,
        y:0
    },
    imageSrc: './img/background.png',
    width: c.width,
    height: c.height

})



canvas.width = 1024
canvas.height = 576
/*
window.onload = function(){
    console.log('loading')
    //remove const, then try outside of function
    /*
    const canvas = document.querySelector('canvas')
    const c = canvas.getContext('2d')
    c.fillRect(canvas.width/2 - c.width/2,canvas.height/2 - c.height/2,c.width = canvas.width * 0.2,  canvas.height * 0.2)
    resizeCanvas()
    prepareDocument()

}
window.onresize = function(){
    console.log('resizing')
    c.fillRect(canvas.width/2 - c.width/2,canvas.height/2 - c.height/2,c.width = canvas.width * 0.2,  canvas.height * 0.2)
    resizeCanvas()
    prepareDocument()
    
 
}
function resizeCanvas(){
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    //need to fit backround image to canvas, code below doesnt work

    background.width= c.rect.width
    background.height= c.rect.height
}
function prepareDocument() {
    document.body.style.padding = "0px"
    document.body.style.margin = "0px"
}*/
c.fillRect(0, 0, canvas.width, canvas.height)
//c.fillRect(canvas.width/2 - c.width/2,canvas.height/2 - c.height/2,c.width = canvas.width * 0.2, canvas.height/2 - c.height/2)
/*
function drawRect(){
    c.width = canvas.width * 0.2
    c.height = canvas.height * 0.2
    c.xpos = canvas.width/2 - c.width/2
    c.ypos = canvas.height/2 - c.height/2
}
*/
const gravity = 2
/*
const background = new Sprite({
    position: {
        x:0,
        y:0
    },
    imageSrc: './img/background.png',
    width: c.width,
    height: c.height

})//*/

const player = new Fighter({
    position: {
    x:0,
    y:0
    }, 
    velocity: {
        x: 0, 
        y: 0
},
offset:{
    x:0,
    y:80
},
imageSrc: './img/Knight_1/Idle.png',
framesMax : 4,
scale: 2.5,
sprites:{
    idle:{
        imageSrc: './img/Knight_1/Idle.png',
        framesMax:4
    },
    idleLeft:{
        imageSrc: './img/Knight_1/IdleLeft.png',
        framesMax:4
    },
    run:{
        imageSrc: './img/Knight_1/Run.png',
        framesMax:7
    },
    runLeft:{
        imageSrc: './img/Knight_1/RunLeft.png',
        framesMax:7
    },
    jump:{
        imageSrc:'./img/Knight_1/Jump.png',
        framesMax: 6
    },
    jumpLeft:{
        imageSrc: './img/Knight_1/JumpLeft.png',
        framesMax:6
    },
    attack:{
        imageSrc:'./img/Knight_1/Attack 1.png',
        framesMax: 5
    },
    attackLeft:{
        imageSrc: './img/Knight_1/AttackLeft.png',
        framesMax:5
    },
    hurt: {
        imageSrc:'./img/Knight_1/Hurt.png',
        framesMax: 2
    },
    hurtLeft:{
        imageSrc: './img/Knight_1/HurtLeft.png',
        framesMax:2
    },
    death: {
        imageSrc:'./img/Knight_1/Dead.png',
        framesMax: 6
    },
    deathLeft:{
        imageSrc: './img/Knight_1/DeadLeft.png',
        framesMax:6
    }
}, 
attackBox: {
    offset: {
        x: -130,
        y:0
    },
    width:100,
    height:150
},
orientation: 1

})

player.draw()
//enemy is p2
const enemy = new Fighter({
    position: {
        x:400,
        y:0
        }, 
        velocity: {
            x: 0, 
            y: 0
        },
        offset:{
            x:80,
            y:100
        },
        imageSrc: './img/Ninja_Peasant/Idle.png',
        framesMax: 6,
        scale: 2.5,
        sprites:{
            idle:{
                imageSrc: './img/Ninja_Peasant/Idle.png',
                framesMax:6
            },
            idleLeft:{
                imageSrc: './img/Ninja_Peasant/IdleLeft.png',
                framesMax:6
            },
            run:{
                imageSrc: './img/Ninja_Peasant/Run.png',
                framesMax:6
            },
            runLeft:{
                imageSrc: './img/Ninja_Peasant/RunLeft.png',
                framesMax:6
            },
            jump:{
                imageSrc:'./img/Ninja_Peasant/Jump.png',
                framesMax: 8
            },
            jumpLeft:{
                imageSrc: './img/Ninja_Peasant/JumpLeft.png',
                framesMax:8
            },
            attack:{
                imageSrc:'./img/Ninja_Peasant/Attack_1.png',
                framesMax: 6
            },
            attackLeft:{
                imageSrc: './img/Ninja_Peasant/AttackLeft.png',
                framesMax:6
            },
            hurt: {
                imageSrc:'./img/Ninja_Peasant/Hurt.png',
                framesMax: 2
            },
            hurtLeft:{
                imageSrc: './img/Ninja_Peasant/HurtLeft.png',
                framesMax:2
            },
            death: {
                imageSrc:'./img/Ninja_Peasant/Dead.png',
                framesMax: 4
            },
            deathLeft:{
                imageSrc: './img/Ninja_Peasant/DeadLeft.png',
                framesMax:4
            }
},
attackBox: {
    offset: {
        x: 80,
        y:0
    },
    width:100,
    height:150
},
orientation: -1,
})
enemy.draw()
console.log(enemy)
//logs keys for movement, movement systems still need improved
const keys = {
    a:{
        pressed:false
    },
    d:{
        pressed:false
    }, 
    w:{
        pressed:false
    },
    ArrowRight:{
        pressed:false
    },
    ArrowLeft:{
        pressed:false
    },
    ArrowUp:{
        pressed:false
    }
}
//collision detection function
function rectangularCollision({rectangle1, rectangle2}){
    return(
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= 
        rectangle2.position.x && rectangle1.attackBox.position.x <= 
        rectangle2.position.x + rectangle2.width && rectangle1.attackBox.position.y + 
        rectangle1.attackBox.height >= rectangle2.position.y && 
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}

function determineWinner({player, enemy, timerId}){
    clearTimeout(timerId)
    /*
    if(rounds === 0){
        document.querySelector('#displayText').style.display = 'flex'
        if(player.health === enemy.health){
        document.querySelector('#displayText').innerHTML = 'Tie'
        }
        else if(player.health > enemy.health ){
        document.querySelector('#displayText').innerHTML = 'Player One Wins'
        }
        else if (player.health < enemy.health){
        document.querySelector('#displayText').innerHTML = 'Player Two Wins'
        }
    //displays leave game prompt
        document.querySelector('#displayPrompt').style.display = 'flex' 
    }
    */
    if(rounds === 0){
        
        if(player.health === enemy.health){
            ++player.roundsWon
            ++enemy.roundsWon
            document.querySelector('#playerRounds').innerHTML = "Rounds: " + player.roundsWon
            document.querySelector('#enemyRounds').innerHTML = "Rounds: " + enemy.roundsWon
            }
        else if(player.health > enemy.health ){
            ++player.roundsWon
            document.querySelector('#playerRounds').innerHTML = "Rounds: " + player.roundsWon
            }
        else if (player.health < enemy.health){
            ++enemy.roundsWon
            document.querySelector('#enemyRounds').innerHTML = "Rounds: " + enemy.roundsWon
            }
        //document.querySelector('#displayPrompt').style.display = 'flex' 
        document.querySelector('#displayText').style.display = 'flex'
        if(player.roundsWon === enemy.roundsWon){
        document.querySelector('#displayText').innerHTML = 'Tie'
        }
        else if(player.roundsWon > enemy.roundsWon ){
        document.querySelector('#displayText').innerHTML = 'Player One Wins'
        }
        else if (player.roundsWon < enemy.roundsWon){
        document.querySelector('#displayText').innerHTML = 'Player Two Wins'
        }
    //displays leave game prompt
        document.querySelector('#displayPrompt').style.display = 'flex' 
    }
}
function resetMatch({player, enemy}){
    if(player.health === enemy.health){
        ++player.roundsWon
        ++enemy.roundsWon
        document.querySelector('#playerRounds').innerHTML = "Rounds: " + player.roundsWon
        document.querySelector('#enemyRounds').innerHTML = "Rounds: " + enemy.roundsWon
        }
    else if(player.health > enemy.health ){
        ++player.roundsWon
        document.querySelector('#playerRounds').innerHTML = "Rounds: " + player.roundsWon
        }
    else if (player.health < enemy.health){
        ++enemy.roundsWon
        document.querySelector('#enemyRounds').innerHTML = "Rounds: " + enemy.roundsWon
        }
    enemy.velocity.x = 500
    player.velocity.x = -300
    document.querySelector('#displayText').style.display = 'none'
    document.querySelector('#displayPrompt').style.display = 'none'
    player.image = player.sprites.idle.image
    player.framesMax = player.sprites.idle.framesMax
    enemy.image = enemy.sprites.idleLeft.image
    enemy.framesMax = enemy.sprites.idleLeft.framesMax
    player.health = 100
    enemy.health = 100
    document.querySelector('#enemyHealth').style.width = enemy.health + '%'
    document.querySelector('#playerHealth').style.width = player.health + '%'
    player.isDead = false
    enemy.isDead = false
    timer = timerDefault
    decreaseTimer()
}
function reallyResetMatch({player, enemy}){
    player.roundsWon = 0
    enemy.roundsWon = 0
    rounds = gameRounds
    enemy.velocity.x = 500
    player.velocity.x = -300
    document.querySelector('#playerRounds').innerHTML = "Rounds: " + player.roundsWon
    document.querySelector('#enemyRounds').innerHTML = "Rounds: " + enemy.roundsWon
    document.querySelector('#displayText').style.display = 'none'
    document.querySelector('#displayPrompt').style.display = 'none'
    player.image = player.sprites.idle.image
    player.framesMax = player.sprites.idle.framesMax
    enemy.image = enemy.sprites.idleLeft.image
    enemy.framesMax = enemy.sprites.idleLeft.framesMax
    player.health = 100
    enemy.health = 100
    document.querySelector('#enemyHealth').style.width = enemy.health + '%'
    document.querySelector('#playerHealth').style.width = player.health + '%'
    player.isDead = false
    enemy.isDead = false
    timer = timerDefault
    decreaseTimer()
}

let rounds = prompt("How many rounds?");
const gameRounds = rounds
 let timerId
 let timer = 10
 let timerDefault = 30
function decreaseTimer(){
    
    if(timer > 0){
       timerId =  setTimeout(decreaseTimer, 1000)
        timer--
        document.querySelector('#timer').innerHTML = timer
    } 
}
if(timer === 0|| timer <= 0){
    determineWinner({player, enemy, timerId})
}
//setRounds(rounds)
decreaseTimer()
function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'

    c.fillRect(0,0, canvas.width, canvas.height)
    //c.fillRect(canvas.width/2 - c.width/2,canvas.height/2 - c.height/2,c.width = canvas.width * 0.2,  canvas.height * 0.2)
    background.update()
    player.update()
    enemy.update()
    player.velocity.x = 0
    enemy.velocity.x = 0
    //movement conditions fixed to allow jumping+lateral movement simultaneously
    
    if(keys.a.pressed && !keys.d.pressed){
        player.velocity.x = -15
        player.switchSprite('runLeft')

    }else if (keys.d.pressed && !keys.a.pressed){
        player.velocity.x = 15
        player.switchSprite('run')
    }
    else{
        if(player.lastKey = 'a')
        player.switchSprite('idle')
        else player.switchSprite('idleLeft')
    }
    if(player.velocity.y < 0){
        if(player.lastKey = 'a'||keys.a.pressed)
        player.switchSprite('jump')
        else player.switchSprite('jumpLeft')
    }
    if(keys.ArrowLeft.pressed && !keys.ArrowRight.pressed){
        enemy.velocity.x = -15
        enemy.switchSprite('runLeft')
    }else if (keys.ArrowRight.pressed && !keys.ArrowLeft.pressed){
        enemy.velocity.x = 15
        enemy.switchSprite('run')

    }else{
        if(enemy.lastKey = 'ArrowRight')
        enemy.switchSprite('idleLeft')
        else enemy.switchSprite('idle')
    }
    if(enemy.velocity.y < 0){
        if(enemy.lastKey = 'ArrowRight' || keys.ArrowRight.pressed)
        enemy.switchSprite('jumpLeft')
        else enemy.switchSprite('jump')
    }



    //collision detection
    if(rectangularCollision({rectangle1: player, rectangle2: enemy})
        && player.isAttacking && player.framesCurrent === 3){
            player.isAttacking = false
            enemy.takeHit()
            document.querySelector('#enemyHealth').style.width = enemy.health + '%'
            
            }
    //if player misses
    if(player.isAttacking && player.framesCurrent === 3){
        player.isAttacking = false
    }

    if(rectangularCollision({rectangle1: enemy, rectangle2: player})
        && enemy.isAttacking){
            enemy.isAttacking = false
            player.takeHit()
            document.querySelector('#playerHealth').style.width = player.health + '%'
    }
    //if enemy misses
    if(enemy.isAttacking && enemy.framesCurrent === 3){
        enemy.isAttacking = false
    }
    //game ends before timer
    if(enemy.health <=0 || player.health <= 0){
        --rounds
        if(rounds <= 0) determineWinner({player, enemy, timerId})
        else setTimeout(resetMatch({player, enemy}), 5000)
    }
    if(timer === 0|| timer <= 0){
        --rounds
        if(rounds <=0)determineWinner({player, enemy, timerId})
        else setTimeout(resetMatch({player, enemy}), 5000)
    }

}

animate()

window.addEventListener('keydown', event => {
    if(!player.isDead ){
    switch(event.key){
        //player controls
    
       case 'd' :
        keys.d.pressed = true
        player.lastKey = 'd'
        break 
        case 'a'  :
        keys.a.pressed = true
        player.lastKey = 'a'
        break 
        case 'w' :
        keys.w.pressed = true
        player.lastKey = 'w'
        player.velocity.y = -30
        break 
        case 's' :
            player.attack()
        break}}
    if(!enemy.isDead){
    switch(event.key){
        //enemy controls
        case 'ArrowRight' :
        keys.ArrowRight.pressed = true
        enemy.lastKey = 'ArrowRight'
        break 
        case 'ArrowLeft' :
        keys.ArrowLeft.pressed = true
        enemy.lastKey = 'ArrowLeft'
        break 
        case 'ArrowUp' :
        keys.ArrowUp.pressed = true
        enemy.lastKey = 'ArrowUp'
        enemy.velocity.y = -30
        break 
        case 'ArrowDown' :
            enemy.attack()
        break
    }}
    //console.log(event.key)
})

window.addEventListener('keyup', event => {
        switch(event.key){
           case 'd' :
            keys.d.pressed = false
            break 
            case 'a' :
            keys.a.pressed = false
            break 
            case 'w' :
            keys.w.pressed = false
            break }
})

window.addEventListener('keyup', event =>{
    switch(event.key){
            case 'ArrowRight' :
            keys.ArrowRight.pressed = false
            break 
            case 'ArrowLeft' :
            keys.ArrowLeft.pressed = false
            break 
            case 'ArrowUp' :
            keys.ArrowUp.pressed = false
            break 
        }
        //console.log(event.key)
    })
