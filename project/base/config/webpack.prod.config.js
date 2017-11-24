const path = require('path');
const ClosureCompilerPlugin = require('webpack-closure-compiler');

module.exports = {
    entry: './websites/assets/js/bundle.js',
    output: {
        path: path.resolve('./project/base/public/assets/js'),
        filename: 'bundle.js'
    },
    plugins: [
        new ClosureCompilerPlugin({
            compiler: {
                language_in: 'ECMASCRIPT6', //'ECMASCRIPT5_STRICT', hyperhtml uses ESMACSCRIPT6 syntax.
                language_out: 'ECMASCRIPT5_STRICT', // IE11, EDGE15, 98%
                compilation_level: 'SIMPLE', // WHITESPACE_ONLY, SIMPLE, ADVANCED (default: SIMPLE)
                warning_level: 'verbose',
                // externs: './src/externs/externs.js',
                isolation_mode: 'NONE' // NONE | IIFE  (default: NONE)
            },
            concurrency: 3
        })
    ]
};
