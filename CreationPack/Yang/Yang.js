var Yang = new Bot(240, 220,'Yang','bots/Yang/person.png');
Yang.angle = 10;
Yang.speed = 180;

Yang.update = function() {
    if (Math.random() < .2) {
        Yang.angle += 5;
    }
    if (Math.random() < .2) {
        Yang.angle += 5;
    }
    if (Math.random() < .1) {
        Yang.speed += 5;
    }else{
        Yang.speed -= 5;
    }
};