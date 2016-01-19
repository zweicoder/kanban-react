const merge = require('webpack-merge');
const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
};

const common = {
    // Entry accepts a path or an object of entries.
    // The build chapter contains an example of the latter.
    entry: PATHS.app,
    // Add resolve.extensions. '' is needed to allow imports
    // without an extension. Note the .'s before extensions!!!
    // The matching will fail without!
    resolve: {
        extensions: ['','.js','.jsx'],
        root:PATHS.app,
        alias: {
            Alt: 'lib/alt.js',

            // Components
            App: 'components/App.jsx',
            Note: 'components/Note.jsx',
            Notes: 'components/Notes.jsx',

            // Stores
            NoteStore: 'stores/NoteStore.js',

            //Actions
            NoteActions: 'actions/NoteActions',
        }
    },
    output: {
        path: PATHS.build,
        filename: 'bundle.js'
    },
    module: {
        preLoaders: [
            {
                test: /\.jsx?$/,
                loaders: ['eslint'],
                // define an include so we check just the files we need
                include: PATHS.app
            }
        ],
        // Webpack loaders evaluated from right to left and bottom to top (separate definitions)
        loaders: [
            {
                // Test expects a RegExp! Note the slashes!
                test: /\.css$/,
                loaders: ['style', 'css'],
                // Include accepts either a path or an array of paths.
                include: PATHS.app
            },
            {
                test: /\.jsx?$/,
                loaders: ['babel?cacheDirectory'],
                include: PATHS.app
            }
        ]
        // postLoaders section for stuff like code coverage checking
    },

    plugins: [
        new HtmlwebpackPlugin({
            title: 'Kanban app',
            template: 'node_modules/html-webpack-template/index.html',
            appMountId: 'app'
        })
    ]
};

if (TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
        devServer: {
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,

            // Display only errors to reduce the amount of output.
            stats: 'errors-only',

            // Parse host and port from env so this is easy to customize.
            host: process.env.HOST,
            port: process.env.PORT || 3000
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ],
        devtool: 'eval-source-map'
    });
}

if (TARGET === 'build') {
    module.exports = merge(common, {})
}