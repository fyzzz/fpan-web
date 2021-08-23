// vue.config.js
module.exports = {
    devServer:{
        port: 8080,
        proxy: {
            '/': {
                target: 'https://pan.fyzzz.cn',
                changeOrigin: true,
                ws: false,
                pathRewrite: {
                    '^/': ''
                }
            }
        }
    },
    // 选项...
    // outputDir:'../../static'
    publicPath: './'
};
