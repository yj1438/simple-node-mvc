exports.index = function (args) {
    //this.renderJson(this.params);
    this.render('index/index', {title: "Welcome to yj's simple-nodejs-mvc"});
};

exports.demo = function (args) {
    var sequence = [],
        i;
    for (i = 1; i <= 400; i++) {
        sequence.push({img: 'photo_' + (i + 1000 + '').slice(1) + '.png'});
    }
    this.render('index/http-demo', {sequence: sequence, start_time: this.params.start_time});  
};