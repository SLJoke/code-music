/**
 * 两种配置文件别名的方法，第一种cli2配置
 * @type {{configureWebpack: {resolve: {alias: {assets: string}}}}}
 */
module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'components': '@/components',
                'pages': '@/pages'
            }
        }
    }
}

/**
 * 第二种：cli4 配置
 */
// const path = require('path')
//
// function resolve(dir) {
//     return path.join(__dirname,dir)
// }
//
// module.exports = {
//     chainWebpack: (config) => {
//         config.resolve.alias
//             .set('@',resolve('./src'))
//             .set('components',resolve('./src/components'))
//             .set('assets',resolve('./src/assets'))
//     }
// }