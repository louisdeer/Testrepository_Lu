var yang = new Bot(240, 220,'yang','bots/yang/person.png');
yang.angle = 10;
yang.speed = 180;

yang.update = function() {
    if (Math.random() < .2) {
        yang.angle += 5;
    }
    if (Math.random() < .2) {
        yang.angle += 5;
    }
    if (Math.random() < .1) {
        yang.speed += 5;
    }else{
        yang.speed -= 5;
    }
};