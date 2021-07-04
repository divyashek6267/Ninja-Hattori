class Stand{
    constructor(x,y){
        var options = {
            isStatic:true
        }
        this.width = 80;
        this.height = 10;
        this.image = loadImage("Images/stand (3).png");
        this.body = Bodies.rectangle(x,y,this.width,this.height,options);
        World.add(world,this.body);
    }
    display(){
        var pos = this.body.position;
        push()
        translate(pos.x,pos.y);
        imageMode(CENTER);
        this.image(image,0,0,this.width,this.height);
        pop();
    }
}