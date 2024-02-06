module.exports = {
    entry: {
        assessment: './src/assessment/index.js',
        authoring: './src/authoring/index.js',
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name]/LT.js',
        assetModuleFilename: 'assets/[name][ext][query]',
    },
    module: {
        rules: [
            {
                test: /\.svg/,
                type: 'asset/resource',
            },
        ],
    },
};
