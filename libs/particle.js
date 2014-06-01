function Particle(x, y, h, w, xV, yV, d, c){
  this.x = x;
  this.y = y;
  this.height = h;
  this.width = w;
  this.velocity = {x: xV, y:yV};
  this.density = d;
  this.color = c;
};
Particle.prototype.update = function(){
  
  this.erase();
  this.drawMark();
  this.move();
  
  //Check for collision
  for(var i=0; i<world.objects.length; i++){
    
    if(this==world.objects[i]) continue;
    
    if(collides(this, world.objects[i])){
      
      var massB = (world.objects[i].density*world.objects[i].height*world.objects[i].width);
      var massA = (this.density*this.height*this.width);
      var newVolume = ((this.height*this.width)+(world.objects[i].height*world.objects[i].width));
      var portionOfDensityA = (massA/newVolume);
      var portionOfDensityB = (massB/newVolume);
      
      if(bigger(this, world.objects[i])){
        
        var newVelocity = {
          x: ((this.velocity.x*(massA-massB))+2*massB*world.objects[i].velocity.x)/(massA+massB),
          y: ((this.velocity.y*(massA-massB))+2*massB*world.objects[i].velocity.y)/(massA+massB),
        };
        
        this.setVelocity(newVelocity.x, newVelocity.y);
        
        this.x += (this.width - Math.sqrt(newVolume))/2;
        this.y += (this.height - Math.sqrt(newVolume))/2;
        this.height = Math.sqrt(newVolume);
        this.width = this.height;
        this.density = portionOfDensityA+portionOfDensityB;
        world.objects.splice(i, 1);
      }else{
        
        var newVelocity = {
          x: ((world.objects[i].velocity.x*(massA-massB))+2*massA*this.velocity.x)/(massA+massB),
          y: ((world.objects[i].velocity.y*(massA-massB))+2*massA*this.velocity.y)/(massA+massB),
        };
        
        world.objects[i].setVelocity(newVelocity.x, newVelocity.y);
        
        world.objects[i].x += (world.objects[i].width - Math.sqrt(newVolume))/2;
        world.objects[i].y += (world.objects[i].height - Math.sqrt(newVolume))/2;
        world.objects[i].height = Math.sqrt(newVolume);
        world.objects[i].width = Math.sqrt(newVolume);
        world.objects[i].density = portionOfDensityA+portionOfDensityB;
        world.objects.splice(world.objects.indexOf(this), 1);
        return;
      }
    }
  }
  
  this.draw();
};
Particle.prototype.move = function(){
  gravMove(this, world.objects);
  this.x+=this.velocity.x;
  this.y+=this.velocity.y;
};
Particle.prototype.drawMark = function(){
  world.context.beginPath();
  world.context.arc(this.x+(this.width/2), this.y+(this.height/2), 2, 0, 2 * Math.PI, false);
  world.context.fillStyle = this.color;
  world.context.fill();
  world.context.lineWidth = 1;
  world.context.strokeStyle = this.color;
  world.context.stroke();
};
Particle.prototype.erase = function(){
  world.context.beginPath();
  world.context.arc(this.x+(this.width/2), this.y+(this.height/2), (this.width/2), 0, 2 * Math.PI, false);
  world.context.fillStyle = "white";
  world.context.fill();
  world.context.lineWidth = 1;
  world.context.strokeStyle = "white";
  world.context.stroke();
};
Particle.prototype.draw = function(){
  world.context.beginPath();
  world.context.arc(this.x+(this.width/2), this.y+(this.height/2), (this.width/2), 0, 2 * Math.PI, false);
  world.context.fillStyle = this.color;
  world.context.fill();
  world.context.lineWidth = 1;
  world.context.strokeStyle = this.color;
  world.context.stroke();
};
Particle.prototype.setVelocity = function(xVal, yVal){
  if(!(xVal>termVel || xVal<-termVel)) this.velocity.x = xVal;
  if(!(yVal>termVel || yVal<-termVel)) this.velocity.y = yVal;
};