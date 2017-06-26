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
           {loader: 'ts-loader', test: /\.tsx?$/},
           {loader: 'source-map-loader', test: /\.js$/,enforce: 'pre'},
           {test: /\.css$/, use: [
               {loader: 'style-loader'},
               {loader: 'css-loader', options: {
                    modules: true,
                    importLoaders: 1,
                    camelCase: true,
                    localIdentName: '[name]_[local]_[hash:base64:5]'}},
              /* {loader: 'typed-css-modules-loader',options: {camelCase: true} }*/
           ]}
       ]
    },

    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    }
};