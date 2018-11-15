const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const publicPath = '';
let outputPath, devMode, sourceMap;
if (process.env.NODE_ENV === 'production') {
    outputPath = `${__dirname}/dist/${publicPath}`;
    devMode = 'production';
    sourceMap = false;
} else {
    outputPath = `${__dirname}/build/${publicPath}`;
    devMode = 'development';
    sourceMap = true;
}
module.exports = {
    entry: {
        main: `${__dirname}/src/js/main.js`
    },
    target: 'web',
    mode: devMode,
    devtool: sourceMap ? 'inline-source-map':false ,
    output: {
        path: outputPath,
        publicPath: publicPath,
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                ]
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: sourceMap,
                            url: false,
                            importLoaders: 2
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: sourceMap,
                            plugins: [require('autoprefixer')]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: sourceMap
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            ENV: JSON.stringify(devMode)
        }),
        new MiniCssExtractPlugin({
            filename: 'css/style.css'
        })
    ],
    devServer: {
        contentBase: `${__dirname}/build`,
        watchContentBase: true,
        open: true,
        port: 8080
    }
};
