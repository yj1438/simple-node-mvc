var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
var ignoreFiles = new webpack.IgnorePlugin(/jquery/);

module.exports = {
    context: __dirname + "/src",
    entry: {
        index: './index/main.js'
//        vendor: ['jquery'] //第三方库
    },
    output: {
        path: __dirname + '/static',
        filename: './module/[name].js'
//        libraryTarget: 'amd'        //var, this, commonjs, commonjs2, amd, umd
    },
    module: {
        loaders: [
            //内联样式
            //{test: /\.css$/, loader: 'style!css'},
            //{ test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
            //外置样式打包
            {test: /\.css/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
            {test: /\.less$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")},
            //jsx
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            //图片内联
            //{test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    },
    externals: [
//        {
//            jquery: true,
//            a: false, // a is not external
//            b: true, // b is external (require("b"))
//            "./c": "c", // "./c" is external (require("c"))
//            "./d": "var d" // "./d" is external (d)
//        },
        // Every non-relative module is external
        // abc -> require("abc")
//        /^[a-z\-0-9]+$/,
//        function(context, request, callback) {
//            // Every module prefixed with "global-" becomes external
//            // "global-abc" -> abc
//            if(/^global-/.test(request))
//                return callback(null, "var " + request.substr(7));
//            callback();
//        },
//        "jquery" // "./e" is external (require("./e"))
    ],
    plugins: [
        new ExtractTextPlugin("./module/[name].css"),
//        ignoreFiles
    ]
};
