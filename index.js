const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 800
canvas.height = 600
var playerSprite = new Image()
playerSprite.src = "player.png"
var mirrorSprite = new Image()
mirrorSprite.src = "mirror.png"
var mousex = 0
var mousey = 0
var SPEED = 4
var score = 0
var menu = 1

class Player
{
    constructor()
    {
        this.x = 75
        this.y = 375
        this.hitx = 0
        this.hity = 0
        this.hitwidth = 40
        this.hitheight = 40
    }
    draw()
    {
        c.drawImage(playerSprite, this.x - 25, this.y - 25)
    }
    update(obstacles)
    {
        this.y = mousey
        this.hitx = this.x - 20
        this.hity = this.y - 20
        obstacles.forEach(obstacle =>{
            if (this.hitx < obstacle.x + obstacle.width && this.hitx + this.hitwidth > obstacle.x && this.hity < obstacle.y + obstacle.height && this.hity + this.hitheight > obstacle.y)
            {
                menu = 3
                frames = 0
            }
        })
    }
}
class Obstacle
{
    constructor(x, y)
    {
        this.x = x
        this.y = y
        this.height = 600
        this.width = 25
        if (this.y > -60 && this.y < 60)
        {
            this.y = Math.random() * 1150 - 600
            while (this.y > -60 && this.y < 60)
            {
                this.y = Math.random() * 1150 - 600
            }
        }
    }
    draw()
    {
        c.fillStyle = 'red'
        c.fillRect(this.x, this.y, this.width, this.height)
    }
    update(player)
    {
        if (player.x < 400)
        {
            this.x -= SPEED
            if (this.x < 0)
            {
                this.x = 800
                this.y = Math.random() * 1150 - 600
                if (this.y > -60 && this.y < 60)
                {
                    this.y = Math.random() * 1150 - 600
                    while (this.y > -60 && this.y < 60)
                    {
                        this.y = Math.random() * 1150 - 600
                    }
                }
                SPEED += .1
                score++
            }
            
        }
        else if (player.x > 400)
        {
            this.x += SPEED
            if (this.x > 800)
            {
                this.x = 0
                this.y = Math.random() * 1150 - 600
                if (this.y > 0 && this.y < 60)
                {
                    this.y = Math.random() * 1150 - 600
                    while (this.y > 0 && this.y < 60)
                    {
                        this.y = Math.random() * 1150 - 600
                    }
                }
                if (this.y < 0 && this.y > -60)
                {
                    this.y = Math.random() * 1150 - 600
                    while(this.y < 0 && this.y > -60)
                    {
                        this.y = Math.random() * 1150 - 600
                    } 
                }
                SPEED += .1
                score++
            }
        }
    }
}

var player = new Player()
var obstacles = [new Obstacle(200, Math.random() * 1150 - 600), new Obstacle(400, Math.random() * 1150 - 600),new Obstacle(600, Math.random() * 1150 - 600), new Obstacle(800, Math.random() * 1150 - 600)]

te = 0
ft = 16
ct = Date.now()
frames = 0

function animate()
{
    st = ct
    requestAnimationFrame(animate);
    ct = Date.now()
    te += ct - st
    if (te >= ft)
    {
        if (menu == 1)
        {
            c.clearRect(0, 0, canvas.width, canvas.height)
            c.fillStyle = 'cadetblue'
            c.fillRect(0, 0, canvas.width, canvas.height)
            c.fillStyle = 'black'
            c.font = "80pt Arial"
            var length = c.measureText("Mirror")
            c.fillText("Mirror", 400 - length.width / 2, 150)

            c.font = "40pt Arial"
            var length = c.measureText("Click To Play")
            c.fillText("Click To Play", 400 - length.width / 2, 450)
        }
        if (menu == 2)
        {
            c.clearRect(0, 0, canvas.width, canvas.height)
            c.fillStyle = 'cadetblue'
            c.fillRect(0, 0, canvas.width, canvas.height)

            obstacles.forEach(obstacle =>{
                obstacle.update(player)
                obstacle.draw()
            })

            player.update(obstacles)
            player.draw()

            if (frames >= 720)
            {
                if (frames % 60 < 29)
                {
                    c.drawImage(mirrorSprite, 400 - 42, 50, 84, 100)
                }
                if (frames >= 900)
                {
                    player.x = 800 - player.x
                    obstacles.forEach(obstacle=>{
                        obstacle.x = 800 - obstacle.x
                    })
                    frames = 0
                }
            }

            c.fillStyle = 'black'
            c.font = "30pt Arial"
            c.fillText(score, 50, 70)
            frames++
        }
        if (menu == 3)
        {
            frames++
            if (frames >= 60)
            {
                window.location.reload()
            }
            
        }
        te = 0
    }
}
animate()







document.onmousemove = function(e)
{
    mousex = e.offsetX
    mousey = e.offsetY
    if (e.pageY < 125 || mousey < 25)
    {
        mousey = 25
    }
    if (mousey > 575)
    {
        mousey = 575
    }
}
document.onmousedown = function(e)
{
    if (menu == 1)
    {
        menu = 2
    }
}