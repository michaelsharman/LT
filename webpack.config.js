module.exports = {
    entry: {
        assessment: './src/assessment/index.js',
        authoring: './src/authoring/index.js',
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name]/LT.js',
    },
};
