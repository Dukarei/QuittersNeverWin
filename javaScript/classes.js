
class Sprite{
    constructor({position, imageSrc, scale = 1, framesMax = 1, offset = {x: 0, y: 0}}){
        this.position = position
        this.height = 150
        this.width = 50
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
        this.offset = offset
    }
    draw() {
       c.drawImage(this.image,
        this.framesCurrent * (this.image.width / this.framesMax),
        0,
        this.image.width / this.framesMax,
        this.image.height,
        this.position.x-this.offset.x, this.position.y-this.offset.y,
        (this.image.width/this.framesMax) * this.scale, 
        this.image.height * this.scale    )
    }
    animateFrame(){
        this.framesElapsed++
        
        if(this.framesElapsed % this.framesHold === 0){
            if(this.framesCurrent < this.framesMax-1){
            this.framesCurrent++
        }
            else{
            this.framesCurrent = 0
        }
    }
    }
    update(){
        this.draw()
        this.animateFrame()
    }
    
}
class Fighter extends Sprite{
    constructor({position, velocity, offset = {x:0, y:0}, imageSrc, scale = 1, framesMax = 1, sprites, 
        attackBox = {offset: {}, width:undefined, height:undefined}, orientation
}){
        super({
        position,
        imageSrc,
        scale, 
        framesMax, 
        offset, 
        })
        this.velocity = velocity
        this.height = 150
        this.width = 50
        this.lastKey
        this.health = 100
        this.isDead = false
        this.roundsWon = 0
        this.orientation = orientation
       
        this.attackBox = {
            position: {
                x:this.position.x,
                y:this.position.y
            },
            offset: attackBox.offset ,
            width: attackBox.width, 
            height: attackBox.height, 


        }
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
        this.sprites = sprites

        for(const sprite in this.sprites){
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc

        }
    }
   
    update(){
        this.draw()
        if(! this.isDead){
        this.animateFrame()}
        //this if statement handles character death
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.attackBox.position.y = this.position.y - this.attackBox.offset.y
        this.attackBox.position.x = this.position.x - this.attackBox.offset.x
        //attackBox for troubleshooting
        //c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        
       //borders for left and right but may need ceiling border and/or jump limitations
        if(this.position.y + this.height + this.velocity.y >= canvas.height - 35){
            this.velocity.y = 0
        }else this.velocity.y +=gravity
        if(this.position.x + this.width + this.velocity.x >= canvas.width){
            this.position.x -=15
        }else if (this.position.x + this.width + this.velocity.x <= this.width){
            this.position.x +=15
        }
    
    }
    attack(){
        if(keys.ArrowRight.pressed||keys.a.pressed){this.attackBox.offset.x = this.attackBox.offset.x *-1}
        if(keys.ArrowRight.pressed||keys.d.pressed){
        this.switchSprite('attack')}
        else if(keys.ArrowLeft.pressed||keys.a.pressed){ this.switchSprite('attackLeft')}
        if(this.orientation === -1){
            this.switchSprite('attackLeft')
        }
        else if(this.orientation ===1)this.switchSprite('attack')
        if(this.health > 0){
        this.isAttacking = true
       
    }
    }
    takeHit(){
        this.health -= 20
        if(this.health <= 0){
        this.switchSprite('death')
        }else this.switchSprite('hurt')
    }
    switchSprite(sprite){
        //override w/ death
        if((this.image === this.sprites.death.image||this.image === this.sprites.deathLeft.image)) {
            if(this.framesCurrent === this.sprites.death.framesMax -1)this.isDead = true
            return}
        //overridde all animations w/ attack and hit animations
        if((this.image === this.sprites.attack.image||this.image === this.sprites.attackLeft.image) && this.framesCurrent < this.sprites.attack.framesMax -1) return
        if((this.image === this.sprites.hurt.image||this.image === this.sprites.hurtLeft.image) && this.framesCurrent < this.sprites.hurt.framesMax -1) return
        switch(sprite){
            case 'idle':
                if(this.image !== this.sprites.idle.image){
                this.image = this.sprites.idle.image
                this.framesMax = this.sprites.idle.framesMax
                this.framesCurrent = 0
            }
                break
            case 'idleLeft':
                if(this.image !== this.sprites.idleLeft.image){
                this.image = this.sprites.idleLeft.image
                this.framesMax = this.sprites.idleLeft.framesMax
                this.framesCurrent = 0
                }
                    break
            case 'run':
                if(this.image !== this.sprites.run.image){
                this.image = this.sprites.run.image
                this.framesMax = this.sprites.run.framesMax
                this.framesCurrent = 0
            }
                break
            case 'runLeft':
                    if(this.image !== this.sprites.runLeft.image){
                    this.image = this.sprites.runLeft.image
                    this.framesMax = this.sprites.runLeft.framesMax
                    this.framesCurrent = 0
                }
                    break
            case 'jump':
                if(this.image !== this.sprites.jump.image){
                this.image = this.sprites.jump.image
                this.framesMax = this.sprites.jump.framesMax   
                this.framesCurrent = 0 
            }
                break
            case 'jumpLeft':
                    if(this.image !== this.sprites.jumpLeft.image){
                    this.image = this.sprites.jumpLeft.image
                    this.framesMax = this.sprites.jumpLeft.framesMax   
                    this.framesCurrent = 0 
                }
                    break
            case 'attack':
                if(this.image !== this.sprites.attack.image){
                    this.image = this.sprites.attack.image
                    this.framesMax = this.sprites.attack.framesMax   
                    this.framesCurrent = 0 
                }
                    break
            case 'attackLeft':
                        if(this.image !== this.sprites.attackLeft.image){
                            this.image = this.sprites.attackLeft.image
                            this.framesMax = this.sprites.attackLeft.framesMax   
                            this.framesCurrent = 0 
                        }
                            break
            case 'hurt':
                if(this.image !== this.sprites.hurt.image){
                     this.image = this.sprites.hurt.image
                    this.framesMax = this.sprites.hurt.framesMax   
                    this.framesCurrent = 0 
                        }
                            break
            case 'hurtLeft':
                                if(this.image !== this.sprites.hurtLeft.image){
                                     this.image = this.sprites.hurtLeft.image
                                    this.framesMax = this.sprites.hurtLeft.framesMax   
                                    this.framesCurrent = 0 
                                        }
                                            break
            case 'death':
                if(this.image !== this.sprites.death.image){
                    this.image = this.sprites.death.image
                    this.framesMax = this.sprites.death.framesMax   
                    this.framesCurrent = 0 
                                        }
                                            break
            case 'deathLeft':
                if(this.image !== this.sprites.deathLeft.image){
                    this.image = this.sprites.deathLeft.image
                    this.framesMax = this.sprites.deathLeft.framesMax   
                    this.framesCurrent = 0 
                                        }
                                            break
                    
        }
    }
}