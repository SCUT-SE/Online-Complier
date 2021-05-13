module.exports = {
    configureWebpack: {
        resolve: {
            extensions: [],
            alias: {
                'assets': '@/assets',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
            }
        }
    },
    devServer: {
        proxy: {
            // '/api': {
            //     target: 'http://dev.admin.carrots.ptteng.com',
            //     ws: true,
            //     changeOrigin: true,
            //     pathRewrite: {
            //         '^/api': 'http://dev.admin.carrots.ptteng.com'
            //     },
            // },
            '/demo_oj': {
                target: 'http://localhost:3000',
                // ws: true,
                // changeOrigin: true,
                // pathRewrite: {
                //     '^/api': 'http://dev.admin.carrots.ptteng.com'
                // },
            },
            '/api': {
                target: 'http://localhost:3000',
            },
        }
    },
    // devServer:{
    //     proxyTable: {
    //         '/api': {  //使用"/api"来代替"http://f.apiplus.c"
    //             target: 'http://dev.admin.carrots.ptteng.com', //源地址
    //             changeOrigin: true, //改变源
    //             pathRewrite: {
    //                 '^/api': 'http://dev.admin.carrots.ptteng.com' //路径重写
    //             }
    //         }
    //     }
    // }

};