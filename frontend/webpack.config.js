module.exports = {
    entry: [
        "babel-polyfill",
        "./src/preload.ts",
        "./src/index.tsx"
    ],
    output: {
        path: __dirname,
        publicPath: '/',
        filename: 'bundle.js'
    },
    devtool: 'inline-source-map',
    module: {
		rules: [
            {
                test: /\.(j|t)s(x)?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: { 
                            presets: ["@babel/preset-env", "@babel/preset-react"]
                        }
                    },
                    {
                        loader: 'ts-loader'
                    }
                ],
                exclude: /node_modules/
            },
            { 
                test: /\.json$/, 
                loader: 'json-loader' },
            {
                test: /\.css$/,
                use: [ "style-loader", "css-loader" ]
            },
            { 
                test: /\.(png|gif|ttf|eot|svg|woff2?)$/, 
                use: "url-loader"
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            }
		]
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './'
    }
};
