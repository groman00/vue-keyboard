const path = require('path');
const webpack = require('webpack');
module.exports = {
    entry: './resources/assets/js/app.js',
    output: {
        path: __dirname,
        filename: 'dist/js/bundle.js'
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    }
};

