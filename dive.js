function rand(min, max) {
    return Math.random() * (max - min) + min;
  }


var Player = {
    new:function(){
        return{
            radius: 5,
            x: this.canvas.width/2,
            y: this.canvas.height/2,
            velocityX : 0,
            velocityY : 0,
            accelX : 0,
            accelY : 0,
            friction: 0.10,
            maxVelocity : 5
            
        };
    }
};

var Ball = {
    new:function(x, y, radius, velocityX, velocityY){
        return{
            radius: radius,
            x: x,
            y: y,
            velocityX: velocityX,
            velocityY: velocityY,



        };
    }
};


var Game = {
    init:function(){

        


        //Canvas Init
        this.canvas = document.getElementById('diveCanvas');
        this.ctx = this.canvas.getContext("2d");

        this.canvas.height = 500;
        this.canvas.width = 500;

        


        //Object Call
        this.player =  Player.new.call(this);
        this.balls = []



        //Loop

        setInterval(() => {Dive.addBall();}, 3000)
        
        //setInterval(Dive.addBall, this, 3000);

        
        Dive.loop();
        Dive.listen();

    },



    addBall:function(){

        radius = rand(5.5, 8);
        x = rand(radius, this.canvas.width-radius);
        y = rand(radius, this.canvas.height-radius);

        velocityX = rand(0.5, 4);
        velocityY = rand(0.5, 4);

        positions = [[radius, y], [x, radius], [this.canvas.width-radius, y], [x, this.canvas.height-radius]];

        position = positions[Math.floor(rand(0, 4))];

        

        this.balls.push(Ball.new.call(this, position[0], position[1], radius, velocityX, velocityY));

        




        
        





    },

    update:function(){

        //Border Collision
        if (this.player.y + this.player.velocityY < this.player.radius) {

            this.player.y = this.player.radius -this.player.velocityY
            this.player.velocityY = -this.player.velocityY
            this.player.accelY += 2
            
             
        }

        if (this.player.y+this.player.velocityY > this.canvas.height-this.player.radius) {
            this.player.y = this.canvas.height-this.player.radius -this.player.velocityY
            this.player.velocityY = -this.player.velocityY
            this.player.accelY -= 2
             
        }

        if (this.player.x + this.player.velocityX < this.player.radius) {
            this.player.x = this.player.radius -this.player.velocityX
            this.player.velocityX = -this.player.velocityX
            this.player.accelX +=2
        }

        if (this.player.x+this.player.velocityX > this.canvas.width-this.player.radius) {
            this.player.x = this.canvas.width-this.player.radius -this.player.velocityX
            this.player.velocityX = -this.player.velocityX
            this.player.accelX -=2
             
        }




        


        


        //Player Movement

       
        this.player.velocityX += this.player.accelX
        this.player.velocityY += this.player.accelY

        //Friction

        this.player.velocityX -= Math.abs(this.player.velocityX)*this.player.friction*Math.sign(this.player.velocityX)
        this.player.velocityY -= Math.abs(this.player.velocityY)*this.player.friction*Math.sign(this.player.velocityY)


        //Max Speed

        if (Math.abs(this.player.velocityX) > this.player.maxVelocity) {
            this.player.velocityX = this.player.maxVelocity * Math.sign(this.player.velocityX)

        }

        if (Math.abs(this.player.velocityY) > this.player.maxVelocity) {
            this.player.velocityY = this.player.maxVelocity * Math.sign(this.player.velocityY)

        }

        this.player.x += this.player.velocityX
        this.player.y += this.player.velocityY




        for (ball in this.balls){

            if (this.balls[ball].y + this.balls[ball].velocityY < this.balls[ball].radius) {

                this.balls[ball].y = this.balls[ball].radius -this.balls[ball].velocityY
                this.balls[ball].velocityY = -this.balls[ball].velocityY
                
                
                 
            }
    
            if (this.balls[ball].y+this.balls[ball].velocityY > this.canvas.height-this.balls[ball].radius) {
                this.balls[ball].y = this.canvas.height-this.balls[ball].radius -this.balls[ball].velocityY
                this.balls[ball].velocityY = -this.balls[ball].velocityY
                
                 
            }
    
            if (this.balls[ball].x + this.balls[ball].velocityX < this.balls[ball].radius) {
                this.balls[ball].x = this.balls[ball].radius -this.balls[ball].velocityX
                this.balls[ball].velocityX = -this.balls[ball].velocityX
                
            }
    
            if (this.balls[ball].x+this.balls[ball].velocityX > this.canvas.width-this.balls[ball].radius) {
                this.balls[ball].x = this.canvas.width-this.balls[ball].radius -this.balls[ball].velocityX
                this.balls[ball].velocityX = -this.balls[ball].velocityX
                
                 
            }




            this.balls[ball].x += this.balls[ball].velocityX
            this.balls[ball].y += this.balls[ball].velocityY


            //collision
            var dx = this.player.x - this.balls[ball].x;
            var dy = this.player.y - this.balls[ball].y;
            var distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.player.radius + this.balls[ball].radius) {
               alert("Final score: " + this.balls.length);
               this.balls = [];
               this.player.accelX = 0;
               this.player.accelY = 0;
               
               break;
    
            }

        }


        
        






    },

    draw:function(){
        
        //Clear Canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        //Draw Player
        this.ctx.beginPath();
        this.ctx.arc(this.player.x, this.player.y, this.player.radius, 0, Math.PI*2, false);
        this.ctx.fillStyle = "white";
        this.ctx.fill();
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = 'black';
        this.ctx.stroke();
        this.ctx.closePath();

        //Draw Balls

        

        for (ball in this.balls){

            
            
            this.ctx.beginPath();
            this.ctx.arc(this.balls[ball].x, this.balls[ball].y, this.balls[ball].radius, 0, Math.PI*2, false);
            this.ctx.fillStyle = "red";
            this.ctx.fill();
            this.ctx.lineWidth = 1;
            this.ctx.strokeStyle = 'black';
            this.ctx.stroke();
            this.ctx.closePath();
        }




    },

    loop:function(){

        

        

        Dive.update();
        Dive.draw();
        requestAnimationFrame(Dive.loop);
        
    },


    listen:function(){

        

        //Key Press
        document.addEventListener('keydown', function (key) {

            


			
			if (key.key === "w" || key.key === "ArrowUp") Dive.player.accelY -= 0.5;
			if (key.key === "s" || key.key === "ArrowDown") Dive.player.accelY +=0.5;
            if (key.key === "a" || key.key === "ArrowLeft") Dive.player.accelX -= 0.5;
			if (key.key === "d" || key.key === "ArrowRight") Dive.player.accelX +=0.5;
		});

		//Key Release
		document.addEventListener('keyup', function (key) {
            
            if (key.key === "w" || key.key === "ArrowUp") Dive.player.accelY = 0;
			if (key.key === "s" || key.key === "ArrowDown") Dive.player.accelY = 0;
            if (key.key === "a" || key.key === "ArrowLeft") Dive.player.accelX = 0;
			if (key.key === "d" || key.key === "ArrowRight") Dive.player.accelX = 0;



         });


    }


    
};




var Dive = Object.assign({}, Game);
Dive.init();