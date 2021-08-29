function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
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
    new:function(path, x, y, radius, velocityX, velocityY, color, maxVelocity){
        return{
            path: path,
            radius: radius,
            x: x,
            y: y,
            velocityX: velocityX,
            velocityY: velocityY,
            accelX : 0,
            accelY : 0,
            color : color,
            maxVelocity : maxVelocity,
            angle : 0
            



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

        this.date = new Date();

        

        


        //Object Call
        this.player =  Player.new.call(this);
        this.balls = []


        



        //Loop

        setInterval(() => {Dive.addBall();}, 3000)

        
        

        
        Dive.loop();
        Dive.listen();

    },



    addBall:function(){

        color = "red";
        path = "line";
        maxVelocity = 3;

        velocityX = rand(0.5, 3);
        velocityY = rand(0.5, 3);

        if (this.balls.length % 4 === 0 && this.balls.length != 0) {
            color = "green";
            path = "rebound";
            maxVelocity = 4.5;

            velocityX = rand(2, 4.5);
            velocityY = rand(2, 4.5);
        }



        if (this.balls.length % 9 === 0 && this.balls.length != 0) {
            color = "blue";
            path = "seek";
            maxVelocity = 3.5;

            
        }

        radius = rand(5.5, 8);
        x = rand(radius, this.canvas.width-radius);
        y = rand(radius, this.canvas.height-radius);

        

        positions = [[radius, y], [x, radius], [this.canvas.width-radius, y], [x, this.canvas.height-radius]];

        position = positions[Math.floor(rand(0, 4))];

        

        this.balls.push(Ball.new.call(this, path, position[0], position[1], radius, velocityX, velocityY, color, maxVelocity));

        




        
        





    },

    update:function(){

        document.getElementById("score").innerHTML = "Current Score : " + this.balls.length;


        

        

        




        for (ball in this.balls){
            //collision
        var dx = (this.player.x + this.player.velocityX) - (this.balls[ball].x + this.balls[ball].velocityX) ;
        var dy = (this.player.y + this.player.velocityY)  - (this.balls[ball].y + this.balls[ball].velocityY) ;



        
        
        var distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.player.radius + this.balls[ball].radius) {
           alert("Final score: " + this.balls.length);

           

           if (document.cookie === ""){
               
            document.cookie = "highscore=" + String(this.balls.length) + ";max-age=31536000";

            
           
            

           } else if (this.balls.length > Number(getCookie('highscore'))){
            document.cookie = "highscore=" + String(this.balls.length) + ";max-age=31536000";

           }

           document.getElementById("highscore").innerHTML = "High Score : " + getCookie('highscore');



           

           
           this.balls = [];
           this.player.accelX = 0;
           this.player.accelY = 0;
           
           break;

        }

        //Angle

        this.balls[ball].angle = Math.atan(dy/dx)
        var targetVelocity = Math.sqrt(this.balls[ball].velocityX**2 + this.balls[ball].velocityY**2)




            if (this.balls[ball].y + this.balls[ball].velocityY < this.balls[ball].radius) {

                this.balls[ball].y = this.balls[ball].radius -this.balls[ball].velocityY

                if (this.balls[ball].path === "rebound"){

                    this.balls[ball].velocityX = targetVelocity * Math.abs(Math.cos(this.balls[ball].angle)) * Math.sign(this.player.x-this.balls[ball].x)
                    this.balls[ball].velocityY = targetVelocity * Math.abs(Math.sin(this.balls[ball].angle)) * Math.sign(this.player.y-this.balls[ball].y)

                }else{
                    
                    this.balls[ball].velocityY = -this.balls[ball].velocityY
                }

                
                //this.balls[ball].velocityY += 2
                //this.balls[ball].accelY = -this.balls[ball].accelY

                
                
                
                 
            }
    
            if (this.balls[ball].y+this.balls[ball].velocityY > this.canvas.height-this.balls[ball].radius) {

                this.balls[ball].velocityY = -this.balls[ball].velocityY

                if (this.balls[ball].path === "rebound"){
                    
                    this.balls[ball].velocityX = targetVelocity * Math.abs(Math.cos(this.balls[ball].angle)) * Math.sign(this.player.x-this.balls[ball].x)
                    this.balls[ball].velocityY = targetVelocity * Math.abs(Math.sin(this.balls[ball].angle)) * Math.sign(this.player.y-this.balls[ball].y)

                }else{
                this.balls[ball].y = this.canvas.height-this.balls[ball].radius -this.balls[ball].velocityY
                
                }
                //this.balls[ball].velocityY -= 2
                //this.balls[ball].accelY = -this.balls[ball].accelY
                
                 
            }
    
            if (this.balls[ball].x + this.balls[ball].velocityX < this.balls[ball].radius) {
                this.balls[ball].velocityX = -this.balls[ball].velocityX

                if (this.balls[ball].path === "rebound"){
                    
                    this.balls[ball].velocityX = targetVelocity * Math.abs(Math.cos(this.balls[ball].angle)) * Math.sign(this.player.x-this.balls[ball].x)
                    this.balls[ball].velocityY = targetVelocity * Math.abs(Math.sin(this.balls[ball].angle)) * Math.sign(this.player.y-this.balls[ball].y)

                }else{
                this.balls[ball].x = this.balls[ball].radius -this.balls[ball].velocityX
                
                }
                //this.balls[ball].velocityX +=2
               // this.balls[ball].accelX = -this.balls[ball].accelX /2
                
            }
    
            if (this.balls[ball].x+this.balls[ball].velocityX > this.canvas.width-this.balls[ball].radius) {
                this.balls[ball].velocityX = -this.balls[ball].velocityX
                if (this.balls[ball].path === "rebound"){
                    
                    this.balls[ball].velocityX = targetVelocity * Math.abs(Math.cos(this.balls[ball].angle)) * Math.sign(this.player.x-this.balls[ball].x)
                    this.balls[ball].velocityY = targetVelocity * Math.abs(Math.sin(this.balls[ball].angle)) * Math.sign(this.player.y-this.balls[ball].y)

                }else{
                this.balls[ball].x = this.canvas.width-this.balls[ball].radius -this.balls[ball].velocityX
                
                }
                //this.balls[ball].velocityX -=2
                //this.balls[ball].accelX = -this.balls[ball].accelX /2
                
                 
            }


            if (this.balls[ball].path === "seek") {

                this.balls[ball].accelX +=  0.05 * Math.sign(this.player.x-this.balls[ball].x)
                this.balls[ball].accelY +=  0.05 * Math.sign(this.player.y-this.balls[ball].y)
                this.balls[ball].velocityX +=  1 * Math.sign(this.player.x-this.balls[ball].x)
                this.balls[ball].velocityY +=  1 * Math.sign(this.player.y-this.balls[ball].y)

                

                

                /* if (Math.abs(this.balls[ball].accelX) > this.balls[ball].maxAccel) {
                    this.balls[ball].accelX = this.balls[ball].maxAccel * Math.sign(this.balls[ball].accelX)
                    
        
                }
        
                if (Math.abs(this.balls[ball].accelY) > this.balls[ball].maxAccel) {
                    this.balls[ball].accelY = this.balls[ball].maxAccel * Math.sign(this.balls[ball].accelY)
                    
        
                } */

                
            }



            this.balls[ball].velocityX += this.balls[ball].accelX
            this.balls[ball].velocityY += this.balls[ball].accelY

            if (Math.abs(this.balls[ball].velocityX) > this.balls[ball].maxVelocity) {
                this.balls[ball].velocityX = this.balls[ball].maxVelocity * Math.sign(this.balls[ball].velocityX)
                
    
            }
    
            if (Math.abs(this.balls[ball].velocityY) > this.balls[ball].maxVelocity) {
                this.balls[ball].velocityY = this.balls[ball].maxVelocity * Math.sign(this.balls[ball].velocityY)
                
    
            }

            this.balls[ball].x += this.balls[ball].velocityX
            this.balls[ball].y += this.balls[ball].velocityY

           /*  if (this.date.getTime() - this.balls[ball].timeCreated > this.balls[ball].lifetime) {
                this.balls.splice(ball, 1);
            } */


            

        }


        //Border Collision
        if (this.player.y + this.player.velocityY < this.player.radius) {

            this.player.y = this.player.radius -this.player.velocityY
            this.player.velocityY = -this.player.velocityY
            this.player.velocityY += 2
            
             
        }

        if (this.player.y+this.player.velocityY > this.canvas.height-this.player.radius) {
            this.player.y = this.canvas.height-this.player.radius -this.player.velocityY
            this.player.velocityY = -this.player.velocityY
            this.player.velocityY -= 2
             
        }

        if (this.player.x + this.player.velocityX < this.player.radius) {
            this.player.x = this.player.radius -this.player.velocityX
            this.player.velocityX = -this.player.velocityX
            this.player.velocityX +=2
        }

        if (this.player.x+this.player.velocityX > this.canvas.width-this.player.radius) {
            this.player.x = this.canvas.width-this.player.radius -this.player.velocityX
            this.player.velocityX = -this.player.velocityX
            this.player.velocityX -=2
             
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
            this.ctx.fillStyle = this.balls[ball].color;
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



document.getElementById("highscore").innerHTML = "High Score : " + getCookie('highscore');
var Dive = Object.assign({}, Game);
Dive.init();