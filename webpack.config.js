const VersionFile = require('webpack-version-file');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

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
        libraryTarget: 'module',
    },
    module: {
        rules: [
            {
                test: /\.svg/,
                type: 'asset/resource',
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    experiments: {
        outputModule: true,
    },
    plugins: [
        new VersionFile({
            output: './dist/version.js',
            template: './src/utils/versionTemplate.ejs',
            package: './package.json',
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*', '!version.js'],
        }),
    ],
};
