exports.index = function () {
    this.render('/http2/index', {});
}

exports.demo = function (args) {
    var sequence = [],
        i;
    for (i = 1; i <= 400; i++) {
        sequence.push({img: 'photo_' + (i + 1000 + '').slice(1) + '.png'});
    }
    this.render('http2/http-demo', {sequence: sequence, start_time: this.params.start_time});  
}

exports.static = function (args) {
    this.render('/http2/static', {});
}