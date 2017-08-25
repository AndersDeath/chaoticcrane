function ChaoticCranes(options) {
    this.container = options.container;
    this.speed = options.speed || 100;
    this.width = 1200;
    this.height = 1200;
    this.el = [];
    this.colorArr = [
        '#f0f',
        '#f00',
        '#0ff',
        '#000',
        '#f0f123'
    ];
    this.stage = new Konva.Stage({
        container: this.container,
        width: this.width,
        height: this.height,
    });

}

ChaoticCranes.prototype.removeLastCrane = function () {
    var length = this.el.length;
    if (length > 0) {
        clearInterval(this.el[length - 1].interval)
        this.el[length - 1].layer.destroy();
        this.el.pop();
    }
}

ChaoticCranes.prototype.addCrane = function () {
    this.el.push(this.build(this.buildCrane(this.random(100, 900), this.random(100, 900)), this.el.length + 1));
}

ChaoticCranes.prototype.build = function (crane, num) {
    var self = this;
    self['layer' + num] = new Konva.Layer();
    self['layer' + num].add(crane);
    self.stage.add(self['layer' + num]);
    var randomCoef = self.random(0, 1000);
    var i = 0;
    var interval = setInterval(function () {
        var speed = self.speed;
        if (i > randomCoef) {
            speed = -self.speed;
        }
        crane.children[0].rotate(speed * (Math.PI / 180));
        self['layer' + num].clear();
        crane.draw();
        i++;
    }, 20);
    return {
        interval: interval,
        layer: self['layer' + num]
    };
}


ChaoticCranes.prototype.buildCrane = function (x, y) {
    var self = this;
    var color = self.colorArr[self.random(0, self.colorArr.length - 1)];
    self.group = new Konva.Group({
        x: x,
        y: y
    });
    var line = new Konva.Line({
        points: [100, 0, 0, 0, -20, 0],
        stroke: color,
        strokeWidth: 1,
    });
    self.group.add(line);
    var circle = new Konva.Circle({
        radius: 3,
        fill: color,
    });
    return self.group.add(circle);
}

ChaoticCranes.prototype.random = function (min, max) {
    return parseInt(Math.random() * (max - min) + min);
}

$(document).ready(function () {
    var app = new ChaoticCranes({
        container: 'container',
        speed: 300
    });
    $('.add').bind('click', function () {
        console.info("ADD NEW CRANE");
        app.addCrane();
    });
    $('.remove').bind('click', function () {
        console.info("REMOVE LAST CRANE");
        app.removeLastCrane();
    });
});