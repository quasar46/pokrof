// Webpack 4

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const WebpackMd5Hash = require('webpack-md5-hash');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');


// Параметры (cross-env)
const devMode = process.env.DEV_MODE;
const isDev = devMode != "build";

module.exports = {
    mode: devMode !== "build" ? "development" : "production",
    entry: ['./src/main.js'],
    output: {
        filename: 'js/build.js',
        publicPath: "/",
        library: '[name]',
        path: path.resolve(__dirname)
    },
    watch: (devMode == "dev" || devMode == "serve") ? true : false,
    devtool: isDev ? "inline-cheap-module-source-map" : false,
    resolve: {
        extensions: ['.js', '.scss'],
        alias: {
			'@': path.resolve(__dirname, "src"),
            'jquery': path.resolve(__dirname, "vendor/jquery/dist/jquery")
        },
        modules: [
            path.resolve(__dirname, "vendor"), path.resolve(__dirname, "node_modules"), path.resolve(__dirname, "src/js")
        ]
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: false,
                uglifyOptions: {
                    comments: false,
                    warnings: false,
                    parse: {},
                    compress: {},
                    mangle: true,
                    output: null,
                    toplevel: false,
                    nameCache: null,
                    ie8: false,
                    keep_fnames: false,
                }
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
        splitChunks: {
            chunks: 'all',
            name: 'chunks',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    module: {
        rules: [{
            test: /\.(eot|woff2|woff|ttf|otf)$/,
            use: {
                loader: "file-loader",
                options: {
                    name: isDev ? '[path][name].[ext]' : '[name]~[hash].[ext]',
                    outputPath: 'fonts/'
                }
            }
        }, {
            test: /\.js$/,
            exclude: /(node_modules|bower_components|vendor)/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['env'],
                    // plugins: ['transform-runtime']
                }
            }]
        }, {
            test: /\.scss$/,
            use: [MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: {
                        sourceMap: isDev
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [
                            autoprefixer({
                                browsers: ['ie >= 9', 'last 4 version']
                            })
                        ],
                        sourceMap: isDev
                    }
                },
                // {
                //     loader: 'group-css-media-queries-loader',
                //     options: {
                //         sourceMap: isDev
                //     }
                // },
                {
                    loader: "sass-loader",
                    options: {
                        sourceMap: isDev
                    }
                }
            ]
        }, {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: isDev
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [
                            autoprefixer({
                                browsers: ['ie >= 9', 'last 4 version']
                            })
                        ],
                        sourceMap: isDev
                    }
                },
                // {
                //     loader: 'group-css-media-queries-loader',
                //     options: {
                //         sourceMap: isDev
                //     }
                // },
            ]
        }, {
            test: /\.(png|jpg|jpeg|svg|gif|webp)$/,
            use: [{
                loader: "file-loader",
                options: {
                    name: isDev ? '[path][name].[ext]' : '[name]~[hash].[ext]',
                    outputPath: 'img/'
                }
            }, {
                loader: "image-webpack-loader",
                options: {
                    disable: devMode == "build"
                }
            }]
        }]
    },
    plugins: [
        new WebpackNotifierPlugin({
            title: 'Webpack',
            skipFirstNotification: true
        }),
        new CopyPlugin([{
            from: path.resolve(__dirname, 'src/img/static/'),
            to: path.resolve(__dirname, 'img/static/'),
            force: true,
            flatten: false,
        }]),
        new MiniCssExtractPlugin({
            filename: 'css/style.css',
        }),
        new WebpackMd5Hash(),
    ]
};

if (!isDev) {
    module.exports.plugins.push(
		new CleanWebpackPlugin(
			['js', 'img', 'css', 'fonts'],
			{ root: path.resolve(__dirname) }
		)
	);
}

if (devMode == "serve") {
    module.exports.plugins.push(new BrowserSyncPlugin({
        host: 'localhost',
        port: 9001,
        proxy: 'pokr.loc',
		files: ["**/*.html"],
        notify: false,
    }, {
        injectCss: true,
    }));
}
