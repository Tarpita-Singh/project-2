const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const center = {
    x: window.innerWidth/2,
    y: window.innerHeight/2,
}

const mouse = {
    x: undefined,
    y: undefined,
}


canvas.addEventListener('mousemove', function(move){
    mouse.x = move.x;
    mouse.y = move.y;
    // console.log(mouse.x, mouse.y);
});

const allParticles = [];

class Particles{
    constructor(){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random()*2 + 1;
        this.speedX = Math.random()*0.5 - 0.25;
        this.speedY = Math.random()*0.5 - 0.25;
    }
    update(){
        if(this.x > canvas.width - this.size || this.x < this.size){
            this.speedX *= -1;
        }
        if(this.y  > canvas.height - this.size || this.y  < this.size){
            this.speedY *= -1;
        }

        this.x += this.speedX;
        this.y += this.speedY;

        this.x += this.speedX;
        this.y += this.speedY;
    }
    draw(){
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
    }
}
   

function generate(){
    for(let i=0; i<150; i++){
        allParticles.push(new Particles());
    }
}
generate();

function drawParticles(){
    for(let i=0; i<allParticles.length; i++){
        allParticles[i].update();
        allParticles[i].draw();
        // console.log(mouse.x, mouse.y);
        const dx2 = allParticles[i].x - mouse.x;
        const dy2 = allParticles[i].y - mouse.y;
        const mouseDist = Math.sqrt(dx2 * dx2 + dy2 * dy2);
        // console.log(mouseDist);
        if(mouseDist < 100){
            ctx.beginPath();
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 1;
            ctx.moveTo(allParticles[i].x, allParticles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
            ctx.closePath();
            allParticles[i].x -= dx2/100;
            allParticles[i].y -= dy2/100;
            // repel = 1;
        }

        for(let j=i; j<allParticles.length; j++){
            const dx = allParticles[i].x - allParticles[j].x;
            const dy = allParticles[i].y - allParticles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if(distance < 100){
                ctx.beginPath();
                ctx.strokeStyle = 'white';
                ctx.lineWidth = 0.1;
                ctx.moveTo(allParticles[i].x, allParticles[i].y);
                ctx.lineTo(allParticles[j].x, allParticles[j].y);
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
}
drawParticles();

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawParticles();
    requestAnimationFrame(animate);
}
animate();