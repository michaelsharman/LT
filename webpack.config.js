module.exports = {
    entry: {
        'assessment/core': './src/assessment/core.js',
        'assessment/index': './src/assessment/index.js',
        'authoring/core': './src/authoring/core.js',
        'authoring/index': './src/authoring/index.js',
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js',
        assetModuleFilename: 'assets/[name][ext][query]',
        clean: true,
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
