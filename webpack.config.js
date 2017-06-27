module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: './dist/bundle.js',
    },
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },

    module: {
        rules: [
            {test: /\.js$/, loader: 'source-map-loader', enforce: 'pre'},
            {
                test: /\.css$/,
                exclude: [/node_modules/, /dist/,/\.idea/],
                loader: 'typed-css-modules-loader',
                options: {
                    enforce: 'pre',
                    modules: true,
                    camelCase: true,
                    outDir: './dist',
                    localIdentName: '[name]_[local]_typedcss_[hash:base64:5]'
                }
            },
            {test: /\.tsx?$/, loader: 'ts-loader'}
        ]
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    }
};