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
        library: {
            type: 'module',
        },
    },
    experiments: {
        outputModule: true,
    },
    resolve: {
        fallback: {
            fs: false,
            https: false,
        },
    },
    mode: 'production',
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
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
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
